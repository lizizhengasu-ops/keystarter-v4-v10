import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./i18n/en.json";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ja", "ko", "es", "pt", "fr"],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "ks_lang",
    },
    backend: { loadPath: "/i18n/{{lng}}.json" },
    interpolation: { escapeValue: false },
    partialBundledLanguages: true,
    resources: {
      en: { translation: en },
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng || "en";
    document.title = i18n.t("seo.title", "KeyStarter — Genuine Software Licenses");
  }
});

export default i18n;
