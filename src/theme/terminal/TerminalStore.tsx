// Terminal store page — port of redesign-terminal-v3/products.html:
// filter chips, live sort, full-catalog grid and the edition compare table.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type SPAProduct } from "../../api/woocommerce";
import { useCart } from "../../data/CartContext";
import { termImg, termCat, termRating, termPrice, termBadge, termFeaturedRank } from "./terminal-data";

type Bucket = "all" | "windows" | "office" | "server" | "iot";
type Sort = "featured" | "asc" | "desc";

export default function TerminalStore() {
  const [products, setProducts] = useState<SPAProduct[] | null>(null);
  const [filter, setFilter] = useState<Bucket>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const { addToCart, buyNow } = useCart();

  useEffect(() => {
    let live = true;
    fetchProducts().then(p => { if (live) setProducts(p); }).catch(() => { if (live) setProducts([]); });
    return () => { live = false; };
  }, []);

  const visible = useMemo(() => {
    let list = (products || []).map(p => ({ p, cat: termCat(p.slug, p.category) }));
    if (filter !== "all") list = list.filter(x => x.cat === filter);
    if (sort === "asc") list.sort((a, b) => a.p.price - b.p.price);
    if (sort === "desc") list.sort((a, b) => b.p.price - a.p.price);
    if (sort === "featured") list.sort((a, b) => termFeaturedRank(a.p.slug) - termFeaturedRank(b.p.slug));
    return list;
  }, [products, filter, sort]);

  return (
    <main className="ks-main">
      <div className="wrap">
        <div className="breadcrumb"><Link to="/">Home</Link> <span>/</span> <span>Products</span></div>
        <div className="section-head" style={{ marginTop: 14 }}>
          <div>
            <span className="eyebrow">Genuine licenses</span>
            <h1 className="h2" style={{ marginTop: 10 }}>All Products</h1>
            <p style={{ marginTop: 8 }}>Every key verified before sale, delivered to your inbox in minutes, backed by a 14-day refund.</p>
          </div>
        </div>

        <div className="filter-bar">
          {(["all", "windows", "office", "server", "iot"] as Bucket[]).map(b => (
            <button key={b} className={"chip" + (filter === b ? " on" : "")} onClick={() => setFilter(b)} type="button">
              {b === "all" ? "All" : b === "server" ? "Server / SQL" : b === "iot" ? "IoT" : b[0].toUpperCase() + b.slice(1)}
            </button>
          ))}
          <span className="count">{products ? `${visible.length} products` : "Loading…"}</span>
          <select aria-label="Sort" value={sort} onChange={e => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="prod-grid" id="product-grid">
          {visible.map(({ p, cat }) => {
            const r = termRating(p.slug);
            return (
              <article className="prod-card" key={p.slug}>
                <div className="img">
                  <span className="badge">{termBadge(cat)}</span>
                  <img src={termImg(p.slug)} alt={p.name} loading="lazy" />
                </div>
                <h3><Link to={"/product/" + p.slug}>{p.name}</Link></h3>
                <div className="rating"><span className="stars">{r.stars}</span> {r.score} ({r.count})</div>
                <div className="prices"><b>{termPrice(p.price)}</b></div>
                <div className="actions">
                  <button className="btn btn-primary" onClick={() => addToCart(p.slug, p.name, p.price, 1)}>Add to Cart</button>
                  <button className="btn btn-amber" onClick={() => buyNow(p.slug, p.name, p.price)}>Buy Now</button>
                </div>
              </article>
            );
          })}
        </div>

        <section className="section" id="compare">
          <div className="section-head">
            <div>
              <span className="eyebrow">Compare editions</span>
              <h2 className="h2" style={{ marginTop: 10 }}>Windows 11 Pro vs Home vs IoT</h2>
              <p style={{ marginTop: 8 }}>Pick the right edition for your device or deployment.</p>
            </div>
          </div>
          <div className="compare-table">
            <table>
              <thead><tr><th>Capability</th><th>Windows 11 Pro</th><th>Windows 11 Home</th><th>Windows 11 IoT Enterprise</th></tr></thead>
              <tbody>
                <tr><td>BitLocker device encryption</td><td>Yes</td><td>No</td><td>Yes</td></tr>
                <tr><td>Remote Desktop host</td><td>Yes</td><td>No</td><td>Yes</td></tr>
                <tr><td>Hyper-V / WSL2</td><td>Yes</td><td>No</td><td>Yes</td></tr>
                <tr><td>LTSC 10-year lifecycle</td><td>No</td><td>No</td><td>Yes</td></tr>
                <tr><td>Kiosk / signage mode</td><td>Limited</td><td>No</td><td>Yes</td></tr>
                <tr><td>Best for</td><td>Business laptops</td><td>Personal use</td><td>Embedded / industrial</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
