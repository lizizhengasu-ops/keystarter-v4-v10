#!/usr/bin/env python3
"""
sync-wp-routes.py - 安全部署 wp-routes.conf 到 VPS
==================================================

使用 chr() 避免 PS Dollar 展开问题。
所有包含 Dollar 的 nginx 变量都用 chr(36) 表示。

用法:
  python sync-wp-routes.py          # 部署到 VPS
  python sync-wp-routes.py check    # 只检查 VPS 端状态
"""

import subprocess, sys, os

DOLLAR = chr(36)  # = \$ - 避免 PowerShell 展开
SSH_KEY = os.path.expanduser(r"C:\Users\31961\.ssh\id_ed25519_racknerd")
REMOTE = "root@204.152.214.213"
PORT = "2222"
LOCAL_CONF = os.path.join(os.path.dirname(os.path.abspath(__file__)), "nginx", "wp-routes.conf")
REMOTE_CONF = "/etc/nginx/wp-routes.conf"
BACKUP_DIR = "/etc/nginx/backups/"

def ssh(cmd, timeout=20):
    r = subprocess.run(
        ["ssh", "-i", SSH_KEY, "-p", PORT, "-o", "ConnectTimeout=10", REMOTE, cmd],
        capture_output=True, text=True, timeout=timeout
    )
    return r.stdout.strip(), r.stderr.strip(), r.returncode

def check_remote():
    """检查 VPS 端 wp-routes.conf 状态"""
    out, err, rc = ssh(f"cat {REMOTE_CONF}")
    if rc != 0:
        print(f"ERROR: 无法读取远程文件: {err}")
        return False
    print(f"远程 wp-routes.conf: {len(out)} bytes")
    
    # 检查是否有污染模式
    bad_pattern = "System.Management.Automation.Internal.Host.InternalHost"
    escaped_pattern = DOLLAR * 2 + "host"  # \System.Management.Automation.Internal.Host.InternalHost
    if bad_pattern in out:
        print(f"WARNING: 发现旧污染模式 ({bad_pattern})")
    if escaped_pattern in out:
        print(f"WARNING: 发现转义模式 ({repr(escaped_pattern)})")
    if bad_pattern not in out and escaped_pattern not in out and DOLLAR + "host" in out:
        print(f"OK: Dollar host 值正确")
    
    # 检查所有 nginx 变量
    for var_name in ["host", "remote_addr", "http_upgrade", "scheme", "request_filename"]:
        var_ref = DOLLAR + var_name
        count = out.count(var_ref)
        print(f"  {var_ref}: {count} 处引用")
    
    return True

def deploy():
    """部署本地 wp-routes.conf 到 VPS"""
    if not os.path.exists(LOCAL_CONF):
        print(f"ERROR: 本地文件不存在: {LOCAL_CONF}")
        sys.exit(1)
    
    with open(LOCAL_CONF, "r") as f:
        local_content = f.read()
    
    print(f"本地 wp-routes.conf: {len(local_content)} bytes")
    
    # 验证本地文件没有污染
    bad = "System.Management.Automation"
    if bad in local_content:
        print(f"ERROR: 本地文件包含污染模式! 拒绝部署")
        sys.exit(1)
    
    # 验证所有 Dollar 使用 chr() 或者本地文件中的 Dollar 是正确的
    # 注意: 本地参考文件中有正确的 Dollar host
    
    # 备份远程文件
    ts = subprocess.run(
        ["date", "+%Y%m%d-%H%M%S"], capture_output=True, text=True, timeout=5
    )
    timestamp = ts.stdout.strip()
    
    backup_cmd = f"mkdir -p {BACKUP_DIR} && cp {REMOTE_CONF} {BACKUP_DIR}wp-routes.conf.{timestamp}"
    out, err, rc = ssh(backup_cmd)
    if rc != 0:
        print(f"WARNING: 备份失败: {err}")
    else:
        print(f"备份已保存: wp-routes.conf.{timestamp}")

    # 上传新配置
    encoded = base64.b64encode(local_content.encode()).decode()
    upload_cmd = f"echo '{encoded}' | base64 -d | tee {REMOTE_CONF} > /dev/null"
    out, err, rc = ssh(upload_cmd)
    if rc != 0:
        print(f"ERROR: 上传失败: {err}")
        sys.exit(1)
    print(f"上传成功 ({len(local_content)} bytes)")
    
    # 测试 nginx
    out, err, rc = ssh("nginx -t 2>&1 | tail -1")
    print(f"nginx 测试: {out}")
    
    if "successful" in out:
        out2, err2, rc2 = ssh("systemctl reload nginx")
        print(f"nginx 重载: rc={rc2}")
    else:
        print(f"ERROR: nginx 配置测试失败! 正在回滚...")
        # 回滚到上一个备份
        ssh(f"cp {BACKUP_DIR}wp-routes.conf.{timestamp} {REMOTE_CONF}")
        ssh("nginx -t && systemctl reload nginx")
        print(f"已回滚到备份: wp-routes.conf.{timestamp}")
        sys.exit(1)
    
    print("部署完成")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "check":
        check_remote()
    else:
        deploy()
        check_remote()
