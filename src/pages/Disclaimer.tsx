import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Disclaimer</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">Important legal and compliance information about KeyStarter.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <p className="mb-6 text-[11px] text-[#86868b]">Last updated: August 3, 2026</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. General Information</h2>
            <p className="mb-4">The information provided on this Website is for general informational purposes only and does not constitute legal, financial, or professional advice. You should consult a qualified professional for advice tailored to your specific situation.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. Independent Reseller</h2>
            <p className="mb-4">KeyStarter is an independent software reseller and is not affiliated with, sponsored by, or endorsed by Microsoft Corporation or any other software manufacturer. All product names, logos, and brands are property of their respective owners.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. No Warranty</h2>
            <p className="mb-4">All products are provided as-is without warranties of any kind, whether express or implied. We do not warrant that the products will meet your requirements or that the Website will be uninterrupted or error-free.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. Product Information</h2>
            <p className="mb-4">Product descriptions, prices, and system requirements are provided in good faith and are subject to change without notice. It is your responsibility to verify that your system meets the requirements before purchasing.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. Third-Party Links</h2>
            <p className="mb-4">The Website may contain links to third-party websites or services that are not owned or controlled by KeyStarter. We are not responsible for the content, policies, or practices of any third-party websites.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. Limitation of Liability</h2>
            <p className="mb-4">To the maximum extent permitted by law, KeyStarter shall not be liable for any loss or damage arising from the use of the Website, the purchase of products, or reliance on any information provided on the Website.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">7. Contact</h2>
            <p className="mb-4">If you have questions about this Disclaimer, contact us at admin@keystarter.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}