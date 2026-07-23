# =====================================================  
# KeyStarter Task Plan v5.12.0 — 三重结构分析  
# =====================================================

## Task A: Products 导航 + 全量产品页  

### 1.1 展示层 (Presentation Layer)  
**当前状态**:
- App.tsx 导航栏没有 "Products" 链接（只有 Store/Enterprise/Blog）
- /products 路由存在但指向 StorePage
- StorePage 只显示 products.slice(0, 8) 共 8 个产品
- 产品卡片只有 1 个按钮（Add to Cart），没有 Buy Now

**目标**:  
- 导航栏添加 "Products" 标签（在 Store 前面），行为同 Blog（首页用 scroll，其他页用 Link）
- /products 显示所有 WC 产品
- 产品卡片布局、addToCart、buyNow 逻辑与 homepage 一致
- 购物车图标/flyout 与 homepage 共享同一份 CartContext

### 1.2 数据层 (Data Layer)  
- etchProducts() API 已存在，从 WC Store API 获取全量产品
- CartContext 已全局可用
- WC_IDS 已在 data/woo-ids.ts 中定义

### 1.3 基础设施层 (Infrastructure Layer)  
- 路由 /products 已存在，无需新增
- 重构 StorePage：删除 products.slice，展示全部产品
- 不需要新的 Page 组件

### 代码变更  
1. **App.tsx**: 在导航添加 Products 链接
2. **Store.tsx**: 删除 .slice(0,8)，添加 Buy Now 按钮

### 风险  
- StorePage 改动可能影响已有 Store 功能 → 保持现有结构，只加不减

## Task B: B2B 合作伙伴更新  

### 1.1 展示层  
**当前**: Home.tsx 317-325 行有 3 个 partners: Microsoft/Cloudflare/Stripe  
**目标**: 替换为中国企业: Mindray(迈瑞), Han's Laser(大族激光), GE Healthcare, Philips Healthcare, Semiconductor Leaders, Rail Transit 等

### 1.2 数据层  
数据在 Home.tsx 内嵌的数组中，直接替换

### 风险  
- 只改数据不改结构，0 风险

## 执行顺序  
1. 先做 Task A（Products 导航 + 全量产品）  
2. 审计 → 修复 → 循环  
3. 再做 Task B（B2B 合作伙伴）  
4. 审计 → 修复 → 循环  
5. 最终 review-agent  
