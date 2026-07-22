import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const LANG_NAMES: Record<string, string> = {
  en: "EN", ja: "\u65e5\u672c\u8a9e", ko: "\ud55c\uad6d\uc5b4",
  es: "Espa\u00f1ol",
  pt: "Portugu\u00eas"
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const available = (i18n.options?.supportedLngs || []).filter(function(l) { return l !== "cimode"; });

  useEffect(function() {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    if (open) setTimeout(function() { document.addEventListener("click", h); }, 0);
    return function() { document.removeEventListener("click", h); };
  }, [open]);

  if (available.length <= 1) return null;

  return (
    <div ref={ref} className="relative">
      <button onClick={function() { setOpen(!open); }} className="text-[#1d1d1f]/70 hover:text-[#7c3aed] text-[11px] font-semibold transition-colors uppercase tracking-wide" aria-label="Switch language">
        {LANG_NAMES[i18n.language] || i18n.language}
      </button>
      {open && (
        <div style={{position:"absolute",top:"100%",right:0,marginTop:8,background:"#fff",borderRadius:12,boxShadow:"0 8px 30px rgba(0,0,0,0.15)",border:"1px solid #e6e6ea",zIndex:200,padding:6,minWidth:120}}>
          {available.map(function(code) { return (
            <button key={code} onClick={function() { i18n.changeLanguage(code); setOpen(false); }}
              style={{display:"block",width:"100%",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:code===i18n.language?600:400,background:code===i18n.language?"#f0f0f2":"transparent",color:"#1d1d1f",border:"none",cursor:"pointer",textAlign:"left"}}>
              {LANG_NAMES[code] || code}
            </button>
          );})}
        </div>
      )}
    </div>
  );
}

