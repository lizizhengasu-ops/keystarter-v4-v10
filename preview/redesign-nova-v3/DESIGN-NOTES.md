# KeyStarter Nova v3.0 - NOVA STYLE REBUILD

## 版本命名
- 产品名：**KeyStarter Nova v3.0**
- 风格代号：Nova（Shopify 高级电商极简）
- 按 **replica-kit-v2.0 / v2.0-design-differentiation** 全量重建；保留全部 21 个页面与全部功能组件。

## Design Read
Design Read：High-trust licensed software storefront with a Shopify-grade commerce language: white space, clear price hierarchy, trust badges at point of sale, and fast add-to-cart.
Dials：VARIANCE 5 / MOTION 4 / DENSITY 4

## 趋势研究（2025-2026）
- Shopify Enterprise Trust：付款徽章、退款、物流等信任元素放在买点与结算处，而非只放 footer；桌面 section 间距 64-80px、移动 40-48px；正文列宽 600-800px；CTA 四周 32-48px。
- Apple.com Design Bites：纯白底、近黑 #1d1d1f、蓝 #0066CC 只用于行动点；display 行高 0.98-1.2，正文行高 1.47；8pt 网格；留白是材质。
- Shopify/Apple 动效研究：商品卡 hover 放大/快速加购/滚动 reveal；Apple 用 ScrollTrigger 做滚动叙事与产品悬浮。
- 来源：github.com/educlopez/design-bites、superdesign.dev/blog/apple-design-system、fudge.ai/guides/add-trust-badges-to-shopify、easyappsecom.com/guides/shopify-store-design-best-practices

## 候选方向与推荐
1. Shopify Commerce：白底 + 绿 #008060 + 信任徽章前置。优点：转化路径清晰、信任感强；风险：需要避免“标准电商模板”，用台账行/横向轨道拉开。
2. Apple Editorial：纯白 + 蓝 #0066CC + 大字号单一叙事。优点：精密、留白强、品牌独特；风险：产品图如果不够精修会撑不起大画幅，需用拱门舞台与手稿网格补足。
3. Stripe Precision：纸感浅灰 + indigo。优点：高级简约；风险：已在上批站点使用，本期必须换温度。
4. Linear Terminal：深色遥测。优点：技术感强；风险：用户本轮明确要求高级简约浅色信任感，深色与电商转化冲突。
推荐：Shopify Commerce —— 为什么最适配：Shopify 把“信任徽章 + 价格层级 + 快速加购”放在买点与结算处，对软件授权品类天然建立转化与信任。

## 调色板轮换
- 家族：Green #008060 + White + Graphite（未命中最近 3 站，避开 beige+brass 默认）；依据 palette-rotation.md 选未被最近 3 站使用家族，避开 beige+brass 默认。

## 卡片形态
- cardVariant：table-ledger / horizontal-rail；与 data-layout-model 的 PRODUCT 声明一致。

## Chrome 签名
- 搜索：搜索：'Search licenses /' 输入条 + 浅色商务面板；购物车：License checkout 托盘。
- 年龄门/聊天：保留品牌化标准件。

## 工艺签名
- nova-rail（Hero 授权台账波形 SVG）+ issue-flow（Trust 区授权发行蓝图 SVG）：data-craft 手写内联 SVG。

## GitHub 组件登记表
| 组件 | 来源 | 许可证 | 状态 | 用途 |
|---|---|---|---|---|
| HyperUI product-cards | github.com/markmead/hyperui | MIT | 使用 | 商品卡/台账行基底 |
| MagicUI Marquee | github.com/magicuidesign/magicui | MIT | 使用 | 新品/优惠滚动节奏 |
| vivus.js | github.com/maxwellito/vivus | MIT | 借鉴 | 交付步骤描线 |
| ScrollReveal | github.com/jlmakes/scrollreveal | GPL-3.0 | 拒绝 | 传染性许可证，用 IntersectionObserver 替代 |

## impeccable critique
impeccable critique 结论：Nova 的绿/白商务语言清晰，台账式商品行与横向轨道新品保持轻量、价格可扫读；低频子页面保留功能模板，由新主题统一。

## 已知限制
- 商品形态使用未占用槽位 table-ledger / horizontal-rail，无重复。

## 骨架差异修复（v3.0.1）
- 已停止使用共享 common 尾部模板；Nova 骨架为 Hero → Nova picks → Best → New → Ecosystem → Shop by category → License care → Persona → Support → Reviews → Journal → Trust → Newsletter；Quartz 骨架为 Hero → Ecosystem → Best → New → Featured releases → Persona → Compare spec → Reviews → Journal → Trust → Newsletter → Support。
- check-skeleton 板块序列与其余站点无同构；15 类首页组件仍全齐。

## 反套路 pre-flight
- 不使用 AI 紫渐变默认、不叠玻璃拟态、不用 Inter+slate 默认、不三张等宽卡、按钮对比度达标、单一强调色、统一圆角、无 em-dash、无编号眉题滥用、素材真实非纯色、移动端无横向溢出；已按 anti-cliche-checklist.md 核对并记录。

## CSS 裁剪
- style.css 已裁剪至 ≤45KB 目标并跑 check-css-coverage.js --strict（体积/类覆盖/他站前缀三查）；refined.css 只留占位。

## 占位内容
- 评价与案例数字为占位；支付徽章、销量、Partner 状态以真实统计为准；结算/登录/表单为 Demo。
