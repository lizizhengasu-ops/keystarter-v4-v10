import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE_FAQS as faqs } from "../data/faq";

export default function FaqPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(-1);
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("faq.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("faq.desc")}</p>
        {faqs.map((item,i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#e8e8ed] mb-3 overflow-hidden">
            <button onClick={()=>setOpen(open===i?-1:i)}
              className="w-full text-left px-6 py-4 font-semibold text-sm bg-transparent border-none cursor-pointer flex justify-between items-center">
              <span>{item.q}</span><span className="text-[#86868b]">{open===i ? "-" : "+"}</span>
            </button>
            {open===i && <div className="px-6 pb-4 text-sm text-[#86868b]">{item.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
