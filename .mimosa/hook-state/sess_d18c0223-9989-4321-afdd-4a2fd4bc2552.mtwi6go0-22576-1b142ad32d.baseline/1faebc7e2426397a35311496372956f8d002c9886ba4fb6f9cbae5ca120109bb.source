with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

partner = '''      {heroPersona === "enterprise" && (
      <section className="py-12 bg-white border-b border-[#e8e8ed] overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase">Trusted by Industry Leaders</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mt-2">Our Partners and Integrations</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-6 px-4" style={{width:"max-content"}}>
            {[["Microsoft Partner","Authorized Reseller"],["Cloudflare","CDN & Security"],["Stripe","Payment Processing"],["Namecheap","Domain & DNS"],["RackNerd","VPS Hosting"],["Brevo","Email Delivery"],["PayPal","Global Payments"],["WooCommerce","E-Commerce"],["Microsoft Partner","Authorized Reseller"],["Cloudflare","CDN & Security"],["Stripe","Payment Processing"],["Namecheap","Domain & DNS"],["RackNerd","VPS Hosting"],["Brevo","Email Delivery"],["PayPal","Global Payments"],["WooCommerce","E-Commerce"]].map((p,i) => <div key={i} className="flex-shrink-0 w-[220px] sm:w-[260px] bg-[#fafafa] rounded-2xl p-6 border border-[#e8e8ed] text-center shadow-sm hover:border-[#7c3aed]/30 transition-colors"><div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#f3f4f6] flex items-center justify-center text-lg font-bold text-[#7c3aed]">{p[0][0]}</div><div className="text-sm font-bold text-[#1d1d1f] mb-1">{p[0]}</div><div className="text-[11px] text-[#86868b]">{p[1]}</div></div>)}
          </div>
        </div>
      </section>
      )}
'''

old = '</section>\n\n{/* Testimonials Carousel */}'
new = '</section>\n\n' + partner.strip() + '\n\n{/* Testimonials Carousel */}'
if old in content:
    content = content.replace(old, new)
    print("INSERTED partner carousel between Hero and Testimonials")
else:
    print("Pattern not found")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
