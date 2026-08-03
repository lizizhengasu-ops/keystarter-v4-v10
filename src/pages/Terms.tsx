import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const sections = [
    { id: "s1", title: "Acceptance of Terms" },
    { id: "s2", title: "About KeyStarter" },
    { id: "s3", title: "Products and Licenses" },
    { id: "s4", title: "Orders and Payment" },
    { id: "s5", title: "Delivery of Digital Products" },
    { id: "s6", title: "Physical (Sticker) Products" },
    { id: "s7", title: "Usage Restrictions" },
    { id: "s8", title: "Account Registration" },
    { id: "s9", title: "Intellectual Property" },
    { id: "s10", title: "Disclaimers" },
    { id: "s11", title: "Limitation of Liability" },
    { id: "s12", title: "Indemnification" },
    { id: "s13", title: "Termination" },
    { id: "s14", title: "Governing Law" },
    { id: "s15", title: "Severability" },
    { id: "s16", title: "Changes to These Terms" },
    { id: "s17", title: "Contact" },
  ];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased min-h-screen">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 pt-16 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-[11px] font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Last updated: August 3, 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-lg font-light max-w-2xl mx-auto text-white/85">Terms for using KeyStarter and purchasing software licenses.</p>
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
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Acceptance of Terms</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">By accessing or using the KeyStarter website (keys-starter.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these Terms, please do not use the Website.</p>
            </section>
            <section id="s2" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">About KeyStarter</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">KeyStarter is an independent software reseller that sells genuine Microsoft license keys, including Windows, Office, Server, SQL Server, and IoT Enterprise products. We are an authorized channel partner and are not affiliated with, sponsored by, or endorsed by Microsoft Corporation.</p>
            </section>
            <section id="s3" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Products and Licenses</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">All products offered are digital license keys or physical license stickers. Licenses may be OEM, Retail, Volume Licensing, or IoT Enterprise editions. The rights granted to you are defined by the applicable Microsoft End User License Agreement (EULA) and the product edition you purchase. It is your responsibility to verify that your system meets the product requirements before purchase.</p>
            </section>
            <section id="s4" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Orders and Payment</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">When you place an order, you agree to pay the price displayed at checkout, including any applicable taxes. We accept payment through Stripe, PayPal, and other payment methods made available from time to time. By completing a purchase you represent that the payment information you provide is accurate and that you are authorized to use it.</p>
            </section>
            <section id="s5" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">5</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Delivery of Digital Products</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Digital license keys are delivered electronically to the email address associated with your order, typically within 2 to 5 minutes after payment is confirmed. In some cases delivery may be delayed for payment verification, fraud screening, or regional availability checks. If you do not receive your key, contact our support team.</p>
            </section>
            <section id="s6" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Physical (Sticker) Products</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Certain IoT and Server products are delivered as physical license stickers. Physical products are shipped separately using a tracked courier. Estimated delivery times vary by destination and will be communicated at checkout or via email.</p>
            </section>
            <section id="s7" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">7</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Usage Restrictions</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">You may not resell, redistribute, or transfer license keys except as expressly permitted by the applicable Microsoft EULA. You may not use the keys for unauthorized duplication, counterfeit manufacturing, or any illegal purpose.</p>
            </section>
            <section id="s8" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">8</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Account Registration</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Some features require you to create an account. You agree to provide accurate, current, and complete information and to keep your login credentials secure. You are responsible for all activity that occurs under your account.</p>
            </section>
            <section id="s9" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">9</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Intellectual Property</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">The Website, its content, design, logos, and software are the property of KeyStarter or its licensors. Microsoft, Windows, Office, and other product names are trademarks of Microsoft Corporation and are used for identification purposes only.</p>
            </section>
            <section id="s10" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">10</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Disclaimers</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">The Website and all products are provided on an as-is and as-available basis without warranties of any kind, either express or implied, to the maximum extent permitted by applicable law.</p>
            </section>
            <section id="s11" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">11</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Limitation of Liability</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">To the maximum extent permitted by law, KeyStarter shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of the Website or any product purchased through it.</p>
            </section>
            <section id="s12" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">12</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Indemnification</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">You agree to indemnify and hold harmless KeyStarter and its officers, employees, and agents from any claims, damages, liabilities, and expenses arising out of your use of the Website, your violation of these Terms, or your violation of any rights of a third party.</p>
            </section>
            <section id="s13" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">13</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Termination</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We reserve the right to suspend or terminate your access to the Website and your account, without notice, if you violate these Terms or any applicable law.</p>
            </section>
            <section id="s14" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">14</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Governing Law</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">These Terms are governed by the laws of the jurisdiction in which KeyStarter operates, without regard to conflict of law principles. Any disputes shall be resolved in the competent courts of that jurisdiction.</p>
            </section>
            <section id="s15" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">15</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Severability</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">If any provision of these Terms is held to be invalid or unenforceable, that provision shall be struck and the remaining provisions shall remain in full force and effect.</p>
            </section>
            <section id="s16" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">16</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Changes to These Terms</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">We may update these Terms from time to time. The latest version will always be posted on this page with an updated Last updated date. Continued use of the Website after changes constitutes acceptance of the revised Terms.</p>
            </section>
            <section id="s17" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">17</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Contact</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">If you have questions about these Terms, contact us at admin@keystarter.com.</p>
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
            <a href="mailto:admin@keystarter.com" className="text-xs font-semibold text-[#7c3aed] hover:underline whitespace-nowrap">admin@keystarter.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}