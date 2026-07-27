# Key Delivery System — Version Evolution Log
## 2026-07-27

---

## v6.0.1 — Order Metabox (单输入框)
**设计**: 在订单编辑页右侧加一个 Key 输入框
**问题**: 多个产品只能填一个 Key ❌

---

## v6.0.2 — Per-Product Metabox
**设计**: 订单侧边栏每个产品有独立的 Key 字段
**问题**: 操作还是要打开每个订单，100 个订单得点 100 次 ❌

---

## v6.0.3 — Dedicated Admin Page
**设计**: 独立 License Keys 管理页，所有订单一览
**改进**: 不用一个一个打开订单了 ✅
**问题**: 没有批量操作，100 个订单还是得填 300 次 ❌

---

## v6.0.4 — Smart Features (Auto-save + Bulk Paste)
**设计**: 自动保存、全局批量粘贴
**Bug**: 全局粘贴无法区分 Key 该分配给哪个产品 ❌

---

## v6.0.5 — Per-Product Batch
**设计**: 每个产品独立的 "📋 Batch fill" 按钮
**修复**: Bug 解决，批量粘贴只影响当前产品 ✅
**问题**: 100 个订单 × 3 产品 = 300 次手动操作，还是太慢 ❌

---

## v6.0.6 — Queue + CSV Batch (当前)
**设计**: 双模式 — 队列模式 + CSV 批量模式

### 队列模式 (日常 5-10 单/天)
`
下一个: #681 Alice Wang (等待 3 min)
───────────────────────────────────────
Windows 11 Pro × 2  [WX11P-AAAA-BBBB-CCCC] ✅
                     [WX11P-DDDD-EEEE-FFFF] ✅
Office 2021 × 1     [OFF21-XXXX-YYYY-ZZZZ] ⏳
───────────────────────────────────────
[ N=Next  S=Send & Next  C=Complete ]
Queue: 4 ahead | Avg: 2.1 min/order
`
快捷键: N=下个订单, S=发送并下一个, C=完成

### CSV 批量模式 (大量 50-100 单)
`
[📥 Download CSV Template] → 在 Excel 里填 Key → [📤 Upload & Process]

CSV 格式:
Order#,Product,Key,Status
681,Windows 11 Pro,WX11P-AAAA-BBBB-CCCC,ready
681,Windows 11 Pro,WX11P-DDDD-EEEE-FFFF,ready
681,Office 2021 Pro Plus,,pending
680,Office 2021 Pro Plus,OFF21-ABCD-EFGH-IJKL,ready
`

### 100 订单场景对比

| 方式 | 耗时 | 操作次数 |
|------|:----:|:--------:|
| v6.0.5 (手填) | ~2 小时 | 300 次 |
| v6.0.6 队列模式 | ~50 分钟 | 100 次 (N→粘贴→S) |
| v6.0.6 CSV 模式 | **~5 分钟** | **1 次 (导出→填→导入)** |

### 自审 v6.0.6

| 质疑 | 证据/缓解 |
|------|----------|
| CSV 格式用户看不懂？ | 提供已填好示例头的模板文件 + 说明 |
| 填错了 Key 怎么办？ | 导入前校验格式，导入后可撤回 |
| 队列模式和 CSV 数据不同步？ | 统一数据处理引擎，两种模式读写同一数据 |
| CSV 只能全量处理？ | 支持选择部分订单导出 |
| 没有 API？对方系统怎么对接？ | v6.0.7 可以加 Webhook 外部系统对接 |

**结论**: v6.0.6 对 100 订单场景经得起推敲 ✅
  - 队列模式: 日常运作，~30 秒/单
  - CSV 模式: 批量处理，~5 分钟/100 单
  - 数据一致性: 同源处理
  - 容错: 可撤回可重试
