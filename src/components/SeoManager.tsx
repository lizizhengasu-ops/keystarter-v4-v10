import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/products";

const SITE = "https://keys-starter.com";
const SITE_NAME = "KeyStarter";
const FALLBACK_TITLE = "KeyStarter — Genuine Software Licenses";
const FALLBACK_DESC =
  "Buy genuine Windows 11/10 Pro, Office, IoT and Server license keys at KeyStarter. Instant email delivery, lifetime support, secure checkout.";

interface PageMeta {
  title: string;
  description: string;
}

const ROUTE_META: Record<string, PageMeta> = {
  "/": { title: FALLBACK_TITLE, description: FALLBACK_DESC },
  "/products": {
    title: "All Products — Genuine Windows, Office, IoT & Server Keys",
    description:
      "Browse genuine Windows 11/10, Office 2019/2021, IoT and Server license keys with instant delivery, lifetime support and secure checkout.",
  },
  "/blog": {
    title: "Blog — KeyStarter",
    description:
      "Guides and updates from KeyStarter about Windows, Office and software licensing.",
  },
  "/b2b": {
    title: "B2B & Bulk Licensing — KeyStarter",
    description:
      "Bulk and business licensing for Windows, Office, IoT and Server keys with dedicated support.",
  },
  "/about": {
    title: "About KeyStarter",
    description:
      "KeyStarter provides genuine Microsoft license keys with instant delivery and lifetime support.",
  },
  "/support": {
    title: "Support — KeyStarter",
    description:
      "Get help with your KeyStarter order, activation and licensing questions.",
  },
  "/faq": {
    title: "FAQ — KeyStarter",
    description:
      "Answers to common questions about KeyStarter license keys, delivery and activation.",
  },
  "/contact": {
    title: "Contact — KeyStarter",
    description: "Contact KeyStarter support for order and licensing questions.",
  },
  "/account": {
    title: "My Account — KeyStarter",
    description: "Manage your KeyStarter orders and licenses.",
  },
  "/cart": {
    title: "Cart — KeyStarter",
    description: "Review your KeyStarter cart and check out securely.",
  },
  "/privacy": {
    title: "Privacy Policy — KeyStarter",
    description: "How KeyStarter collects and protects your personal information.",
  },
  "/terms": {
    title: "Terms & Conditions — KeyStarter",
    description: "The terms governing your use of KeyStarter and its services.",
  },
  "/refund": {
    title: "Refund Policy — KeyStarter",
    description: "KeyStarter offers a 14-day refund policy on eligible orders.",
  },
  "/cookies": {
    title: "Cookie Policy — KeyStarter",
    description: "How KeyStarter uses cookies on its website.",
  },
  "/disclaimer": {
    title: "Disclaimer — KeyStarter",
    description: "Legal disclaimer for KeyStarter product listings and services.",
  },
  "/licensing": {
    title: "Licensing Information — KeyStarter",
    description:
      "Licensing details for Windows, Office, IoT and Server products at KeyStarter.",
  },
  "/changelog": {
    title: "Changelog — KeyStarter",
    description: "Recent updates and improvements to the KeyStarter website.",
  },
};

const NOT_FOUND_META: PageMeta = {
  title: "Page Not Found — KeyStarter",
  description: FALLBACK_DESC,
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(data: object | null) {
  // Single owner of structured data: drop any JSON-LD injected by the edge
  // Worker or a previous route before appending the current block.
  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((el) => el.remove());
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "seo-jsonld";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE,
};

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const product =
      path.startsWith("/product/") && path.length > "/product/".length
        ? products.find((p) => p.slug === path.slice("/product/".length))
        : undefined;
    const blogArticle = path.startsWith("/blog/") && path.length > "/blog/".length;
    const meta = product
      ? { title: `${product.n} — ${SITE_NAME}`, description: `${product.d} - ${product.specs.version}, ${product.specs.type}. Instant delivery with lifetime support.` }
      : blogArticle
        ? ROUTE_META["/blog"]
        : ROUTE_META[path] ?? NOT_FOUND_META;

    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    setCanonical(`${SITE}${path}`);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", `${SITE}${path}`);
    upsertMeta("property", "og:type", product ? "product" : "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);

    let jsonLd: object | null = null;
    if (path === "/") {
      jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          ORG_JSONLD,
          { "@type": "WebSite", name: SITE_NAME, url: SITE },
        ],
      };
    } else if (product) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.n,
        description: meta.description,
        brand: { "@type": "Brand", name: "Microsoft" },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: `${SITE}/product/${product.slug}`,
          // Price intentionally omitted: WooCommerce is the single source of truth.
        },
      };
    } else {
      jsonLd = ORG_JSONLD;
    }
    setJsonLd(jsonLd);
  }, [pathname]);

  return null;
}
