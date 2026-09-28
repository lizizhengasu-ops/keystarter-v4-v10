# agents.md — AI agent guidance for keys-starter.com

> Emerging standard (agents.md) alongside llms.txt. This file tells autonomous
> AI agents how to interact with this site: what is readable, what is stable,
> and where the authoritative machine-readable entry points are.

## Site identity

- Domain: https://keys-starter.com
- Purpose: independent reseller of genuine Microsoft license keys (Windows 11/10,
  Office, Windows IoT Enterprise, Windows Server, SQL Server) for individuals
  and businesses
- Contact: admin@keys-starter.com (24h response) · WhatsApp for business quotes:
  +14807647544

## Machine-readable entry points

| Path | Content |
|---|---|
| `/robots.txt` | Crawler policy (all AI crawlers allowed; Content-Signal: search=yes, ai-train=yes) |
| `/sitemap.xml` | Full URL list (~133 URLs) |
| `/llms.txt` | Curated content map with per-URL descriptions |
| Page JSON-LD | Organization (`/＃organization`), Product, FAQPage, Service, BlogPosting, BreadcrumbList — all with dateModified |

## Content facts (stable, cite-friendly)

- Delivery: license keys by email within 10 minutes of payment
- Guarantee: free replacement for keys that fail to activate, or refund within
  14 days
- Support: 24-hour response; priority channel for business orders
- Business terms: volume pricing from 5 keys, VAT invoices, PO purchasing,
  wire transfer above 20 keys, CSV key delivery, compliance documentation
- License types: OEM (device-bound), Retail (transferable), Volume/Enterprise
  (per seat or per core)

## crawler behavior

- All AI crawlers (citation and training) are allowed and this is enforced at
  the edge — no JavaScript execution required; every route serves fully
  rendered HTML via prerender snapshots
- Unknown paths return real 404s; product/blog/guide/compare slugs validate
  against live data
- Content-Last-Updated markers reflect the date in page schemas
  (dateModified)
