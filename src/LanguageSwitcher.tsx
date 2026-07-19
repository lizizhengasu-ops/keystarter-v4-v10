 import { useState, useEffect, useRef } from "react";
 import { useLanguage } from "./I18nContext";
 
 const LANG_NAMES: Record<string, string> = {
   en: "EN",
   ja: "日本語",
   ko: "한국어",
   es: "Español",
   fr: "Français",
   de: "Deutsch",
 };
 
 export default function LanguageSwitcher() {
   const { lang, setLang, available } = useLanguage();
   const [open, setOpen] = useState(false);
   const ref = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const h = (e: MouseEvent) => {
       if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
     };
     if (open) setTimeout(() => document.addEventListener("click", h), 0);
     return () => document.removeEventListener("click", h);
   }, [open]);
 
   if (available.length <= 1) return null;
 
   return (
     <div ref={ref} className="relative">
       <button
         onClick={() => setOpen(!open)}
         className="text-[#1d1d1f]/70 hover:text-[#0078d4] text-[11px] font-semibold transition-colors uppercase tracking-wide"
         aria-label="Switch language"
       >
         {LANG_NAMES[lang] || lang}
       </button>
       {open && (
         <div
           style={{
             position: "absolute",
             top: "100%",
             right: 0,
             marginTop: 8,
             background: "#fff",
             borderRadius: 12,
             boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
             border: "1px solid #e6e6ea",
             zIndex: 200,
             padding: "6px",
             minWidth: 120,
           }}
         >
           {available.map((code) => (
             <button
               key={code}
               onClick={() => { setLang(code); setOpen(false); }}
               style={{
                 display: "block",
                 width: "100%",
                 padding: "8px 14px",
                 borderRadius: 8,
                 fontSize: 12,
                 fontWeight: code === lang ? 600 : 400,
                 background: code === lang ? "#f0f0f2" : "transparent",
                 color: "#1d1d1f",
                 border: "none",
                 cursor: "pointer",
                 textAlign: "left",
               }}
             >
               {LANG_NAMES[code] || code}
             </button>
           ))}
         </div>
       )}
     </div>
   );
 }
