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

const asset = (name) => {
  const found = fs.readdirSync(path.join(dir, "assets")).find((f) => f.startsWith(name) && f.endsWith(".js"));
  return found ? `/assets/${found}` : "";
};
const routeChunks = [
  ["/product/", asset("Product-")],
  ["/products", asset("Store-")],
  ["/blog/", asset("BlogArticle-")],
  ["/blog", asset("Blog-")],
  ["/b2b", asset("B2b-")],
].filter(([, f]) => f);
if (routeChunks.length) {
  const map = JSON.stringify(routeChunks);
  const script = `<script>!function(){var p=location.pathname,c=${map};for(var i=0;i<c.length;i++){if(p===c[i][0]||p.indexOf(c[i][0])===0){var l=document.createElement("link");l.rel="preload";l.as="script";l.href=c[i][1];document.head.appendChild(l);break;}}}();</script>`;
  html = html.replace("</head>", script + "</head>");
  console.log(`CHUNK_PRELOAD ${routeChunks.length}`);
}

fs.writeFileSync(htmlPath, html);
console.log(`INLINE_CSS ${links.length}`);

const inlineRe = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
let sm, si = 0;
while ((sm = inlineRe.exec(html))) {
  si++;
  try {
    new Function(sm[1]);
  } catch (e) {
    throw new Error(`Inline script ${si} syntax error: ${e.message}`);
  }
}
console.log(`INLINE_SCRIPTS ${si}`);
