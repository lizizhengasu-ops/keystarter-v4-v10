# KeyStarter v1.8 重构调研与方向定稿（2026-08-28）

## 0. 本轮新调研来源（v1.8 强制：新增 ≥2 个外部来源）

| 来源 | 结论 |
|---|---|
| [Muzli - AURELIS Luxury Watch E-Commerce](https://me.muz.li/visumindcreative/luxury-watch-e-commerce-product-website-design-3) | 精密品类要用精密界面：强网格、克制字体、大留白、产品像仪器一样展示 |
| [Collectiv - Vista Bank Private Client](https://collectivedallas.com/project/vista-bank-private-client/) | 私行感：深黑 + 金/暖白 + 编辑式大字，专属性不靠花哨靠克制 |
| [Verso Visual - Beyond the Beige](https://www.versovisual.com/journal/beyond-the-beige-crafting-a-palette-of-quiet-luxury) | 高级感必须跳出默认米色系；冷白/石板/深炭是更现代的替代 |
| [Beck Digital - Financial Services Web Design](https://beckdigital.com/insights/financial-services-web-design-trust-security/) | 金融/授权类高信任品类 = “少即是精”，去掉噪音、建立稳定感 |

## 1. 候选方向（3 个）

### A. Precision Instrument Lab（精密仪器实验室）→ 定稿 Meridian v2.0
- 气质：冷白瓷 + 深海军蓝 + 钴蓝，像一块校准过的计时器面板。
- 适配：软件授权是“精度生意”（版本、密钥、激活都要精确），仪器语言天然可信。
- 来源：AURELIS、Verso Beyond the Beige、Beck Digital。
- 辩证：优点是与上一版暖纸编辑式完全错开、专业感强；风险是太冷、需要仪器叙事和产品图压住温度。

### B. Private Ledger Vault（私人账本保险库）→ 定稿 Vault v2.0
- 气质：近黑 + 暖白 + 香槟封蜡，像一份带火漆印章的银行档案。
- 适配：密钥本身就是“库里存的东西”，账本 + 封蜡隐喻承接“登记、验证、交付”。
- 来源：Vista Bank、Beck Digital。
- 辩证：优点是信任感强、与旧 Vault 的赛博绿完全不同；风险是金/黑容易撞私行模板，必须用账本行、封蜡、证书牌等独有装置拉开。

### C. Technical Specification Wall（技术规格墙）
- 气质：全站规格表、等宽字、标尺线，像一份可交互的授权白皮书。
- 来源：AURELIS、Beck Digital。
- 辩证：优点是信息密度与专业度最高；风险是转化氛围弱，更像文档不像商店，故不执行。

## 2. 推荐方向 + 结论

执行 A（Meridian v2.0 精密仪器）与 B（Vault v2.0 私人账本）：
> 软件授权同时需要“精度可信”和“保管可信”，一个用冷白仪器承接技术买家，一个用深色账本承接采购决策；两者在 Hero/故事/商品形态上与上一版全部错开。

## 3. 装置 × 材料融合表（v1.8 强制）

| 站 | 早期装置（hero-library/motion-library） | 高级材料 | 融合结果 |
|---|---|---|---|
| Meridian v2.0 | `spread-plates`（对页展开） × `bezel`（表盘微旋）+ vivus 墨线 | 冷白瓷 + 钴蓝 + 镀铬细线 | “证书对页 + 计时器表圈”：左右两块校准板，产品板与签发记录板镜像展开 |
| Vault v2.0 | `tablet-object`（中央铭牌） × `stamp`（封蜡按压）+ vivus 描线 | 近黑 + 暖白 + 香槟封蜡 | “金库铭牌 + 火漆封印”：中央证书铭牌，hover 按压盖章，审计账本滚动展开 |

## 4. taste-skill Design Read + 三 Dial

- Meridian v2.0：Reading this as: premium precision-instrument ecommerce for technical and professional buyers, with a cold-luxury instrument-lab language, leaning toward native CSS grid + technical sans + mono labels + restrained motion. Dials: VARIANCE 7 / MOTION 5 / DENSITY 5。
- Vault v2.0：Reading this as: private-bank vault experience for procurement and business buyers, with a dark editorial sealed-ledger language, leaning toward engraved serif + mono register + restrained press motion. Dials: VARIANCE 5 / MOTION 4 / DENSITY 5。

## 5. 版式模型声明（check-layout-model 受控词）

| 站 | Hero | Story | 商品形态 |
|---|---|---|---|
| Meridian v2.0 | `spread-plates` | `timeline` | Best `table-ledger` / New `register-rows` |
| Vault v2.0 | `tablet-object` | `manifest-stack` | Best `grid-cards` / New `ledger-rows` |

## 6. GitHub 组件四态登记（本轮）

| 组件/来源 | 许可证 | 状态 | 用途/原因 |
|---|---|---|---|
| HyperUI product-collections（github.com/markmead/hyperui） | MIT | 使用 | 适配成两版商品对页/证书牌组件 |
| MagicUI Marquee（github.com/magicuidesign/magicui） | MIT | 使用 | 横向刻度轨道概念，落成本地 `me-tick`/`va-tape` |
| vivus.js（github.com/maxwellito/vivus） | MIT | 使用 | 签名装置：Meridian 墨线校准线、Vault 封蜡描线 |
| ScrollReveal（github.com/jlmakes/scrollreveal） | GPL-3.0 | 拒绝 | 传染性许可证 + 已有自研 reveal |

完整登记表与 impeccable critique 写入两版 DESIGN-NOTES.md。
