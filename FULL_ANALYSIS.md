# keystarter-v4 全量复盘分析报告

> 日期: 2026-07-09
> 分析目标: V4 设计稿 (design-v4.html) vs React 实现 (Home.tsx)

---

## 一、项目完整时间线

### Phase 1: 服务器部署 (07/08 - 07/09)
| 时间 | 事件 | 问题 |
|------|------|------|
| 07/08 | 购买 RackNerd VPS $21.99/年 | — |
| 07/08 → 07/09 | VPS 首次开机死锁 | Online 但 SSH 超时 |
| 07/09 07:00 | PowerOff → Boot 恢复 | Unknown Error |
| 07/09 07:10 | Reinstall 重装 | 新 root 密码 |
| 07/09 07:30 | SSH 调试 | Windows SSH 卡死在 KEX 阶段 |
| 07/09 08:10 | 发现 Git for Windows SSH 可用 | OpenSSH 10.3p1 vs 9.5p2 |
| 07/09 08:12 | WordPress + WooCommerce 安装 | 成功 |
| 07/09 08:20 | MTU 1360 + SSH 端口调整 | 解决 SSH 连接问题 |
| 07/09 08:30 | SSL 自签名 + Cloudflare Full | 网站上线 |

### Phase 2: V4 设计改造 (07/09)
| 步骤 | 操作 | 结果 |
|------|------|------|
| 2.1 | 隔离复制 keystarter → keystarter-v4 | ✅ |
| 2.2 | 凭记忆写 V4Hero/V4SkuCard 组件 | ❌ 和 V4 设计差异大 |
| 2.3 | 发现 Tailwind CSS 未处理 | ❌ CSS 2.2KB → 修复后 97KB |
| 2.4 | 直接从 V4 HTML 转 JSX | ⚠️ 有 JSX 兼容性问题 |
| 2.5 | 修复 void elements、> 字符转义 | ✅ 构建成功 |

---

## 二、V4 设计 vs 当前实现的详细对比

### 总体对比

| 维度 | V4 设计稿 (design-v4.html) | 我们的实现 (Home.tsx) | 差异 |
|------|---------------------------|----------------------|------|
| 文件大小 | 71,432 bytes | 19,753 bytes | ⚠️ 差 3.6x |
| 中文字符 | ~2520 个 | 0 个 | ✅ 已翻译 |
| 页面结构 | 单页滚动 + 锚点导航 | React 路由多页面 | ⚠️ 架构不同 |
| SKU 卡片 | 10 个内联硬编码 | 从 products.ts 动态生成 | ✅ 更灵活，但缺失图标 |
| Hero 区域 | 直接包含 trust bar | ✅ 已有 | ✅ |
| 导航栏 | 独立 nav 标签 | App.tsx 中内联 | ⚠️ 未使用 V4 nav |
| 页脚 | 深色 bg-[#161617] | App.tsx 中的浅灰色 | ❌ 颜色外观不匹配 |
| B2B 表单 | 完整交互 | ✅ 大部分保留 | ✅ |
| 对比表 | 固定表格 | ✅ 动态数据 | ✅ |
| FAQ | 内联 | ✅ 组件化 | ✅ |
| FontAwesome | 全量图标 | ❌ 无品牌图标 | ❌ 缺少 fa-windows, fa-microsoft |
| 滚动动画 | scrollToSection JS | ❌ 未实现 | ❌ |

### 区块级对比

```
V4 设计区块:  nav(2264) | hero(2840) | store(27160) | b2b(5908) | compare(3247) | support(5028) | footer(1237)
                                       ↓ 直接转 JSX 有标签闭合问题
我们的实现:  导航(在 App.tsx) | hero | store(含动态卡片) | b2b | compare | support | 页脚(在 App.tsx)
```

### V4 设计的 10 个 SKU 卡（内联固定）

实际 V4 设计中的 SKU 卡有 10 个固定产品，使用 **FontAwesome 品牌图标**：
- fa-windows (蓝色) → Windows 产品
- fa-microsoft (橙色) → Office 产品
- fa-database (紫色) → 服务器产品

我们的实现从 products.ts 动态生成，但 **图标使用了简单的字符代替**，因为字体未加载。

---

## 三、关键差异及根因

### 差异 1：页面架构不同

| | V4 设计 | 我们的实现 |
|---|---------|-----------|
| 架构 | 单页 HTML，锚点导航 (#store, #business, #compare) | React SPA，React Router 路由 (/store, /b2b, /support) |
| 导航 | 锚点链接滚动到对应区块 | 跳转到独立页面 |

**根因**: V4 是单页面设计，我们的 React 应用是多页 SPA。当我们把 V4 所有区块放进 Home.tsx 时，其他独立页面 (Store/B2B/Support 等) 仍然存在，导致内容重复。

### 差异 2：导航栏完全不同

| | V4 设计 | 我们的 App.tsx |
|---|---------|---------------|
| 品牌 | 网格图标 logo | Apple 风格 logo |
| 链接 | Store / B2B / Compare / Support / Portal | Store / Products / Support / Account / B2B / Cart |
| 颜色 | 白色毛玻璃 | 白色毛玻璃 |
| 页脚 | 深色 (#161617) | 浅灰 (#f5f5f7) |

**根因**: 直接从 V4 HTML 提取导航时，我提取了导航 HTML 但没有替换 App.tsx 中的导航。V4 的导航位于单独的 HTML 中，而我们的导航在 App.tsx 中。

### 差异 3：FontAwesome 图标缺失

V4 设计大量使用 FontAwesome 图标：
- 产品卡片品牌图标 (fa-windows, fa-microsoft, fa-database)
- 导航图标
- 交互元素

我们虽然在 index.html 添加了 CDN，但构建环境中 CDN 加载可能有延迟或缓存问题。

### 差异 4：SKU 卡片结构差异

V4 设计的 SKU 卡片有 10 个固定产品，使用精确的 FontAwesome 品牌图标。我们的实现从 products.ts 动态生成 14+ 个产品，但图标使用简单的字符占位。

**根因**: 我提取了 SKU 卡片模板，但用动态渲染替换了 10 个固定卡片。动态渲染不能精确匹配每个产品应有的品牌图标和标签。

### 差异 5：交互功能缺失

V4 设计包含 JavaScript 交互功能：
- scrollToSection() 锚点滚动
- filterSKU() 分类筛选
- B2B 表单提交处理
- FAQ 手风琴

在我们的实现中：
- 分类筛选 ✅ (React state)
- B2B 表单 ✅ (React event handler)
- FAQ 手风琴 ✅ (HTML details/summary)
- 锚点滚动 ❌ (页面是多页路由，不是单页)

---

## 四、工作流问题诊断

### 4.1 PowerShell 转义问题（反复出现）

**现象**: 在 PowerShell 中编写包含 `$`、`>`、`<` 的代码时被解释为运算符。

**根因**: PowerShell 使用不同的转义规则（反引号 ` 而非反斜杠 \）。

**影响**: 
- Nginx 配置写入失败
- 脚本文件创建失败
- 延长了 2+ 小时调试时间

**解决方案**: 使用 Node.js MCP 工具或写文件后 SCP 上传。

### 4.2 HTML-to-JSX 转换问题

**现象**: 直接从 V4 HTML 复制到 JSX 时报错：
- `class` → `className` 未转换
- `onclick` → `onClick` 未转换
- `<input>` 需自闭合 `<input />`
- `>` 在文本中需转义为 `{'>'}`
- HTML 注释 (`<!-- -->`) 导致解析错误

**根因**: HTML 和 JSX 语法差异未被正确处理。

### 4.3 Tailwind CSS 缺失

**现象**: 页面无样式
**根因**: Tailwind CSS v4 需要 `@tailwindcss/postcss` 插件和 `postcss.config.js` 配置，但项目没有这些。
**影响**: 所有 Tailwind utility 类 (`bg-[#f5f5f7]`, `rounded-full` 等) 不生效，页面完全无样式。

---

## 五、修复建议

### 优先级 P0（必须修复）

1. **同步导航栏**: 将 V4 导航 HTML 转换为 React 组件，替换 App.tsx 中的导航
2. **修复页脚颜色**: 将 App.tsx 页脚改为 V4 深色风格
3. **确保 FontAwesome 工作**: 验证 CDN 加载或安装 npm 包

### 优先级 P1（重要）

4. **用 Node.js 写脚本**: 所有包含特殊字符的文件操作必须用 Node.js MCP 工具
5. **HTML-to-JSX 转换器**: 创建一个可靠的转换函数处理 class、onclick 等
6. **统一区块管理**: V4 区块放入单独的组件文件，Home.tsx 只负责组装

### 优先级 P2（优化）

7. **消除中文残留**: 扫描所有文件确认无中文
8. **确保所有 `>` 在 JSX 中被转义**: 全局扫描
9. **构建流程文档化**: 记录正确的构建步骤

---

## 六、可复用的部署流程

```
1. 购买 VPS → Ubuntu 22.04
2. SolusVM: Reinstall（不要反复尝试 PowerOff）
3. SSH: 使用 Git for Windows SSH，不要用 Windows 内置 SSH
4. MTU: ip link set dev eth0 mtu 1360
5. 部署: WP-CLI 直接装 WordPress + WooCommerce（跳过 EasyEngine）
6. SSL: 用自签名证书 + Cloudflare Full 模式
7. 前端: 隔离复制项目 → 改造 → 构建 → 部署
8. HTML→JSX: 使用 Node.js 脚本，避免 PowerShell 转义
9. Tailwind: 必须安装 @tailwindcss/postcss 和 postcss.config.js
10. 字体图标: FontAwesome CDN 或 npm 包
```

---

## 七、文件索引

| 文件 | 说明 | 状态 |
|------|------|------|
| design-v4.html | 原始 V4 设计稿 (Gemini) | 参考 |
| src/pages/Home.tsx | V4 设计转 React 实现 | ✅ 可运行 |
| src/components/v4/V4SkuCard.tsx | 动态产品卡片 (createElement) | ✅ |
| src/App.tsx | 导航 + 页脚 (需更新) | ⚠️ 未匹配 V4 |
| src/index.css | V4 设计系统 + Tailwind | ✅ |
| postcss.config.js | Tailwind v4 插件配置 | ✅ |
