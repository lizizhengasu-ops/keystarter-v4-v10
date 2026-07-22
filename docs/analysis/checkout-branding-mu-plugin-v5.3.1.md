# KeyStarter Checkout Branding mu-Plugin v5.3.1

## 1. 任务目标

让 WooCommerce 结算页 (/checkout/) 和购物车页 (/cart/) 在视觉上与
React SPA 前端风格统一。支付流程 100% WooCommerce 原生，零改动。

---

## 2. 三重结构分析

### 2.1 数据层 — 页面结构现状

用户浏览器 -> nginx -> WordPress (PHP-FPM :8080)
  -> Astra 主题 -> WooCommerce Blocks
  -> [Astra 头部 | WC 结算块 | Astra 页脚]

### 2.2 展示层 — SPA 设计系统对照

| 元素 | SPA (React) | 当前结算页 (Astra) |
|------|-------------|-------------------|
| 主色 | #7c3aed 紫色 | Astra 蓝色 |
| 背景 | #f5f5f7 | 白色 |
| 导航栏 | 白底半透明 + 毛玻璃 | 默认浅灰标题 |
| 按钮 | 紫色 + 12px 圆角 | 蓝色 + 4px 圆角 |
| 页脚 | #161617 深色 | 浅灰色 |

### 2.3 基础设施层 — 影响范围

- 修改方式: WordPress mu-plugin
- 路径: wp-content/mu-plugins/ks-checkout-branding.php
- 只作用于 is_checkout() 和 is_cart() 页面
- 不修改主题/插件/核心文件
- 完全可逆 (删除文件即可)
- nginx/WooCommerce/PayPal/React SPA 全部不动

---

## 3. 预写代码

### 3.1 mu-plugin 核心逻辑

1. add_action wp_enqueue_scripts -> 注入 CSS (仅 checkout/cart)
2. add_action woocommerce_before_checkout_form -> 注入导航栏 HTML
3. add_action woocommerce_after_checkout_form -> 注入页脚 HTML
4. add_filter astra_header_layout -> 隐藏 Astra 头部
5. add_filter astra_footer_layout -> 隐藏 Astra 页脚

### 3.2 风险分析

| 风险 | 级别 | 缓解措施 |
|------|------|---------|
| CSS 影响其他页面 | 低 | is_checkout() + is_cart() 双重检查 |
| 导航栏链接失效 | 中 | 使用绝对 URL，不依赖 React Router |
| mu-plugin 优先级冲突 | 低 | 优先级 20，不抢占其他插件 |
| WooCommerce 版本升级 | 低 | 只用标准钩子，不用 Blocks API |
| 付款流程受影响 | 零 | 不碰支付相关钩子 |

---

## 4. 执行步骤

Step 1: 在 VPS 上创建 mu-plugin 文件
Step 2: 验证 checkout/cart 页面 CSS 正确
Step 3: 验证其他页面不受影响
Step 4: 验证付款流程正常
Step 5: 审计 + 修复循环
