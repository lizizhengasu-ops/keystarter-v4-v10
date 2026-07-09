const {Client} = require("ssh2");
const fs = require("fs");
const path = require("path");
const c = new Client();
const DIST = "./dist";
const REMOTE = "/var/www/keystarter-frontend";

function uploadDir(sftp, local, remote, cb) {
  const items = fs.readdirSync(local);
  let idx = 0;
  function next() {
    if (idx >= items.length) return cb();
    const item = items[idx++];
    const lp = path.join(local, item);
    const rp = remote + "/" + item;
    const stat = fs.statSync(lp);
    if (stat.isDirectory()) {
      sftp.mkdir(rp, (e) => { if(e && e.code!=4) return cb(e); uploadDir(sftp, lp, rp, next); });
    } else {
      sftp.fastPut(lp, rp, (e) => { if(e) return cb(e); console.log("  " + rp); next(); });
    }
  }
  next();
}

c.on("ready", () => {
  console.log("Uploading dist/ to " + REMOTE + "...");
  c.exec("rm -rf " + REMOTE + " && mkdir -p " + REMOTE + "/assets", (e, s) => {
    s.on("close", () => {
      c.sftp((err, sftp) => {
        if (err) { console.log("SFTP ERR:", err.message); c.end(); return; }
        uploadDir(sftp, DIST, REMOTE, (err) => {
          if (err) console.log("ERR:", err.message);
          else console.log("Upload complete!");
          sftp.end();
          c.end();
        });
      });
    });
  });
});
c.on("error", e => console.log("ERR:", e.message));
c.connect({
  host:"204.152.214.213", port:22, username:"root",
  password:"7pmaA49eGOj1Qj6Q8F",
  algorithms: { kex: ["curve25519-sha256","ecdh-sha2-nistp256","diffie-hellman-group14-sha256"],
    serverHostKey: ["ssh-ed25519","ecdsa-sha2-nistp256"],
    cipher: ["aes256-ctr","aes128-ctr"], hmac: ["hmac-sha2-256"] },
  readyTimeout: 15000
});
setTimeout(() => process.exit(1), 60000);
