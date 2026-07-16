import { useState } from "react";

export default function FaqPage() {
  var faqs = [
    {q:"How do I receive my license key?",a:"After purchase, your license key is instantly delivered to your account dashboard. You can also check your email for a copy."},
    {q:"Are your Microsoft licenses genuine?",a:"Yes, all licenses are sourced from authorized Microsoft partners. Each key is verified and comes with a lifetime activation guarantee."},
    {q:"Can I upgrade my license later?",a:"Yes, you can upgrade from Home to Pro or from Standard to Professional by paying the price difference. Contact support for assistance."},
    {q:"What is your refund policy?",a:"We offer a 30-day money-back guarantee on all purchases. If you encounter any issues, our support team will help resolve them."},
    {q:"Do you offer volume discounts?",a:"Yes, we offer bulk pricing for businesses purchasing 5+ licenses. Contact our sales team for a custom quote."},
    {q:"How does the license activation work?",a:"You will receive a product key that can be activated directly through Microsoft's official website or during Windows/Office installation."}
  ];
  var [openIdx, setOpenIdx] = useState(-1);
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-base font-light text-white/80">Find answers to common questions.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-3">
          {faqs.map(function(f, i) {
            return (
              <div key={i} className="bg-white rounded-xl border border-[#e8e8ed] overflow-hidden">
                <button onClick={function(){ setOpenIdx(openIdx === i ? -1 : i); }} className="w-full flex justify-between items-center px-6 py-4 text-left bg-transparent border-none cursor-pointer">
                  <span className="text-sm font-semibold text-[#1d1d1f]">{f.q}</span>
                  <svg className={"w-4 h-4 text-[#86868b] transition-transform " + (openIdx === i ? "rotate-180" : "")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {openIdx === i ? <div className='px-6 pb-4 text-xs text-[#86868b] leading-relaxed'>{f.a}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}