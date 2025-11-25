import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

const LanguageSegment = ({ className = "", onAfterChange }) => {
  const { i18n, t } = useTranslation();

  const activeLang =
    LANGUAGES.find((lng) => lng.code === i18n.language?.split("-")[0])?.code || "en";

  const handleChange = (code) => {
    if (code === activeLang) return;
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    if (typeof onAfterChange === "function") {
      onAfterChange(code);
    }
  };

  return (
    <div
      className={`relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-primary-light/40 dark:bg-primary-dark/60 px-1 py-1 text-xs font-semibold text-secondary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] ${className}`}
      role="group"
      aria-label={t("nav.language")}
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === activeLang;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleChange(lang.code)}
            aria-pressed={isActive}
            className={`relative overflow-hidden px-3 sm:px-4 py-1 rounded-full transition-colors duration-300 ease-out ${
              isActive ? "text-primary dark:text-white" : "text-secondary hover:text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-white/90 dark:bg-white/15 shadow-md"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative tracking-wide">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSegment;


