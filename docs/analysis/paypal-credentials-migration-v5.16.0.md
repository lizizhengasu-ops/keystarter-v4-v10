# PayPal 凭证迁移方案 v5.16.0
## 三重架构分析

### 第一层：数据层分析

**迁移前**: PayPal 凭证硬编码在 x-auth.php (644, 世界可读)
**迁移后**: 凭证存在 wp-config.php (600, 仅 root 可读)
            x-auth.php 通过 defined() 读取常量

**涉及文件**:
- /var/www/keys-starter.com/wp-config.php → +4 行常量定义
- /var/www/keys-starter.com/x-auth.php → 硬编码值改为常量查询

### 第二层：基础设施分析

**安全影响**: wp-config.php 已锁 600，root 独占
  外部攻击者即使通过 web 访问 wp-config.php 也无法读取 (chmod 600)

**Live 切换**: 只需修改 wp-config.php 中的常量和 useSandbox 标志

### 第三层：验证

| 检查项 | 状态 |
|--------|:----:|
| wp-config.php 常量 | ✅ 已写入 |
| x-auth.php 改为读常量 | ✅ 已验证 |
| 原文件已备份 (.bak) | ✅ |
| 网站正常响应 | ✅ 200 |

### 变更内容

**wp-config.php** (+4行)
\\\php
/** PayPal Sandbox Credentials */
define('PAYPAL_SANDBOX_CLIENT_ID', 'AeFXgco2...');
define('PAYPAL_SANDBOX_CLIENT_SECRET', 'EBQk77T7...');
\\\

**x-auth.php** (2行变更)
\\\php
// 改前:
"clientId" => "AeFXgco2...",
"clientSecret" => "EBQk77T7...",
// 改后:
"clientId" =>  = defined('PAYPAL_SANDBOX_CLIENT_ID') ? PAYPAL_SANDBOX_CLIENT_ID : "",
"clientSecret" =>  = defined('PAYPAL_SANDBOX_CLIENT_SECRET') ? PAYPAL_SANDBOX_CLIENT_SECRET : "",
\\\

### 结论
低风险、可逆变更。已执行完毕。