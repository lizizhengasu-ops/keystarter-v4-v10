# Tasks v5.13.0 — 全方案分析指导文件
## 日期: 2026-07-23

---

# 三重结构分析

## 第一层：数据层分析（Data Layer）

### Task A: Products 导航 + 全产品列表页 + 独立产品详情页

#### 当前数据流

1. Home.tsx（首页产品卡片）
   - 数据来源：硬编码的 SKUs 数组（约 13 个产品）
   - 每个 SKU 有：id(slug), title, subtitle, price, originalPrice, features[], icon, tag, type, auditInfo
   - 点击卡片 → /product/{slug}
   - addToCart/buyNow 通过 useCart() 获取

2. Store.tsx（/products 产品列表页）
   - 数据来源：fetchProducts() → WooCommerce Store API
   - 返回 SPAProduct[]: slug, name, price, description, specs, color, image
   - 卡片布局：简约风格
   - addToCart/buyNow 通过 useCart() 获取

3. Product.tsx（/product/:slug 独立详情页）
   - 数据来源：fetchProduct(slug) → 调用 fetchProducts() 再 .find()
   - 硬编码 slugMap 只映射了 6 个产品
   - addToCart 按钮有 bug：使用了未定义的变量
   - 缺少 buyNow 函数

#### 数据层问题

1. Store.tsx 卡片风格与 Home.tsx 不一致
2. Product.tsx slugMap 不必要且不完整
3. Product.tsx addToCart 按钮彻底损坏
4. Product.tsx 缺少 buyNow 按钮

### Task B: B2B Partner 轮播替换

#### 当前数据
- 轮播数组：8 组 x 2 份（无限滚动）
- 旧合作伙伴：Microsoft Partner, Cloudflare, Stripe, Namecheap, RackNerd, Brevo, PayPal, WooCommerce

#### 目标数据
- 新公司列表（8家）：
1. Mindray（迈瑞）— Medical Devices
2. Han"s Laser（大族激光）— Laser Equipment
3. GE Healthcare — Medical Imaging
4. Philips Healthcare — Health Tech
5. SMIC（中芯国际）— Semiconductor
6. CRRC（中国中车）— Rail Transit
7. Kaba Group — Access Control
8. Siemens — Industrial Automation

---

## 第二层：展示层分析（Presentation Layer）

### 路由/导航状态
- App.tsx: /products → StorePage ✅ 已存在
- App.tsx: /product/:slug → ProductPage ✅ 已存在
- Homepage Nav: Products 链接在 Store 之前 ✅ 已存在
- Other Nav: Products 链接 ✅ 已存在

### 当前展示问题

1. Store.tsx 卡片缺少：icon、features/specs 列表、tag
2. Product.tsx 缺少：buyNow 按钮
3. Product.tsx addToCart 按钮损坏

### Task B 展示层
- 已有 animate-scroll CSS 动画（60s 无限循环）
- 卡片布局不变，只需替换数据

---

## 第三层：基础设施层分析（Infrastructure Layer）

### 数据流
- Store.tsx: fetchProducts() → WooCommerce API → SPAProduct[] → 渲染
- Product.tsx: fetchProduct(slug) → fetchProducts() → .find(slug) → 渲染
- Cart: CartContext → useCart() → addToCart/buyNow → WooCommerce sync

### 构建/部署
- npm run build → dist/
- scp → /var/www/keystarter-frontend/

### 依赖
- WooCommerce API: /wp-json/wc/store/v1/products
- Cart API: /cart-sync.php
- Reviews API: /wp-json/keystarter/v1/reviews/{id}

---

# 变更方案

## Task A-1: 修复 Product.tsx（独立产品详情页）

1. 导入 buyNow：const { addToCart, buyNow } = useCart();
2. 修复 addToCart 按钮：onClick={() => addToCart(product.slug, product.name, product.price)}
3. 移除不必要的 slugMap：直接使用 slug 参数
4. 添加 Buy Now 按钮：onClick={() => buyNow(product.slug, product.name, product.price)}

风险分析：
- 纯代码修复，不影响其他组件
- Cart 集成通过共享 Context 自动生效
- 只影响 Product.tsx

## Task A-2: 优化 Store.tsx（产品列表页卡片风格）

方案选择：采用方案 A（使用 WooCommerce API 数据，保持权威数据源）
- 升级卡片布局匹配 homepage 风格
- 添加 icon、features 等元素
- 保持 addToCart/buyNow 按钮

## Task B: 替换 B2B Partner 轮播

替换 Home.tsx 中 enterprise persona 段的 partner 数组：
- 保留 animate-scroll 样式和无限滚动模式
- 只替换数据，不改变 DOM 结构

---

# 执行计划

## 第一步：修复 Product.tsx
## 第二步：优化 Store.tsx 卡片风格
## 第三步：替换 B2B Partner
## 第四步：构建测试
## 第五步：部署到 VPS
## 第六步：全量审计修复循环
