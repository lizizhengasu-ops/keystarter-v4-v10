import { useTranslation } from "react-i18next";

export default function CookiesPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("cookies.title", "Cookie Policy")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">{t("cookies.desc", "How we use cookies and similar technologies.")}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. {t("cookies.s1t", "What Are Cookies")}</h2>
            <p className="mb-4">{t("cookies.s1b", "Small text files stored on your device when you visit a website.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. {t("cookies.s2t", "Essential Cookies")}</h2>
            <p className="mb-4">{t("cookies.s2b", "Required for cart functionality and language preference. Cannot be disabled.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. {t("cookies.s3t", "Analytics Cookies")}</h2>
            <p className="mb-4">{t("cookies.s3b", "Used with your consent to understand site usage and improve services.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. {t("cookies.s4t", "Third-Party Cookies")}</h2>
            <p className="mb-4">{t("cookies.s4b", "Payment processors like PayPal may set cookies during checkout.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. {t("cookies.s5t", "Managing Cookies")}</h2>
            <p className="mb-4">{t("cookies.s5b", "Manage via our cookie consent banner or browser settings.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. {t("cookies.s6t", "Contact")}</h2>
            <p className="mb-4">{t("cookies.s6b", "For cookie-related questions: admin@keys-starter.com")}</p>
            <p className="text-[11px] text-[#86868b] mt-8 border-t border-[#f5f5f7] pt-6">{t("cookies.disclaimer", "Template. Consult a legal professional.")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}