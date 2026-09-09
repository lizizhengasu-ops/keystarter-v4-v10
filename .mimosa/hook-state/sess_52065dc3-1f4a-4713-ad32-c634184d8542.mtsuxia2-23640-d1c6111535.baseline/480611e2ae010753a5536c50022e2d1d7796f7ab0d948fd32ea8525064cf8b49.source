import { useTranslation } from "react-i18next";

const versions = [
  {v:"4.0.0", d:"Multi-language support, Polylang integration, product translations"},
  {v:"3.1.0", d:"i18n framework, LanguageSwitcher, 9 language files"},
  {v:"3.0.0", d:"Product API endpoint, SPA rebuild, cart improvements"},
  {v:"2.1.0", d:"CSP fix, keystarter-email-api v2.1, checkout improvements"},
  {v:"2.0.0", d:"React SPA launch, WooCommerce integration, checkout flow"},
  {v:"1.1.0", d:"Rank Math SEO, GA4, 12 blog articles"},
  {v:"1.0.0", d:"Initial launch with WooCommerce + React SPA"},
];

export default function ChangelogPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("changelog.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("changelog.desc")}</p>
        {versions.map((v,i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[#e8e8ed] mb-4">
            <div className="text-xs font-bold text-[#0078d4] mb-1">{t("changelog.title")} {v.v}</div>
            <p className="text-sm text-[#1d1d1f]">{v.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
