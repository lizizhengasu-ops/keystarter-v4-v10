const{Client}=require("ssh2");
const fs=require("fs");
const path=require("path");

const host=process.argv[2]||"204.152.214.213";
const keyPath=process.env.SSH_KEY||path.join(process.env.USERPROFILE||process.env.HOME||"", ".ssh", "id_ed25519_racknerd");
const distDir=process.argv[3]||"./dist";
const remoteDir="/var/www/keystarter-frontend";

function upload(c,local,remote){
  return new Promise((ok,fail)=>{
    const dir=path.dirname(remote);
    c.exec("mkdir -p "+dir+" && cat > "+remote,(e,s)=>{
      if(e)return fail(e);
      const timer=setTimeout(()=>fail(new Error("upload timeout")),60000);
      s.stdin.write(fs.readFileSync(local));
      s.stdin.end();
      s.on("close",(code)=>{
        clearTimeout(timer);
        if(code!==0){fail(new Error("exit "+code));return;}
        c.exec("stat -c %s "+remote,(e2,s2)=>{
          if(e2){fail(e2);return;}
          let out="";
          s2.on("data",d=>out+=d);
          s2.on("close",()=>{
            const sz=parseInt(out.trim(),10);
            if(sz===fs.statSync(local).size) ok();
            else fail(new Error("size mismatch remote="+sz+" local="+fs.statSync(local).size));
          });
        });
      });
    });
  });
}

const c=new Client();
c.on("ready",async()=>{
  try{
    const items=fs.readdirSync(distDir,{withFileTypes:true});
    const files=[];
    function walk(dir,base){
      fs.readdirSync(dir,{withFileTypes:true}).forEach(f=>{
        const fp=path.join(dir,f.name);
        const rp=remoteDir+"/"+base+"/"+f.name;
        if(f.isDirectory())walk(fp,base+"/"+f.name);
        else files.push([fp,rp]);
      });
    }
    walk(distDir,"");
    for(const[l,r]of files){
      await upload(c,l,r);
      console.log("OK:",r);
    }
    console.log("All uploaded!");
    c.end();
    process.exit(0);
  }catch(e){console.log("ERR:",e.message);c.end();process.exit(1);}
});
c.on("error",e=>{console.log("CONN:",e.message);process.exit(1);});
c.connect({host,port:2222,username:"root",privateKey:fs.readFileSync(keyPath),
  algorithms:{kex:["curve25519-sha256","ecdh-sha2-nistp256","diffie-hellman-group14-sha256"],
  serverHostKey:["ssh-ed25519","ecdsa-sha2-nistp256"],
  cipher:["aes256-ctr","aes128-ctr"],hmac:["hmac-sha2-256"]},
  readyTimeout:15000
});
setTimeout(()=>{console.log("TIMEOUT");process.exit(1);},120000);
