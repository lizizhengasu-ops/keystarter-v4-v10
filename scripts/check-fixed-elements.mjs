/**
 * check-fixed-elements.mjs
 * 
 * 检测项目中所有 position: fixed 元素，确认它们被 Portal 包裹。
 * 使用方式：node scripts/check-fixed-elements.mjs [--fix]
 * 
 * 规则：
 * - 覆盖层（z-30+ / 弹窗 / 抽屉 / Toast / Modal）→ 必须 Portal
 * - 布局层（navbar / progress bar / 返回顶部）→ 豁免
 * 
 * 集成方式：
 * - npm run lint:portal
 * - 作为 pre-commit hook
 * - CI pipeline 步骤
 */

import { readFileSync, existsSync } from "fs";
import { globSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// 布局层 class 关键词（豁免）
const LAYOUT_PATTERNS = [
  "nav", "navbar", "header", "top-0", "progress", "back-top",
];

// 覆盖层 class 关键词（必须 Portal）
const OVERLAY_PATTERNS = [
  "fixed.*z-5", "fixed.*z-4", "fixed.*inset-0",
  "bottom-.*left-1/2.*z-5", "bottom-.*left-1/2.*z-4",
];

function scanFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // 跳过注释行
    if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) continue;

    // 检测 position: fixed（inline style）
    if (/position\s*:\s*["']?fixed["']?/i.test(line)) {
      // 判断是否是布局层（在导航/进度相关文件的固定定位豁免）
      const isLayout = filePath.includes("App.") || LAYOUT_PATTERNS.some(p => line.includes(p));
      
      // 判断是否已被 Portal 包裹
      const hasPortal = content.includes("Portal") || content.includes("createPortal");

      // 判断是否覆盖层（z-index >= 30）
      const isOverlay = OVERLAY_PATTERNS.some(p => new RegExp(p).test(line));

      if (isOverlay && !hasPortal && !isLayout) {
        issues.push({
          file: path.relative(ROOT, filePath),
          line: lineNum,
          code: line.trim(),
          reason: "覆盖层使用了 position:fixed 但没有 Portal 包裹",
          severity: "ERROR",
        });
      } else if (isOverlay && !isLayout) {
        // 已修复的，记录为 INFO
        issues.push({
          file: path.relative(ROOT, filePath),
          line: lineNum,
          code: line.trim(),
          reason: "覆盖层 position:fixed 已由 Portal 保护",
          severity: "INFO",
        });
      }
    }

    // 检测 className 中的 fixed（Tailwind）
    if (/className\s*=\s*["'][^"]*\bfixed\b[^"]*["']/.test(line)) {
      const isOverlay = /z-[3456]\d/.test(line) || /inset-0/.test(line);
      const isLayout = LAYOUT_PATTERNS.some(p => line.includes(p));
      const hasPortal = content.includes("Portal") || content.includes("createPortal");

      if (isOverlay && !hasPortal && !isLayout) {
        issues.push({
          file: path.relative(ROOT, filePath),
          line: lineNum,
          code: line.trim(),
          reason: "覆盖层使用固定定位但没有 Portal 包裹",
          severity: "ERROR",
        });
      } else if (isOverlay && !isLayout) {
        issues.push({
          file: path.relative(ROOT, filePath),
          line: lineNum,
          code: line.trim(),
          reason: "覆盖层固定定位已由 Portal 保护",
          severity: "INFO",
        });
      }
    }
  }

  return issues;
}

function main() {
  const srcDir = path.join(ROOT, "src");
  if (!existsSync(srcDir)) {
    console.log("❌ src/ 目录不存在，请在项目根目录运行");
    process.exit(0);
  }

  // 查找所有 TSX/JSX 文件
  const files = globSync("src/**/*.{tsx,jsx}", { cwd: ROOT });
  
  let allIssues = [];
  
  console.log("🔍 扫描 position:fixed 元素...\n");
  
  for (const file of files) {
    const fullPath = path.join(ROOT, file);
    try {
      const issues = scanFile(fullPath);
      allIssues = allIssues.concat(issues);
    } catch (e) {
      console.warn(`⚠️  无法扫描 ${file}: ${e.message}`);
    }
  }

  // 按严重程度分组
  const errors = allIssues.filter(i => i.severity === "ERROR");
  const infos = allIssues.filter(i => i.severity === "INFO");

  console.log("=".repeat(60));
  console.log("📊 扫描结果\n");

  if (errors.length > 0) {
    console.log(`❌ ${errors.length} 个未保护的位置：\n`);
    for (const issue of errors) {
      console.log(`  ${issue.file}:${issue.line}`);
      console.log(`    代码: ${issue.code.substring(0, 80)}`);
      console.log(`    建议: ${issue.reason}`);
      console.log();
    }
  }

  console.log(`✅ ${infos.length} 个已受 Portal 保护的位置（无需操作）\n`);

  if (errors.length > 0) {
    console.log("=".repeat(60));
    console.log("💡 修复方法：用 <Portal> 包裹 position:fixed 的覆盖层组件");
    console.log("   示例：");
    console.log('     import Portal from "../components/Portal";');
    console.log("     {isOpen && <Portal><div className='fixed inset-0 z-50'>...</div></Portal>}");
    console.log();
    console.log("   详情参考：_templates/portal-architecture-template.md");
    console.log("=".repeat(60));
    process.exit(errors.length > 0 ? 1 : 0);
  } else {
    console.log("🎉 所有 position:fixed 元素均已受 Portal 保护！");
  }
}

main();
