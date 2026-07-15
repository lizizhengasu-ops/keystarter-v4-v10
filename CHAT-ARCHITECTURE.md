# ChatBot V2 — Comprehensive Architecture Report

Date: 2026-07-10T17-41-52-423Z

---

## Part 1: Analysis of User Feedback

### Issue: Renewal Banner in Chat Widget

User feedback: The renewal banner ("Expires in 8 days") should NOT appear in the chat widget.

Corrected design:
- The chat widget is for END USERS (website visitors). They should never see billing/subscription info.
- The renewal banner belongs in the TENANT PORTAL (client dashboard).
- When a tenant logs into their portal, they see their subscription status and renewal prompts.
- The chat widget = purely customer-facing. The portal = client-facing.

### Issue: Tenant Selector Visibility

User feedback: The tenant selector dropdown should never be visible to end users or clients.

Corrected design:
- Only the ADMIN (you) can see and use the tenant selector.
- In the preview demo, it is hidden behind a 5-click activation on the header.
- In production, the admin panel has a tenant switcher; the client portal has none.

---

## Part 2: GitHub Research for V2

### Searched: admin panel, client portal, SaaS dashboard, subscription management

| Project | Stars | Language | What It Provides |
|---------|-------|----------|------------------|
| Payload CMS | 43,500 | TypeScript | Full admin panel framework. Reference for admin UI patterns, RBAC, CRUD. |
| ILLA Builder | 12,288 | TypeScript | Low-code admin panel builder. Reference for dashboard design, data bindings. |
| MatDash | 13 | TypeScript | Free Next.js admin dashboard template. Ready-to-use components. |
| sfSaas | 1 | TypeScript | Complete SaaS starter kit: admin panel, user dashboard, subscriptions, payments. |
| saas-admin-billing-dashboard | 0 | TypeScript | SaaS billing admin with RBAC, Kanban, analytics charts. |
| meterstack | 0 | TypeScript | Multi-tenant SaaS billing and metering platform. |
| SynX | 0 | TypeScript | Multi-tenant SaaS: admin panels, membership portals, super-admin dashboard. |

### WonderAvenues (AI-chatbot-SaaS) — Direct Reference
This project has EXACTLY the three-layer architecture we need:

| Layer | Name | Purpose |
|-------|------|---------|
| 1 | AI Chatbot Widget | Embeddable chat bubble, Shadow DOM, RAG pipeline |
| 2 | Client Portal | Per-tenant dashboard: leads, conversations, analytics, chatbot config |
| 3 | Admin Panel | Onboard tenants, manage portal users, monitor platform |

Their Client Portal includes: Dashboard, Leads, Lead Detail, Inbox, Analytics, Chatbot Config, Notifications, Settings, Tools.
Their Admin Panel includes: Create/manage tenants, portal user management, master analytics.
Every tenant isolated at database query level via tenant_id filter.

---

## Part 3: V2 Three-Portal Architecture

### Portal Structure

```
+---------------------------+
| Portal 1: Admin Portal    |  <-- YOU only
| admin.YOUR-DOMAIN.com     |
| - All tenants             |
| - Full management         |
| - Tenant switcher         |
| - Billing/revenue view    |
| - Global analytics        |
| - System config           |
+---------------------------+

+---------------------------+
| Portal 2: Tenant Portal   |  <-- PAYING CLIENTS only
| dashboard.YOUR-DOMAIN.com |
| - Login required          |
| - Subscription status     |  <-- RENEWAL BANNER HERE
| - Usage stats             |
| - KB management           |
| - Widget config           |
| - Chat transcripts        |
| - Billing/invoices        |
| - Own analytics           |
+---------------------------+

+---------------------------+
| Portal 3: Chat Widget     |  <-- END USERS (no login)
| client's website          |
| - Just the chat bubble    |
| - No tenant concept       |
| - No billing info         |
| - No admin features       |
| - One script tag view     |
+---------------------------+
```

### How Login Works

Tenant Portal login flow:
1. Client creates account (or admin creates for them) during Stripe checkout
2. Client receives email with portal credentials
3. Client logs in at dashboard.YOUR-DOMAIN.com
4. Sees their subscription card at the top of the dashboard
5. If expiring within 10 days: prominent banner + countdown + Renew button
6. Can manage KB, customize widget, view analytics

Admin Portal login flow:
1. Only you have admin credentials
2. Login at admin.YOUR-DOMAIN.com
3. Tenant switcher in sidebar to manage any tenant
4. Full CRUD for tenants, KBs, subscriptions

---

## Part 4: Tenant Portal Detailed Design

### Pages

| Page | Content | GitHub Reference |
|------|---------|------------------|
| Login | Email + password. Reset password. | Payload CMS auth patterns |
| Dashboard | Subscription card (status, days left, renewal banner), usage stats this month, quick actions | MatDash, sfSaas |
| Knowledge Base | Upload products.json, faq.json, policies. Preview current KB. Version history. | WonderAvenues |
| Widget Config | Color picker, position selector, welcome message, avatar upload. Live preview. | WonderAvenues, MatDash |
| Billing | Current plan, payment history, invoice download. Upgrade/downgrade button. | saas-admin-billing |
| Analytics | Chat volume chart, top questions, conversion rate. Time range filter. | ILLA Builder, WonderAvenues |
| Settings | Profile, password change, notification preferences. | Payload CMS |

### Dashboard Wireframe (Text)

```
+----------------------------------------------------------+
| Tenant Portal: Acme Corp                    [Logout]      |
+----------------------------------------------------------+
| [SUBSCRIPTION]  Active  |  Expires in 18 days             |
| [============........]  60% used  |  [Renew Now]          |
+----------------------------------------------------------+
| Stats: 142 chats this month | 89% answered | 12 leads     |
+----------------------------------------------------------+
| [KB Management]  [Widget Config]  [Analytics]  [Billing]  |
+----------------------------------------------------------+
```

---

## Part 5: Admin Portal Detailed Design

| Page | Content |
|------|---------|
| Dashboard | Total tenants, active subscriptions, MRR, chats today |
| Tenants | List all tenants: name, domain, plan, status, expiry. Click to manage. |
| Tenant Detail | Full per-tenant: config, KB, billing, analytics, chat logs. |
| Billing | All subscriptions, revenue chart, failed payments, Stripe dashboard link |
| Analytics | Cross-tenant metrics, popular questions, system health |
| Settings | AI model selection, pricing tiers, global widget defaults |

---

## Part 6: Updated Architecture Rules

| Rule | V1 | V2 |
|------|----|----|
| Renewal banner | In chat widget | In TENANT PORTAL dashboard only |
| Tenant selector | Visible in widget header | Hidden behind admin activation (5 clicks) |
| Client view | Single chat widget | Own portal (dashboard.*.com) + own widget |
| End user view | Chat widget | Chat widget only - no billing/tenant info |
| Admin access | Implicit | Dedicated admin portal (admin.*.com) |
| KB isolation | Directory-based | Directory + Qdrant + Portal-level isolation |

---

## Part 7: Integration with Keystarter Site

### Current State
- keystarter.com has: React SPA frontend, WordPress + WooCommerce backend
- The chat service will be a NEW service on the same VPS (port 3002)
- The Tenant Portal will be a NEW React SPA (dashboard.keystarter.com)
- The Admin Portal will be a NEW React SPA (admin.keystarter.com)

### Tenant Accounts vs Store Accounts
- Keystarter.com WooCommerce accounts = for BUYING products
- Tenant Portal accounts = for chatbot CLIENTS (website owners who paid for the bot)
- These are COMPLETELY SEPARATE systems with no shared auth
- A person can have both a WooCommerce account and a Tenant Portal account
- Tenant accounts are NOT created via WooCommerce registration

### DNS Setup
- dashboard.YOUR-DOMAIN.com -> points to same VPS, proxied by nginx
- admin.YOUR-DOMAIN.com -> points to same VPS, proxied by nginx
- chat.YOUR-DOMAIN.com -> points to same VPS, proxied by nginx (for widget script)

---

## Part 8: GitHub Projects We Will Reference for V2

| Project | Use |
|---------|-----|
| Payload CMS (43k⭐) | Admin panel UI patterns, RBAC, CRUD structure |
| ILLA Builder (12k⭐) | Low-code dashboard design patterns |
| MatDash (13⭐) | React admin dashboard template, reusable components |
| WonderAvenues (3⭐) | Client portal patterns: dashboard, analytics, chatbot config, KB management |
| sfSaas (1⭐) | SaaS starter structure: admin + user dashboard + subscriptions |
| saas-admin-billing (0⭐) | Billing dashboard with RBAC and Kanban |
| meterstack (0⭐) | Multi-tenant billing and quota management |
| VectraAI (2⭐) | Local LLM + Stripe + BullMQ reference |
| SaaS Chatbot (4⭐) | Per-tenant Qdrant collection isolation |

---

## Part 9: Updated Effort Estimate

| Component | Lines | Time | Notes |
|-----------|-------|------|-------|
| Chat Widget (embed) | ~200 | 4h | Same as V1 |
| Master Process | ~150 | 3h | Same as V1 |
| Worker Template | ~150 | 3h | Same as V1 |
| Auth (HMAC + JWT) | ~80 | 2h | Same as V1 |
| Billing (Stripe + cron) | ~120 | 3h | Same as V1 |
| RAG Integration | ~100 | 2h | Same as V1 |
| Tenant Portal (NEW) | ~500 | 10h | Login, dashboard, KB management, widget config, billing, analytics |
| Admin Portal (NEW) | ~400 | 8h | Tenant list, detail, billing overview, global analytics |
| **Total V2** | **~1,700** | **~35h (5 days)** | Portal development is the main addition |

---

## Part 10: Key Decisions for V2

| Decision | V2 Answer | Why |
|----------|-----------|-----|
| Where does renewal banner show? | Tenant Portal dashboard | End users should never see billing |
| Tenant Portal stack? | React SPA (same as main keystarter) | Consistent tech, shared components |
| Admin Portal stack? | React SPA (separate) | Different audience, different features |
| Tenant login? | Email + password (separate from WooCommerce) | Different user base, different purpose |
| Portal subdomains? | dashboard.*, admin.* | Clean separation, nginx routing |
| Client onboarding? | Stripe checkout -> auto-create tenant + send portal credentials | Fully automated |
| Ref architecture? | WonderAvenues (portal patterns) + Payload CMS (admin UI) + MatDash (templates) | Proven patterns from established projects |

---

## Part 11: Summary of Changes from V1 to V2

1. **Renewal banner moved** from chat widget to Tenant Portal dashboard
2. **Three-portal architecture** formalized (Admin / Tenant / Widget)
3. **Tenant Portal** added: login, subscription dashboard, KB management, analytics
4. **Admin Portal** added: tenant list, management, billing overview
5. **Client login** separated from WooCommerce accounts
6. **GitHub research expanded** with 7 new projects for portal patterns
7. **Effort estimate updated**: ~35 hours total (5 days) vs ~23 hours for V1

---

## Part 12: Quick Reference

KB entry: C:/Users/31961/.codex/memories/extensions/ad_hoc/notes/chatbotv2-2026-07-10T17-41-52-423Z.md
Architecture doc: C:/Users/31961/Documents/microsoft web/_projects/keystarter-v4/CHAT-ARCHITECTURE.md
HTML preview: C:/Users/31961/Documents/microsoft web/_projects/keystarter-v4/CHATBOT-V1-ARCHITECTURE.html

Reference repos:
- github.com/payloadcms/payload
- github.com/illacloud/illa-builder
- github.com/adminmart/MatDash-Nextjs-free
- github.com/fbenmadani/sfsaas
- github.com/Sai-Srujan-seelam/AI-chatbot-SaaS
- github.com/HamidMbairik/VectraAI
- github.com/shrirajnaik04/saas-chatbot
- github.com/amira-mhmd-ml/Enterprise-MultiTenant-RAG