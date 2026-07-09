# Keystarter 恢复指南

> 最后更新: 2026-07-06
> 项目位置: _projects/keystarter/
> 前端端口: 8117

## 快速启动

`ash
cd _projects/keystarter
npm install    # 如果 node_modules 不存在
npm run dev    # 启动开发服务器
`

## 一键构建 + SEO 注入

`ash
npm run build:seo
`

这会:
1. vite build 构建前端
2. 调用 seo-kit CLI 生成 SEO 标签
3. 注入 dist/index.html

## 完成状态

### ✅ 已完成
| 项目 | 说明 |
|------|------|
| 产品数据 | 20 个微软软件授权产品，定价准确 |
| 品牌替换 | mPhone/mifan → KeyStarter，无残留 |
| 全部页面 | Home / Store / Products / Product / Cart / Account / Support / B2B |
| 购物车 | CartContext 联动，Add to cart 完整交互 |
| 构建 | vite build 通过，dist 1.2MB |
| SEO | title/meta/OG/JSON-LD 已注入 |
| 路由 | / /store /products /product/:slug /cart /account /support /b2b |

### ⬜ 待完成 (需要你启动 Local)
| 项目 | 说明 |
|------|------|
| WordPress-kit 集成 | 需启动 Local 站点 → 读取 REST API → 同步 20 个产品到 WooCommerce |

## 接入 WordPress 的步骤

1. 在 Local by Flywheel 中启动一个 WordPress 站点
2. 告诉我站点域名和端口
3. 在 WordPress admin 中创建 REST API 密钥 (WooCommerce → 设置 → 高级 → REST API)
4. 由 wordpress-kit 自动同步所有产品

## 关键文件索引

| 文件 | 说明 |
|------|------|
| src/pages/ | 7 个页面组件 |
| src/data/products.ts | 20 个产品数据 |
| src/CartContext.tsx | 购物车状态管理 |
| src/pages/Home.tsx | 首页 (Hero + 产品卡片 + Promo + 评价) |
| src/pages/Store.tsx | 商店页 (分类 + 特色产品) |
| src/pages/Product.tsx | 产品详情页 (规格 + 购买) |
| src/pages/B2b.tsx | 企业许可方案 |
| src/pages/Support.tsx | 激活教程和帮助 |
| src/pages/Account.tsx | 账户管理和订单历史 |
| ../../_archive/seo_inject.py | SEO 注入脚本 |
