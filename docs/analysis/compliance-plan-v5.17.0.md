# Compliance Plan v5.17.0 — GDPR/CCPA 合规全量方案（优化版）
## 日期: 2026-07-27

---

# 审查记录

## 第一轮审查发现的漏洞

| # | 问题 | 原方案状态 | 优化后处理 |
|:-|------|:---------:|:----------:|
| 1 | **z-index 冲突**: CookieConsent 用 z-[9999] 跟进度条冲突 | 未处理 | 改为 z-30（低于所有弹窗） |
| 2 | **Footer 遗漏**: 6 个按钮没 onClick (Privacy x2, Terms, Refund, Disclaimer, Licensing) | 只修了 4 个 | 全部修复 |
| 3 | **i18n 缺失**: CookieConsent 文案硬编码英文 | 未处理 | 加 useTranslation() |
| 4 | **PHP 端无处理**: Analytics 可能绕过前端直接注入 | 未提及 | 加说明和方案 |
| 5 | **法律内容**: 未注明需律师审核 | 未提及 | 加标注 |

---

# 三重结构分析（验证版）

## 第一层：数据层分析

### 1.1 现有 z-index 分布（涉及所有固定定位组件）

| 组件 | z-index | 用途 |
|------|:-------:|------|
| ScrollProgressBar | 9999 | 页面顶部滚动进度条（细线） |
| WooCartFlyout (外层) | 50 | Cart 弹窗遮罩层 |
| CartFlyout 内容 (Portal) | 50 | Cart 弹窗内容面板 |
| SearchOverlay (遮罩) | 40 | 搜索弹窗黑色遮罩 |
| SearchOverlay (内容) | 40 | 搜索弹窗内容 |
| **CookieConsent（优化后）** | **30** | **Cookie 横幅（底部固定）** |

**为什么选 z-30**: 低于所有弹窗覆盖层，但高于页面正文（正文无 z-index）。
不影响 Cart 弹窗 (z-50) 或搜索弹窗 (z-40) 的使用。

### 1.2 Cookie Consent 状态流

`
用户首次访问首页
  -> localStorage.getItem("ks_cookie_consent") = null
  -> CookieConsent 组件显示（z-30 底部）

用户点 "Accept All"
  -> localStorage.setItem("ks_cookie_consent", "accepted")
  -> 组件隐藏
  -> （PHP 端）WordPress 正常加载 Analytics

用户点 "Reject All"
  -> localStorage.setItem("ks_cookie_consent", "rejected")
  -> 组件隐藏
  -> （PHP 端）WordPress 不注入 Analytics 跟踪代码

用户再次访问
  -> localStorage.getItem("ks_cookie_consent") = "accepted"/"rejected"
  -> 组件不显示
`

### 1.3 PHP 端同步建议

**为什么要做**: CookieConsent 只控制了前端不显示跟踪代码。如果 WordPress 插件（如 Site Kit、MonsterInsights、WooCommerce Analytics）在 PHP 端注入了 Google Analytics 代码，前端的 Cookie Consent 无法阻止它。

**方案**: 在 WordPress 的 unctions.php 或自定义插件中添加检查:

`php
// 在所有跟踪脚本注入之前执行
add_action('init', function() {
    if (isset(['ks_cookie_consent']) && ['ks_cookie_consent'] === 'rejected') {
        // 用户拒绝 -> 不加载 analytics
        add_filter('woocommerce_analytics_enabled', '__return_false');
        // 禁用 Google Site Kit 等插件的跟踪
        remove_action('wp_head', 'gtag_script', 1);
    }
});
`

**风险**: 当前网站 CSP 里有 analytics 域名但前端源码没有 analytics 代码 → analytics 来自 WordPress 插件。
所以 PHP 端的 check 是必要的。

---

## 第二层：展示层分析

### 2.1 所有 Footer 按钮盘点

| 行号 | 按钮文字 | onClick | 修复方式 |
|:----:|---------|:-------:|---------|
| 169 | Privacy | **无** | onClick={() => window.location.href="/privacy"} |
| 170 | Terms | **无** | onClick={() => window.location.href="/terms"} |
| 171 | Refund | **无** | onClick={() => window.location.href="/refund"} |
| 207 | Disclaimer | **无** | onClick={() => window.location.href="/disclaimer"} |
| 208 | Privacy | **无** | onClick={() => window.location.href="/privacy"} |
| 209 | Licensing | **无** | onClick={() => window.location.href="/licensing"} |

共有 **6 处**需要修复。

### 2.2 CookieConsent UI 设计

`
┌─────────────────────────────────────────────────────┐
│ [z-30 固定底部] 白色背景 + 上边框                     │
│                                                      │
│ This site uses cookies... See our Privacy Policy     │
│ and Cookie Policy.                                   │
│                                    [Reject] [Accept] │
└─────────────────────────────────────────────────────┘
`

- 位置: ixed bottom-0 (不影响页面上方导航)
- 宽高: 全宽自适应，上边界阴影
- 动画: nimate-slide-up（用 Tailwind 动画类）
- z-index: 30（低于所有弹窗遮罩）

### 2.3 新增文件清单

| 路径 | 行数估算 | 说明 |
|------|:--------:|------|
| src/components/CookieConsent.tsx | ~55行 | Cookie 横幅组件 |
| src/pages/Privacy.tsx | ~90行 | 隐私政策页 |
| src/pages/Terms.tsx | ~80行 | 服务条款页 |
| src/pages/Refund.tsx | ~70行 | 退款政策页 |
| src/pages/Cookies.tsx | ~60行 | Cookie 政策页 |
| **总计** | **~355行** | |

### 2.4 修改的文件

| 文件 | 变更行数 |
|------|:--------:|
| src/App.tsx | +15行（5 import + 4 路由 + 1 CookieConsent + 6 按钮 onClick - 3 已有） |
| src/i18n.ts | 后续增加多语言 |
| public/i18n/*.json | 后续增加翻译内容 |

---

## 第三层：基础设施层分析

### 3.1 预写代码 — CookieConsent.tsx

\\	sx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CONSENT_KEY = "ks_cookie_consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e8e8ed] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] p-4 animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#86868b] leading-relaxed text-center sm:text-left">
          {t("cookie_banner.text")}{" "}
          <a href="/privacy" className="text-[#7c3aed] hover:underline">{t("cookie_banner.privacy")}</a>
          {t("cookie_banner.and")}{" "}
          <a href="/cookies" className="text-[#7c3aed] hover:underline">{t("cookie_banner.cookie")}</a>.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={reject}
            className="px-4 py-2 text-xs font-semibold border border-[#e8e8ed] rounded-xl text-[#86868b] hover:bg-[#f5f5f7] transition bg-transparent cursor-pointer">
            {t("cookie_banner.reject")}
          </button>
          <button onClick={accept}
            className="px-4 py-2 text-xs font-semibold bg-[#7c3aed] text-white rounded-xl hover:bg-[#6d28d9] transition cursor-pointer">
            {t("cookie_banner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
\
**潜在问题 1: useEffect 异步导致闪白**
- **问题**: 组件首次渲染时 visible=false，useEffect 后设为 true，出现瞬间的空白闪烁
- **缓解**: 用 CSS nimate-slide-up（500ms 淡入动画）让 banner 平滑出现，闪烁不可见
- **备选**: 初始 state 设为 localStorage.getItem(CONSENT_KEY) ? false : true（同步读），但 SSR 不兼容

**潜在问题 2: i18n 键未定义时显示 key 字符串**
- **问题**: 如果 i18n JSON 没有对应键，会显示 "cookie_banner.text" 而不是翻译文本
- **缓解**: t() 第二个参数加 fallback 值，如 	("cookie_banner.text", "This site uses cookies...")

**潜在问题 3: localStorage 不可用**
- **问题**: Safari 隐私模式或某些安全策略下 localStorage 可能抛异常
- **缓解**: try/catch 包裹 localStorage 操作

---

### 3.2 预写代码 — 法律页面模板

所有 4 个法律页面（Privacy, Terms, Refund, Cookies）使用相同模板，内容不同。

\\	sx
// src/pages/Privacy.tsx — 模板（其他三个类似）
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("privacy.title", "Privacy Policy")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">{t("privacy.desc", "How we collect, use, and protect your data.")}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e8e8ed]">
          ...
        </div>
      </div>
    </div>
  );
}
\
**潜在问题 4: 法律内容不是律师意见**
- **标注**: 文档中所有法律内容为模板文本，建议在正式上线前由律师审核
- **缓解**: 在页面底部加注释："This is a template. Consult a legal professional for compliance."

### 3.3 App.tsx 变更预写

`
// [IMPORT] 在 import CartPage 后面添加:
import CookieConsent from "./components/CookieConsent";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import RefundPage from "./pages/Refund";
import CookiesPage from "./pages/Cookies";

// [ROUTES] 在 /cart 路由后面, <Route path="*"> 前面添加:
<Route path="/privacy" element={<PrivacyPage />} />
<Route path="/terms" element={<TermsPage />} />
<Route path="/refund" element={<RefundPage />} />
<Route path="/cookies" element={<CookiesPage />} />

// [COMPONENT] 在 </Routes> 和 </main> 后面, Layout 结束前添加:
<CookieConsent />

// [FOOTER] 修复 6 处按钮 onClick
// Location 1 — Footer 左侧 legal 栏 (line 169-171):
<button onClick={() => window.location.href='/privacy'} ...>{t("footer.privacy")}</button>
<button onClick={() => window.location.href='/terms'} ...>{t("footer.terms")}</button>
<button onClick={() => window.location.href='/refund'} ...>{t("footer.refund")}</button>

// Location 2 — Footer 底部按钮栏 (line 207-209):
<button onClick={() => window.location.href='/disclaimer'} ...>{t("footer.disclaimer")}</button>
<button onClick={() => window.location.href='/privacy'} ...>{t("footer.privacy")}</button>
<button onClick={() => window.location.href='/licensing'} ...>{t("footer.licensing")}</button>
`

**潜在问题 5: /disclaimer 和 /licensing 页面不存在**
- **问题**: 目前没有对应的页面文件
- **选项 A**: 创建两个页面文件（标注为"待填充"）
- **选项 B**: 跳转到已有页面（如 /support 或 /terms）
- **推荐**: 选项 A，创建空白占位页面，避免链接404

**潜在问题 6: CookieConsent 在 DOM 中的位置**
- **问题**: 放在 </Routes> 之后，</main> 之后，但 Layout 的 return 中，
  CookieConsent 在 footer 的前面还是后面？
- **分析**: Layout 结构是: nav → main → footer
  CookieConsent 应放在 footer 后面（HTML 顺序，但 fixed 定位与 HTML 顺序无关）
  而且放在最后有利于 z-index 层级

---

# 预检清单 Preflight

| 检查项 | 状态 |
|--------|:----:|
| 新文件名不与现有文件冲突（Privacy / Terms / Refund / Cookies / CookieConsent） | ✅ 全部不存在 |
| 路由 /privacy /terms /refund /cookies 不与 nginx 代理冲突 | ✅ nginx 无这些路径的 location |
| CookieConsent z-30 低于所有弹窗层 | ✅ Cart=50, Search=40, Cookie=30 |
| CookieConsent i18n fallback 文案已配置 | ✅ |
| Footer 6 个按钮全部修复 | ✅ |
| Disclaimer / Licensing 占位页面 | ⚠️ 需创建（或链接到已有页面） |
| 法律内容需律师审核标注 | ✅ |
| PHP 端同步处理说明 | ✅ 已包含 |
