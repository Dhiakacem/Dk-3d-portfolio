import './i18n';
import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const BelowFold = lazy(() => import("./components/BelowFold"));

const App = () => {
  const [showSections, setShowSections] = useState(() => Boolean(window.location.hash));

  useEffect(() => {
    const reveal = () => setShowSections(true);
    const revealHash = () => {
      if (window.location.hash) reveal();
    };
    window.addEventListener("scroll", reveal, { passive: true, once: true });
    window.addEventListener("hashchange", revealHash);
    window.addEventListener("portfolio:navigate", reveal);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("hashchange", revealHash);
      window.removeEventListener("portfolio:navigate", reveal);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary dark:bg-primary-dark transition-colors duration-300 ease-out'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center transition-colors duration-300 ease-out'>
          <Navbar />
          <Hero />
        </div>
        <Suspense fallback={<div aria-hidden="true" className="min-h-screen" />}>
          {showSections ? <BelowFold /> : <div aria-hidden="true" className="min-h-screen" />}
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
