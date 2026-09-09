# KeyStarter 新版预览 - 设计说明（2026-08-28）

## 版本命名

- 本版正式定名为 **KeyStarter Momentum v1.4**（Momentum = 动量，强调即时交付与增长势能）。
- v1.5 起衍生两个独立差异化风格：KeyStarter Meridian v1.5、KeyStarter Vault v1.5，详见 `../trend-research-v1.5-20260828.md`。

## 自检表（design-differentiation v1.4 门闸）

| 门闸 | 结果 |
|---|---|
| 品牌改名且有出处 | 保留 KeyStarter（自有品牌，不改名）；视觉标识升级为墨蓝+紫+琥珀 |
| 显示字体已换且与原站不同时代 | 预览用系统无衬线栈；生产建议引入 Sora/Space Grotesk 等现代几何字体（需本地打包） |
| 配色至少 3 个不同 + 1 个呼应原站 | 墨蓝 #0d1322、纸白 #f6f7f9、琥珀橙 #ea580c、绿色 #059669；紫色 #6d28d9 呼应原站品牌 |
| 特色元素 2-4 个且贯穿全站 | 价格锚点卡、信任条/信任卡、支付徽章、编号流程步骤、统一圆角 8px 卡片 |
| 布局语法重构至少 2 处 | Hero 改为全幅深色+背景产品图+价格锚点；首页新增信任条带与评价摘要区；B2B 新增四步流程+案例区+FAQ；产品页重构购买区信息顺序 |
| 关键区域素材有效性 | Hero/B2B 背景与产品图均为仓库真实图片；博客文章封面为占位图，生产替换为当日主题封面 |
| 布局重构功能完整性 | 原站功能板块全部保留：公告条、导航、搜索、语言切换、购物车、个人/企业入口、信任数据、商品分类、畅销产品、评价、保障、博客、Newsletter、B2B 表单、帮助中心、政策链接 |
| 组件测试门 | 未引入外部 GitHub 组件，全部为自研静态组件，无 check-motion 依赖；已用 Playwright 20 视口回归 + GLM 视觉审计 |
| 品牌文案已重写 | 首页/产品页//b2b/帮助中心文案全部重写为转化导向表述 |

## 功能保留映射（预览 → 现站）

- 导航：Products → products.html；Compare → products.html#compare；Enterprise/B2B → b2b.html；Tech Support → support.html；Blog → blog.html。
- 搜索：header 搜索框跳转 products.html?q=；正式版接回原搜索逻辑。
- 语言：6 语言切换入口保留（预览仅切换标签，正式版接 i18n + ?lang=）。
- 购物车/结算：Add to Cart/Buy Now → cart.html（预览静态；正式版接 WooCommerce 结算）。
- 个人/企业入口：首页双入口保留（Shop Licenses Now / Enterprise Licensing）。
- 帮助/政策：support.html 覆盖订单、激活、退款、转让；footer 政策链接指向 support.html#faq。
- 博客：blog.html + blog-post.html；sitemap/JSON-LD/hreflang 头已按 SEO 规范加入。

## 查漏补缺（2026-08-28 第二轮）

- 现站路由对比 sitemap 后补齐：28 个产品页用 `product.html?slug=` 数据模板覆盖（真实名称/价格来自 src/data/products.ts）；7 个 compare/guide 页用 `compare.html?slug=` 覆盖；博客文章用 `blog-article.html?slug=` 覆盖（示例数据在 assets/preview-data.js）。
- 新增静态页：faq、licensing、downloads、account、legal（privacy/terms/refund/cookies/disclaimer 五合一）、links、changelog。
- 修正数据准确性：删除预览中编造的划线价，价格全部改为现站真实价（如 Office 2021 $58、Server 2022 $850、SQL 2022 $229）；评价卡/案例数字仍为占位，生产前替换真实数据。
- 质检：23 个页面类型 × 桌面/移动 = 46 视口，0 控制台错误、0 横向溢出。

## 占位内容（上线前必须替换）

- 首页/产品页评价卡、B2B 客户案例数字：当前为代表性占位，正式版接真实已验证评价/案例。
- 博客文章封面图：正式版用每日主题封面 + KeyStarter logo。
- 支付徽章与销量数据：以真实支付渠道和真实统计为准。

## 已做质检

- Playwright：10 页 × 桌面 1440 + 移动 390 = 20 视口，0 横向溢出，0 控制台错误。
- GLM-4.6V：首页、产品页、/b2b 桌面截图视觉审计通过；已吸收的细节意见：首页补支付徽章、评价移到价格下方。
