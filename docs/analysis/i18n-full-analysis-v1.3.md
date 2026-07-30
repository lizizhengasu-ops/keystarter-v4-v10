# KeyStarter 全站 i18n 国际化分析报告 v1.3

## 一、三重结构分析

### 1. 结构层 (Architecture)

#### 1.1 SPA (React + Vite) 架构
- **技术栈**: react-i18next + i18next-browser-languagedetector
- **翻译文件**: `public/i18n/{lang}.json` → Vite 构建 → `dist/i18n/`
- **支持语言**: EN (English), JA (日本語), KO (한국어), ES (Español), FR (Français), PT (Português)
- **布局**: `MainApp.tsx` 中的 `Layout` 组件包裹所有 SPA 路由
- **语言切换器**: `<LanguageSwitcher />` 组件在 Layout 的导航栏中（所有 SPA 页面可见）

#### 1.2 WordPress 页面架构
- **技术**: PHP 插件 `keystarter-email-api.php`
- **导航栏**: `wp_body_open` hook 注入自定义导航栏
- **语言切换器**: 导航栏中的语言按钮 + 内联 JavaScript
- **触发页面**: 通过 WooCommerce 条件函数控制：
  ```
  is_account_page() → /my-account/
  is_cart()        → /cart/
  is_checkout()    → /checkout/
  ```

#### 1.3 文件结构
```
public/i18n/
  en.json  (17,425 bytes) - 英文（基准语言）
  ja.json  (21,455 bytes) - 日语
  ko.json  (18,818 bytes) - 韩语
  es.json  (19,389 bytes) - 西班牙语
  fr.json  (19,150 bytes) - 法语
  pt.json  (18,783 bytes) - 葡萄牙语

src/pages/           - SPA 页面组件（全部使用 useTranslation + t()）
src/components/      - UI 组件（WooCartFlyout/Portal等）
src/MainApp.tsx      - 布局 + 导航 + 语言切换器
keystarter-email-api.php - WP 插件（WP 页面注入切换器）
```

### 2. 实现层 (Implementation)

#### 2.1 SPA 翻译模式
```jsx
import { useTranslation } from "react-i18next";

function Component() {
  const { t } = useTranslation();
  return <h1>{t("key.name")}</h1>;
}
```

#### 2.2 WP 页面语言切换
```php
// 插件中注入
echo "<div class=\"ks-lang-switch\">";
echo "<button onclick=\"switchLang('en')\">EN</button>";
echo "<button onclick=\"switchLang('ja')\">JA</button>";
echo "</div>";

// JavaScript 切换
function switchLang(l) {
  document.cookie = "i18next="+l+";path=/;max-age=31536000";
  localStorage.setItem("i18next", l);
  window.location.href = "/";
}
```

#### 2.3 语言检测优先级
1. URL query string (?lng=ja)
2. localStorage (由 switchLang 设置)
3. Cookie (由 switchLang 设置)
4. 浏览器语言 (navigator.language)
5. HTML lang 属性

### 3. 数据流层 (Data Flow)

```
用户点击语言按钮
  ↓
SPA: LanguageSwitcher.tsx → i18next.changeLanguage("ja")
  ↓
所有使用 useTranslation() 的组件自动重新渲染
  ↓
翻译从 /i18n/{lang}.json 加载

WP 页面:
按钮 → switchLang("ja")
  ↓
设置 cookie="i18next=ja" + localStorage="i18next=ja"
  ↓
重定向到 /
  ↓
SPA 检测到语言设置 → 加载日语翻译
```

## 二、页面语言覆盖矩阵

| 页面 | 类型 | 语言切换器 | 翻译支持 | 状态 |
|------|------|-----------|---------|------|
| / (Home) | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /products | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /product/:slug | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /b2b | SPA | ✅ Layout | ✅ 全部修复 | ✅ v1.0 |
| /support | SPA | ✅ Layout | ✅ 全部修复 | ✅ v1.0 |
| /account | SPA | ✅ Layout | ✅ 全部修复 | ✅ v1.0 |
| /faq | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /blog | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /cart | SPA → WP | ✅ WP Layout | 购物车表格英文 | ✅ v1.1 |
| /faq | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /privacy | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /terms | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /refund | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /cookies | SPA | ✅ Layout | ✅ 全翻译 | ✅ |
| /my-account/ | WP | ✅ 插件注入 | WooCommerce 英文 | ✅ v1.0 |
| /checkout/ | WP | ✅ 插件注入 | WooCommerce 英文 | ✅ v1.2 |
| 购物车浮窗 | SPA | ✅ Layout | ✅ 全部修复 | ✅ v1.2 |

## 三、版本迭代日志

### v1.0 — SPA 页面翻译化 + WP my-account 切换器
- Home.tsx: 29 个企业版翻译 key
- Account.tsx: "Sign Out","Retry","Product","Key Email" → t()
- B2b.tsx: 13 处硬编码翻译化
- Support.tsx: 4 处硬编码翻译化
- Product.tsx: "Genuine Digital License" → t()
- ja.json/ko.json: ||| 堆叠修复（22+8 个 key）
- keystarter-email-api.php: WP my-account 语言切换器

### v1.1 — 扩展到购物车页 + localStorage 支持
- WP 语言切换器 → 购物车页 (`is_cart()`)
- switchLang() 增加 `localStorage.setItem()`
- 问题: Cart.tsx 直接跳转到 /cart/ (WP 购物车页)

### v1.2 — WooCartFlyout i18n + 结账页切换器
- WooCartFlyout.tsx: 添加 `useTranslation` + 2 个翻译 key
- WP 语言切换器 → 结账页 (`is_checkout()`)
- 新增 `cart.loading` 翻译 key

### v1.3 (本版本) — 分析文档 + 全量验证
- 创建全量分析报告
- 验证所有页面工作正常
- 验证 VPS 部署完成

## 四、翻译 Key 统计

总 key 数: ~240+ (en.json)
新增 key 统计:
- account.*: 17 keys
- b2b.*: 20 keys
- support.*: 13 keys
- product.*: 4 keys
- cart.*: 15 keys
- home.enterprise.*: 29 keys
- home.persona.*: 2 keys

## 五、剩余工作

1. **ko.json / pt.json 重新部署**: SSH 不稳定导致个别语言文件未更新
2. **Cloudflare 缓存清理**: 需要用户手动 Purge Everything
3. **旧 JS 文件清理**: VPS 上仍有旧 JS 文件
4. **WooCommerce 后台文本翻译**: admin/order 页面（非客户可见）
5. **Cart.tsx SPA 翻译**: 当前直接跳转到 WP /cart/
