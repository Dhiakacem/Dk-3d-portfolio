import React, { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Computer = lazy(() => import("./canvas/Computers"));
const Earth = lazy(() => import("./canvas/Earth"));
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
export default function DeferredScene({ kind }) {
  const container = useRef(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activated, setActivated] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEligible(media.matches && !navigator.connection?.saveData);
    update();
    media.addEventListener("change", update);
    navigator.connection?.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "-15% 0px -15% 0px", threshold: 0,
    });
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      navigator.connection?.removeEventListener("change", update);
    };
  }, []);
  const fallback = <div className={`scene-placeholder scene-placeholder-${kind}`} aria-hidden="true" />;
  const Scene = kind === "computer" ? Computer : Earth;
  const enabled = eligible && visible && (kind === "earth" || activated);
  return (
    <div ref={container} className="relative w-full h-full" data-scene={kind}>
      {enabled ? <SceneBoundary fallback={fallback}>
        <Suspense fallback={fallback}><Scene /></Suspense>
      </SceneBoundary> : fallback}
      {kind === "computer" && eligible && !activated && (
        <button type="button" onClick={() => setActivated(true)}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 rounded-xl border border-secondary/50 bg-tertiary px-5 py-3 text-white hover:border-[#915EFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#915EFF]">
          {t("hero.explore3d")}
        </button>
      )}
    </div>
  );
}
