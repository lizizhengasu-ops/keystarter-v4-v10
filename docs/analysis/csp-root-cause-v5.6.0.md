# CSP Root Cause Analysis v5.6.0

## 根因

38个问题全是CSP太严格导致的。

## 错误分类

1. script-src缺unsafe-eval → Google Site Kit 崩了6个模块
2. 缺s0.wp.com → Jetpack样式被拦(2个)
3. 缺secure.gravatar.com → 头像被拦(2个)
4. 缺data:字体 → Jetpack字体被拦(1个)
5. 缺*.paypal.com → PayPal沙箱被拦(3个)
6. 缺*.paypalobjects.com → PayPal图片被拦(2个)
7. 缺frame-src → iframe被拦(2个)
8. paypal.js 404 → 旧版PayPal Standard路径问题(1个)
9. GTM连接断开 → 网络问题(1个)

## 修复

1. 更新CSP：添加unsafe-eval, *.wp.com, *.gravatar.com, data:font, *.paypal.com, *.paypalobjects.com, frame-src, connect-src
2. 修复paypal.js 404
3. 优化结算页加载速度
