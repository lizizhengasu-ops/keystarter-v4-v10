 import { createContext, useContext, useState, useEffect, ReactNode } from "react";
 
 type Lang = "en" | "ja" | "ko" | "es" | "fr" | "de";
 type Dict = Record<string, string>;
 
 const LS_KEY = "ks_lang";
 const DEFAULT_LANG: Lang = "en";
 
 const TRANSLATIONS: Record<Lang, () => Promise<Dict>> = {
   en: () => fetch("/i18n/en.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
   ja: () => fetch("/i18n/ja.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
   ko: () => fetch("/i18n/ko.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
   es: () => fetch("/i18n/es.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
   fr: () => fetch("/i18n/fr.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
   de: () => fetch("/i18n/de.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
  pt: () => fetch("/i18n/pt.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
  it: () => fetch("/i18n/it.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
  ru: () => fetch("/i18n/ru.json").then(r => r.ok ? r.json() : {}).catch(() => ({})),
 };
 
 type Ctx = {
   lang: Lang;
   t: (key: string, fallback?: string) => string;
   setLang: (l: Lang) => void;
   available: Lang[];
 };
 
 const C = createContext<Ctx>(null!);
 
 export function I18nProvider({ children }: { children: ReactNode }) {
   const [lang, setLangState] = useState<Lang>(() => {
     const saved = localStorage.getItem(LS_KEY) as Lang | null;
     if (saved && TRANSLATIONS[saved]) return saved;
     return DEFAULT_LANG;
   });
   const [dict, setDict] = useState<Dict>({});
 
   useEffect(() => {
     localStorage.setItem(LS_KEY, lang);
     document.documentElement.lang = lang;
     TRANSLATIONS[lang]().then(setDict);
   }, [lang]);
 
   const t = (key: string, fallback?: string): string =>
     dict[key] || fallback || key;
 
   const setLang = (l: Lang) => setLangState(l);
   const available: Lang[] = ["en", "ja", "ko", "es", "fr", "de", "pt", "it", "ru"];
 
   return <C.Provider value={{ lang, t, setLang, available }}>{children}</C.Provider>;
 }
 
 export const useLanguage = () => useContext(C);
