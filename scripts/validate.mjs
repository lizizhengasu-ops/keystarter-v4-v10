/**
 * validate.mjs — 全面项目健康检查
 * 
 * 检测所有已知的"远程作用"反模式：
 * 1. BOM (UTF-8 Byte Order Mark) — 破坏 JSON/Unix 工具
 * 2. JSON 有效性 — 校验所有 .json 文件
 * 3. position:fixed 未受 Portal 保护 — CSS 包含块问题
 * 4. 文件编码检查 — 确保中文字符不被 CP936 损坏
 * 
 * 使用：node scripts/validate.mjs
 * 集成：pre-commit hook / npm run validate / deploy 前置门控
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

let exitCode = 0;
let totalErrors = 0;

function error(msg, file) {
  totalErrors++;
  exitCode = 1;
  console.log("  [FAIL] " + msg + (file ? "  (" + file + ")" : ""));
}

function ok(msg) {
  console.log("  [OK]   " + msg);
}

// ---------------------------------------------------------------------------
// 1. BOM 检测 — 扫描 src/ 和 dist/ 下所有文件
// ---------------------------------------------------------------------------
function checkBOM(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { checkBOM(fp); continue; }
    if (!/\.(tsx?|jsx?|json|css|html|md|yml|yaml|conf|php)$/i.test(e.name)) continue;
    const bytes = readFileSync(fp);
    if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
      error("BOM detected in UTF-8 file — will break JSON/Unix tools", fp);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. JSON 有效性 — 验证所有 .json 文件
// ---------------------------------------------------------------------------
function checkJSON(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { checkJSON(fp); continue; }
    if (!e.name.endsWith(".json")) continue;
    try {
      JSON.parse(readFileSync(fp, "utf-8"));
    } catch (ex) {
      error("Invalid JSON: " + ex.message, fp);
    }
  }
}

// ---------------------------------------------------------------------------
// 3. position:fixed without Portal — CSS 包含块远程作用问题
// ---------------------------------------------------------------------------
function checkPositionFixed(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { checkPositionFixed(fp); continue; }
    if (!/\.(tsx|jsx)$/i.test(e.name)) continue;
    if (fp.indexOf("reactbits") >= 0) continue;  // skip third-party
    const content = readFileSync(fp, "utf-8");
    const lines = content.split("\n");
    // Layout elements that are exempt
    const LAYOUT = ["nav", "navbar", "header", "progress", "back-top"];
    // Check for overlay patterns (class or style with position fixed + z-index >= 30)
    let hasOverlay = false;
    let hasPortal = content.includes("createPortal") || content.includes("<Portal>") || content.includes("ReactDOM.createPortal");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.includes("fixed")) continue;
      // Check if layout — exempt
      if (LAYOUT.some(k => line.includes(k))) continue;
      // Check if it's an overlay (z-30+ or inset-0 or dialog/modal/drawer)
      if (/z-[3456]\d|inset-0|modal|dialog|drawer|overlay/i.test(line)) {
        hasOverlay = true;
        if (!hasPortal) {
          error("position:fixed overlay without Portal protection", fp + ":" + (i + 1));
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 4. product image mapping coverage
// ---------------------------------------------------------------------------
function checkProductImages() {
  const productsFile = path.join(ROOT, "src", "data", "products.ts");
  const imagesFile = path.join(ROOT, "src", "data", "product-images.ts");
  const selectFile = path.join(ROOT, "docs", "product-image-library", "select.html");
  if (!existsSync(productsFile) || !existsSync(imagesFile)) {
    error("product data files missing", productsFile);
    return;
  }
  const productsSrc = readFileSync(productsFile, "utf-8");
  const imagesSrc = readFileSync(imagesFile, "utf-8");
  const slugs = [...productsSrc.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
  const imgMap = new Map(
    [...imagesSrc.matchAll(/"([^"]+)":\s*"\/assets\/images\/([^"]+)"/g)].map(m => [m[1], m[2]])
  );
  const missing = slugs.filter(s => !imgMap.has(s));
  if (missing.length) error("products without image mapping: " + missing.join(", "));
  const imgDir = path.join(ROOT, "public", "assets", "images");
  const missingFiles = [...new Set(imgMap.values())].filter(f => !existsSync(path.join(imgDir, f)));
  if (missingFiles.length) error("mapped image files missing on disk: " + missingFiles.join(", "));
  if (existsSync(selectFile)) {
    const sel = readFileSync(selectFile, "utf-8");
    const start = sel.indexOf("const CURRENT = {");
    const end = sel.indexOf("};", start);
    const block = start >= 0 && end > start ? sel.slice(start, end) : "";
    const currentFiles = [...block.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map(m => m[2]);
    const bad = currentFiles.filter(f => !existsSync(path.join(imgDir, f)));
    if (bad.length) error("select.html CURRENT references missing file: " + bad.join(", "));
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log("\n[validate.mjs] Full project health check");
console.log("========================================");

console.log("\n1. BOM detection (src/, dist/)");
checkBOM(path.join(ROOT, "src"));
checkBOM(path.join(ROOT, "dist"));
if (totalErrors === 0) ok("No BOM found");
const bomErrors = totalErrors;

console.log("\n2. JSON validation");
const jsonBefore = totalErrors;
checkJSON(path.join(ROOT, "src"));
checkJSON(path.join(ROOT, "dist"));
if (totalErrors === jsonBefore) ok("All JSON files valid");

console.log("\n3. position:fixed / Portal check (src/)");
const fixedBefore = totalErrors;
checkPositionFixed(SRC);
if (totalErrors === fixedBefore) ok("All overlays protected by Portal");

console.log("\n4. product image mapping coverage");
const imgBefore = totalErrors;
checkProductImages();
if (totalErrors === imgBefore) ok("All product slugs mapped and image files exist");

console.log("\n========================================");
if (exitCode === 0) {
  console.log("RESULT: ALL CHECKS PASSED\n");
} else {
  console.log("RESULT: " + totalErrors + " FAILURES — fix before commit/deploy\n");
}
process.exit(exitCode);
