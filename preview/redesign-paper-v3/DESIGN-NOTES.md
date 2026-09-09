# KeyStarter Paper v3.0 - PAPER STYLE REBUILD

## 版本命名
- 产品名：**KeyStarter Paper v3.0**
- 风格代号：Paper（Stripe-style paper/slate minimal）
- 按 **replica-kit-v2.0 / v2.0-design-differentiation** 全量重建；保留全部 21 个页面与全部功能组件。

## Design Read
Design Read：Reading this as a high-trust authorized Microsoft license storefront with a Stripe-like light paper + indigo language, leaning toward Plus Jakarta Sans + IBM Plex Mono + indigo.
Dials：VARIANCE 4 / MOTION 3 / DENSITY 5.

## 趋势研究（2026）
- Stripe Design Bites：极简单 CTA、1080-1200px、小圆角、大标题、强留白。
- SaaS Hero 2026 / Alphonso Labs：Premium Minimal、高对比深色面板、单一 CTA。
- Elogic Shopify Design / saasui.design / mediaplusdigital ui trends：2026 B2B 极简单 CTA + 社交证明。
- 来源：stripe.com/design、saasui.design、elogic.co、mediaplusdigital.com

## 候选方向与推荐
1. Stripe Paper（浅色高级简约）：Stripe 式 paper/slate + indigo，适合个人 + 小企业。优点：高信任、留白强、转化清晰；风险：浅色 SaaS 模板感需用工艺 SVG 和台账商品卡拉开。
2. Linear Terminal（深色技术控制台）：Linear/Stripe 深色 + 终端/遥测，适合开发者/企业采购。优点：原创性强、技术品牌契合；风险：深色必须保持可读性和图片一致性。
推荐：Stripe Paper —— 为什么最适配：科技巨头式高级简约对软件授权品类天然建立信任，浅色纸感 + 发行控制台把“正版、即时、可验证”变成视觉语言。

## 调色板轮换
- 家族：Indigo + Paper；依据 palette-rotation.md 选未被最近 3 站使用家族，避开 beige+brass 默认。

## 卡片形态
- cardVariant：monolith-rows / blueprint-grid；与 data-layout-model 的 PRODUCT 声明一致。

## Chrome 签名
- 搜索：SEARCH / 规格索引式输入 + 浅色纸面板。
- 购物车：License tray 抽屉。
- 年龄门/聊天：保留品牌化标准件。

## 工艺签名
- paper-grid（Hero 发行控制台 + 折线 SVG）：data-craft 手写内联 SVG。
- issue-flow（Trust 区授权发行蓝图 SVG）：data-craft 手写内联 SVG。

## GitHub 组件登记表
| 组件 | 来源 | 许可证 | 状态 | 用途 |
|---|---|---|---|---|
| HyperUI product-cards | github.com/markmead/hyperui | MIT | 使用 | 商品卡/台账行基底 |
| MagicUI Marquee | github.com/magicuidesign/magicui | MIT | 使用 | 新品/优惠滚动节奏 |
| vivus.js | github.com/maxwellito/vivus | MIT | 借鉴 | 交付步骤描线 |
| ScrollReveal | github.com/jlmakes/scrollreveal | GPL-3.0 | 拒绝 | 传染性许可证，用 IntersectionObserver 替代 |

## impeccable critique
impeccable critique 结论：Paper 的浅色纸感 + indigo 克制高级，台账商品行和蓝图新品卡结构清晰；低频子页面保留功能模板，视觉由新主题统一。

## 反套路 pre-flight
- 不使用 AI 紫渐变默认、不叠玻璃拟态、不用 Inter+slate 默认、不三张等宽卡、按钮对比度达标、单一强调色、统一圆角、无 em-dash、无编号眉题滥用、素材真实非纯色、移动端无横向溢出；已按 anti-cliche-checklist.md 核对并记录。

## CSS 裁剪
- style.css 已裁剪至 ≤40KB 目标并跑 check-css-coverage.js --strict（体积/类覆盖/他站前缀三查）；refined.css 只留占位。

## 占位内容
- 评价与案例数字为占位；支付徽章、销量、Partner 状态以真实统计为准；结算/登录/表单为 Demo。
