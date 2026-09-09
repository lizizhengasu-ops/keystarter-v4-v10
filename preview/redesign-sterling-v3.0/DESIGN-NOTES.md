# KeyStarter Sterling v3.0 - v2.0 单风格重建说明

## 版本命名

- 产品名：**KeyStarter Sterling v3.0**
- 风格代号：Sterling（纯银 / 高端极简授权伙伴）
- 按 **replica-kit-v2.0 / v2.0-design-differentiation** 重建；Prestige v2.2 保留目录供对比，不再作为交付版本。

## taste-skill Design Read + 三 Dial

- Design Read：Reading this as a high-end minimal authorized Microsoft license partner storefront, with a cold-luxury silver/slate language, leaning toward Outfit + Space Mono + terracotta accent.
- Dials：`VARIANCE 5 / MOTION 4 / DENSITY 5`。

## 调色板轮换（v2.0）

- 家族：Cold Luxury（银灰 + 石板 + 赤陶点缀）。
- 依据：最近交付风格为 Forest（Prestige）、Gold/Dark（Vault）、Blue/Light（Meridian），本轮选未使用的银灰+赤陶，避开 beige+brass 默认家族。

## 卡片形态（v2.0）

- cardVariant：`rail`（Best Sellers 横向轨道卡）+ `table`（New Arrivals 台账行）。
- 与 check-layout-model 的 PRODUCT 声明一致：`horizontal-rail` / `table-ledger`。

## PDP 解剖（v2.0）

- `product.html` 声明 `data-page-model="spec-sheet"`（左侧产品图 + 右侧参数/购买规格单），未与已占用模型重复。

## Chrome 签名（v2.0）

- 搜索面板：`SEARCH /` 规格索引式输入。
- 购物车抽屉：Issuance tray 规格托盘。
- 年龄门/聊天：保留品牌化标准件。

## 工艺签名（v2.0）

- `data-craft="etch"`：Hero 区蚀刻金属线内联 SVG（银灰/赤陶品牌线）。
- `data-craft="elevation"`：Trust 区立面网格内联 SVG（授权/交付蓝图感）。
- 两处均含真实内联 `<svg>`，通过 check-layout-model 工艺签名门。

## 反套路 pre-flight

反套路 pre-flight 勾选（v2.0 anti-cliche-checklist 核心项）：不使用 AI 紫渐变默认、不叠玻璃拟态、不用 Inter+slate 默认、不三张等宽卡、按钮对比度达标、单一强调色、统一圆角、无 em-dash、无编号眉题滥用、素材真实非纯色、移动端无横向溢出；已按清单核对并记录在 DESIGN-NOTES。

## CSS 裁剪（v2.0）

- `style.css` 已裁剪至 37KB（≤40KB），通过 `check-css-coverage.js --strict`（体积/类覆盖/他站前缀三查）。

## 生产审计与素材

- 已复制生产素材 101+ 张到 `assets/img/prod/`，并额外抓取生产 JS/CSS 引用的 Inter 字体、视频 poster 与全部产品图。
- 首页覆盖生产全部关键板块：Persona 双入口、Special Offers、Best Sellers、New Arrivals、Licensed Ecosystem、Compliance & SAM（B2B 快速表单）、Which License Model、Support Center、One-Click Delivery、Reviews、Guides、Payments、Newsletter。
- B2B/About/Licensing 使用生产内容与图片。

## GitHub 组件登记表（四态）

| 组件 | 来源 | 许可证 | 状态 | 用途 |
|---|---|---|---|---|
| HyperUI product-cards | github.com/markmead/hyperui | MIT | 使用 | 横向轨道产品卡/台账行 |
| MagicUI Marquee | github.com/magicuidesign/magicui | MIT | 使用 | 新品/优惠滚动节奏 |
| vivus.js | github.com/maxwellito/vivus | MIT | 借鉴 | 交付步骤描线 |
| ScrollReveal | github.com/jlmakes/scrollreveal | GPL-3.0 | 拒绝 | 传染性许可证 |

## impeccable critique

impeccable critique 结论：Sterling v3.0 的银灰+赤陶组合克制高级，拼贴式 hero 使用真实产品图，购买条/规格单结构清晰；低频子页面仍共享功能模板，结构模型门有告警。

## 机械门结果

- check-homepage：15/15 OK
- check-motion / class-collision / layout-model / skeleton / visual / css-coverage：通过
- check-fullsite：结构模型级告警已记录（子页面功能模板共享）
- check-evidence：见证据文件

## GLM-4.6V 盲测

verdict 文件：`_analysis/reports/redesign-sterling-v3.0-glm-verdict.txt`。
最终轮结果：全部对比对已消除“两张图+一段文字”通用组合判定；vs 旧版 Meridian 首页“明显不同”，vs 旧版 Vault 首页“不完全像”、产品页“明显不同”；剩余“像同一模板”仅出现在同品牌浅色对（vs Prestige 首页、vs Meridian/Prestige 产品页），为同一品牌导航/产品摄影的同源限制，已记录由用户裁决。

## 占位内容

- 评价与案例数字为占位；支付徽章、销量、Partner 状态以真实统计为准；结算/登录/表单为 Demo。

## 已做质检

- Playwright：20 页 × 桌面 1440 + 移动 390 = 40 视口，0 控制台错误、0 横向溢出。
- 可重复视觉闸门（`tmp/visual-gate.py`）：对当前 8816 服务真实渲染的首页/产品/产品页/B2B/Support 桌面+移动截图逐张 GLM 审查，全部“无问题”后才放行；本轮曾发现移动端 hero 高度 957px 造成空白，已压缩至 790px 并复测通过。
- 本地服务：http://127.0.0.1:8816/
