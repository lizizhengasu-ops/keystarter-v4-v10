import { useState } from "react";

export default function LicensingPage() {
  const [active, setActive] = useState(0);
  const sections = [
    { id: "s1", title: "Overview" },
    { id: "s2", title: "OEM Licenses" },
    { id: "s3", title: "Retail Licenses" },
    { id: "s4", title: "Volume Licensing" },
    { id: "s5", title: "IoT Enterprise Licenses" },
    { id: "s6", title: "Activation" },
    { id: "s7", title: "Usage Rights" },
    { id: "s8", title: "Compliance and Audits" },
    { id: "s9", title: "Contact" },
  ];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased min-h-screen">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 pt-16 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-xs font-medium mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Last updated: August 3, 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Licensing Terms</h1>
          <p className="text-lg font-light max-w-2xl mx-auto text-white/85">License types, activation, and usage rights for Microsoft products.</p>
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
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Overview</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">This page explains the license types offered by KeyStarter and the rights and restrictions that apply to each. All Microsoft products are subject to the applicable Microsoft End User License Agreement (EULA) and product terms.</p>
            </section>
            <section id="s2" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">OEM Licenses</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">OEM (Original Equipment Manufacturer) licenses are tied to the first device on which they are activated and may not be transferred to another device. OEM keys are intended for pre-installation on new hardware.</p>
            </section>
            <section id="s3" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Retail Licenses</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Retail licenses, including Full Packaged Product (FPP), can be transferred to another device, subject to Microsoft terms. Retail keys may be reinstalled on the same device as many times as needed. Some retail keys are bound to a Microsoft account and must be activated while signed in to that account. Subscription products such as Microsoft 365 are redeemed through the Microsoft account used during redemption.</p>
            </section>
            <section id="s4" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Volume Licensing</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Volume Licensing agreements are intended for organizations and provide centralized management, deployment, and compliance benefits. Volume licenses are subject to the terms of the applicable Volume Licensing agreement.</p>
            </section>
            <section id="s5" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">5</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">IoT Enterprise Licenses</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">IoT Enterprise licenses are designed for dedicated, single-purpose devices such as kiosks, medical devices, ATMs, and industrial controllers. These licenses are device-bound and are not intended for general-purpose computing devices.</p>
            </section>
            <section id="s6" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Activation</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Most products require activation during or after installation. You must have an internet connection to activate the product. Some IoT and Volume licenses may require alternative activation methods.</p>
            </section>
            <section id="s7" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">7</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Usage Rights</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">License usage rights, including the number of permitted devices and users, are defined by the product edition and the applicable Microsoft product terms. It is your responsibility to ensure that your usage complies with these terms.</p>
            </section>
            <section id="s8" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">8</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Compliance and Audits</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">Microsoft may conduct compliance audits of volume license usage. You are responsible for maintaining accurate records of your licensed devices and usage.</p>
            </section>
            <section id="s9" className="scroll-mt-24 border-b border-[#f5f5f7] last:border-0 pb-6 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold flex items-center justify-center flex-shrink-0">9</span>
                <h2 className="text-lg font-bold text-[#1d1d1f] pt-0.5">Contact</h2>
              </div>
              <p className="mb-3 last:mb-0 pl-10">For licensing questions, contact us at admin@keys-starter.com.</p>
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
