// Official download links — copy follows the Terminal-v3 mockup (downloads.html).
export default function DownloadsPage() {
  return (
    <div className="bg-[#f6f7f9] text-[#0f1115] antialiased px-6 py-14 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <span className="eyebrow" style={{ fontFamily: "var(--ks-mono, monospace)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#635bff", fontWeight: 600 }}>Fulfillment center</span>
        <h1 className="text-4xl font-bold mt-2 mb-2" style={{ letterSpacing: "-.02em" }}>Downloads &amp; delivery</h1>
        <p className="text-[#5b6270] mb-10">Official installers and delivery instructions for your license.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-white rounded-xl p-6 border border-[#e2e6eb]">
            <h2 className="font-bold text-lg mb-2">Windows 11 ISO</h2>
            <p className="text-sm text-[#5b6270] mb-4">Download the official Windows 11 media creation tool.</p>
            <a href="https://www.microsoft.com/software-download/windows11" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#635bff] hover:underline">Open Microsoft &rarr;</a>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#e2e6eb]">
            <h2 className="font-bold text-lg mb-2">Windows 10 ISO</h2>
            <p className="text-sm text-[#5b6270] mb-4">Download the official Windows 10 media creation tool.</p>
            <a href="https://www.microsoft.com/software-download/windows10" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#635bff] hover:underline">Open Microsoft &rarr;</a>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#e2e6eb]">
            <h2 className="font-bold text-lg mb-2">Office install</h2>
            <p className="text-sm text-[#5b6270] mb-4">Sign in at office.com/setup to install Office after activation.</p>
            <a href="https://setup.office.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#635bff] hover:underline">Open office.com &rarr;</a>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#e2e6eb]">
            <h2 className="font-bold text-lg mb-2">Server &amp; SQL</h2>
            <p className="text-sm text-[#5b6270] mb-4">Evaluation center and official downloads for Server and SQL.</p>
            <a href="https://www.microsoft.com/evalcenter/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#635bff] hover:underline">Open Eval Center &rarr;</a>
          </div>
        </div>

        <p className="text-xs text-[#5b6270] mt-10">Downloads are free and separate from your license key — the key is emailed after purchase. External links point to official Microsoft resources.</p>
      </div>
    </div>
  );
}
