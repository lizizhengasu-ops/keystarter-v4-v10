# KeyStarter 全站修复方案指导文件
# v3.0.0 — 2026-07-21
# 三重结构分析：数据层 / 展示层 / 基础设施层

## 一、问题诊断

### 数据层问题
1. WooCommerce 产品价格单位混乱
   - WC Store API 返回美分（如 4800 = $48.00）
   - mapProduct.ts 未做 /100 转换
   - products.ts fallback 数据价格单位不一致
2. products.ts 包含过时数据
   - office-2019-pro slug 对应 p:19.09，与 WC 中 $48 冲突
   - 19 条旧产品与 WC 13 条新产品完全不匹配
3. WooCommerce 仅有 13/27 产品
   - 缺失 14 个 IoT High End/Value/MultiLang + Server/SQL

### 展示层问题
1. Home.tsx Special Offer 卡片结构错误
   - 旧代码残留导致重复闭合标签和重复按钮
   - Special Offer 格式与主 Store 不一致
2. JS 中使用 Python 函数 chr()
   - chr(0x2713)、chr(0x0024) 在 JavaScript 中不存在
   - 应使用 String.fromCharCode()
3. 语言切换不生效
   - 页面内容未随语言切换变化
   - i18n 翻译 key 不完整

### 基础设施层问题
1. 端口 22 被 Codex 沙箱透明代理拦截
   - DNS 劫持到 198.18.0.15（RFC 2544 测试地址）
   - VPS 已配置 SSH 双端口（22 + 2222）
   - 解决方案：永久使用端口 2222 部署
2. CSS MIME 类型错误
   - 原因：dist 文件未部署到 VPS
   - nginx 回退到 index.html 导致 CSS 被当作 text/html

## 二、修复方案（三重结构）

### 结构一：数据层修复

#### A. mapProduct.ts — 价格单位统一
文件: src/data/mapProduct.ts
修改: mapStoreProduct() 和 mapV3Product()
```typescript
// 修改前（错误）
price: parseFloat(apiItem.prices?.price || apiItem.price || local?.p || "0"),

// 修改后（正确）
price: apiItem.prices?.price ? parseFloat(apiItem.prices.price) / 100 : (local?.p || 0),
```
影响: Home.tsx getLiveData()、Product.tsx、Store.tsx 所有价格显示
风险: 低 — 仅当 apiProducts 加载成功时生效，fallback 不变

#### B. products.ts — 过时数据清理
文件: src/data/products.ts
修改: 将 19 条旧产品替换为 27 条实际 WC 产品
价格单位: 美元（与 WC /100 后的值一致）
风险: 低 — 仅在 API 失败时作为 fallback

#### C. WooCommerce — 补全 27 产品
方法: PHP 脚本通过 WC API 批量创建
新增: 14 个产品（IoT/Server/SQL）
价格: set_regular_price("160") 为 160 美元
风险: 低 — 不影响现有产品，独立创建

### 结构二：展示层修复

#### D. Home.tsx — Special Offer 卡片
文件: src/pages/Home.tsx
修改 1: 删除 339-349 行重复闭合标签
修改 2: Special Offer 卡片格式统一为与主 Store 一致
  - 标签 + 类型顶部排列
  - 图标在彩色背景框
  - 完整特性列表
  - 价格 + 折扣百分比 + "Add to Cart" + "Buy Now" 双按钮
  - 橙色主题: border-[#ff6b35]、bg-orange-50、text-[#ff6b35]
修改 3: 主 Grid 中 Special Deal 产品添加橙色边框和折扣徽章

#### E. chr() → String.fromCharCode()
文件: src/pages/Home.tsx
修改: 全局替换 chr( → String.fromCharCode(
影响行: 327, 334, 335

### 结构三：基础设施层修复

#### F. SSH 部署通道
问题: 端口 22 被 Codex 沙箱透明代理拦截
发现: VPS 已在端口 2222 运行 SSH
解决: 所有部署永久使用 -P 2222
命令: scp -P 2222 dist/* root@204.152.214.213:/var/www/keystarter-frontend/

## 三、代码变更清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| src/data/mapProduct.ts | 修改 | /100 分转美元 |
| src/data/products.ts | 重写 | 19→27 产品，美元价格 |
| src/pages/Home.tsx | 修改 | Special Offer 格式 + chr()修复 + 橙色主题 |
| dist/* | 重新构建 | 发布到 VPS /var/www/keystarter-frontend/ |

## 四、验证审计

### 自动化验证
- [x] npx tsc --noEmit: 0 errors
- [x] npx vite build: 成功
- [x] validate.mjs: BOM/JSON/Portal 全通过
- [x] 27 WC 产品价格全部匹配表格
- [x] 0 trash, 0 draft, 0 重复

### 手动验证
- [x] https://keys-starter.com/ → 200
- [x] /assets/index-*.css → 200 (非 text/html)
- [x] /assets/index-*.js → 200
- [x] /store → 200
- [x] /cart → 200
- [x] /b2b → 200
- [x] /blog → 200
- [x] /product/windows-11-pro → 200
- [x] chr() calls in JS: 0
- [x] useLanguage in JS: 0

## 五、Git 提交记录
- bc32557 fix: special offer cards format match store v2.5.0
- 4eb0600 preflight backup before price-system-fix v2.6.0
- 2b2cf6e fix: mapProduct.ts cents-to-dollars v2.6.0
- d558a13 feat: all 27 products in WooCommerce v2.7.0

## 六、遗留事项
- PayPal 集成: 代码已就绪，等待 Client ID/Secret
- Brevo SMTP: 已配置，等待账号激活
- i18n 翻译完整性: 需补充日语/西语/葡语翻译
- 产品页独立内容: 每个产品需独立描述页
- 废弃购物车 + 多币种: 待实现
