import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// ============================================================
// Platinum Digital B2B Page - v4.0.0
// Design: #fafafa bg + #7c3aed purple accent
// Persona switching: Retail / Enterprise B2B
// ============================================================

const PARTNERS = [
  { name: "Microsoft Partner Network", role: "Authorized Reseller" },
  { name: "Cloudflare", role: "CDN & Security" },
  { name: "Stripe", role: "Payment Processing" },
  { name: "Namecheap", role: "Domain & DNS" },
  { name: "RackNerd", role: "VPS Hosting" },
  { name: "Brevo", role: "Email Delivery" },
  { name: "PayPal", role: "Global Payments" },
  { name: "WooCommerce", role: "E-Commerce Platform" },
];

export default function B2bPage() {
  const { t } = useTranslation();
  const [b2bPersona, setB2bPersona] = useState("enterprise");

  return (
    <div className="bg-[#fafafa] text-[#111827] antialiased overflow-x-hidden">

      {/* ===== Top Notice Bar ===== */}
      <div className="bg-[#f3f4f6] border-b border-[#d1d5db] text-center py-2.5 px-4 text-[11px] font-bold tracking-wide text-[#1f2937]">
        {String.fromCharCode(0x1F6E1)} {t("b2b.notice", "Official Microsoft Partner \u2014 Instant Auto-Delivery & 100% Genuine Activation Guaranteed")}
      </div>

      {/* ===== HERO \u2014 Platinum Digital Style ===== */}
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-[#fafafa]">
        <div className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-60 pointer-events-none z-0 bg-[#e5e7eb] top-[-100px] left-[35%]" />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-40 pointer-events-none z-0 bg-[#c4b5fd] bottom-[-80px] right-[10%]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          {/* Persona Tabs */}
          <div className="inline-flex bg-black/4 border border-[#d1d5db] p-1 rounded-full mb-8">
            <button
              onClick={() => setB2bPersona("retail")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition ${b2bPersona === "retail" ? "bg-[#7c3aed] text-white" : "text-[#111827] opacity-70 hover:opacity-100"}`}
            >
              {String.fromCharCode(0x1F464)} {t("b2b.persona_retail", "Personal Retail License")}
            </button>
            <button
              onClick={() => setB2bPersona("enterprise")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition ${b2bPersona === "enterprise" ? "bg-[#7c3aed] text-white" : "text-[#111827] opacity-70 hover:opacity-100"}`}
            >
              {String.fromCharCode(0x1F3E2)} {t("b2b.persona_enterprise", "Enterprise B2B Procurement")}
            </button>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide mb-4 bg-white text-[#7c3aed] border border-[#d1d5db]">
            {b2bPersona === "retail" ? "Genuine Retail License Portal" : "Enterprise Volume Licensing"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {b2bPersona === "retail"
              ? t("b2b.hero_retail", "Your Trusted Source for Genuine Microsoft Licenses")
              : t("b2b.hero_enterprise", "Enterprise Compliance & SAM Audit Support")}
          </h1>
          <p className="text-sm text-[#4b5563] max-w-xl mx-auto mb-8 leading-relaxed">
            {b2bPersona === "retail"
              ? t("b2b.desc_retail", "Authorized partner. Guaranteed 100% genuine OEM & Retail activation keys delivered within 10 minutes.")
              : t("b2b.desc_enterprise", "Volume Licensing certificates and genuine keys for 100% compliance at low cost. Avoid legal penalties during Microsoft SAM Audits.")}
          </p>
          <div className="flex justify-center gap-3">
            <a href="/store" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition cursor-pointer no-underline">
              {b2bPersona === "retail" ? t("b2b.cta_retail", "Shop Personal Keys Now") : t("b2b.cta_enterprise", "Get Free Compliance Quote")}
            </a>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#f3f4f6] text-[#111827] border border-[#d1d5db] hover:bg-[#e5e7eb] transition cursor-pointer">
              {t("b2b.cta_verify", "Verify My License")}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10">
            {b2bPersona === "retail" ? (
              <>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">5 Min</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_dispatch", "Instant Dispatch")}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">100%</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_activation", "Activation Success")}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">SAVE 85%</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_discount", "Retail Discount")}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">Lifetime</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_support", "Tech Support")}</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">VAT 13%</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_vat", "Dedicated Invoice")}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">Enterprise</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_volume", "Volume Licensing")}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">PO Terms</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_po", "Corporate Transfer")}</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm">
                  <div className="text-lg font-extrabold text-[#7c3aed]">24/7</div>
                  <div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("b2b.stat_sla", "SLA Account Manager")}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== Enterprise B2B Compliance (MOVED from Home) ===== */}
      <section className="relative py-20 bg-[#161617] text-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <span className="text-[#7c3aed] text-xs font-bold tracking-wider uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Enterprise B2B Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-6 mb-6 leading-tight">
                Enterprise Compliance & {t("home.compare.audit")}
              </h2>
              <p className="text-sm text-[#86868b] leading-relaxed mb-8">
                When facing a Microsoft SAM Audit, opaque procurement chains put enterprises at risk. We provide Volume Licensing certificates and genuine keys for 100% compliance at low cost, avoiding legal penalties.
              </p>
              <div className="space-y-4">
                <div className="flex space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/40 transition duration-300">
                  <div className="text-[#7c3aed] text-xl pt-0.5">{String.fromCharCode(0x1F6E1)}</div>
                  <div>
                    <h4 className="text-sm font-semibold">100% Official Compliance Verified</h4>
                    <p className="text-xs text-[#86868b] mt-1">{t("home.compare.enterprise_desc")}</p>
                  </div>
                </div>
                <div className="flex space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/40 transition duration-300">
                  <div className="text-[#a78bfa] text-xl pt-0.5">{String.fromCharCode(0x1F4B5)}</div>
                  <div>
                    <h4 className="text-sm font-semibold">Volume Pricing Discounts (Up to 70% Off)</h4>
                    <p className="text-xs text-[#86868b] mt-1">Supports 5+ accounts with no minimum order. Flexible CSP licensing for enterprise cloud migration.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* B2B Intake Form */}
            <div className="bg-white text-[#1d1d1f] p-8 rounded-2xl border border-[#e8e8ed] shadow-2xl">
              <h3 className="text-xl font-bold mb-2">{t("home.b2b.contact_title")}</h3>
              <p className="text-xs text-[#86868b] mb-6">{t("home.b2b.quote")}</p>
              <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.company")}</label>
                  <input type="text" required placeholder="e.g. TechCorp Solutions Ltd." className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.employees")}</label>
                    <select className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition">
                      <option>5 - 20 Units</option><option>21 - 50 Units</option><option>51 - 100 Units</option><option>100+ Units</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.needs")}</label>
                    <select className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition">
                      <option>{t("home.b2b.windows")}</option><option>{t("home.b2b.m365")}</option><option>{t("home.b2b.server")}</option><option>{t("home.b2b.compliance")}</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.contact_name")}</label>
                    <input type="text" required placeholder="Mr. Zhang" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.phone")}</label>
                    <input type="text" required placeholder="manager@company.com" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition" />
                  </div>
                </div>
                <div>
                  <button type="submit" className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold py-3.5 rounded-lg transition shadow-lg shadow-purple-500/10">
                    Get Free Custom Quote
                  </button>
                </div>
                <p className="text-[10px] text-center text-[#86868b] mt-3">{String.fromCharCode(0x1F510)} Your privacy is protected by GDPR and Chinese data protection laws. Never shared with third parties.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Comparison Matrix (COPIED from Home) ===== */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <p className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase mb-2">{t("home.compare.title")}</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.compare.subtitle")}</h2>
            <p className="text-sm text-[#86868b] mt-3">Compare editions to find the most cost-effective option.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#e8e8ed] shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-[#f5f5f7] border-b border-[#e8e8ed]">
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.dimension")}</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.retail")}</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.smb")}</th>
                  <th className="p-6 text-sm font-semibold text-[#7c3aed] w-1/4">{t("home.compare.enterprise")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f7] text-xs text-[#1d1d1f]/80">
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">{t("home.compare.features")}</td>
                  <td className="p-6">{t("home.compare.lowest_price")}</td>
                  <td className="p-6">{t("home.compare.retail_desc")}</td>
                  <td className="p-6">{t("home.compare.smb_desc")}</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">{t("home.compare.ownership")}</td>
                  <td className="p-6">{t("home.compare.retail_ownership")}</td>
                  <td className="p-6">{t("home.compare.smb_ownership")}</td>
                  <td className="p-6">{t("home.compare.enterprise_ownership")}</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">{t("home.compare.reinstall")}</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">{String.fromCharCode(0x2713)} Full Support</span> (Unlimited)</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">{String.fromCharCode(0x2713)} Full Support</span> (Unbind anytime)</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">{String.fromCharCode(0x2713)} Full Support</span> (Silent auto-reactivation)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">SAM Audit Support</td>
                  <td className="p-6">{String.fromCharCode(0x2713)} Personal asset compliance</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">{String.fromCharCode(0x2713)} Full compliance pass</span></td>
                  <td className="p-6"><span className="text-[#7c3aed] font-semibold">{String.fromCharCode(0x2713)} Premium compliance guarantee</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== Help & Guides (COPIED from Home) ===== */}
      <section className="py-20 bg-[#f5f5f7]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase mb-2">{t("home.support.help_guides")}</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.support.tech_center")}</h2>
            <p className="text-sm text-[#86868b] mt-3">{t("home.b2b.self_service")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl border border-[#e8e8ed] p-6 shadow-sm">
              <div className="text-3xl mb-4">{String.fromCharCode(0x1F527)}</div>
              <h4 className="text-base font-bold mb-2">{t("home.support.activation_faq")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("home.support.activation_guide")}</p>
              <a href="/support" className="text-xs font-semibold text-[#7c3aed] hover:underline">Go to Activation Guides {String.fromCharCode(0x203A)}</a>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8e8ed] p-6 shadow-sm">
              <div className="text-3xl mb-4">{String.fromCharCode(0x1F4E6)}</div>
              <h4 className="text-base font-bold mb-2">{t("support.download_title")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("support.download_desc")}</p>
              <a href="https://setup.office.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#7c3aed] hover:underline">Go to Microsoft Activation Site {String.fromCharCode(0x203A)}</a>
            </div>
            <div className="bg-white rounded-2xl border border-[#e8e8ed] p-6 shadow-sm">
              <div className="text-3xl mb-4">{String.fromCharCode(0x1F4DE)}</div>
              <h4 className="text-base font-bold mb-2">{t("support.server_title")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("support.server_desc")}</p>
              <a href="/support" className="text-xs font-semibold text-[#7c3aed] hover:underline">{t("home.support.contact_expert")} {String.fromCharCode(0x203A)}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Partner Showcase Carousel (NEW) ===== */}
      <section className="py-16 bg-white border-t border-[#e8e8ed] overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase">Trusted by Industry Leaders</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mt-2">Our Partners & Integrations</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-6 px-4" style={{ width: "max-content" }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} className="flex-shrink-0 w-[220px] sm:w-[260px] bg-[#fafafa] rounded-2xl p-6 border border-[#e8e8ed] text-center shadow-sm hover:border-[#7c3aed]/30 transition-colors">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#f3f4f6] flex items-center justify-center text-lg font-bold text-[#7c3aed]">
                  {p.name.charAt(0)}
                </div>
                <div className="text-sm font-bold text-[#1d1d1f] mb-1">{p.name}</div>
                <div className="text-[11px] text-[#86868b]">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Bottom CTA ===== */}
      <section className="py-16 bg-[#f3f4f6] border-t border-[#d1d5db]">
        <div className="px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4">{t("b2b.ready")}</h2>
          <p className="text-sm text-[#86868b] mb-6 max-w-xl mx-auto">{t("b2b.quote")}</p>
          <div className="flex justify-center gap-3">
            <a href="mailto:admin@keys-starter.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition cursor-pointer no-underline">
              {t("b2b.contact", "Contact Enterprise Sales")}
            </a>
            <span className="text-sm text-[#7c3aed] font-semibold self-center">{t("b2b.email")}</span>
          </div>
        </div>
      </section>

    </div>
  );
}
