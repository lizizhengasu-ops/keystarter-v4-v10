import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../api/woocommerce";
import type { SPAProduct } from "../api/woocommerce";
import { useCart } from "../data/CartContext";
import ProductImage from "../components/ProductImage";
import CountdownTimer from "../components/CountdownTimer";
import { SPECIAL_OFFER_IDS } from "../data/constants";
import { SITE, filterBySiteCatalog } from "../site-config";
import { QuickAnswer } from "../components/QuickAnswer";

// Category landing pages for /product-category/:slug (SEO landing routes).
// Copy blocks target the commercial keyword clusters; grid reuses the Store card.

interface CatMeta {
  qa: string;
  h1: string;
  lead: string;
  copyHtml: string;
}

const CATEGORIES: Record<string, CatMeta> = {
  windows: {
    qa: "Genuine Windows 10 and 11 license keys from an authorized Microsoft channel reseller. Every Home and Pro key — OEM, official retail and volume editions — is delivered by email within 10 minutes, activates for the lifetime of one PC, and is covered by a 14-day replacement-or-refund guarantee if activation fails.",
    h1: "Windows License Keys — Windows 10 & 11",
    lead: "Genuine Windows 10 & 11 keys — instant email delivery, verified activation, 14-day refund guarantee.",
    copyHtml: `<p>Genuine <strong>Windows 10 and Windows 11 license keys</strong> for Home and Pro editions, sourced through official Microsoft channels and verified for online or phone activation. Every key is delivered to your email within 2–10 minutes of payment and includes lifetime activation on 1 PC.</p>
<p><strong>Which edition do you need?</strong></p>
<ul>
<li><strong>Windows 11 Home</strong> — everyday use, gaming and study. The most affordable way to activate a modern PC.</li>
<li><strong>Windows 11 Pro</strong> — adds BitLocker encryption, Remote Desktop, Hyper-V and domain join for business and power users.</li>
<li><strong>"Official" retail versions</strong> — transferable retail-channel keys with packaging-style documentation, ideal if you may move the license to another PC later.</li>
</ul>
<p>Not sure how to activate after purchase? Follow our <a href="/guide/activate-windows-11">Windows 11 activation guide</a>, or read <a href="/blog">the blog</a> for the latest Windows news and licensing explainers. Every order is covered by our <a href="/refund">14-day refund guarantee</a>.</p>`,
  },
  office: {
    qa: "Genuine Office 2019 and 2021 Professional Plus keys: one-time purchases, not subscriptions. Each perpetual license activates Word, Excel, PowerPoint, Outlook and more on one Windows PC for life, is delivered by email within 10 minutes, and carries the same 14-day activation guarantee as every KeyStarter license.",
    h1: "Office License Keys — 2019 & 2021 Professional Plus",
    lead: "Perpetual Office 2019/2021 Professional Plus keys — one-time purchase, no Microsoft 365 subscription.",
    copyHtml: `<p>Genuine <strong>Microsoft Office 2019 and Office 2021 Professional Plus</strong> keys — one-time purchase, perpetual license, no Microsoft 365 subscription required. Includes Word, Excel, PowerPoint, Outlook, Access and Publisher, delivered by email within 2–10 minutes and activated through official Microsoft channels.</p>
<p><strong>2019 or 2021?</strong></p>
<ul>
<li><strong>Office 2019 Professional Plus</strong> — proven and stable, fully compatible with Windows 10. Best value if your PC runs an older system.</li>
<li><strong>Office 2021 Professional Plus</strong> — the newest perpetual edition, built for Windows 11, with updated in-app performance and dark-mode support. Recommended for new PCs.</li>
</ul>
<p>Both editions activate online and keep working offline forever — this is a perpetual license, not a subscription. Questions before buying? See <a href="/support">support</a> or our <a href="/blog">Office licensing guides</a>.</p>`,
  },
  "server-sql": {
    qa: "Windows Server IoT and SQL Server Runtime keys for business workloads, licensed through volume channels. 16-core Standard editions cover two physical processors, runtime editions serve embedded applications, and every order includes compliance documentation — with volume pricing and VAT invoices from 5 keys.",
    h1: "Windows Server & SQL Server Keys — IoT & Runtime Editions",
    lead: "Windows Server IoT & SQL Server Runtime keys with volume pricing and compliance documentation.",
    copyHtml: `<p>Genuine <strong>Windows Server IoT (Standard, 16-core)</strong> and <strong>SQL Server Runtime</strong> keys for 2019 and 2022 — the licensing editions designed for embedded, kiosk, industrial and dedicated-purpose deployments. Keys ship by email in minutes and activate through official Microsoft channels.</p>
<p><strong>Built for fleet and compliance work:</strong></p>
<ul>
<li><strong>Win Svr IoT Std 2019 / 2022, 16-core</strong> — IoT editions permit long-term, locked-down deployments that skip desktop-experience churn.</li>
<li><strong>SQL Svr Std RUNTIME 2019 / 2022</strong> — SQL Server runtime licensing for ISVs and embedded solutions sold as part of a complete system.</li>
</ul>
<p>Volume pricing and <strong>compliance documentation</strong> are available for business procurement — contact us through <a href="/b2b">B2B volume licensing</a> for quotes and invoices.</p>`,
  },
  "iot-enterprise": {
    qa: "Windows 10/11 IoT Enterprise LTSC keys built for commercial embedded devices. Entry, Value and High End tiers activate kiosks, POS terminals, medical and industrial hardware, carry a 10-year LTSC servicing lifecycle, and ship with compliance documentation — volume pricing available from 5 keys.",
    h1: "Windows IoT Enterprise LTSC Keys — 2019 / 2021 / 2024",
    lead: "LTSC long-term servicing keys for kiosks, industrial controllers and embedded fleets.",
    copyHtml: `<p>Genuine <strong>Windows 10/11 IoT Enterprise LTSC</strong> keys in Entry, Value and High End tiers — the long-term servicing editions built for kiosks, POS terminals, industrial controllers, medical and signage devices that must not change underneath you.</p>
<p><strong>Why LTSC for devices:</strong></p>
<ul>
<li><strong>10-year support lifecycle</strong> — security updates only, no feature updates, no mid-life UI changes.</li>
<li><strong>Three tiers</strong> — Entry for cost-sensitive fleets, Value for standard industrial PCs, High End for GPU/mission-critical hardware.</li>
<li><strong>Fixed feature set</strong> — LTSC 2019 (Win10), 2021 (Win10), 2024 (Win11): pick the baseline your hardware is certified for and freeze it.</li>
</ul>
<p>Deploying more than a handful of devices? Ask for <a href="/b2b">volume pricing and compliance documentation</a> — invoices and documentation support included.</p>`,
  },
};

export default function CategoryLandingPage() {
  const { t } = useTranslation();
  const { slug = "" } = useParams();
  const meta = CATEGORIES[slug];
  const [products, setProducts] = useState<SPAProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, buyNow } = useCart();

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchProducts().then(data => {
      if (!cancelled) { setProducts(data); setLoading(false); }
    }).catch(err => {
      if (!cancelled) { setError(err.message); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [slug]);

  if (!meta) {
    return (
      <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-3">Category not found</h1>
          <p className="text-[#6e6e73] mb-8">Browse the full catalog instead.</p>
          <Link to="/products" className="inline-block bg-[#7c3aed] text-white text-sm font-semibold px-6 py-3 rounded-xl">All Products</Link>
        </div>
      </div>
    );
  }

  const catProducts = filterBySiteCatalog(
    products.filter(p => !/^(testms|shop1-payment-test)$/.test(p.slug || ""))
      .filter(p => (p.categorySlugs || []).includes(slug))
  );

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#6d28d9] to-[#6d28d9] text-white px-6 sm:px-12 py-16 text-center">
        <nav className="text-xs text-white/70 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span className="text-white/90">{meta.h1.split("—")[0].trim()}</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{meta.h1}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">{meta.lead}</p>
      </div>

      <QuickAnswer>
        <p><strong>{meta.qa.split(".")[0]}.</strong> {meta.qa.slice(meta.qa.indexOf(".") + 1).trim()}</p>
      </QuickAnswer>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-6 pt-6 text-xs font-medium text-[#1d1d1f]/80">
        <span>Genuine OEM / Retail / Volume keys</span>
        <span>Instant email delivery</span>
        <span>14-day refund on unused keys</span>
        <span>Activation support included</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10">
        <div
          className="bg-white rounded-2xl border border-[#e8e8ed] p-6 sm:p-8 text-[15px] leading-7 text-[#3a3a3c]
            [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-2
            [&_a]:text-[#7c3aed] [&_a]:underline [&_a]:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: meta.copyHtml }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold mb-6 text-center">
          {meta.h1.split("—")[0].trim()} ({catProducts.length})
        </h2>
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#e8e8ed]">
                <div className="shimmer w-full aspect-[4/3] rounded-xl mb-3" />
                <div className="shimmer h-4 w-3/4 mb-2 rounded" />
                <div className="shimmer h-3 w-1/2 mb-2 rounded" />
                <div className="shimmer h-8 w-full rounded-xl" />
              </div>
            ))}
          </div>
        )}
        {error && <div className="text-red-500 text-center py-8">{t("store.load_error")}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {catProducts.map((x, i) => {
              const isSpecial = SPECIAL_OFFER_IDS.includes(x.slug);
              const orig = isSpecial ? (SITE.priceAnchors?.[x.slug] || x.regularPrice || 0) : 0;
              const off = orig > x.price ? Math.round((1 - x.price / orig) * 100) : 0;
              return (
                <div key={i} className={"bg-white rounded-2xl border p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden " + (isSpecial ? "border-[#ff6b35]/40" : "border-[#e8e8ed]")}>
                  {isSpecial && off > 0 && <div className="absolute top-0 right-0 bg-[#c2410c] text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">-{off}%</div>}
                  <Link to={"/product/"+x.slug} className="block">
                    <ProductImage slug={x.slug} name={x.name} eager={i < 2} />
                    {isSpecial && <span className="inline-block text-xs font-bold uppercase tracking-wide text-[#c2410c] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded mt-2 mb-2">Special Price</span>}
                    <h3 className="text-sm font-bold text-[#1d1d1f] mb-1">{x.name}</h3>
                    <p className="text-xs text-[#6e6e73] mb-4">{x.category || 'Microsoft License'}</p>
                    <ul className="space-y-1.5 mb-4 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-3">
                      {(x.specs ? Object.entries(x.specs).slice(0, 4) : []).map(([_k,v],fi) => (
                        <li key={fi} className="flex items-start space-x-1.5"><span className="text-green-500 font-bold">✓</span><span>{v}</span></li>
                      ))}
                    </ul>
                  </Link>
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className={"text-xl font-extrabold " + (isSpecial ? "text-[#c2410c]" : "text-[#1d1d1f]")}>
                          {new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(x.price)}
                        </span>
                        {off > 0 && <span className="text-xs text-[#6e6e73] line-through">{new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(orig)}</span>}
                      </div>
                    </div>
                    {isSpecial && <CountdownTimer className="mb-3" />}
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); addToCart(x.slug, x.name, x.price); }}
                        className={"flex-1 border-2 text-xs font-semibold py-2 rounded-xl transition " + (isSpecial ? "border-[#c2410c] text-[#c2410c] hover:bg-orange-50" : "border-[#7c3aed] text-[#7c3aed] hover:bg-[#f5f3ff]")}>{t("product.add_to_cart")}</button>
                      <button onClick={(e) => { e.stopPropagation(); buyNow(x.slug, x.name, x.price); }}
                        className={"flex-1 text-white text-xs font-semibold py-2 rounded-xl transition " + (isSpecial ? "bg-[#c2410c] hover:bg-[#b03a09]" : "bg-[#7c3aed] hover:bg-[#6d28d9]")}>{t('product.buy_now', 'Buy Now')}</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
