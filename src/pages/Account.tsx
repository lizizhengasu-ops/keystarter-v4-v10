import { useEffect, useState, useRef } from "react";

export default function AccountPage() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  // v2.1 - Remember Me + session fix
  const mounted = useRef(true);
  const submitting = useRef(false);
  useEffect(() => { return () => { mounted.current = false; }; }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("c_token");
      if (token) {
        const decoded = atob(token);
        const parts = decoded.split(":");
        const ts = parseInt(parts[2]);
        var maxAge = (localStorage.getItem("c_remember") !== "0" ? 30 : 1);
        if (ts && Date.now() - ts > maxAge * 24 * 60 * 60 * 1000) {
          localStorage.removeItem("c_token");
        } else if (ts) {
          window.location.href = "/consumer";
        }
      }
    } catch(e) {
      localStorage.removeItem("c_token");
    }
  }, []);

  const em = useRef(); const pw = useRef(); const fp = useRef();
  const rn = useRef(); const rl = useRef(); const re = useRef();
  const rph = useRef(); const rp = useRef(); const rcp = useRef();

  function safe(fn) {
    return function() {
      if (submitting.current) return;
      submitting.current = true;
      setLoading(true);
      setError("");
      var p = fn.apply(this, arguments);
      if (p && typeof p.then === "function") {
        p.then(function(){}, function(){}).finally(function(){
          if (mounted.current) setLoading(false);
          submitting.current = false;
        });
      } else {
        if (mounted.current) setLoading(false);
        submitting.current = false;
      }
    };
  }

  async function doLogin() {
    var email = em.current && em.current.value;
    var password = pw.current && pw.current.value;
    if (!email || !password) { setError("Please enter email and password"); return; }
    try {
      var d = await fetch("/api/consumer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        signal: AbortSignal.timeout(10000)
      }).then(function(r){ return r.json(); });
      if (!mounted.current) return;
      if (d.token) {
        localStorage.setItem("c_token", d.token);
        localStorage.setItem("c_remember", remember ? "1" : "0");
        if (mounted.current) setLoading(false);
        setTimeout(function(){ window.location.href = "/consumer"; }, 50);
      } else {
        setError(d.error || "Login failed. Please check your credentials.");
      }
    } catch(e) {
      if (!mounted.current) return;
      if (e.name === "TimeoutError" || e.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError("Unable to connect. Please check your internet connection.");
      }
    }
  }

  async function doRegister() {
    var name = (rn.current && rn.current.value || "").trim();
    var lastName = (rl.current && rl.current.value || "").trim();
    var email = (re.current && re.current.value || "").trim();
    var phone = (rph.current && rph.current.value || "").trim();
    var password = rp.current && rp.current.value || "";
    var confirm = rcp.current && rcp.current.value || "";
    if (!name || !email || !password) { setError("Name, email, and password are required."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    try {
      var fullName = lastName ? name + " " + lastName : name;
      var d = await fetch("/api/consumer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email: email, password: password, phone: phone }),
        signal: AbortSignal.timeout(10000)
      }).then(function(r){ return r.json(); });
      if (!mounted.current) return;
      if (d.token) {
        localStorage.setItem("c_token", d.token);
        localStorage.setItem("c_remember", remember ? "1" : "0");
        if (mounted.current) setLoading(false);
        setTimeout(function(){ window.location.href = "/consumer"; }, 50);
      } else {
        setError(d.error || "Registration failed.");
      }
    } catch(e) {
      if (!mounted.current) return;
      if (e.name === "TimeoutError" || e.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else {
        setError("Unable to connect. Please check your internet connection.");
      }
    }
  }

  async function doForgot() {
    var email = fp.current && fp.current.value;
    if (!email) { setError("Please enter your email address."); return; }
    try {
      var d = await fetch("/api/consumer/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
        signal: AbortSignal.timeout(10000)
      }).then(function(r){ return r.json(); });
      if (!mounted.current) return;
      if (d.ok) { setMode("done"); }
      else { setError(d.error || "Unable to process request."); }
    } catch(e) {
      if (!mounted.current) return;
      setError("Request timed out. Please try again.");
    }
  }

  var handleLogin = safe(doLogin);
  var handleRegister = safe(doRegister);
  var handleForgot = safe(doForgot);

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased" data-v="1784177574632">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">My Account</h1>
        <p className="text-base font-light text-white/80">Manage your licenses, orders, and account settings.</p>
      </div>
      <div className="max-w-lg mx-auto px-6 py-10 opacity-[0.9999]">

        {mode === "login" && (
          <div className="v5-card bg-white rounded-2xl p-8 border border-[#e8e8ed]">
            <h2 className="text-xl font-bold mb-6 text-center">Sign In</h2>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Email Address</label>
              <input ref={em} type="email" placeholder="you@example.com" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Password</label>
              <div className="relative">
                <input ref={pw} type={showPw ? "text" : "password"} placeholder="Enter your password" className="w-full p-2.5 pr-10 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] text-xs bg-transparent border-none p-1 cursor-pointer" type="button">{showPw ? "Hide" : "Show"}</button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={function(e){ setRemember(e.target.checked); }} className="w-4 h-4 rounded border-[#e8e8ed] text-[#0078d4] focus:ring-[#0078d4]" />
              <span className="text-xs text-[#1d1d1f]">Remember me</span>
            </label>
            <button onClick={handleLogin} disabled={loading} className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <div className="text-center mt-4 text-xs space-y-1">
              <div><button onClick={() => { setMode("forgot"); setError(""); submitting.current = false; if (mounted.current) setLoading(false); }} className="text-[#0078d4] hover:underline bg-transparent border-none p-0 cursor-pointer">Forgot Password?</button></div>
              <div className="text-[#86868b]">Don&apos;t have an account? <button onClick={() => { setMode("register"); setError(""); submitting.current = false; if (mounted.current) setLoading(false); }} className="text-[#0078d4] hover:underline bg-transparent border-none p-0 cursor-pointer font-semibold">Create New Account</button></div>
            </div>
          </div>
        )}

        {mode === "register" && (
          <div className="v5-card bg-white rounded-2xl p-8 border border-[#e8e8ed]">
            <h2 className="text-xl font-bold mb-2 text-center">Create New Account</h2>
            <p className="text-xs text-[#86868b] text-center mb-6">Fill in your details to get started.</p>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1.5">First Name *</label>
                <input ref={rn} type="text" placeholder="John" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1.5">Last Name</label>
                <input ref={rl} type="text" placeholder="Doe" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Email Address *</label>
              <input ref={re} type="email" placeholder="you@example.com" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Phone Number</label>
              <input ref={rph} type="tel" placeholder="+1 (555) 123-4567" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Password *</label>
              <input ref={rp} type="password" placeholder="At least 6 characters" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Confirm Password *</label>
              <input ref={rcp} type="password" placeholder="Re-enter your password" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
            </div>
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <button onClick={handleRegister} disabled={loading} className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50">
              {loading ? "Creating account..." : "Create Account"}
            </button>
            <div className="text-center mt-4 text-xs">
              <span className="text-[#86868b]">Already have an account?</span>
              <button onClick={() => { setMode("login"); setError(""); submitting.current = false; if (mounted.current) setLoading(false); }} className="text-[#0078d4] hover:underline bg-transparent border-none p-0 cursor-pointer font-semibold ml-1">Sign In</button>
            </div>
          </div>
        )}

        {mode === "forgot" && (
          <div className="v5-card bg-white rounded-2xl p-8 border border-[#e8e8ed]">
            <h2 className="text-xl font-bold mb-2 text-center">Reset Password</h2>
          <p className="text-xs text-[#86868b] text-center mb-6">Enter your email address and we'll send you a reset link.</p>
            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1.5">Email Address</label>
              <input ref={fp} type="email" placeholder="you@example.com" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
            </div>
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
            <button onClick={handleForgot} disabled={loading} className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-4 text-xs">
              <button onClick={() => { setMode("login"); setError(""); submitting.current = false; if (mounted.current) setLoading(false); }} className="text-[#0078d4] hover:underline bg-transparent border-none p-0 cursor-pointer">Back to Sign In</button>
            </div>
          </div>
        )}

        {mode === "done" && (
          <div className="v5-card bg-white rounded-2xl p-8 border border-[#e8e8ed] text-center">
            <h2 className="text-xl font-bold mb-3">Check Your Email</h2>
            <p className="text-xs text-[#86868b] mb-6">If an account with that email exists, you'll receive a password reset link shortly.</p>
            <button onClick={() => { setMode("login"); setError(""); submitting.current = false; if (mounted.current) setLoading(false); }} className="text-[#0078d4] hover:underline bg-transparent border-none p-0 cursor-pointer text-xs">Back to Sign In</button>
          </div>
        )}

      </div>
    </div>
  );
}