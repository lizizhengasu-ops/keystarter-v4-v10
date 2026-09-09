# KeyStarter Lumina v4 - LUMINA STYLE REBUILD

## 版本命名
- 产品名：**KeyStarter Lumina v4**
- 风格代号：Lumina（Lumina 编辑式精密极简）
- 按 **replica-kit v2.x / design-differentiation v2.x** 全量重建；保留全部 21 个页面与全部功能组件。

## Design Read
Design Read：Reading this as a product-focus editorial storefront in the Apple register: one product story, huge serif display, generous negative space, restrained blue action color.
Dials：VARIANCE 7 / MOTION 5 / DENSITY 2

## 趋势研究（2025-2026）
- Shopify Commerce：白底 + 绿 #008060 + 信任徽章前置到买点/结算处。来源：thatnerdstudio.com/how-to-design-a-shopify-store-that-converts-a-us-brands-guide、ecommerceparadise.com/best-trust-badges-for-shopify、shopify.com/hk-en/enterprise/blog/you-have-1-20th-of-a-second-does-your-site-gain-trust-in-time
- Apple Editorial：蓝 #0071e3 + 大字号 + 强留白 + 负字距。来源：github.com/educlopez/design-bites、superdesign.dev/blog/apple-design-system
- Luxury Minimalism / Quiet Luxury（2026）：halothemes.net/blogs/shopify/ecommerce-design-trends-2026-luxury-minimalism-ai
- Slow Commerce / 性能即奢侈品信号：shopify.com/ie/blog/ux-design-trends

## 候选方向与推荐
1. Shopify Commerce：转化清晰、信任强；风险是易成标准模板，用台账行/横向轨道拉开。
2. Apple Editorial：精密、留白、品牌独特；风险是大画幅需要高质量产品摄影。
3. Quiet Luxury：克制、高级；风险是克制过头显空。
4. Dark Terminal：技术感强但与浅色电商信任冲突，不采用。
推荐：Lumina（Apple 编辑式精密极简） —— 一个解决“立刻可买、看得见保障”，一个解决“正版、精密、值得等待”。

## 调色板轮换
- 家族：Blue #0071e3 + White + Graphite + Bodoni serif；避开 beige+brass 默认。

## 卡片形态
- cardVariant：masonry / lookbook-frame；与 data-layout-model 的 PRODUCT 声明一致。

## Chrome 签名
- 搜索：FIND / 输入条 + 留白面板；购物车：Product stage 抽屉。

## 工艺签名
- lumina-grid（Hero 拼贴网格 SVG）+ issue-flow（Trust 区授权发行蓝图 SVG）：data-craft 手写内联 SVG。

## GitHub 组件登记表
| 组件 | 来源 | 许可证 | 状态 | 用途 |
|---|---|---|---|---|
| HyperUI product-cards | github.com/markmead/hyperui | MIT | 使用 | 商品卡/台账行基底 |
| MagicUI Marquee | github.com/magicuidesign/magicui | MIT | 使用 | 新品/优惠滚动节奏 |
| vivus.js | github.com/maxwellito/vivus | MIT | 借鉴 | 交付步骤描线 |

## impeccable critique
impeccable critique 结论：Lumina 的 Bodoni 衬线大标题 + 拼贴 Hero 形成编辑级品牌记忆；全部子页面按风格独立重构。

## 骨架差异
- Lumina：Hero → trust strip → Ecosystem → Best → New → Featured → Compare spec → Reviews → Journal → Trust → Newsletter → Support
- 全部 21 个页面均由本生成器独立构建，不沿用共享功能模板。

## 反套路 pre-flight
- 不使用 AI 紫渐变默认、不叠玻璃拟态、不用 Inter+slate 默认、不三张等宽卡、按钮对比度达标、单一强调色、统一圆角、无 em-dash、素材真实非纯色、移动端无横向溢出；已按 anti-cliche-checklist.md 核对并记录。

## CSS 裁剪
- style.css 已裁剪至 ≤45KB 目标并跑 check-css-coverage.js --strict；refined.css 只留占位。

## 占位内容
- 评价与案例数字为占位；支付徽章、销量、Partner 状态以真实统计为准；结算/登录/表单为 Demo。
