export default function ChangelogPage() {
  var versions = [{"v":"2.5.0","d":"2026-07-16","items":["Added Security Headers (CSP, Permissions-Policy)","Added robots.txt and sitemap.xml","New Footer with Products/Support/Company/Legal menu","Pricing, FAQ, and Contact pages","404 page component","Remember Me on login","Show/Hide Password toggle","Session timeout (30 days)","API timeout (10s AbortSignal)","Logout redirects to /account instead of reload"]},{"v":"2.4.0","d":"2026-07-15","items":["Blog feature with 12 articles","HTTP to HTTPS redirect","Article style upgrade with proper tables","Fail2ban whitelist configuration","SEO score improvements to 100/100"]},{"v":"2.0.0","d":"2026-07-13","items":["Consumer, Buyer, Admin dashboards","Consumer API (Express + WooCommerce sync)","Cloudflare Worker for SEO injection","Account page in English","WooCommerce API integration"]}];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">Changelog</h1>
        <p className="text-base font-light text-white/80">Track our progress and updates.</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {versions.map(function(v, i) {
          return (
            <div key={i} className="bg-white rounded-2xl p-8 border border-[#e8e8ed] mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">v{v.v}</h2>
                <span className="text-xs text-[#86868b]">{v.d}</span>
              </div>
              <ul className='space-y-1'>
                {v.items.map(function(item, j) {
                  return <li key={j} className='flex gap-2 text-sm'><span className='text-[#0078d4] mt-1'>-</span><span>{item}</span></li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}