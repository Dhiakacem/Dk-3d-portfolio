import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const SUPPORTED_LANGS = ["en", "fr"];

const getInitialLanguage = () => {
  if (typeof window === "undefined") {
    return "en";
  }
  const stored = localStorage.getItem("lang");
  if (stored && SUPPORTED_LANGS.includes(stored)) {
    return stored;
  }
  if (stored && !SUPPORTED_LANGS.includes(stored)) {
    localStorage.setItem("lang", "en");
  }
  return "en";
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
