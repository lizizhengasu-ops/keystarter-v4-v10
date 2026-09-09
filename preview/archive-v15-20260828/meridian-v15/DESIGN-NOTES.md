# KeyStarter Meridian v1.5 - 设计说明

## 版本命名

- 产品名：**KeyStarter Meridian v1.5**
- 风格代号：Meridian（子午线 / 中天）
- 命名出处：Meridian 是一条可被精确测量的权威基准线，呼应“官方授权渠道、可验证、有编号记录”的正版软件叙事；副标语 `The Meridian Standard`。
- 与 Momentum v1.4 的关系：同一站点的第二个差异化方向，骨架完全不同，不是换皮。

## 趋势研究依据

- 2026 Quiet Luxury / Luxury Minimalism（HaloThemes）：留白、高级衬线、微交互。
- 编辑式电商（ShopThemeDetector 2026：Goodee / Mast Brothers）：杂志式栅格、工艺叙事、信任感。
- 编辑式产品页转化（Amoni 2025：12-18% 提升）。
- Brunello Cucinelli（CommArts）：柔和低饱和、大留白、界面退到产品之后。
- 软件授权零售信任（LizenzTeufel 案例）。
- 完整来源与辩证评估见 `../trend-research-v1.5-20260828.md`。

## 自检表（design-differentiation v1.4 门闸）

| 门闸 | 结果 |
|---|---|
| 品牌改名且有出处 | KeyStarter Meridian v1.5；Meridian = 权威可测量基准线 |
| 显示字体已换且与原站不同时代 | Bodoni Moda（Didone 高对比衬线，19 世纪）+ Sora；本地 `assets/fonts/` 已打包 |
| 配色至少 3 个不同 + 1 个呼应原站 | 暖纸 `#F4F0E6`、墨褐 `#1C1A15`、胭脂 `#9A2B2E`、金 `#C29A4A`；保留紫 `#5B4B9A` 呼应原品牌 |
| 特色元素 2-4 个且贯穿全站 | Chapter 编号、细线台账式产品行、斜体衬线强调、横向 key rail、零圆角直角 |
| 布局语法重构至少 2 处 | 顶部改字标高 + 微型大写导航；首页改左文右图不对称编辑式 hero + 编号章节 + 台账；产品页从 4 列等宽卡改为 2 列台账 + 横向轨道 |
| 签名动作已定义 | `rw-track` 横向 key rail（可拖拽）+ 滚动渐显 + 产品行 hover 箭头 |
| 关键区域素材有效性 | Hero 产品图、分类卡、台账图为仓库真实图片；博客封面为占位并标注 |
| 布局重构功能完整性 | 公告、导航+搜索+语言+购物车、Hero、Best Sellers、New Arrivals、过程/信任叙事、评价、博客、Promo/B2B、Newsletter、帮助/账户/政策入口全部保留 |
| 组件测试门 | 通过：`check-motion.js` OK（motion.js 存在、可解析、prefers-reduced-motion 早退、rw-track 初始化） |
| 品牌文案已重写 | `The Meridian Standard` 宣言体系，首页/PDP/B2B 全部重写 |

## 组件来源（GitHub 实测）

- HyperUI（MIT，github.com/markmead/hyperui）：下载 14 个 HTML 组件到 `assets/components/hyperui/`（product-collections、product-cards、testimonials、stats、faqs、ctas、newsletter-signup、headers、footers、carts、announcements），LICENSE 一并留存；编辑式图文块与评价引语已适配进首页 Chapter/评价区。
- MagicUI Marquee（MIT，github.com/magicuidesign/magicui）：横向无限轨道概念落成本地原生 `rw-track`，由 `assets/js/motion.js` 初始化，通过组件测试门。
- Storefront UI ProductCard（MIT，vuestorefront/storefront-ui）：仅作 V1.5 React 增量参考，本预览不引入 React 依赖。

## V1.5 增量组件建议（如何继续加）

1. 新组件先放进 `assets/components/<来源>/` 并保留许可证，改动只落 `index.html` / 相关页 HTML + `site.css`。
2. 任何动效组件必须过 `replica-kit-v1.4/scripts/check-motion.js`；未过就回退并记录原因。
3. 建议下一批增量：HyperUI `product-cards/3`（hover 双图）、`carts/1`（侧滑购物车）、`faqs/1`（细线手风琴）、MagicUI Bento（分类合集）。
4. 转到 React 生产版时，把 `rw-track` 映射成 `Marquee`/自研 `useRail`，把台账组件映射成表格化 ProductRow，保持语义一致。

## 功能保留映射（预览 → 现站）

- 导航：Products → products.html；Compare → products.html#compare；Enterprise → b2b.html；Support → support.html；Journal → blog.html。
- 搜索：header 搜索框跳转 products.html?q=；正式版接回原搜索逻辑。
- 语言：6 语言入口保留（预览仅切标签，正式接 i18n + ?lang=）。
- 购物车/结算：Add to Cart / Buy Now → cart.html（预览静态）。
- 个人/企业入口：Shop the standard / Enterprise licensing 双入口。
- 帮助/政策：support.html + footer 政策链接。
- 博客：blog.html + blog-post.html + blog-article.html。

## 占位内容（上线前必须替换）

- 评价与案例数字为代表性占位，正式版接真实已验证评价。
- 博客封面图沿用旧占位，正式版用每日主题封面。
- 销量/支付徽章以真实统计为准。

## 已做质检

- Playwright：20 页 × 桌面 1440 + 移动 390 = 40 视口，0 控制台错误、0 横向溢出；截图在 `qa/`。
- GLM-4.6V：首页/产品列表/产品详情/移动首页视觉审计通过，无重叠、错位或空白异常。

## 页面完整性比对（2026-08-28 第二轮）

- 已拉取生产 sitemap（88 条）逐类比对：核心页、28 个产品、7 个 compare/guide、全部博客文章均由本地页面/模板覆盖（product.html?slug=、compare.html?slug=、blog-article.html?slug=、blog-post.html?slug=）。
- 按生产结构与 SEO/营销方案补齐：首页新增 Personal/Enterprise 双入口、Special Offers、New Arrivals、Which License Model、Support Center、Payments & Guarantees；PDP 新增 How It Works / System Requirements / Windows 11 Editions；B2B 新增 WhatsApp 报价与 SAM audit 文案；Support 新增 Send Request 表单；About 补齐平台/生态/工程师/Partner/行业叙事；博客文章新增 FAQ 与 External References；全站页面补齐 Organization JSON-LD。
- 所有改动仅发生在本地预览目录，未触碰生产、staging、DNS 或任何仓库级部署文件。
