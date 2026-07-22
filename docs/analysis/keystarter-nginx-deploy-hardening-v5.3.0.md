# KeyStarter Deploy & Nginx Config Hardening v5.3.0

## 1. 任务目标

对网站的 SSH 部署流程和 nginx 配置管理进行加固，根除 $host、$remote_addr 等 nginx 变量
被 PowerShell 展开导致配置污染的问题。

---

## 2. 三重结构分析

### 2.1 数据层 — 当前部署管线全貌

`
[本地开发] -> npm run build -> dist/
    |
[Python 部署脚本] -> SSH subprocess -> 上传文件
    |
[VPS] /var/www/keystarter-frontend/ (React SPA)
         index.html + assets/*.js + assets/*.css
         i18n/*.json
    |
[VPS] /etc/nginx/wp-routes.conf (WordPress 路由配置)
         被 keys-starter-ssl.conf include (第 10 行)
`

**关键发现：**
- 主 SSL 配置中，wp-routes.conf 在第 10 行被 include
- wp-routes.conf 包含 24 行，涵盖 /wp-json/, /wp-admin/, /checkout/, /cart/ 等
- 主 SSL 配置也有大量 $host, $remote_addr, $http_upgrade 等变量
- 当前 wp-routes.conf 和主配置都已经是正确的状态

### 2.2 展示层 — 各脚本风险分析

**核心结论：当前部署脚本本身不包含 nginx 变量。**
风险不来自脚本文件，而来自调用方式。

**已排查关键脚本：**
- deploy-frontend-now.py - 安全，仅上传 dist 文件
- deploy-now.py - 安全，仅上传 dist 文件
- fix_nginx_config.py - 已修复，使用 chr() 避免 $ 问题
- deploy-files.sh / deploy-final.sh - bash 脚本，安全
- nginx-frontend.conf - 参考配置，已确认正确

**风险模式：** 通过 PowerShell 运行 python -c "@...@" 时，@System.Management.Automation.Internal.Host.InternalHost 会被展开

### 2.3 基础设施层 — VPS 配置管理现状

`
/etc/nginx/
  sites-enabled/
    keys-starter-ssl.conf  <- 主配置，由 Let's Encrypt 管理
  wp-routes.conf           <- 手动维护，被主配置 include
  nginx.conf               <- Ubuntu 默认配置
`

**问题：**
1. wp-routes.conf 没有本地参考副本
2. 主 SSL 配置也包含 System.Management.Automation.Internal.Host.InternalHost 变量，但不会被部署过程覆盖
3. 没有版本控制

---

## 3. 修复方案

### 方案 A：本地参考副本 + 安全更新脚本

1. 在 keystarter-v4-v10/nginx/ 下创建 wp-routes.conf 参考副本
2. 创建 sync-wp-routes.py - 安全的更新脚本（用 chr(36) 避免 $ 问题）
3. 创建 VPS 端管理检查脚本

### 方案 B：统一部署脚本

1. 所有 SSH 操作都用独立 Python 文件执行
2. 如果必须用内联 Python，用 chr(36) 代替 $

**采用方案 A + B 组合**

---

## 4. 执行步骤

### Step 1: 本地创建 nginx/ 目录和参考副本
### Step 2: 编写 sync-wp-routes.py 安全部署脚本
### Step 3: 在 VPS 上做一次全量备份
### Step 4: 验证所有 System.Management.Automation.Internal.Host.InternalHost 值正确
### Step 5: 审计 + 修复循环

