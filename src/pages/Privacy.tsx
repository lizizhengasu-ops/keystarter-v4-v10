import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">How we collect, use, and protect your personal information.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <p className="mb-6 text-[11px] text-[#86868b]">Last updated: August 3, 2026</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. Introduction</h2>
            <p className="mb-4">This Privacy Policy explains how KeyStarter (keys-starter.com) collects, uses, stores, and protects your personal data when you visit our Website or make a purchase. By using the Website, you consent to the practices described in this Policy.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. Information We Collect</h2>
            <p className="mb-4">We collect information you provide when placing an order, creating an account, or contacting support, including your name, email address, billing address, and order details. We also automatically collect technical information such as IP address, browser type, device information, and cookies for security and analytics purposes.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to process orders, deliver license keys, provide customer support, prevent fraud, and improve our services. We do not sell your personal information to third parties.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. Payment Processing</h2>
            <p className="mb-4">Payments are processed by third-party payment providers such as Stripe and PayPal. We do not store your full payment card details. Your payment information is transmitted directly to the payment provider and is subject to their privacy policies.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. Cookies</h2>
            <p className="mb-4">We use essential cookies to operate the Website, including cart and checkout functionality. We may use analytics cookies, with your consent where required, to understand how visitors use the Website. You can manage cookie preferences in your browser settings.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. Data Storage and Security</h2>
            <p className="mb-4">Your data is stored on secure servers. We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">7. Third-Party Services</h2>
            <p className="mb-4">We may use third-party services for analytics, email delivery, and payment processing. These providers may process your data on our behalf and are required to protect it in accordance with applicable law.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">8. Data Retention</h2>
            <p className="mb-4">We retain your personal data only as long as necessary to fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">9. Your Rights (GDPR/CCPA)</h2>
            <p className="mb-4">Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data, and to object to or restrict certain processing. You may also have the right to opt out of the sale or sharing of your personal information under the CCPA. To exercise these rights, contact us at admin@keystarter.com.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">10. Children Privacy</h2>
            <p className="mb-4">The Website is not intended for children under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us so we can delete it.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">11. Changes to This Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time. The latest version will always be posted on this page with an updated Last updated date.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">12. Contact</h2>
            <p className="mb-4">For privacy-related inquiries, contact us at admin@keystarter.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}