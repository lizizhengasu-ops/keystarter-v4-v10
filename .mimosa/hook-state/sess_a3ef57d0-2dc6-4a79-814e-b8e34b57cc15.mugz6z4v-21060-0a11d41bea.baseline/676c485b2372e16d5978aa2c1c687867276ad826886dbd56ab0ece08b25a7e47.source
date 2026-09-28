#!/bin/bash
# nginx-config-check.sh - VPS 端配置检查脚本

echo "=== nginx 配置状态检查 ==="
echo "时间: $(date)"
echo ""

echo "1. wp-routes.conf 状态:"
ls -la /etc/nginx/wp-routes.conf 2>/dev/null
echo "  行数: $(wc -l < /etc/nginx/wp-routes.conf 2>/dev/null || echo 0)"
echo ""

echo "2. 污染检测:"
if grep -q 'System.Management.Automation' /etc/nginx/wp-routes.conf 2>/dev/null; then
  echo "  WARNING: 发现 PowerShell 污染!"
fi
if grep -q '\\$host' /etc/nginx/wp-routes.conf 2>/dev/null; then
  echo "  WARNING: 发现转义 \\$host!"
fi
cnt=$(grep -c '\\$host' /etc/nginx/wp-routes.conf 2>/dev/null || echo 0)
echo "  \\$host 出现次数: $cnt"
echo ""

echo "3. 备份列表:"
ls -1 /etc/nginx/backups/ 2>/dev/null | head -10
echo ""

echo "4. nginx 配置测试:"
nginx -t 2>&1 | tail -3
echo ""

echo "5. 主配置 Host 头:"
grep -n 'proxy_set_header Host' /etc/nginx/sites-enabled/keys-starter-ssl.conf
echo ""
echo "=== 检查完成 ==="
