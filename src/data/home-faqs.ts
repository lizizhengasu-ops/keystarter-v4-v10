// Home page FAQ (R2): single source for the visible accordion and the
// FAQPage JSON-LD so search engines extract exactly what users read.
import type { FAQItem } from "./faq";

export const HOME_FAQS: FAQItem[] = [
  {
    q: "Why are your prices much lower than Microsoft official store? Are these genuine?",
    a: "Absolutely genuine. We source Volume Licensing and CSP channel keys through Microsoft regional bulk agreements. Microsoft offers steep volume discounts, and we pass those savings to developers. All keys support Microsoft account binding and official ISO downloads — never unauthorized keys.",
  },
  {
    q: "After purchasing, can I still use the key after reinstalling or changing devices?",
    a: "Yes! Our Retail-grade keys support cloud binding to your Microsoft account. When reinstalling, simply click \"I recently changed the hardware on this device\" for seamless reactivation.",
  },
  {
    q: "My company faces a compliance audit. Can these keys pass official SAM Audit?",
    a: "Yes! We provide enterprise procurement with Microsoft compliance statements and authorized receipts (invoices supported). Our compliance team offers one-on-one legal support throughout any audit.",
  },
];
