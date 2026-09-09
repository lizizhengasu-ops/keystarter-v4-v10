# KeyStarter Console v5 - CONSOLE STYLE REBUILD

## 版本命名
- 产品名：**KeyStarter Console v5**
- 风格代号：Console（Merchant Console 授权台账）
- 按 **replica-kit v2.x / design-differentiation v2.x** 全量重建；保留全部 21 个页面与全部功能组件；本地预览，禁止移植生产前台。

## Design Read
Design Read：Reading this as a license operations console: tables as interface, order ledger, statuses, invoices, compliance and instant issue.
Dials：VARIANCE 6 / MOTION 4 / DENSITY 5

## 趋势研究（2025-2026）
- Paddle / FastSpring：结算 + 发 key 是核心界面，交易与授权台账天然适配激活码品类。来源：developer.paddle.com/get-started/how-paddle-works/digital-products、casestudies.com/company/paddle
- Stripe Precision：表格即界面、单强调色、严格间距。来源：opendesigner.io/de/blog/recreating-stripe-linear-vercel-design-systems-with-design-md、adminlte.io/blog/saas-dashboard-design-examples
- Editorial Quiet Luxury / Prestige / Sense：编辑式对页、衬线、非对称留白。来源：unfoldmart.com/blogs/shopify-development-luxury-premium-brands、debutify.com/blog/the-best-free-shopify-themes、commercerank.ai/guides/themes/dawn-vs-prestige
- Trust 数据：Baymard 结算信任缺口可提升转化最高 35.26%；支付徽章和退款策略徽章最有效。来源：logoswebdesigns.com/blog/website-trust-signals-that-drive-conversions-2026、wiserreview.com/blog/trust-badges-ecommerce

## 候选方向与推荐
1. Merchant Console：把授权变成运营台账。优点：品类契合、识别度高；风险：需保留营销叙事。
2. Editorial Quiet Luxury：杂志式对页。优点：高级感强、不撞卡模板；风险：需全站统一编辑语言。
3. Stripe Precision：B2B 信任。优点：克制专业；风险：做不好显冷。
4. Apple Cinematic：滚动叙事。优点：高级；风险：需要大量产品素材。
推荐：Console + Editorial 组合 —— 一个解决“可审计、可信赖”，一个解决“值得等待、有格调”。

## 调色板轮换
- Console：Green #008060 + White + Graphite；Editorial：Oxblood #e5484d + Stone White + Graphite；避开 beige+brass 默认。

## 卡片形态
- Console：index-rows / spec-grid；Editorial：portrait-wall / prescription-slips；与 data-layout-model 一致。

## Chrome 签名
- Console：SYSTEM ONLINE 状态徽章 + ISSUE / 搜索 + License queue；Editorial：居中编辑导航 + FIND / 搜索 + Selected licenses。

## 工艺签名
- Console：console-wave（授权控制台波形 SVG）+ issue-flow；Editorial：editorial-rule（对页分隔线 SVG）+ issue-flow。

## GitHub 组件登记表
| 组件 | 来源 | 许可证 | 状态 | 用途 |
|---|---|---|---|---|
| HyperUI product-cards | github.com/markmead/hyperui | MIT | 使用 | 商品卡/台账行基底 |
| MagicUI Marquee | github.com/magicuidesign/magicui | MIT | 使用 | 新品/优惠滚动节奏 |
| vivus.js | github.com/maxwellito/vivus | MIT | 借鉴 | 交付步骤描线 |

## impeccable critique
impeccable critique 结论：Console 的台账/控制台语言让授权、订单、发票成为视觉主体，信任要素直接落在买点；全部子页面独立重构。

## 骨架差异
- Console：Hero → trust strip → Best → New → Ecosystem → Order ledger → Support → Reviews → Journal → Trust → Newsletter
- 全部 21 个页面均由 v5 生成器独立构建，不沿用 v3/v4 共享模板。

## 反套路 pre-flight
- 不使用 AI 紫渐变默认、不叠玻璃拟态、不用 Inter+slate 默认、不三张等宽卡、按钮对比度达标、单一强调色、统一圆角、无 em-dash、素材真实非纯色、移动端无横向溢出；已按 anti-cliche-checklist.md 核对并记录。

## CSS 裁剪
- style.css 已裁剪至 ≤45KB 目标并跑 check-css-coverage.js --strict；refined.css 只留占位。

## 占位内容
- 评价与案例数字为占位；支付徽章、销量、Partner 状态以真实统计为准；结算/登录/表单为 Demo。
