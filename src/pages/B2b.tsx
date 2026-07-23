import { useTranslation } from "react-i18next";

const solutions = [
  {n:"Volume Licensing", d:"Microsoft Enterprise Agreement and Open License programs for organizations of all sizes."},
  {n:"Dedicated Support", d:"Priority technical support with dedicated account management."},
  {n:"Bulk Discounts", d:"Volume-based pricing with increasing discounts for larger orders."},
  {n:"Custom Deployment", d:"Enterprise-wide deployment planning and assistance."},
];

export default function B2bPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#6d28d9] to-[#1a1a2e] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("b2b.title")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto mb-8">{t("b2b.desc")}</p>
        <a href="mailto:admin@keys-starter.com?subject=Enterprise%20B2B%20Inquiry" className="inline-block bg-white text-[#6d28d9] px-8 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-gray-100 transition">{t("b2b.contact")}</a>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">{t("b2b.solutions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {solutions.map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
              <h3 className="font-bold text-sm mb-2">{s.n}</h3>
              <p className="text-xs text-[#86868b]">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center py-12 border-t border-[#e8e8ed]">
          <h2 className="text-2xl font-bold mb-4">{t("b2b.ready")}</h2>
          <p className="text-[#86868b] mb-4 text-sm">{t("b2b.quote")}</p>
          <a href="mailto:admin@keys-starter.com" className="text-[#7c3aed] font-semibold no-underline hover:underline">{t("b2b.email")}</a>
        </div>
      </div>
    </div>
  );
}
