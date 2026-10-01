import { useEffect } from "react";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import Works from "./Works";
import CV from "./CV";
import Contact from "./Contact";

export default function BelowFold() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return <main className="portfolio-content">
    <About />
    <Experience />
    <Tech />
    <Works />
    <CV />
    <Contact />
  </main>;
}
