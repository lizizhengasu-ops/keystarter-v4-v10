// KeyStarter "Terminal" skin chrome — rendered only when SITE.design === "terminal".
// Decorative storefront identity (topbar announcement + hero console panel);
// all copy is brand-level EN, matching the Terminal design spec (v3.0).

export function TerminalTopbar() {
  return (
    <div className="ks-term-topbar ks-mono">
      <span className="ks-topbar-full">Save up to 40%</span>
      <span className="ks-topbar-full" aria-hidden="true">·</span>
      <span className="ks-topbar-full">10-minute delivery</span>
      <span className="ks-topbar-full" aria-hidden="true">·</span>
      <span className="ks-topbar-full">14-day refund</span>
      <a href="/products">Shop deals &gt;</a>
    </div>
  );
}

export function TerminalConsole() {
  return (
    <div className="ks-console" role="img" aria-label="License telemetry console">
      <div className="ks-console-head">
        <span className="ks-console-dots" aria-hidden="true">
          <i style={{ background: "#f87171" }} />
          <i style={{ background: "#fbbf24" }} />
          <i style={{ background: "#34d399" }} />
        </span>
        <span className="ks-console-label">KS::LICENSE-CONSOLE</span>
      </div>
      <div className="ks-console-body">
        <span className="ks-line"><span className="ks-dim">$</span> <span className="ks-cursor" /></span>
        <span className="ks-line"><span className="ks-dim">&gt;</span> ACTIVATION CHECK ................. <span className="ks-ok">PASS</span></span>
        <span className="ks-line"><span className="ks-dim">&gt;</span> DELIVERY SLOT .................... <span className="ks-hi">10 MIN</span></span>
        <span className="ks-line"><span className="ks-dim">&gt;</span> <span className="ks-dim">14-day refund guarantee active</span></span>
      </div>
      <svg className="block w-full" height="46" viewBox="0 0 768 46" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 34 L96 22 L192 30 L288 12 L384 26 L480 18 L576 32 L672 20 L768 28" stroke="#7c6cff" strokeOpacity="0.45" strokeWidth="1.5" />
        <path d="M0 40 L128 34 L256 38 L384 30 L512 36 L640 32 L768 38" stroke="#7c6cff" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 5" />
      </svg>
    </div>
  );
}
