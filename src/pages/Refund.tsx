import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RefundPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const sections = [
    { id: "s1", title: "Digital Product Policy" },
    { id: "s2", title: "Refund Eligibility" },
    { id: "s3", title: "How to Request a Refund" },
    { id: "s4", title: "Refund Review" },
    { id: "s5", title: "Processing Time" },
    { id: "s6", title: "Physical (Sticker) Products" },
    { id: "s7", title: "Non-Refundable Cases" },
    { id: "s8", title: "Contact" },
  ];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased min-h-screen">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 pt-16 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-[11px] font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Last updated: August 3, 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Refund Policy</h1>
          <p className="text-lg font-light max-w-2xl mx-auto text-white/85">Refund policy for digital license purchases.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-2xl border border-[#e8e8ed] p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-3 px-2">On this page</div>
            <nav className="space-y-0.5 max-h-[70vh] overflow-auto pr-1">
              {sections.map(function(s:any,i:number){return(
                <a key={s.id} href={"#"+s.id} onClick={function(){setActive(i)}}
                   className={"block text-xs px-3 py-2 rounded-lg transition-colors "+(i===active?"bg-[#7c3aed]/10 text-[#7c3aed] font-semibold":"text-[#86868b] hover:text-[#1d1d1f]")}>{s.title}</a>
              );})}
            </nav>
          </div>
        </aside>
        <div className="bg-white rounded-2xl border border-[#e8e8ed] p-8 sm:p-12 shadow-sm">
          <div className="text-sm text-[#1d1d1f]/80 leading-relaxed">
            <section id="s1" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Digital Product Policy</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Most products sold by KeyStarter are digital license keys delivered by email. By purchasing a digital license key, you consent to immediate delivery of the key and acknowledge that, once the key is delivered and activation has started, the statutory right of withdrawal for digital content is lost. Once a license key has been delivered and successfully verified, the purchase is generally considered final.</p>
            </section>
            <section id="s2" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Refund Eligibility</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">You may request a refund within 14 days of purchase in the following cases: (a) the product key has not been displayed or delivered to you, or (b) the product key is invalid, duplicate, or already used and we cannot replace it with a valid key.</p>
            </section>
            <section id="s3" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">How to Request a Refund</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">To request a refund, contact us at admin@keys-starter.com within 14 days of your purchase. Include your order number, the product name, and a clear description of the issue. For invalid or used keys, include a screenshot of the activation error where possible.</p>
            </section>
            <section id="s4" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Refund Review</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Our support team will review your request and may request additional information to verify the issue. If the request is approved, a refund will be issued to the original payment method.</p>
            </section>
            <section id="s5" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">5</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Processing Time</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Approved refunds are typically processed within 5 to 10 business days, depending on your payment provider. The refund will appear on your statement according to your payment provider policy.</p>
            </section>
            <section id="s6" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Physical (Sticker) Products</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">For physical license sticker products, a refund may be considered if the item has not been shipped or if it arrives damaged or incorrect. Once a physical item has been shipped, it may be subject to return shipping requirements.</p>
            </section>
            <section id="s7" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">7</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Non-Refundable Cases</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Refunds are not provided for keys that have been successfully activated, for purchases where the customer changed their mind after delivery, or for issues caused by the customer system not meeting the product requirements.</p>
            </section>
            <section id="s8" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">8</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Contact</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">For refund inquiries, contact us at admin@keys-starter.com.</p>
            </section>
          </div>
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#7c3aed]/5 to-[#106EBE]/5 border border-[#e8e8ed] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1d1d1f]">Questions? Contact us</div>
              <div className="text-xs text-[#86868b] mt-0.5">Our team typically responds within 24 hours.</div>
            </div>
            <a href="mailto:admin@keys-starter.com" className="text-xs font-semibold text-[#7c3aed] hover:underline whitespace-nowrap">admin@keys-starter.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
