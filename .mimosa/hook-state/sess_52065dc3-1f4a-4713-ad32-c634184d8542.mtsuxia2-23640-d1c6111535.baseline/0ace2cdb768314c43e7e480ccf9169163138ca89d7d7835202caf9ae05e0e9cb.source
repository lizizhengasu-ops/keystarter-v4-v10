with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix old testimonials grid
old_t = '{testimonials.length > 0 && (\n          <section className="max-w-7xl mx-auto px-6 py-16">'
new_t = '{testimonials.length > 0 && (\n          <section className={`max-w-7xl mx-auto px-6 py-16 ${heroPersona!=="retail"?"persona-hidden":""}`}>'
if old_t in content:
    content = content.replace(old_t, new_t)
    print("FIX: old testimonials grid -> retail only")

# 2. Add partner carousel + bottom CTA for enterprise (before toast)
partner = '''
      {heroPersona === "enterprise" && (
      <section className="py-16 bg-white border-t border-[#e8e8ed] overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase">Trusted by Industry Leaders</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mt-2">Our Partners and Integrations</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-6 px-4" style={{width:"max-content"}}>
            {[["Microsoft Partner","Authorized Reseller"],["Cloudflare","CDN and Security"],["Stripe","Payment Processing"],["Namecheap","Domain and DNS"],["RackNerd","VPS Hosting"],["Brevo","Email Delivery"],["PayPal","Global Payments"],["WooCommerce","E-Commerce"],["Microsoft Partner","Authorized Reseller"],["Cloudflare","CDN and Security"],["Stripe","Payment Processing"],["Namecheap","Domain and DNS"],["RackNerd","VPS Hosting"],["Brevo","Email Delivery"],["PayPal","Global Payments"],["WooCommerce","E-Commerce"]].map((p,i) => <div key={i} className="flex-shrink-0 w-[220px] sm:w-[260px] bg-[#fafafa] rounded-2xl p-6 border border-[#e8e8ed] text-center shadow-sm hover:border-[#7c3aed]/30 transition-colors"><div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#f3f4f6] flex items-center justify-center text-lg font-bold text-[#7c3aed]">{p[0][0]}</div><div className="text-sm font-bold text-[#1d1d1f] mb-1">{p[0]}</div><div className="text-[11px] text-[#86868b]">{p[1]}</div></div>)}
          </div>
        </div>
      </section>
      )}
'''

cta = '''
      {heroPersona === "enterprise" && (
      <section className="py-16 bg-[#f3f4f6] border-t border-[#d1d5db] text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4">Ready to Scale Your Licensing?</h2>
        <p className="text-sm text-[#86868b] mb-6 max-w-xl mx-auto">Get volume pricing, dedicated support, and full SAM Audit compliance.</p>
        <div className="flex justify-center gap-4 flex-wrap items-center">
          <a href="mailto:admin@keys-starter.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition cursor-pointer no-underline">Contact Enterprise Sales</a>
          <span className="text-sm text-[#7c3aed] font-semibold">admin@keys-starter.com</span>
        </div>
      </section>
      )}
'''

marker = "\n      {/* Global Interactive Notification Toast */}"
if marker in content:
    content = content.replace(marker, partner + "\n" + cta + "\n" + marker)
    print("ADDED: partner carousel + bottom CTA")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done. Size:", len(content))
