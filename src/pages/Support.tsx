import { useTranslation } from "react-i18next";

const topics = [
  {n:"Activation", d:"How to activate your Windows, Office, or Server license."},
  {n:"Installation", d:"Step-by-step installation guides for all Microsoft products."},
  {n:"Licensing", d:"Understanding digital licenses, retail vs OEM, and transfer policies."},
  {n:"Account", d:"Managing your orders, keys, and account settings."},
  {n:"Payments", d:"Payment methods, invoices, and billing questions."},
  {n:"Refunds", d:"Our 30-day money-back guarantee and refund process."},
];

export default function SupportPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("support.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("support.desc")}</p>
        <h2 className="text-xl font-bold mb-4">{t("support.topics")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {topics.map((tp,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#e8e8ed]">
              <h3 className="font-semibold text-sm mb-1">{tp.n}</h3>
              <p className="text-xs text-[#86868b]">{tp.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
          <h2 className="text-xl font-bold mb-2">{t("support.more")}</h2>
          <p className="text-sm text-[#86868b] mb-4">{t("support.email")}</p>
          <a href="mailto:support@keystarter.com" className="inline-block bg-[#0078d4] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0062b1] transition">{t("support.contact")}</a>
        </div>
      </div>
    </div>
  );
}
