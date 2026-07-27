import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("privacy.title", "Privacy Policy")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">{t("privacy.desc", "How we collect, use, and protect your personal information.")}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. {t("privacy.s1t", "Information We Collect")}</h2>
            <p className="mb-4">{t("privacy.s1b", "We collect information you provide when making a purchase, including your name, email address, billing address, and payment information. We also collect technical information such as IP address, browser type, and cookies for analytics.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. {t("privacy.s2t", "How We Use Your Information")}</h2>
            <p className="mb-4">{t("privacy.s2b", "We use your information to process orders, deliver license keys, provide customer support, and improve our services. We do not sell your personal information to third parties.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. {t("privacy.s3t", "Data Storage and Security")}</h2>
            <p className="mb-4">{t("privacy.s3b", "Your data is stored securely on our servers. We implement industry-standard security measures to protect your information.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. {t("privacy.s4t", "Your Rights (GDPR/CCPA)")}</h2>
            <p className="mb-4">{t("privacy.s4b", "You have the right to access, correct, delete, or port your personal data. For CCPA, you have the right to opt out. Contact us at admin@keystarter.com.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. {t("privacy.s5t", "Cookies")}</h2>
            <p className="mb-4">{t("privacy.s5b", "We use essential cookies for cart functionality. Analytics cookies are used only with your consent.")}</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. {t("privacy.s6t", "Contact")}</h2>
            <p className="mb-4">{t("privacy.s6b", "For privacy-related inquiries, contact us at admin@keystarter.com.")}</p>
            <p className="text-[11px] text-[#86868b] mt-8 border-t border-[#f5f5f7] pt-6">{t("privacy.disclaimer", "This is a template. Consult a legal professional for full compliance.")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}