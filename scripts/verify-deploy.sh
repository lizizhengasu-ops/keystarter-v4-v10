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

# Resolve current asset names from the deployed index.html so this script
# stays valid after the next build (hashed filenames change every deploy).
INDEX_HTML="/var/www/keystarter-frontend/index.html"
JS_PATH=$(grep -oE '/assets/index-[A-Za-z0-9_-]+\.js' "$INDEX_HTML" | head -1)
CSS_PATH=$(grep -oE '/assets/index-[A-Za-z0-9_-]+\.css' "$INDEX_HTML" | head -1)
if [ -z "$JS_PATH" ] || [ -z "$CSS_PATH" ]; then
  echo "[verify-deploy] FAIL: cannot resolve JS/CSS asset names from $INDEX_HTML"
  exit 1
fi

check "/"
check "/product/windows-11-home-official"
check "/wp-json/"
check "$JS_PATH"
check "$CSS_PATH"
check "/assets/images/box-win11-home.jpg"
check "/assets/images/box-sql-2019.png"

echo "[verify-deploy] ALL CHECKS PASSED"
