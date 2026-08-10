const { Client } = require("ssh2");
const fs = require("fs");
const path = require("path");

const host = process.argv[2] || "204.152.214.213";
const keyPath = process.env.SSH_KEY || path.join(process.env.USERPROFILE || "", ".ssh", "id_ed25519_racknerd");
const sudoPassword = process.env.KS_SUDO_PASSWORD || "";
const files = ["index.html", "assets/index-D90g4kpR.js", "assets/index-JMEWEEJ5.css", "keystarter-logo.svg"];
const tmpRoot = "/tmp/deploy-ks-blog";
const remoteDir = "/var/www/keystarter-frontend";

function upload(c, local, remote) {
  return new Promise((ok, fail) => {
    c.exec(`mkdir -p ${path.posix.dirname(remote)} && cat > ${remote}`, (e, s) => {
      if (e) return fail(e);
      const timer = setTimeout(() => fail(new Error("upload timeout")), 90000);
      s.stdin.write(fs.readFileSync(local));
      s.stdin.end();
      s.on("close", (code) => {
        clearTimeout(timer);
        if (code !== 0) return fail(new Error("exit " + code));
        c.exec(`stat -c %s ${remote}`, (e2, s2) => {
          if (e2) return fail(e2);
          let out = "";
          s2.on("data", (d) => (out += d));
          s2.on("close", () => {
            const sz = parseInt(out.trim(), 10);
            if (sz === fs.statSync(local).size) ok();
            else fail(new Error("size mismatch"));
          });
        });
      });
    });
  });
}

const c = new Client();
c.on("ready", async () => {
  try {
    for (const rel of files) {
      const local = path.join(__dirname, "..", "dist", rel);
      if (!fs.existsSync(local)) throw new Error("missing " + local);
      await upload(c, local, tmpRoot + "/" + rel);
      console.log("STAGED:", rel);
    }
    const copies = files.map((rel) => `cp ${tmpRoot}/${rel} ${remoteDir}/${rel}`).join(" && ");
    const chown = files.map((rel) => `chown www-data:www-data ${remoteDir}/${rel}`).join(" && ");
    const sudoFlag = sudoPassword ? "-S -p ''" : "-n -p ''";
    const deploy = `sudo ${sudoFlag} bash -c '${copies} && ${chown} && echo DEPLOY_OK'`;
    await new Promise((ok, fail) => {
      c.exec(deploy, (e, s) => {
        if (e) return fail(e);
        if (sudoPassword) s.stdin.write(sudoPassword + "\n");
        s.stdin.end();
        let err = "";
        s.stderr.on("data", (d) => (err += d));
        s.on("close", (code) => {
          if (code !== 0) fail(new Error("deploy exit " + code + " " + err.slice(0, 300)));
          else ok();
        });
      });
    });
    console.log("DEPLOY_OK: " + files.length + " files");
    c.end();
    process.exit(0);
  } catch (e) {
    console.log("ERR:", e.message);
    c.end();
    process.exit(1);
  }
});
c.on("error", (e) => {
  console.log("CONN:", e.message);
  process.exit(1);
});
c.connect({
  host,
  port: 2222,
  username: process.env.KS_SSH_USER || "admin-ks",
  privateKey: fs.readFileSync(keyPath),
  algorithms: {
    kex: ["curve25519-sha256", "ecdh-sha2-nistp256", "diffie-hellman-group14-sha256"],
    serverHostKey: ["ssh-ed25519", "ecdsa-sha2-nistp256"],
    cipher: ["aes256-ctr", "aes128-ctr"],
    hmac: ["hmac-sha2-256"],
  },
  readyTimeout: 15000,
});
setTimeout(() => {
  console.log("TIMEOUT");
  process.exit(1);
}, 180000);
