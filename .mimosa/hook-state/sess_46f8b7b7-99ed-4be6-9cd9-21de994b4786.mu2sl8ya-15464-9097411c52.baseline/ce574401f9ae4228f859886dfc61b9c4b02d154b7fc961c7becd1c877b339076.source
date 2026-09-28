// Terminal product detail — port of redesign-terminal-v3/product*.html:
// KEY ISSUANCE CONSOLE bar, media, price/rating, Add to Cart + Buy Now
// wired to the real cart (cart-sync / checkout-sync), trust items, details.

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct, type SPAProduct } from "../../api/woocommerce";
import { useCart } from "../../data/CartContext";
import { termImg, termRating, termPrice } from "./terminal-data";
import { stripTags } from "../../utils/html";

export default function TerminalProduct() {
  const { slug = "" } = useParams();
  const [product, setProduct] = useState<SPAProduct | null | undefined>(undefined);
  const { addToCart, buyNow } = useCart();

  useEffect(() => {
    let live = true;
    setProduct(undefined);
    fetchProduct(slug)
      .then(p => { if (live) setProduct(p || null); })
      .catch(() => { if (live) setProduct(null); });
    return () => { live = false; };
  }, [slug]);

  if (product === undefined) {
    return (
      <main className="ks-main"><div className="wrap" style={{ padding: "80px 24px" }}>
        <p className="muted ks-mono">QUERYING LICENSE INDEX…</p>
      </div></main>
    );
  }

  if (product === null) {
    return (
      <main className="ks-main"><div className="wrap" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h1 className="h2">License not found</h1>
        <p className="muted" style={{ margin: "12px 0 24px" }}>This SKU is not in the catalog.</p>
        <Link className="btn btn-accent" to="/products">Browse all products</Link>
      </div></main>
    );
  }

  const r = termRating(product.slug);
  const desc = stripTags(String(product.description || "")).trim();

  return (
    <main className="ks-main">
      <div className="wrap kst-wrap">
        <div className="breadcrumb kst-breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/products">Products</Link> <span>/</span> <span>{product.name}</span>
        </div>

        <div className="pdp kst-pdp">
          <div className="pdp-media kst-pdp-media">
            <img src={termImg(product.slug)} alt={product.name} fetchPriority="high" />
            <div className="thumb kst-thumb">
              <span className="on kst-on"><img src={termImg(product.slug)} alt="Front" /></span>
              <span><img src={termImg(product.slug)} alt="Detail" loading="lazy" /></span>
              <span><img src={termImg(product.slug)} alt="Key card" loading="lazy" /></span>
            </div>
          </div>

          <div className="pdp-info kst-pdp-info">
            <div className="st-console-bar kst-st-console-bar"><span>KEY ISSUANCE CONSOLE</span><b>STATUS: VERIFIED</b><i>DELIVERY: 10 MIN</i></div>
            <div className="st-console-keyline kst-st-console-keyline">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</div>
            <div className="st-console-status kst-st-console-status"><span>Channel verified</span><b>PASS</b></div>
            <h1>{product.name}</h1>
            <div className="pdp-price kst-pdp-price">
              <span className="now kst-now">{termPrice(product.price)}</span>
              {product.regularPrice && product.regularPrice > product.price ? (
                <span className="save kst-save">Save {termPrice(product.regularPrice - product.price)}</span>
              ) : (
                <span className="save kst-save">Genuine license</span>
              )}
            </div>
            <div className="pdp-rating kst-pdp-rating">
              <span className="stars kst-stars">{r.stars}</span> {r.score}
              <Link to="/products">({r.count} reviews)</Link>
            </div>
            <p className="pdp-msg kst-pdp-msg"><b>Instant delivery</b> — key emailed within 10 minutes of payment. Works for 1 PC, lifetime activation.</p>

            <div className="pdp-cta kst-pdp-cta">
              <button className="btn btn-primary btn-lg kst-btn kst-btn-primary kst-btn-lg" onClick={() => addToCart(product.slug, product.name, product.price, 1)}>
                Add to Cart - {termPrice(product.price)}
              </button>
              <button className="btn btn-amber btn-lg pdp-buy kst-btn kst-btn-amber kst-btn-lg kst-pdp-buy" onClick={() => buyNow(product.slug, product.name, product.price)}>
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                Buy Now - Get Key in 10 Min
              </button>
            </div>

            <div className="pdp-pay kst-pdp-pay">
              <span>Secure payment:</span>
              <span className="pay-badge kst-pay-badge">VISA</span>
              <span className="pay-badge kst-pay-badge">MASTERCARD</span>
              <span className="pay-badge kst-pay-badge">PAYPAL</span>
              <span className="pay-badge kst-pay-badge">AMEX</span>
            </div>

            <div className="pdp-trust kst-pdp-trust">
              <div className="item kst-item">
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" /></svg>
                <div><b>Secure Checkout</b>SSL encrypted payment</div>
              </div>
              <div className="item kst-item">
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                <div><b>Instant Delivery</b>Within 10 minutes</div>
              </div>
              <div className="item kst-item">
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
                <div><b>Genuine License</b>100% authentic</div>
              </div>
              <div className="item kst-item">
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>
                <div><b>14-Day Refund</b>No activation risk</div>
              </div>
              <div className="item kst-item">
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                <div><b>Activation Success</b>Verified keys</div>
              </div>
              <div className="item kst-item">
                <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <div><b>Lifetime Support</b>Real humans, real answers</div>
              </div>
            </div>
          </div>
        </div>

        {desc && (
          <section className="section tight kst-section kst-tight">
            <span className="eyebrow">Product details</span>
            <h2 className="h2" style={{ marginTop: 8 }}>About this license</h2>
            <p className="lead" style={{ marginTop: 12 }}>{desc}</p>
          </section>
        )}
      </div>
    </main>
  );
}
