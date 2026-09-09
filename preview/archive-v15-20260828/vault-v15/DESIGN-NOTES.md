# KeyStarter Vault v1.5 - 设计说明

## 版本命名

- 产品名：**KeyStarter Vault v1.5**
- 风格代号：Vault（保险库 / 密钥库）
- 命名出处：Vault 直接命中“license key”的品类隐喻：密钥放入安全库，签发、验证、交付都有审计记录；副标语 `Keys, secured. Delivery, verified.`。
- 与 Momentum v1.4 的关系：同一站点的第三个差异化方向，骨架完全不同，不是换皮。

## 趋势研究依据

- 2026 Cinematic Dark Mode 成为高端默认（HaloThemes / Amoni）。
- 深色品牌作品牌选择、单一强调色、克制动效（Amoni 2025）。
- SKIMS 全幅深色 hero 与克制导航（ShopThemeDetector 2026）。
- 软件授权零售第一诉求是信任与专业感（LizenzTeufel 案例）。
- 完整来源与辩证评估见 `../trend-research-v1.5-20260828.md`。

## 自检表（design-differentiation v1.4 门闸）

| 门闸 | 结果 |
|---|---|
| 品牌改名且有出处 | KeyStarter Vault v1.5；Vault = 密钥安全库隐喻 |
| 显示字体已换且与原站不同时代 | Space Grotesk（现代几何技术感）+ IBM Plex Mono（等宽终端感）；本地 `assets/fonts/` 已打包 |
| 配色至少 3 个不同 + 1 个呼应原站 | 深石墨 `#0A0C10`、面板 `#141922`、薄荷绿 `#2DE1B3`、琥珀 `#F5B74A`；保留紫 `#8B7CF6` 呼应原品牌 |
| 特色元素 2-4 个且贯穿全站 | 状态遥测条、密钥面板（masked key + 进度）、VERIFIED 徽章、安全审计清单、横向最近签发轨道 |
| 布局语法重构至少 2 处 | 导航改终端状态栏 + 等宽链接；首页改左大标题 + 右密钥控制台双栏控制室；产品卡改证书式台账行（编号+规格+状态徽章）；PDP 改产品展台 + 购买控制台双栏 |
| 签名动作已定义 | `rw-track` 横向最近签发轨道 + 状态点脉冲 + 面板 hover 高亮 |
| 关键区域素材有效性 | Hero/密钥面板/产品图为仓库真实图片；博客封面为占位并标注 |
| 布局重构功能完整性 | 公告、导航+搜索+语言+购物车、Hero、Best Sellers、New Arrivals、过程/信任叙事、评价、博客、Promo/B2B、Newsletter、帮助/账户/政策入口全部保留 |
| 组件测试门 | 通过：`check-motion.js` OK（motion.js 存在、可解析、prefers-reduced-motion 早退、rw-track 初始化） |
| 品牌文案已重写 | `Keys, secured. Delivery, verified.` 宣言体系，首页/PDP/B2B 全部重写 |

## 组件来源（GitHub 实测）

- HyperUI（MIT，github.com/markmead/hyperui）：下载 14 个 HTML 组件到 `assets/components/hyperui/`（product-cards、product-collections、testimonials、stats、faqs、ctas、newsletter-signup、headers、footers、carts、announcements），LICENSE 一并留存；证书卡与审计清单已适配进首页。
- MagicUI Marquee（MIT，github.com/magicuidesign/magicui）：横向“最近签发”轨道概念落成本地原生 `rw-track`，由 `assets/js/motion.js` 初始化，通过组件测试门。
- Storefront UI ProductCard（MIT，vuestorefront/storefront-ui）：仅作 V1.5 React 增量参考，本预览不引入 React 依赖。

## V1.5 增量组件建议（如何继续加）

1. 新组件先放进 `assets/components/<来源>/` 并保留许可证，改动只落 `index.html` / 相关页 HTML + `site.css`。
2. 任何动效组件必须过 `replica-kit-v1.4/scripts/check-motion.js`；未过就回退并记录原因。
3. 建议下一批增量：HyperUI `carts/1`（侧滑购物车抽屉）、`product-cards/3`（hover 双图）、`faqs/1`（手风琴）、MagicUI Bento（库存分类合集）。
4. 转到 React 生产版时，把 `rw-track` 映射成 `Marquee`/自研 `useRail`，把证书卡映射成 LicenseCard，保持语义一致。

## 功能保留映射（预览 → 现站）

- 导航：Products → products.html；Compare → products.html#compare；Enterprise → b2b.html；Support → support.html；Journal → blog.html。
- 搜索：header 搜索框跳转 products.html?q=；正式版接回原搜索逻辑。
- 语言：6 语言入口保留（预览仅切标签，正式接 i18n + ?lang=）。
- 购物车/结算：Add to cart / Buy → cart.html（预览静态）。
- 个人/企业入口：Issue my key / Enterprise console 双入口。
- 帮助/政策：support.html + footer 政策链接。
- 博客：blog.html + blog-post.html + blog-article.html。

## 占位内容（上线前必须替换）

- 评价与案例数字为代表性占位，正式版接真实已验证评价。
- 博客封面图沿用旧占位，正式版用每日主题封面。
- 密钥面板为示意（XXXXX 掩码），正式版只出现在支付后订单页。
- 销量/支付徽章以真实统计为准。

## 已做质检

- Playwright：20 页 × 桌面 1440 + 移动 390 = 40 视口，0 控制台错误、0 横向溢出；截图在 `qa/`。
- GLM-4.6V：首页/产品详情/B2B 视觉审计通过，无重叠、错位或空白异常。

## 页面完整性比对（2026-08-28 第二轮）

- 已拉取生产 sitemap（88 条）逐类比对：核心页、28 个产品、7 个 compare/guide、全部博客文章均由本地页面/模板覆盖（product.html?slug=、compare.html?slug=、blog-article.html?slug=、blog-post.html?slug=）。
- 按生产结构与 SEO/营销方案补齐：首页新增 Personal/Enterprise 双入口、Special Offers、New Arrivals、Which License Model、Support Center、Payments & Guarantees；PDP 新增 How It Works / System Requirements；B2B 新增 WhatsApp 报价与 SAM audit 文案；Support 新增 Send Request 表单；About 补齐平台/生态/工程师/Partner/行业叙事；博客文章新增 FAQ 与 External References；全站页面补齐 Organization JSON-LD。
- 所有改动仅发生在本地预览目录，未触碰生产、staging、DNS 或任何仓库级部署文件。
