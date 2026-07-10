var fs=require("fs"),path=require("path"),glob=0;
function scan(dir){
  if(!fs.existsSync(dir))return;
  fs.readdirSync(dir,{withFileTypes:true}).forEach(function(e){
    var fp=path.join(dir,e.name);
    if(e.isDirectory()){scan(fp);return;}
    var b=fs.readFileSync(fp);
    if(b.length>=3&&b[0]===0xEF&&b[1]===0xBB&&b[2]===0xBF){
      fs.writeFileSync(fp,b.slice(3));
      console.log("FIXED: "+fp);
      glob++;
    }
  });
}
var root="C:/Users/31961/Documents/microsoft web/_projects/keystarter-v4";
scan(path.join(root,"src"));
scan(path.join(root,"dist"));
console.log("Fixed "+glob+" files");
process.exit(0);
