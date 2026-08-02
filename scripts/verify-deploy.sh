#!/usr/bin/env bash
set -euo pipefail

# KeyStarter deploy verification - run on the VPS after uploading dist/.
# Usage: ssh root@HOST 'bash -s' < scripts/verify-deploy.sh

HOST_HEADER="keys-starter.com"
BASE="https://127.0.0.1"

echo "[verify-deploy] Ensuring frontend assets are readable by nginx..."
chmod -R a+rX /var/www/keystarter-frontend

echo "[verify-deploy] Checking HTTP status (origin)..."
check() {
  local path="$1"
  local code
  code=$(curl -sk -o /dev/null -w '%{http_code}' -H "Host: $HOST_HEADER" "$BASE$path")
  echo "  $code  $path"
  if [ "$code" != "200" ]; then
    echo "[verify-deploy] FAIL: $path returned $code"
    exit 1
  fi
}

check "/"
check "/product/windows-11-home-official"
check "/wp-json/"
check "/assets/index-DiCa7W86.js"
check "/assets/index-DKBjzyQS.css"
check "/assets/images/box-win11-home.jpg"
check "/assets/images/box-sql-2019.png"

echo "[verify-deploy] ALL CHECKS PASSED"
