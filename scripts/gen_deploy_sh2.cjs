const fs = require("fs");
const path = require("path");
const dist = path.join(__dirname, "..", "dist");
const files = ["index.html", "assets/index-BVFQ89G8.css", "assets/index-CzYpchmy.js"];
let s = "#!/bin/bash\nset -e\ncd /var/www/keystarter-frontend\nmkdir -p assets\n[ -f index.html ] && cp index.html index.html.bak2\necho Backup done\n\n";
for (const f of files) {
  const d = fs.readFileSync(path.join(dist, f));
  const b = d.toString("base64");
  s += "echo '" + b + "' | base64 -d > " + f + "\necho '" + f + " OK'\n\n";
}
s += "echo Deploy complete\n";
fs.writeFileSync(path.join(__dirname, "..", "deploy-vnc2.sh"), s);
console.log("Generated: " + fs.statSync(path.join(__dirname, "..", "deploy-vnc2.sh")).size + " bytes");
