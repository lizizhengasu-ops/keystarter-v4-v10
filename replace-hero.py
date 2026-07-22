with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Find the hero section boundaries
import re
# Match from "Navigation Bar" comment to the closing </section> tag before Special Offer
hero_start = content.find('{/* Navigation Bar */}')
hero_end = content.find('{/* Special Offer Section */}') 

if hero_start > 0 and hero_end > 0:
    before = content[:hero_start]
    after = content[hero_end:]
    
    new_hero = '''      {/* Navigation Bar */}

      {}
      {/* Hero Section - Platinum Digital Style */}
      <section id="hero" className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-[#fafafa] pt-32 pb-20">
        <div className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-60 pointer-events-none z-0 bg-[#e5e7eb] top-[-100px] left-[35%]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-40 pointer-events-none z-0 bg-[#c4b5fd] bottom-[-80px] right-[10%]"></div>

        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          {/* Persona Tabs */}
          <div className="inline-flex bg-black/[0.04] border border-[#d1d5db] p-1 rounded-full mb-8">
            <button onClick={() => setHeroPersona("retail")} className={"px-5 py-2 text-xs font-bold rounded-full transition " + (heroPersona==="retail" ? "bg-[#7c3aed] text-white" : "text-[#111827] opacity-70 hover:opacity-100")}>{String.fromCharCode(0x1F464)} Personal Retail</button>
            <button onClick={() => setHeroPersona("enterprise")} className={"px-5 py-2 text-xs font-bold rounded-full transition " + (heroPersona==="enterprise" ? "bg-[#7c3aed] text-white" : "text-[#111827] opacity-70 hover:opacity-100")}>{String.fromCharCode(0x1F3E2)} Enterprise B2B</button>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide mb-4 bg-white text-[#7c3aed] border border-[#d1d5db]">
            {heroPersona==="retail" ? "Genuine Retail License Portal" : "Enterprise Volume Licensing"}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-[#111827]">
            {heroPersona==="retail" ? t("home.hero.headline") : "Enterprise Compliance & SAM Audit Support"}
          </h1>
          <p className="text-sm text-[#4b5563] max-w-xl mx-auto mb-8 leading-relaxed">
            {heroPersona==="retail" ? t("hero.desc") : "Volume Licensing certificates and genuine keys for 100% compliance at low cost. Avoid legal penalties during Microsoft SAM Audits."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button onClick={() => scrollToSection("store")} className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition shadow-lg shadow-purple-500/10 text-center">
              {heroPersona==="retail" ? t("hero.cta") : "Get Free Compliance Quote"}
            </button>
            <button onClick={() => scrollToSection("business")} className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#f3f4f6] text-[#111827] border border-[#d1d5db] hover:bg-[#e5e7eb] transition text-center">
              {heroPersona==="retail" ? t("hero.enterprise") : "Verify My License"} {String.fromCharCode(0x203A)}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {heroPersona==="retail" ? (<>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">10 Min</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("hero.trust.delivery")}</div></div>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">98.7%</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("hero.trust.satisfaction")}</div></div>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">50K+</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("hero.trust.activation")}</div></div>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">100%</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">{t("hero.trust.verification")}</div></div>
            </>) : (<>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">VAT 13%</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">Dedicated Invoice</div></div>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">Enterprise</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">Volume Licensing</div></div>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">PO Terms</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">Corporate Transfer</div></div>
              <div className="bg-white rounded-xl p-4 border border-[#d1d5db] text-center shadow-sm"><div className="text-lg font-extrabold text-[#7c3aed]">24/7</div><div className="text-[10px] font-semibold uppercase text-[#4b5563] mt-1">SLA Account Manager</div></div>
            </>)}
          </div>
        </div>
      </section>\n\n'''

    content = before + new_hero + after

    # Add heroPersona state before toast state
    content = content.replace(
        'const [toast, setToast] = useState({ visible: false, message: \x27\x27, icon: \x27\x27 });',
        'const [heroPersona, setHeroPersona] = useState(\x27retail\x27);\n  const [toast, setToast] = useState({ visible: false, message: \x27\x27, icon: \x27\x27 });'
    )

    with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("HERO REPLACED - platinum digital style")
else:
    print(f"FAIL: hero_start={hero_start}, hero_end={hero_end}")
