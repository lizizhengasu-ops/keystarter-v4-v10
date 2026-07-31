import React from "react";
import type { FAQItem } from "../data/faq";
export function ProductFAQ({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mt-8 pt-6 border-t border-[#e8e8ed]">
        <h3 className="text-base font-bold mb-4">FAQ</h3>
        <div className="faq-accordion">
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
