import fs from "fs";
import path from "path";

const dir = "dist";
const htmlPath = path.join(dir, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");
const links = Array.from(html.matchAll(/<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g));
for (const m of links) {
  const file = path.join(dir, m[1].replace(/^\//, ""));
  if (fs.existsSync(file)) {
    const css = fs.readFileSync(file, "utf8");
    html = html.replace(m[0], `<style>\n${css}\n</style>`);
  }
}
fs.writeFileSync(htmlPath, html);
console.log(`INLINE_CSS ${links.length}`);
