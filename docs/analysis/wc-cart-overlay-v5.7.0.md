# KeyStarter WooCommerce Cart Overlay v5.7.0

## 1. 任务目标

在 Homepage 添加 WooCommerce 实时购物车图标+浮窗：
- Buy 按钮 AJAX 加购（不跳转）
- 导航栏购物车图标显示实时数量
- 点击图标弹出浮窗显示商品列表
- 只有 View Cart/Checkout 才跳转 WC 页面

## 2. 三重结构分析

### 2.1 数据层

WC Store API 端点：
- GET /wp-json/wc/store/v1/cart - 获取购物车数据
- POST /wp-json/wc/store/v1/cart/add-item - 添加商品
- POST /wp-json/wc/store/v1/cart/remove-item - 删除商品

API 返回格式：
`json
{
  items: [{id:1,name:...,quantity:1,prices:{price:1800,currency_code:USD}}],
  totals: {total_items:1800,currency_code:USD},
  items_count: 1
}
`

### 2.2 展示层

| 组件 | 位置 | 功能 |
|------|------|------|
| useWooCart hook | /src/hooks/useWooCart.ts | 封装 WC Store API 调用 |
| CartIcon badge | App.tsx nav | 显示购物车数量角标 |
| CartFlyout | /src/components/WooCartFlyout.tsx | 浮窗显示购物车列表 |

### 2.3 基础设施层

Buy 按钮流程：
`
点 Buy → POST /wc/store/v1/cart/add-item (AJAX)
          → 更新 useWooCart state
          → CartIcon badge 更新
          → toast 提示
`

## 3. 预写代码

### 3.1 useWooCart hook
### 3.2 WooCartFlyout 组件
### 3.3 App.tsx 购物车图标改造
### 3.4 Buy 按钮 AJAX 改造
