import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const sections = [
    { id: "s1", title: "Introduction" },
    { id: "s2", title: "Information We Collect" },
    { id: "s3", title: "How We Use Your Information" },
    { id: "s4", title: "Payment Processing" },
    { id: "s5", title: "Email and Communications" },
    { id: "s6", title: "Cookies" },
    { id: "s7", title: "Data Storage and Security" },
    { id: "s8", title: "Third-Party Services" },
    { id: "s9", title: "Data Retention" },
    { id: "s10", title: "Your Rights (GDPR/CCPA)" },
    { id: "s11", title: "Children Privacy" },
    { id: "s12", title: "Changes to This Policy" },
  ];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased min-h-screen">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 pt-16 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-[11px] font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Last updated: August 3, 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-lg font-light max-w-2xl mx-auto text-white/85">How we collect, use, and protect your personal information.</p>
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
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Introduction</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">This Privacy Policy explains how KeyStarter (keys-starter.com) collects, uses, stores, and protects your personal data when you visit our Website or make a purchase. By using the Website, you consent to the practices described in this Policy.</p>
            </section>
            <section id="s2" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Information We Collect</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We collect information you provide when placing an order, creating an account, or contacting support, including your name, email address, billing address, and order details. We also automatically collect technical information such as IP address, browser type, device information, and cookies for security and analytics purposes.</p>
            </section>
            <section id="s3" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">How We Use Your Information</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We use your information to process orders, deliver license keys, provide customer support, prevent fraud, and improve our services. We do not sell your personal information to third parties.</p>
            </section>
            <section id="s4" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Payment Processing</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Payments are processed by third-party payment providers such as Stripe and PayPal. We do not store your full payment card details. Your payment information is transmitted directly to the payment provider and is subject to their privacy policies.</p>
            </section>
            <section id="s5" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">5</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Email and Communications</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We use a third-party email delivery service to send order confirmations, license keys, and support responses. If you subscribe to our newsletter, we may send promotional emails. You can opt out at any time using the unsubscribe link in any email.</p>
            </section>
            <section id="s6" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Cookies</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We use essential cookies to operate the Website, including cart and checkout functionality. We may use analytics cookies, with your consent where required, to understand how visitors use the Website. You can manage cookie preferences in your browser settings.</p>
            </section>
            <section id="s7" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">7</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Data Storage and Security</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Your data is stored on secure servers. We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration.</p>
            </section>
            <section id="s8" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">8</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Third-Party Services</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We may use third-party services for analytics, email delivery, payment processing, and content delivery. These providers may process your data on our behalf and are required to protect it in accordance with applicable law.</p>
            </section>
            <section id="s9" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">9</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Data Retention</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We retain your personal data only as long as necessary to fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
            </section>
            <section id="s10" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">10</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Your Rights (GDPR/CCPA)</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data, and to object to or restrict certain processing. You may also have the right to opt out of the sale or sharing of your personal information under the CCPA. To exercise these rights, contact us at admin@keys-starter.com.</p>
            </section>
            <section id="s11" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">11</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Children Privacy</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">The Website is not intended for children under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us so we can delete it.</p>
            </section>
            <section id="s12" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">12</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Changes to This Policy</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We may update this Privacy Policy from time to time. We will post any changes on this page and update the Last updated date accordingly.</p>
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
