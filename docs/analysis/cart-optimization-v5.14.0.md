# Cart Optimization v5.14.0 — 全量方案分析指导文件
## 日期: 2026-07-23

---

# 三重结构分析

## 第一层：数据层分析（Data Layer）

### 当前数据流 (Before)

\\\
useWooCart.ts 生命周期:
  初始化 → fetchCart() GET /wp-json/wc/store/v1/cart (慢: 500-2000ms)
          → 数据存 sessionStorage
          → 显示 Cart

  addToCart() → 更新 local state (0ms)
              → POST /cart-sync.php {slug, qty} (慢: 100-500ms)

  checkout() → redirect to /checkout-sync.php
             → PHP 同步全部 items → WC Checkout
\\\

### 目标数据流 (After)

\\\
useWooCart.ts 生命周期:
  初始化 → loadCart() 从 sessionStorage (0ms)
          → 直接显示 Cart ✅ (没有 API 调用)

  addToCart() → 更新 local state (0ms) ✅
              → pendingItems.push({slug, qty})
              → 启动/重置 3s 防抖计时器
              → 计时器到期 → 合并 POST 一次批量同步

  checkout() → flush 防抖 pending 同步
             → redirect to /checkout-sync.php
             → PHP 同步全部 items → WC Checkout

  refresh() → GET /wp-json/wc/store/v1/cart (只在飞窗打开时触发)
            → 对比本地数据
            → 有差异 → 用 WC 覆盖本地
\\\

### 涉及的数据结构

| 数据 | 存储位置 | 读写速度 |
|------|---------|---------|
| 购物车 items | sessionStorage (ks_cart_v5) | 0ms |
| pending 待同步项 | useRef (内存) | 0ms |
| WooCommerce 购物车 | MySQL (VPS) | 100-500ms |

---

## 第二层：展示层分析（Presentation Layer）

### 当前组件依赖

\\\
CartProvider (CartContext.tsx)
  └─ useWooCart()
       ├─ cart: WCCart           → Cart 图标数字、飞窗列表
       ├─ addToCart()            → 产品卡片的 Add to Cart 按钮
       ├─ checkout()             → 飞窗 Checkout 按钮
       ├─ buyNow()               → 产品卡片的 Buy Now 按钮
       ├─ clearCart()            → 清除购物车
       └─ refresh: fetchCart()   → (当前未暴露到 context)

WooCartFlyout.tsx
  ├─ cart → 显示商品列表
  ├─ checkout() → 结算
  └─ View Cart → <a href="/cart/">
\\\

### 修改后的组件依赖

\\\
CartProvider (CartContext.tsx)
  └─ useWooCart()
       ├─ cart                         → 不变
       ├─ addToCart()                  → 防抖版本
       ├─ checkout()                   → flush + redirect
       ├─ buyNow()                     → 不变（依赖 addToCart）
       ├─ clearCart()                  → 不变
       └─ refresh()                    → **新增暴露**

WooCartFlyout.tsx
  ├─ cart → 不变
  ├─ checkout() → 不变
  ├─ refresh() → **新增：打开飞窗时触发后台校验**
  └─ useEffect → **新增：监听 open 状态变化**
\\\

---

## 第三层：基础设施层分析（Infrastructure Layer）

### 数据传输路径

\\\
改前:
  Add to Cart → XHR POST /cart-sync.php → PHP → MySQL (100-500ms)
  View Cart  → XHR GET /wc/store/v1/cart → PHP → MySQL (500-2000ms)

改后:
  Add to Cart → 0ms (本地) + 3s 后 → XHR POST /cart-sync.php (合并批量)
  View Cart  → 0ms (本地 sessionStorage)
              → 打开飞窗时后台 → XHR GET /wc/store/v1/cart (对比校验)
\\\

### 风险矩阵

| 风险 | 概率 | 影响 | 缓解措施 |
|------|:----:|:----:|---------|
| 用户 F5 刷新前 3s 内加购的数据未同步 | 低 | 丢失该次加购 | 防抖只有 3s, 用户正常操作不会 F5 |
| checkout 前有 pending 未同步 | 中 | 结算时数量不对 | checkout() 先 flush pending |
| 用户在 WC Checkout 改数量后退回 | 低 | 本地 vs WC 不一致 | 打开飞窗时后台 pull 校验覆盖 |
| 两个浏览器 Tab 同时操作 | 极低 | 覆盖对方数据 | 你的用户不会多 tab 操作同一网站 |
| WordPress REST API 超时 | 低 | 校验失败不影响本地 | refresh() catch 静默失败 |

### 代码预写及影响分析

---

## 预写代码 & 潜在问题分析

### 文件 1: src/hooks/useWooCart.ts

\\\	ypescript
// 改动 1: 移除初始化 API 调用
// 改前:
//   useEffect(() => { fetchCart(); }, [fetchCart]);
// 改后:
//   删除此行 — 不再初始化时拉取 API

// 改动 2: 添加 useRef（在 useState 之后）
// 在 const [cart, setCart] = useState<WCCart>(loadCart); 之后添加:
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ slug: string; qty: number }[]>([]);

// 改动 3: addToCart 使用防抖
// 将现有的:
//   xhr("POST", SYNC, { items: [{ slug, qty }] }).catch(() => {});
// 替换为:
    pendingRef.current.push({ slug, qty });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const items = [...pendingRef.current];
      pendingRef.current = [];
      xhr("POST", SYNC, { items }).catch(() => {});
    }, 3000);

// 改动 4: checkout flush pending
// 在 checkout 函数开头添加:
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (pendingRef.current.length > 0) {
      const pending = [...pendingRef.current];
      pendingRef.current = [];
      try { await xhr("POST", SYNC, { items: pending }); } catch {}
    }

// 改动 5: refresh 函数
// 将现有的 fetchCart 改为只在校验时才拉取:
  const refresh = useCallback(async () => {
    try {
      const d = await xhr("GET", API);
      const wcCart = parseCartFromApi(d);
      const current = loadCart();
      if (JSON.stringify(current) !== JSON.stringify(wcCart)) {
        saveCart(wcCart);
        setCart(wcCart);
      }
    } catch { /* 静默失败,不影响本地 */ }
  }, []);
\\\

### 潜在问题 1: useRef 持久性
- **描述**: useRef 在组件重渲染时保持引用不变，适合存 timer/pending
- **风险**: 低 ✅
- **缓解**: useRef 是 React 标准模式

### 潜在问题 2: addToCart 闭包捕获
- **描述**: useCallback(() => { ... }, []) 的空依赖数组意味着函数不会被重建
- **风险**: 中
- **缓解**: pendingRef.current 和 debounceRef.current 都是 ref，不依赖闭包捕获 ✅
         setCart(prev => ...) 使用函数式更新 ✅
         loadCart() 直接读 sessionStorage ✅

### 潜在问题 3: checkout async/await
- **描述**: checkout 函数现在是 async，但 CartContextType 接口声明了 () => void
- **风险**: 低 ✅ — TypeScript 允许 async 函数赋值给 () => void 类型

### 潜在问题 4: refresh 在 CartContext 中的暴露
- **描述**: CartContextType 接口需要添加 refresh
- **风险**: 低 ✅ — 只添加新字段，不修改现有字段

### 文件 2: src/data/CartContext.tsx

\\\	ypescript
// 在 CartContextType 接口中添加 refresh
export interface CartContextType {
  cart: WCCart;
  addToCart: (slug: string, name: string, price: number, qty?: number) => void;
  checkout: () => void;
  buyNow: (slug: string, name: string, price: number) => void;
  clearCart: () => void;
  refresh: () => Promise<void>;  // ← 新增
}
\\\

### 潜在问题 5: refresh 未在 CartProvider 中传递
- **描述**: CartContext 目前只是 useWooCart 的代理，如果 useWooCart 返回 refresh，则 CartProvider 自动传递
- **风险**: 极低 ✅ — eturn <CartCtx.Provider value={wooCart}>{children}</CartCtx.Provider> 已经解构了所有返回值

### 文件 3: src/components/WooCartFlyout.tsx

\\\	ypescript
// 在文件顶部添加 useEffect 导入:
import { useEffect } from "react";

// 在函数组件内添加:
  const { cart, checkout, refresh } = useCart();

  // 打开飞窗时触发后台校验
  useEffect(() => {
    if (open) refresh();
  }, [open]);
\\\

### 潜在问题 6: react import 冲突
- **描述**: WooCartFlyout 当前没有 import react，但用了 JSX
- **风险**: 极低 ✅ — JSX Runtime 17+ 自动处理，无需显式 import React
- 需要添加 import { useEffect } from "react";

---

## 执行计划

### Step 1: 修改 useWooCart.ts
1. 删除 useEffect(() => { fetchCart(); }, [fetchCart]);
2. 添加 useRef 导入（如果尚未导入）— 当前已导入
3. 添加 debounceRef + pendingRef
4. 修改 addToCart — 防抖替代即时 POST
5. 修改 checkout — 添加 flush pending
6. 重命名 fetchCart → refresh，修改逻辑为对比校验
7. 将 refresh 加入 return 对象

### Step 2: 修改 CartContext.tsx
1. 在 CartContextType 接口添加 efresh: () => Promise<void>;

### Step 3: 修改 WooCartFlyout.tsx
1. 添加 import { useEffect } from "react";
2. 解构 efresh from useCart
3. 添加 useEffect(() => { if (open) refresh(); }, [open]);

### Step 4: 构建测试
1. npm run build

### Step 5: 部署
1. scp dist/

### Step 6: 审计循环
1. review-agent
2. 修复
3. 重复直到零问题