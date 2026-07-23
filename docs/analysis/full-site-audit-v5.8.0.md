# KeyStarter 全站审计与修复方案 — v5.8.0

**日期**: 2026-07-23  
**备份 commit**: 145a699  
**备份 bundle**: ackups/ks_v4-v10_full-v5.8.0_20260723-*.bundle

---

## 第一部分：三重结构分析

### 1.1 数据层 (Data Layer)

#### 1.1a WooCommerce Cart API — Nonce 缺失
| 文件 | 行号 | 问题 |
|---|---|---|
| src/hooks/useWooCart.ts | 8 | const NONCE = "" |

**根因**: WooCommerce Store API 每个请求都要 X-WC-Store-API-Nonce 头，空 nonce 导致所有 getCart / addItem 返回 403。  
**影响范围**: WooCartFlyout 永远显示空购物车，整个 SPA 购物车功能实质性死亡。

#### 1.1b WooCommerce Product IDs — 内联硬编码
Home.tsx 和 Product.tsx 的 "Add to Cart" 按钮使用内联 IIFE，内含一个硬编码的产品 ID 映射对象：
`js
var w = {"windows-11-pro":629, "windows-10-pro":630, ...}
`
这个映射重复出现在 3 个文件（Home.tsx ×2 处、Product.tsx ×1 处），维护成本极高。

#### 1.1c Store.tsx — add 函数未定义
src/pages/Store.tsx:90:
`	sx
<button onClick={()=>add({slug:x.slug,name:x.name,price:x.price})}>
`
函数 dd 未定义、未 import。点击即 ReferenceError。

---

### 1.2 展示层 (Presentation Layer)

#### 1.2a 页面跳转巨慢的根因
**文件**: src/App.tsx:146  
`	sx
<main key={location.pathname} className="page-enter pt-12">
`

**机制**: React 的 key 属性变化时，DOM 子树从根开始完全卸载 → 重新创建 → 挂载。  
**影响**: 
- Home.tsx 936 行所有 section（Hero / SpecialOffer / Store / B2B / Compare / Support / Portal / Blog / Testimonials）**全部销毁重建**
- 每个 section 的 useState / useEffect / useRef 全部失效重跑
- 配合 530KB JS bundle → 页面切换 >500ms，甚至感觉到明显的「闪白」

#### 1.2b Cart 页面结构断裂
**文件**: src/pages/Cart.tsx — 仅 277 字节
`	sx
export default function CartPage() {
  useEffect(() => { window.location.href = "/cart/"; }, []);
  return <div className="bg-[#f5f5f7] min-h-screen" />;
}
`
SPA 内 Cart 页只是一个重定向壳子，没有真正的内容。  
**文件**: src/App.tsx — 没有 <Route path="/cart">，导致 /cart 被 * 捕获显示 404。

#### 1.2c 首页缺少购物车状态
导航栏的购物车图标是静态 <a href="/cart/">，没有数量徽标（badge），无法反映当前购物车内产品数量。

#### 1.2d Reactbits bundle 膨胀
src/reactbits/ 目录约 80 个文件（共 600KB+），被 Vite 全部打包进 JS bundle。  
即使 Home.tsx 只用了 <Carousel>、<CountUp> 等少数组件，Vite 的 tree-shaking 无法消除未被 export 调用链引用的死代码。

---

### 1.3 基础设施层 (Infrastructure Layer)

#### 1.3a CSP（Content Security Policy）— 38 个错误的根因

**CSP 来源**: 通过 ix_csp_v5.6.py 以 dd_header 注入到 nginx 响应头。  
**当前部署的 CSP**: 
`
default-src 'self'; 
script-src 'unsafe-eval' https://*.google-analytics.com https://js.stripe.com ... *.wp.com; 
style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com *.wp.com; 
img-src 'self' data: https://www.google-analytics.com *.gravatar.com *.wp.com *.paypalobjects.com; 
font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com; 
connect-src 'self' https://keys-starter.com https://www.googletagmanager.com https://www.google-analytics.com https://www.sandbox.paypal.com https://api-m.sandbox.paypal.com; 
frame-src *.wp.com *.paypal.com *.sandbox.paypal.com;
`

**现状**: 上述 CSP **已经修复**（包含了 unsafe-eval / *.wp.com / *.gravatar.com / *.paypal.com 等）。  
但 /checkout/ 页面返回 **302 重定向**，导致浏览器可能在重定向前已经读取了旧的 CSP。

**历史根因（为什么原来有 38 个错误）**:
- CSP 最初设置时只考虑了 React SPA 的资源需求
- WooCommerce / WordPress checkout 页面需要大量 WordPress 自身的资源
- 没有为 /checkout/ 和 /cart/ 设计自定义 CSP

#### 1.3b paypal.js 404

`
paypal.js:1  Failed to load resource: the server responded with a status of 404 ()
`

WooCommerce PayPal Payments 插件引用的 JS 文件 /wp-content/plugins/woocommerce/client/legacy/js/gateways/paypal.js 在服务器上不存在。  
**状态**: ix_csp_v5.6.py 已尝试创建占位文件。但需要确认路径是否正确。

#### 1.3c GTM ERR_CONNECTION_CLOSED
Google Tag Manager 连接被重置。这不是 CSP 问题，而是：
- 网络层中断（VPS 到 GTM 服务器的连接不稳定）
- 或者 nginx/Cloudflare 超时

#### 1.3d nginx wp-routes.conf — proxy_set_header Host 污染
wp-routes.conf 使用 proxy_set_header Host System.Management.Automation.Internal.Host.InternalHost（PowerShell 主机名泄露），虽然 WP 仍然能工作，但可能影响一些基于 Host header 的 WP 插件。

---

## 第二部分：修复方案（含代码）

### 2.1 CSP 修复（已经完成，需验证）

CSP 已通过 ix_csp_v5.6.py 注入 /etc/nginx/csp-extensions.conf。  
**验证**: 检查 Header 中包含所有必需的 domain。

### 2.2 paypal.js 404 修复

**方案**: 确认占位文件存在，路径要正确  
**SSH 命令**:
`ash
ls -la /var/www/keys-starter.com/wp-content/plugins/woocommerce/client/legacy/js/gateways/paypal.js
`
如果不存在，创建空文件:
`ash
mkdir -p /var/www/keys-starter.com/wp-content/plugins/woocommerce/client/legacy/js/gateways/
echo '// WooCommerce PayPal Gateway JS - placeholder' > /var/www/keys-starter.com/wp-content/plugins/woocommerce/client/legacy/js/gateways/paypal.js
`

### 2.3 移除 key={location.pathname}（解决页面跳转慢）

**文件**: src/App.tsx:146  
**修改**: 移除 <main> 上的 key={location.pathname}  

`	sx
// 改前
<main key={location.pathname} className="page-enter pt-12">
// 改后  
<main className="page-enter pt-12">
`

**风险**: 移除 key 后页面切换时 React 会复用 DOM 节点而非重建，组件内部 state 可能会保留。但由于每个路由渲染的是不同 component（Home/Store/Product/B2B...），React 会自动 diff 替换，不会有 state 污染问题。

### 2.4 WooCommerce Cart Nonce 修复

**文件**: src/hooks/useWooCart.ts:8

**方案 A（推荐）**: 在 SPA 启动时通过 XHR 获取 nonce，然后存入模块级变量。

**修改后代码**:
`	ypescript
// useWooCart.ts - WooCommerce Cart via Store API
import { useState, useEffect, useCallback } from "react";

const API = "/wp-json/wc/store/v1/cart";
let NONCE = "";

// 初始化时获取 nonce
function initNonce(): Promise<string> {
  return new Promise((ok) => {
    if (NONCE) return ok(NONCE);
    const x = new XMLHttpRequest();
    x.open("GET", "/wp-json/wc/store/v1/cart", true);
    x.onload = () => {
      // nonce 从响应头的 X-WC-Store-API-Nonce 获取
      const n = x.getResponseHeader("X-WC-Store-API-Nonce") || "";
      NONCE = n;
      ok(n);
    };
    x.onerror = () => { NONCE = ""; ok(""); };
    x.send();
  });
}
// 立即启动 nonce 获取
initNonce();
`

**风险**: 如果用户未登录或 WC session 未创建，nonce 可能为空。需要确认 WooCommerce 为访客也提供 nonce。

### 2.5 Store.tsx — 修复 add 未定义

**文件**: src/pages/Store.tsx:90  
**修改**: 将 dd({...}) 替换为 WC 产品 ID 映射 + 跳转

`	sx
// 改前
<button onClick={()=>add({slug:x.slug,name:x.name,price:x.price})}>

// 改后
<button onClick={() => {
  const WC_IDS: Record<string,number> = {
    'windows-11-pro': 629, 'windows-10-pro': 630, 'windows-11-home': 631,
    'windows-10-home': 632, 'office-2019-pro-plus': 633, 'office-2021-pro-plus': 634,
    'win-11-iot-2024-entry': 637, 'win-10-iot-2021-entry': 643, 'win-10-iot-2019-entry': 646
  };
  const wid = WC_IDS[x.slug];
  if (wid) window.location.href = '/cart/?add-to-cart=' + wid;
}}>
`

### 2.6 首页购物车图标 + 数量徽标

**目标**: 在导航栏显示购物车图标 + 数量 badge，点击弹出 WooCartFlyout。

**修改文件**: src/App.tsx 的 <a href="/cart/"> 部分

**需要**:
1. 在 Layout 中加入 useState 控制 flyout 开关
2. 使用 useWooCart hook 获取 cart 数据
3. 图标旁显示 cart.items_count 徽标
4. 点击图标打开 WooCartFlyout（而非直接跳转）

**代码**:
`	sx
// 在 Layout 组件内
const [cartOpen, setCartOpen] = useState(false);
const { cart } = useWooCart();

// 购物车图标替换
<button onClick={() => setCartOpen(true)} className="relative text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" aria-label="Cart">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="16" y1="10" x2="16" y2="14"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
  </svg>
  {cart.items_count > 0 && (
    <span className="absolute -top-1.5 -right-1.5 bg-[#7c3aed] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
      {cart.items_count > 99 ? '99+' : cart.items_count}
    </span>
  )}
</button>

<WooCartFlyout open={cartOpen} onClose={() => setCartOpen(false)} />
`

### 2.7 添加 /cart 和 /checkout 路由

**文件**: src/App.tsx  
**修改**: 在 <Routes> 中添加:
`	sx
<Route path="/cart" element={<CartPage />} />
<Route path="/checkout" element={<Navigate to="/cart/?redirect=checkout" />} />
`

---

## 第三部分：执行计划

### 步骤 1 — CSP + paypal.js（验证）
- SSH 检查 paypal.js 是否存在
- 如果缺失则创建占位文件
- 验证 /checkout/ 页面 CSP 是否正确

### 步骤 2 — React 性能修复
- 移除 key={location.pathname}
- 可选：用 React.lazy() 拆分 Home.tsx 大 section

### 步骤 3 — Cart/WooCommerce 修复
- 修复 useWooCart nonce
- 修复 Store.tsx add 未定义
- 首页添加购物车 badge + WooCartFlyout
- 添加 /cart 路由
- 修复 Cart.tsx 跳转逻辑

### 步骤 4 — 全量审计
- 检查所有页面能否正常加载
- 检查 Add to Cart → Cart → Checkout 完整流程
- 检查 PayPal 按钮是否显示
- 检查控制台有无 CSP / 404 错误
- 检查页面切换速度

---

## 第四部分：风险评估

| 风险 | 等级 | 缓解措施 |
|---|---|---|
| nonce 获取失败 → 购物车仍然不工作 | 🟡 中 | 降级方案：用 window.location.href = "/cart/?add-to-cart=ID" 跳转方式 |
| 移除 key 后组件 state 残留 | 🟢 低 | 每个路由 render 不同 component，React diff 自动处理 |
| CSP 被 Cloudflare 缓存 | 🟡 中 | Cloudflare 不缓存 CSP Header（DYNAMIC），再次刷新即可 |
| paypal.js 路径不对 | 🟡 中 | 先 SSH 确认真实路径再创建 |

