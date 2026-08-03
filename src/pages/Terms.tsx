import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">Terms for using KeyStarter and purchasing software licenses.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <p className="mb-6 text-[11px] text-[#86868b]">Last updated: August 3, 2026</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using the KeyStarter website, you agree to be bound by these Terms of Service. If you do not agree with any part of these Terms, please do not use the Website.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. About KeyStarter</h2>
            <p className="mb-4">KeyStarter (keys-starter.com) is an independent software reseller that sells genuine Microsoft license keys including Windows, Office, Server, SQL Server, and IoT products. We are not affiliated with, sponsored by, or endorsed by Microsoft Corporation.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. Products and Licenses</h2>
            <p className="mb-4">All products listed on the Website are digital license keys or physical license stickers. Licenses may be OEM, Retail, Volume Licensing, or IoT Enterprise editions. The rights granted to you are defined by the applicable Microsoft End User License Agreement (EULA) and the product edition you purchase.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. Orders and Payment</h2>
            <p className="mb-4">When you place an order, you agree to pay the price displayed at checkout, including any applicable taxes. We accept payment through Stripe, PayPal, and other payment methods made available from time to time. You are responsible for the accuracy of the payment information you provide.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. Delivery of Digital Products</h2>
            <p className="mb-4">Digital license keys are delivered electronically to the email address associated with your order, typically within 2 to 5 minutes after payment is confirmed. In some cases, delivery may be delayed for payment verification, fraud screening, or regional availability checks.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. Physical (Sticker) Products</h2>
            <p className="mb-4">Certain IoT and Server products are delivered as physical license stickers. Physical products are shipped separately using a tracked courier. Estimated delivery times vary by destination and will be communicated at checkout or via email.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">7. Usage Restrictions</h2>
            <p className="mb-4">You may not resell, redistribute, or transfer license keys except as expressly permitted by the applicable Microsoft EULA. You may not use the keys for unauthorized duplication, counterfeit manufacturing, or any illegal purpose. You are responsible for ensuring that your system meets the product system requirements before purchase.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">8. Account Registration</h2>
            <p className="mb-4">Some features require you to create an account. You agree to provide accurate, current, and complete information and to keep your login credentials secure. You are responsible for all activity that occurs under your account.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">9. Intellectual Property</h2>
            <p className="mb-4">The Website, its content, design, logos, and software are the property of KeyStarter or its licensors. Microsoft, Windows, Office, and other product names are trademarks of Microsoft Corporation and are used for identification purposes only.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">10. Disclaimers</h2>
            <p className="mb-4">The Website and all products are provided on an as-is and as-available basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability or fitness for a particular purpose, to the maximum extent permitted by applicable law.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">11. Limitation of Liability</h2>
            <p className="mb-4">To the maximum extent permitted by law, KeyStarter shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Website or any product purchased through it.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">12. Indemnification</h2>
            <p className="mb-4">You agree to indemnify and hold harmless KeyStarter and its officers, employees, and agents from any claims, damages, liabilities, and expenses arising out of your use of the Website, your violation of these Terms, or your violation of any rights of a third party.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">13. Termination</h2>
            <p className="mb-4">We reserve the right to suspend or terminate your access to the Website and your account, without notice, if you violate these Terms or any applicable law. You may stop using the Website at any time.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">14. Governing Law</h2>
            <p className="mb-4">These Terms are governed by the laws of the jurisdiction in which KeyStarter operates, without regard to conflict of law principles. Any disputes shall be resolved in the competent courts of that jurisdiction.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">15. Severability</h2>
            <p className="mb-4">If any provision of these Terms is held to be invalid or unenforceable, that provision shall be struck and the remaining provisions shall remain in full force and effect.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">16. Changes to These Terms</h2>
            <p className="mb-4">We may update these Terms from time to time. The latest version will always be posted on this page with an updated Last updated date. Continued use of the Website after changes constitutes acceptance of the revised Terms.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">17. Contact</h2>
            <p className="mb-4">If you have questions about these Terms, contact us at admin@keystarter.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}