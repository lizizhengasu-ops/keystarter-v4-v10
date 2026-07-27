import { useTranslation } from "react-i18next";

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("terms.title", "Terms of Service")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">{t("terms.desc", "Terms for using KeyStarter and purchasing licenses.")}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. {t("terms.s1t", "Acceptance of Terms")}</h2>
            <p className="mb-4">{t("terms.s1b", "By using KeyStarter, you agree to these Terms of Service.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. {t("terms.s2t", "License Purchases")}</h2>
            <p className="mb-4">{t("terms.s2b", "All licenses sold are genuine OEM or retail keys. Some are device-bound.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. {t("terms.s3t", "Usage Restrictions")}</h2>
            <p className="mb-4">{t("terms.s3b", "You may not resell or redistribute license keys. Subject to Microsoft EULA.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. {t("terms.s4t", "Refund Policy")}</h2>
            <p className="mb-4">{t("terms.s4b", "Digital product refunds are governed by our Refund Policy.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. {t("terms.s5t", "Limitation of Liability")}</h2>
            <p className="mb-4">{t("terms.s5b", "KeyStarter is not liable for indirect damages from license use.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. {t("terms.s6t", "Contact")}</h2>
            <p className="mb-4">{t("terms.s6b", "Contact: admin@keystarter.com")}</p>
            <p className="text-[11px] text-[#86868b] mt-8 border-t border-[#f5f5f7] pt-6">{t("terms.disclaimer", "This is a template. Consult a legal professional.")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}