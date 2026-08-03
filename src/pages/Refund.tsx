import { useTranslation } from "react-i18next";

export default function LegalPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Refund Policy</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">Refund policy for digital license purchases.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <p className="mb-6 text-[11px] text-[#86868b]">Last updated: August 3, 2026</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">1. Digital Product Policy</h2>
            <p className="mb-4">Most products sold by KeyStarter are digital license keys delivered by email. Once a license key has been delivered and successfully verified, the purchase is generally considered final.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">2. Refund Eligibility</h2>
            <p className="mb-4">You may request a refund within 14 days of purchase in the following cases: (a) the product key has not been displayed or delivered to you, or (b) the product key is invalid, duplicate, or already used and we cannot replace it with a valid key.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">3. How to Request a Refund</h2>
            <p className="mb-4">To request a refund, contact us at admin@keystarter.com within 14 days of your purchase. Include your order number, the product name, and a clear description of the issue. For invalid or used keys, include a screenshot of the activation error where possible.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">4. Refund Review</h2>
            <p className="mb-4">Our support team will review your request and may request additional information to verify the issue. If the request is approved, a refund will be issued to the original payment method.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">5. Processing Time</h2>
            <p className="mb-4">Approved refunds are typically processed within 5 to 10 business days, depending on your payment provider. The refund will appear on your statement according to your payment provider policy.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">6. Physical (Sticker) Products</h2>
            <p className="mb-4">For physical license sticker products, a refund may be considered if the item has not been shipped or if it arrives damaged or incorrect. Once a physical item has been shipped, it may be subject to return shipping requirements.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">7. Non-Refundable Cases</h2>
            <p className="mb-4">Refunds are not provided for keys that have been successfully activated, for purchases where the customer changed their mind after delivery, or for issues caused by the customer system not meeting the product requirements.</p>
            <h2 className="text-lg font-bold text-[#1d1d1f] mt-8 mb-3">8. Contact</h2>
            <p className="mb-4">For refund inquiries, contact us at admin@keystarter.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}