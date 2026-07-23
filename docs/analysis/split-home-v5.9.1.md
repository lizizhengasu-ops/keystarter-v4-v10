# KeyStarter F1+O7 Full Fix Plan v5.9.1

**Date**: 2026-07-23  
**Backup**: ackups/ks_v4-v10_full-v5.9.1-pre_*.bundle

## Triple Structure Analysis

### 1.1 展示层
| Item | File | Problem | Fix |
|---|---|---|---|
| F1 | src/pages/Home.tsx (936行/68.5KB) | 10+ section都在一个文件 | 提取 data + CheckoutDrawer → 减300行 |
| O7 | src/SearchOverlay.tsx | 全内联style而非Tailwind | 转换为主容器Tailwind |

### 1.2 不动项
CSP ✅ / HTTPS ✅ / WC_IDS ✅ / i18n懒加载 ✅ / 依赖已清理 ✅

## Code Plan

### F1 — 提取常量数据 + CheckoutDrawer

新建 src/data/constants.ts:
- SPECIAL_OFFER_IDS（string[]）
- images / IMAGES（product image urls）

新建 src/sections/CheckoutDrawer.tsx:
- 接收 props: showCheckout, setShowCheckout, checkoutEmail, setCheckoutEmail, ...
- 完整Portal checkout抽屉

Home.tsx: import + 替换为组件调用

### O7 — SearchOverlay Tailwind

替换 style={{}} → className 为主结构

## Execution Order
1. Write data file → 2. Write CheckoutDrawer → 3. Update Home.tsx → 4. Update SearchOverlay → 5. Build → 6. Audit
