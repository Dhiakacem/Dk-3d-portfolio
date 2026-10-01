import React from "react";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
function Tech() {
  const { t } = useTranslation();
  return <div className="flex flex-col items-center">
    <h2 className="text-secondary text-lg mb-6">{t("tech.subtitle")}</h2>
    <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
      {technologies.map(({ name, icon }) => <li key={name}
        className="flex flex-col items-center gap-3 rounded-xl bg-tertiary dark:bg-tertiary-dark p-4 border border-white/10 hover:-translate-y-1 transition-transform">
        <img src={icon} alt="" width="56" height="56" loading="lazy" decoding="async" className={`w-14 h-14 object-contain ${name === "tech.threejs" ? "brightness-0 dark:invert" : ""}`} />
        <span className="text-white text-xs text-center">{t(name)}</span>
      </li>)}
    </ul>
  </div>;
}
export default SectionWrapper(Tech, "technologies");
