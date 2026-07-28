# B2B/Support/Contact 表单全量方案指导文件
## 版本 v6.1.14 → v6.1.17

---

## 一、三重结构分析

### 1.1 数据结构层 (Data Layer)

**API 端点:** `/wp-json/keystarter/v1/send-email`
- POST 方法, JSON body
- 字段: to (string), subject (string), message (HTML string)
- 返回: `{"ok": true/false, "message": "..."}`

**Brevo/Sendinblue 邮件发送:**
- 通过 mailin 插件 (SendinblueApiClient 类) 发送
- fallback: wp_mail()
- 发件人: noreply@keys-starter.com
- SPF/DKIM 已配置完成

### 1.2 组件层 (Component Layer)

三个表单组件:
- **Contact.jsx** - `/contact` 路由, 通用联系表单
- **B2b.tsx** - `/b2b` 路由, 企业询价表单
- **Support.tsx** - `/support` 路由, 技术支持表单

共享模式:
- React useState + async handleSubmit
- 三重 fetch 调用: 管理员通知(await) + 自动回复(best-effort .catch)
- 验证 + honeypot + 状态管理

### 1.3 表现层 (Presentation Layer)

- Tailwind CSS, 品牌紫色 (#7c3aed)
- 响应式设计 (mobile-first)
- 成功/错误/发送中 三种状态
- autoFocus 首字段
- 错误信息区分网络错误和API错误

---

## 二、版本迭代日志

| 版本 | 日期 | 变更 | 测试结果 |
|------|------|------|----------|
| v6.1.14 | 7/28 | Build修复 + auto-reply + Phone/Product Interest字段 | 7/7 API测试通过 |
| v6.1.15 | 7/28 | Contact.jsx从静态空壳→完整功能 + 验证 + honeypot + Send Another | 10/10场景测试通过 |
| v6.1.15b | 7/28 | 邮箱不一致修复 (support@ → admin@) | 构建验证通过 |
| v6.1.16 | 7/28 | errorMsg状态 + 网络/API错误区分 + catch块修复 | 10/10压力测试通过 |
| v6.1.17 | 7/28 | autoFocus首字段 + 最终验证 | 30+ API调用全部200 ✅ |

---

## 三、行业对标分析

| 功能 | 行业标准 (SoftwareOne/CDW/SHI) | 我们的实现 | 状态 |
|------|-------------------------------|------------|------|
| 表单字段 | Name, Email, Phone, Company, Message | ✅ 全部包含 (B2B还加Product Interest) | ✅ |
| 前端验证 | Email格式 + 必填检查 | Email regex + required属性 | ✅ |
| 后端过滤 | XSS sanitization | wp_kses_post + sanitize_text_field | ✅ |
| 自动回复 | 提交后即时确认 | fetch + .catch(() => {}) best-effort | ✅ |
| 反垃圾 | reCAPTCHA / Honeypot | Honeypot隐藏字段 | ✅ |
| 邮件API | Sendinblue/Mailgun/SES | Brevo (Sendinblue) + wp_mail fallback | ✅ |
| 多渠道 | 表单 + mailto + 电话 | 三种都有 | ✅ |
| 成功反馈 | Thank you + Send Another | ✅ | ✅ |
| 错误区分 | 网络 vs 服务端错误 | ✅ | ✅ |
| 焦点管理 | autoFocus首字段 | ✅ | ✅ |

---

## 四、代码文件分析

### 4.1 Contact.jsx (88行)
- 5个字段: Name, Email, Subject(选择框), Message
- Honeypot: honeypot_website
- resetForm函数完整重置包括errorMsg
- 自动回复主题: "Thank you for contacting KeyStarter"

### 4.2 B2b.tsx (117行)
- 6个字段: Name, Email, Phone, Company, Product Interest, Message
- Honeypot: honeypot_website
- 侧边栏mailto备选: admin@keys-starter.com
- 自动回复主题: "Thank you for your B2B Inquiry - KeyStarter"

### 4.3 Support.tsx (117行)
- 5个字段: Name, Email, Phone, Subject, Message
- 6个主题卡片 (Activation, Installation, Licensing等)
- Honeypot: honeypot_website
- 自动回复主题: "Thank you for contacting KeyStarter Support"

### 4.4 后端 PHP 插件 (keystarter-email-api.php)
- 版本: 2.1
- send-email REST 端点
- 使用 Brevo API (SendinblueApiClient)
- fallback: wp_mail()
- 发件人: noreply@keys-starter.com

---

## 五、测试验证报告

### 5.1 API 功能测试 (7项)
| 测试 | 结果 |
|------|------|
| B2B 管理员通知 | 200 ✅ |
| B2B 自动回复 | 200 ✅ |
| Support 管理员通知 | 200 ✅ |
| Support 自动回复 | 200 ✅ |
| 特殊字符/XSS | 200 ✅ (服务器端过滤) |
| 空可选字段 | 200 ✅ |
| 长消息 3000+ 字符 | 200 ✅ |

### 5.2 客户场景测试 (10项)
| 场景 | 结果 |
|------|------|
| B2B 全字段提交 | ✅ |
| B2B 自动回复到客户 | ✅ |
| B2B 空Phone字段 | ✅ |
| Support 全字段提交 | ✅ |
| Support 自动回复 | ✅ |
| Support XSS尝试 | ✅ (被过滤) |
| Contact 一般咨询 | ✅ |
| Contact 自动回复 | ✅ |
| Contact 合作伙伴主题 | ✅ |
| 超长消息 3000+ | ✅ |

### 5.3 压力测试 (10并发)
| 指标 | 值 |
|------|-----|
| 总请求 | 10 |
| 通过 | 10 (100%) |
| 失败 | 0 |
| 总耗时 | ~30秒 |

### 5.4 邮件送达验证
用户确认收到测试邮件:
- [KeyStarter B2B Test] Brevo delivery check ✅
- Thank you for contacting KeyStarter Support (x2) ✅
- 发件人: KeyStarter <noreply@keys-starter.com>
- 代发: mail.keys-starter.com (Brevo)

---

## 六、潜在风险与防范

| 风险 | 影响 | 防范措施 |
|------|------|----------|
| Brevo API key过期 | 邮件发送失败 | wp_mail() fallback自动接管 |
| Brevo 日限额 | 超额后邮件被拒 | wp_mail() fallback; 可升级Brevo计划 |
| Honeypot被绕过 | 机器人提交 | 可升级到reCAPTCHA v3 |
| 表单被CSRF | 恶意提交 | send-email端点设计为public; 危害有限 |
| 服务器wp_mail()未配置 | fallback也失败 | 需配置VPS sendmail/postfix |

---

## 七、维护建议

1. **切换到Live PayPal前** 检查凭证硬编码问题
2. **每季度** 检查Brevo API key是否有效
3. **如果收到垃圾表单** 可添加reCAPTCHA v3 (需要Google API key)
4. **如需工单系统** 可集成 Zendesk/Freshdesk (当前流量不需要)
5. **B2B表单数据** 目前仅通过邮件通知，如需数据库记录可扩展

---

*文档版本: v6.1.17 | 创建日期: 2026-07-28 | 作者: Codex*