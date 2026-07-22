# KeyStarter B2B 页面铂金数码风重构方案 v4.0.0

## 三重结构分析

### 结构一：数据层
- B2b.tsx 完全重写，使用 react-i18next 翻译
- 从 Home.tsx 搬移 3 个 section（Enterprise Compliance / Compare / Support）
- 复用 testimonials.ts 数据结构做合作方滚动展示
- 不影响 Home.tsx、不影响 WooCommerce、不影响价格系统

### 结构二：展示层
- Hero: 铂金白底 #fafafa + 数码紫 #7c3aed 强调色
- 双人群切换: Retail / Enterprise B2B tab 切换
- Enterprise Compliance 从首页搬移到 B2B
- Comparison Matrix 复制一份到 B2B
- Help & Support 复制一份到 B2B  
- 合作方招牌滚动展示(复用 testimonials 滚动逻辑)

### 结构三：基础设施层
- 走现有构建流程 (vite + tsc + validate.mjs)
- 部署 SSH 端口 2222
- 不影响首页任何功能

## 内容映射
| 来源 | 操作 | 目标 |
|------|------|------|
| Home.tsx #business section | MOVED | B2b.tsx Enterprise Compliance |
| Home.tsx #compare section | COPIED | B2b.tsx Comparison Matrix |
| Home.tsx #support section | COPIED | B2b.tsx Help & Guides |
| platinum_digital_04.html | NEW HERO | B2b.tsx Hero (Platinum style) |
| testimonials.ts | NEW | B2b.tsx Partner Showcase carousel |
