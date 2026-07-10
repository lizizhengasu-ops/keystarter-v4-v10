var fs=require("fs"),path=require("path"),cp=require("child_process");
var ROOT="C:/Users/31961/Documents/microsoft web/_projects/keystarter-v4";

fs.writeFileSync(ROOT+"/.githooks/pre-commit.bat",[
'@echo off',
'node "%~dp0\\..\\scripts\\validate.mjs"',
'if %errorlevel% neq 0 exit /b %errorlevel%'
].join("\r\n")+"\r\n","utf8");
console.log("Wrote hook");

var pkg=JSON.parse(fs.readFileSync(ROOT+"/package.json","utf8"));
if(!pkg.scripts)pkg.scripts={};
pkg.scripts.validate="node scripts/validate.mjs";
pkg.scripts["validate:fix"]="node scripts/validate.mjs --fix";
fs.writeFileSync(ROOT+"/package.json",JSON.stringify(pkg,null,2)+"\n","utf8");
console.log("Updated package.json");

cp.execSync("git config core.hooksPath .githooks",{cwd:ROOT});
console.log("Set git hooksPath");

console.log("Fixing BOM files...");
cp.execSync("node scripts/validate.mjs --fix",{cwd:ROOT,stdio:"inherit"});

console.log("DONE");
process.exit(0);
