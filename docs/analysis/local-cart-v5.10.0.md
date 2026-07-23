## =====================================================
## KeyStarter 本地购物车方案 v5.10.0
## =====================================================

**问题**: WooCommerce Store API 的 nonce 验证在中国→LA网络下持续超时(>15s)，AJAX 加购无法工作。

**方案**: 完全移除 Store API 依赖。购物车状态存于本地内存 + sessionStorage，
加购即时更新(0ms)，结账时通过 checkout-sync.php 同步到 WooCommerce。

### 三重结构分析

#### 展示层 (Presentation Layer)
- **Cart badge** 从 CartContext 读取本地 items_count → 点击加购即时变
- **WooCartFlyout** 从 CartContext 读取本地 items → 即时显示
- **Add to Cart 按钮** 调用 ddToCart(slug, name, price) → 即时更新
- **Buy Now 按钮** 调用 uyNow(slug, name, price) → 加购 + 跳转结账
- **Checkout 按钮** 调用 checkout() → 同步到 WC + 跳转 /checkout/

#### 数据层 (Data Layer)
- useWooCart.ts 重写：Store API 调用全部移除，改为本地 state
- 购物车数据存 sessionStorage（ks_local_cart_v3）
- 商品用 slug 标识（与服务端 checkout-sync.php 一致的 ID 系统）
- 金额以 cents 存储（与 WCItem.totals.line_total 格式一致）

#### 基础设施层 (Infrastructure Layer)
- checkout-sync.php（已存在）接收 ?items=[{slug,qty}] → 清空 WC 购物车 → 逐项加购 → 跳转 /checkout/
- 无需 nonce、无需 Store API、无需 AJAX 到 WordPress

### 变更文件清单
1. **src/hooks/useWooCart.ts** — 完全重写，本地 state
2. **src/data/CartContext.tsx** — 接口更新（addItem→addToCart, +checkout, +buyNow）
3. **src/components/WooCartFlyout.tsx** — Checkout 按钮调用 checkout()
4. **src/pages/Home.tsx** — 按钮改为 addToCart/buyNow
5. **src/pages/Store.tsx** — 按钮改为 addToCart
6. **src/pages/Product.tsx** — 按钮改为 addToCart

### 风险
- 本地购物车与 WC 不同步，直到用户点击 Checkout/Buy Now
- 同一用户在不同设备上的购物车独立（无法跨设备同步）
- 但这是用户期望的行为（旧版就是这样的）

