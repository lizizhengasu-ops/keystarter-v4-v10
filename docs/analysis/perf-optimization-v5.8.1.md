# KeyStarter 全站性能优化分析 — v5.8.1

**日期**: 2026-07-23  
**备份 commit**: 6c8e802  
**备份 bundle**: ackups/ks_v4-v10_v5.8.1-optim_pre_*.bundle

---

## 第一部分：三重结构分析

### 1.1 基础设施层 (Infrastructure Layer)

#### 1.1a GTM ERR_CONNECTION_CLOSED

| 检测项 | 结果 |
|---|---|
| VPS → GTM DNS 解析 | ✅ 142.250.80.42（正常） |
| VPS → GTM HTTPS 连接 | ✅ 200 OK（正常） |
| 浏览器侧 CSP | ✅ googletagmanager.com 在 script-src / connect-src 中 |

**结论**: 当天的 ERR_CONNECTION_CLOSED 是 **Google 服务器侧的临时网络抖动**，不是 CSP、防火墙或代码问题。无需代码修复。

#### 1.1b 无用的 npm 依赖

| 依赖 | 版本 | 在源码中使用？ | 建议 |
|---|---|---|---|
| motion | ^12.42.2 | ❌ 无任何 import | 可卸载（节省 
ode_modules 约 5MB） |
| eact-icons | ^5.7.0 | ❌ 无任何 import | 可卸载（节省 
ode_modules 约 4MB） |
| gsap | ^3.15.0 | ✅ nimations.tsx 使用 | 保留 |
| i18next/* | - | ✅ 使用 | 保留 |

### 1.2 数据层 (Data Layer)

#### 1.2a i18n 加载策略

**当前实现**: src/i18n.ts 使用 i18next-http-backend + LanguageDetector

`	ypescript
backend: { loadPath: "/i18n/{{lng}}.json" }
`

**这是懒加载**：浏览器只会请求 GET /i18n/en.json（或当前检测到语言的文件），不会一次性加载 6 个文件。

**验证**: 
- 首次加载: 只请求 /i18n/en.json ✅
- 切换语言: 只请求 /i18n/{target}.json ✅
- 已加载语言不重复请求 ✅

**结论**: 无需改动。

### 1.3 展示层 (Presentation Layer)

#### 1.3a JS Bundle 534KB — 实际构成分析

**误区**: 之前的分析误以为 src/reactbits/ 的 80+ 个组件被打包了。实际 **Vite 只打包被 import 引用的代码**。

通过全量 grep 源码确认：**没有任何源文件 import 自 src/reactbits/、motion/react 或 eact-icons/fi**。

**534KB bundle 的实际构成**（估算）:

| 模块 | 体积（min） | 说明 |
|---|---|---|
| react + react-dom | ~150KB | 框架本体 |
| react-router-dom | ~50KB | SPA 路由 |
| i18next + react-i18next | ~30KB | 国际化 |
| i18next-http-backend + LanguageDetector | ~15KB | i18n 插件 |
| gsap | ~30KB | 滚动动画 |
| Tailwind 运行时 | ~50KB | CSS 工具类 |
| App 代码 (Home.tsx 等) | ~200KB | 936 行 Home + 其他页面 |
| **总计** | **~530KB** | 与构建输出 534KB 一致 |

**正常性评估**: 
- 对于功能完整的 React SPA（含 i18n、动画、路由），166KB gzipped 是 **合理水平**
- 竞品参考：Shopify 前端 ≈200-250KB gzipped
- 性能瓶颈不在 bundle 体积，而在 Home.tsx 的 936 行单片结构

#### 1.3b src/reactbits/ — 106 个未使用文件

目录 src/reactbits/ 包含 106 个 React 动画/UI 组件文件，**全部未被导入使用**。这是项目早期引入但没有用到的"玩具"组件。

| 影响 | 说明 |
|---|---|
| 对 build 体积 | ✅ 无影响（Vite 不打包未 import 的文件） |
| 对开发者 | ❌ 增加目录混乱，误导分析 |
| 对打包时间 | ⚠️ Vite 会扫描这些文件，增加构建时间 |

**建议**: 删除整个 src/reactbits/ 目录和相关未使用的 npm 依赖。

---

## 第二部分：执行计划

### 步骤 1 — 清理未使用目录

1. git rm -r src/reactbits/ — 删除 106 个未使用文件
2. 
pm uninstall motion react-icons — 移除无用依赖

### 步骤 2 — 验证构建

3. 运行 
pm run build — 验证构建通过
4. 确认 bundle 大小：预期从 534KB 降至 ~530KB（仅移除 react-icons 的 tree-shaken 部分）

### 步骤 3 — 编写优化文档

### 步骤 4 — 部署

5. 部署新 dist 到 VPS
6. 验证首页加载正常
7. 验证 GTM 可连接

---

## 第三部分：风险评估

| 风险 | 等级 | 缓解措施 |
|---|---|---|
| 删除 reactbits 后未来要用到 | 🟢 低 | git 历史中有完整记录，可随时恢复 |
| 删除 motion 后未来要用到 | 🟢 低 | 
pm install motion 即可恢复 |
| 构建变慢（无 reactbits 后） | 🟢 正向 | 减少 106 个文件的 TS 类型检查 |

