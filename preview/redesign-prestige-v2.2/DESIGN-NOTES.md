# KeyStarter Prestige v2.2 - v1.9 单风格重建说明

## 版本命名

- 产品名：**KeyStarter Prestige v2.2**
- 风格代号：Prestige（授权伙伴 / 大牌信任）
- 本次按 **replica-kit-v1.9 / v1.9-design-differentiation** 重建单一风格；Meridian v2.1 与 Vault v2.1 已按用户要求删除。

## taste-skill Design Read + 三 Dial

- Design Read：Reading this as an authorized Microsoft license partner storefront for consumers and procurement buyers, with a clean, image-led, trust-first commercial language, leaning toward Plus Jakarta Sans + Cutive Mono + deep forest + porcelain + amber stars.
- Dials：`VARIANCE 6 / MOTION 5 / DENSITY 5`。

## 生产审计与素材

- 已复制生产素材 101 张到 `assets/img/prod/`（hero 背景、28 产品图、OS 生态 logo、行业/客户图、Licensing 三图、博客封面）。
- 首页覆盖生产全部关键板块：Persona 双入口、Special Offers、Best Sellers、New Arrivals、Licensed Ecosystem、Compliance & SAM（含 B2B 快速表单）、Which License Model、Support Center、One-Click Delivery、Reviews、Guides、Payments、Newsletter。
- B2B/About/Licensing 使用生产内容与图片。

## 字体与配色

- Display/Body：Plus Jakarta Sans；Label：Cutive Mono。
- Palette：瓷白 `#F4F7F5` / 深森林 `#14251F` / 森林绿 `#1F7A5A` / 琥珀星标 `#D28B2F`。

## 版式模型声明

| 区域 | data-layout-model |
|---|---|
| Hero | `spread-plates`（左实景图 + 右文案/信任） |
| Story | `timeline` |
| Best Sellers | `grid-cards` |
| New Arrivals | `register-rows` |

## GitHub 组件登记表（四态）

| 组件 | 来源 | 许可证 | 状态 | 用途 |
|---|---|---|---|---|
| HyperUI product-cards | github.com/markmead/hyperui | MIT | 使用 | 产品卡/优惠卡形态 |
| MagicUI Marquee | github.com/magicuidesign/magicui | MIT | 使用 | 新品登记/滚动轨道 |
| vivus.js | github.com/maxwellito/vivus | MIT | 借鉴 | 交付步骤描线动效 |
| ScrollReveal | github.com/jlmakes/scrollreveal | GPL-3.0 | 拒绝 | 传染性许可证 |

## impeccable critique

impeccable critique 结论：Prestige v2.2 用真实生产图建立直观信任，森林绿单一强调色统一，hero 实景图 + 信任徽章有吸引力；低频子页面仍共享功能模板，结构模型门有告警，正式生产前建议按品牌隐喻重写。

## 机械门结果

- check-homepage：15/15 OK
- check-motion / class-collision / layout-model / skeleton / visual：通过
- check-fullsite：结构模型级告警已记录（子页面功能模板共享）
- check-evidence：见证据文件

## GLM-4.6V 盲测

verdict 文件：`_analysis/reports/redesign-prestige-v2.2-glm-verdict.txt`。

## 占位内容

- 评价与案例数字为占位；支付徽章、销量、Partner 状态以真实统计为准；结算/登录/表单为 Demo。

## 已做质检

- Playwright：20 页 × 桌面 1440 + 移动 390 = 40 视口，0 控制台错误、0 横向溢出。
- 本地服务：http://127.0.0.1:8816/
