import { useTranslation } from "react-i18next";

export default function RefundPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("refund.title", "Refund Policy")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">{t("refund.desc", "Refund policy for digital license purchases.")}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. {t("refund.s1t", "Digital Product Policy")}</h2>
            <p className="mb-4">{t("refund.s1b", "Refunds are not offered once a key has been delivered and verified.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. {t("refund.s2t", "Eligibility")}</h2>
            <p className="mb-4">{t("refund.s2b", "Refunds considered for: key activation failure, duplicate purchase, or incorrect product.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. {t("refund.s3t", "Request Process")}</h2>
            <p className="mb-4">{t("refund.s3b", "Contact admin@keystarter.com within 14 days with order number and reason.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. {t("refund.s4t", "Processing Time")}</h2>
            <p className="mb-4">{t("refund.s4b", "Approved refunds processed in 5-10 business days to original payment method.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. {t("refund.s5t", "Contact")}</h2>
            <p className="mb-4">{t("refund.s5b", "For refund inquiries: admin@keystarter.com")}</p>
            <p className="text-[11px] text-[#86868b] mt-8 border-t border-[#f5f5f7] pt-6">{t("refund.disclaimer", "Template. Consult a legal professional.")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}