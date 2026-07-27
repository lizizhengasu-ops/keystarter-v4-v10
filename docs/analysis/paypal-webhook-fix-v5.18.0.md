# PayPal Webhook 修复方案 v5.18.0
## 日期: 2026-07-27

### 问题
沙箱付款后 Webhook 回调返回 400。根因：PPCP onboarding 被 x-complete.php 跳过，
WebhookRegistrar 从未调用，ppcp-webhook option 不存在。

### 修复
通过 PPCP 插件 REST API (POST /wc/v3/wc_paypal/webhooks) 调用 WebhookRegistrar::register()，
向 PayPal 注册 webhook URL 并存储凭据。

### 结果
- Webhook ID: 4AS65334MX820163U
- Webhook URL: https://keys-starter.com/wp-json/paypal/v1/incoming
- 17 个事件已订阅
- ppcp-webhook option 已存在

### 下一步
在浏览器重新做一次沙箱付款测试，验证订单获得 transaction ID。
