# KeyStarter Full Fix Plan v5.9.0 — 全量修复方案

**日期**: 2026-07-23  
**备份 bundle**: `backups/ks_v4-v10_v5.9.0-pre_*.bundle`  
**基准 commit**: `0658b14`

---

## 第一部分：三重结构分析

### 1.1 展示层 (Presentation Layer)

| 问题 | 严重度 | 文件 | 描述 |
|---|---|---|---|
| F1 | 🔴 CRITICAL | `src/pages/Home.tsx` | 936行/68.5KB单体文件，10+section无法分割 |
| F2 | 🔴 CRITICAL | `src/pages/Account.tsx` | 登录/注册表单无onSubmit/API，假UI |
| F3 | 🟡 REQUIRED | `src/pages/Home.tsx`, `src/pages/Product.tsx` | WC产品ID硬编码映射重复3份 |
| F4 | 🟡 REQUIRED | `src/pages/Product.tsx` | editions硬编码价格$12.99与WC脱节 |
| F5 | 🟡 REQUIRED | `src/pages/B2b.tsx` | Contact按钮无onClick，email非mailto |
| F7 | 🟢 OPTIONAL | `src/SearchOverlay.tsx` | 内联style{{}}而非Tailwind |

### 1.2 基础设施层 (Infrastructure Layer)

| 问题 | 严重度 | 文件 | 描述 |
|---|---|---|---|
| F6 | 🟡 REQUIRED | `nginx/wp-routes.conf` | proxy_set_header Host泄露PS主机名 |

### 1.3 不动项（已验证正常）

CSP ✅ / HTTPS ✅ / SourceMap ✅ / Portal ✅ / 依赖已清理 ✅ / GTM ✅ / paypal.js ✅ / i18n懒加载 ✅ / page-enter ✅

---

## 第二部分：方案 + 完整代码

### F1 — 拆分 Home.tsx（创建 src/sections/）

**方案**: 将Home.tsx的10+个section抽成独立文件放入 `src/sections/`。Home.tsx只保留import和JSX组合。

**问题**: 当前 `.hero-title`, `.float-in`, `.card-grid` 等CSS类名由GSAP驱动，拆到独立组件后需要确保这些引用路径正确。

**代码**:

```typescript
// src/sections/HeroSection.tsx
import { useTranslation } from "react-i18next";
// ... (粘贴完整section内容)
```

**改动文件**: 创建10个section文件，修改Home.tsx为组合式

**验证**: 构建通过，页面滚动动画正常（GSAP类名不变）

### F2 — 修复 Account.tsx（添加 WooCommerce 登录链接）

**方案**: 不用实现复杂认证系统。两个按钮改为链接到 WC My Account 页面。

**代码**:
```typescript
// 改前: <button>Sign In</button>
// 改后: <a href="/my-account/">Sign In</a>
```

**改动文件**: `src/pages/Account.tsx`

**验证**: 点击按钮跳转到 /my-account/

### F3 — 提取 WC 产品 ID 为共享常量

**方案**: 创建 `src/data/woo-ids.ts`，把重复的ID映射提取为独立模块，Home.tsx和Product.tsx import它。

**代码**:
```typescript
// src/data/woo-ids.ts
export const WC_IDS: Record<string, number> = {
  "windows-11-pro": 629, "windows-10-pro": 630,
  // ... 完整列表
};
```

**改动文件**: 新建 `src/data/woo-ids.ts`，修改Home.tsx(2处), Product.tsx(1处)

**验证**: 构建通过，点击Add to Cart跳转正确

### F4 — 移除 Product.tsx 无用的 editions 硬编码

**方案**: 删除editions数组和相关逻辑，产品价格直接从WC API数据展示。

**代码**: 删除整个editions数组和selEdition state/react逻辑。

**改动文件**: `src/pages/Product.tsx`

### F5 — B2b.tsx 按钮添加 mailto: 链接

**方案**: Contact按钮改为 `<a href="mailto:admin@keys-starter.com">`，底部email同样改为mailto

**代码**: 简单的标签替换

### F6 — nginx Host header 修复

**方案**: 将 `System.Management.Automation.Internal.Host.InternalHost` 替换为 `keys-starter.com`

**代码**: 文件替换

### F7 — SearchOverlay 改用 Tailwind（可选）

**方案**: 将内联style替换为Tailwind className

---

## 第三部分：执行顺序

1. F3（WC ID共享常量—最安全，不改变行为）
2. F5（B2b.tsx mailto—简单安全）
3. F2（Account.tsx 登录链接—简单安全）
4. F4（移除硬编码editions—不改变核心功能）
5. F7（SearchOverlay Tailwind—纯样式）
6. F1（Home.tsx拆分—最大改动，最后执行）
7. F6（nginx修复—需要SSH到VPS）

每个步骤后：构建验证 → 无错误则下一步

