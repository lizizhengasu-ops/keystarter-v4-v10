import { useTranslation } from "react-i18next";
import { SITE_FAQS as faqs } from "../data/faq";
import { QuickAnswer } from "../components/QuickAnswer";

export default function FaqPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("faq.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("faq.desc")}</p>
        <QuickAnswer>
          <p>
            <strong>KeyStarter answers delivery, licensing, refund and activation questions on this page.</strong> In short: keys arrive by email within minutes of payment, every license is genuine and sourced through vetted supply channels, each key activates one device, volume discounts start at 5 keys, and keys that fail to activate are replaced free of charge or refunded within 14 days. The full answers are below.
          </p>
        </QuickAnswer>
        <div className="mt-8 space-y-3">
          {faqs.map((item,i) => (
            <details key={i} className="bg-white rounded-2xl border border-[#e8e8ed] overflow-hidden" open={i === 0}>
              <summary className="px-6 py-4 font-semibold text-sm cursor-pointer flex justify-between items-center">
                <h3 className="text-sm font-semibold m-0">{item.q}</h3><span className="text-[#86868b]">+</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-[#86868b]">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
