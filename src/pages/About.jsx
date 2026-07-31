import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("about.title")}</h1>
        <p className="text-[#86868b] mb-10 text-lg">{t("about.desc")}</p>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e8ed] mb-10">
          <h2 className="text-xl font-bold mb-4">{t("about.story")}</h2>
          <p className="text-sm text-[#86868b] leading-relaxed">{t("about.story_text")}</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-[#e8e8ed] mb-10">
          <h2 className="text-xl font-bold mb-4">Approval & Certification</h2>
          <img src="/approvaleng.png" alt="Approval Certificate" className="w-full max-w-2xl mx-auto rounded-lg" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center"><div className="text-3xl font-extrabold text-[#0078d4] mb-1">10K+</div><div className="text-xs text-[#86868b]">{t("about.customers")}</div></div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center"><div className="text-3xl font-extrabold text-[#0078d4] mb-1">5</div><div className="text-xs text-[#86868b]">{t("about.experience")}</div></div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center"><div className="text-3xl font-extrabold text-[#0078d4] mb-1">99.9%</div><div className="text-xs text-[#86868b]">{t("about.delivery")}</div></div>
        </div>
      </div>
    </div>
  );
}
