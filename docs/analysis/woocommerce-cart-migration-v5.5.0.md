# KeyStarter WooCommerce Cart Migration v5.5.0

## 1. 任务目标

将 React SPA 自建购物车系统替换为 WooCommerce 原生购物车。
解决"付款后购物车仍显示商品"的同步问题，
消除两套购物车带来的维护成本和数据不一致风险。

## 2. 三重结构分析

### 2.1 数据层 — 当前购物车架构

```
Buy 按钮 → cart.add() → React CartContext (localStorage ks_cart)
                            ↓
                        CartFlyout (弹窗)
                            ↓
                        Cart.tsx 页面
                            ↓
                  checkout-sync.php (同步到 WC)
                            ↓
                      WooCommerce Cart
                            ↓
                      WooCommerce Checkout
                            ↓
                          付款完成
                            ↓
                   SPA Cart 未清空 → 显示异常
```

### 2.2 展示层 — 涉及的文件

| 文件 | 作用 | 修改方式 |
|------|------|---------|
| `src/CartContext.tsx` | 购物车状态管理 | 简化/移除 |
| `src/CartFlyout.tsx` | 购物车弹窗 | 移除 |
| `src/pages/Cart.tsx` | 购物车页面 | 改为跳转到 WC |
| `src/pages/Home.tsx` | Buy 按钮 (x8) | 改为 WC add-to-cart |
| `src/pages/Product.tsx` | 商品详情 Buy 按钮 | 改为 WC add-to-cart |
| `src/pages/Store.tsx` | 店铺页面 Buy 按钮 | 改为 WC add-to-cart |
| `src/App.tsx` | CartProvider + CartFlyout | 移除引用 |
| `checkout-sync.php` | 同步脚本 | 删除 |
| `ks-checkout-branding.php` | mu-plugin 样式 | 增加购物车页 CSS |

### 2.3 基础设施层 — WC 商品 ID 映射

```
629: windows-11-pro          630: windows-10-pro
631: windows-11-home         632: windows-10-home
633: office-2019-pro-plus    634: office-2021-pro-plus
637: win-11-iot-2024-entry   643: win-10-iot-2021-entry
646: win-10-iot-2019-entry
652: windows-11-pro-official 653: windows-10-pro-official
654: windows-11-home-official 655: windows-10-home-official
656-664: IoT 产品
665: win-svr-iot-2025        666: win-svr-iot-2022
667: win-svr-iot-2019
668: sql-svr-2019-runtime    669: sql-svr-2022-runtime
```

## 3. 方案设计

### 核心变更

所有 Buy 按钮改为直接跳转 WC add-to-cart URL：
```
window.location.href = "/?add-to-cart=ID&quantity=N"
```

SPA 购物车系统 (CartContext/CartFlyout) 移除，
所有购物车链接指向 WC /cart/。

### 风险分析

| 风险 | 等级 | 缓解措施 |
|------|------|---------|
| Buy 按钮 WC ID 错误 | 高 | 使用已确认的 ID，逐个测试 |
| Product.tsx 产品数据源 | 中 | 保留现有产品数据，只改点击行为 |
| i18n 翻译 keys 残留 | 低 | 编译验证 |
| checkout-sync.php 被其他引用 | 低 | 搜索确认无其他引用 |
| Special Offer 限购失效 | 中 | WC 本身不支持数量限制，通过 JS 前端限制或 WC 插件实现 |

## 4. 预写代码与执行顺序

### Step 1: 修改 Home.tsx Buy 按钮 (8处)
### Step 2: 修改 Product.tsx Buy 按钮
### Step 3: 修改 Store.tsx Buy 按钮
### Step 4: 修改 Cart.tsx 为跳转页
### Step 5: 移除 CartContext.tsx / CartFlyout.tsx
### Step 6: 更新 App.tsx (移除引用)
### Step 7: 删除 checkout-sync.php
### Step 8: 更新 mu-plugin 购物车 CSS
### Step 9: 全量审计
### Step 10: 修复 → 审计 → 修复循环
