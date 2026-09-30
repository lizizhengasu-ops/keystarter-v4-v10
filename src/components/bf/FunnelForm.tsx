import React, { useState } from "react";
import { api } from "../../site-config";

/**
 * Black Friday early-access funnel (email list capture).
 * Posts to the existing /api/consumer/newsletter endpoint; tags the lead
 * with a pushEvent so GA4 can attribute BF signups separately.
 * Modular: <FunnelForm source="bf_vip" /> — reusable on any landing page.
 */
export default function FunnelForm({ source = "bf_vip" }: { source?: string }): React.ReactElement {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  function submit(e: React.FormEvent): void {
    e.preventDefault();
    if (!email || !consent || state === "sending") return;
    setState("sending");
    try {
      const w = window as unknown as { dataLayer?: unknown[] };
      (w.dataLayer = w.dataLayer || []).push({
        event: "lead",
        form_name: source,
        email_present: true,
      });
    } catch { /* analytics must never block the funnel */ }
    fetch(api("/api/consumer/newsletter"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((d: { message?: string }) => {
        setState("done");
        setEmail("");
        if (d && d.message) void d.message;
      })
      .catch(() => setState("error"));
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md mx-auto text-left" data-testid="bf-funnel">
      <label htmlFor="bf-email" className="block text-sm font-semibold text-white mb-2">
        Get early access to Black Friday deals
      </label>
      <div className="flex gap-2">
        <input
          id="bf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 min-h-[44px] px-3 rounded-lg bg-white text-[#111827] text-sm border border-[#d1d5db]"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="min-h-[44px] px-4 rounded-lg bg-[#7c3aed] text-white text-sm font-bold hover:bg-[#6d28d9] transition disabled:opacity-60"
        >
          {state === "sending" ? "..." : "Get early access"}
        </button>
      </div>
      <label className="flex items-start gap-2 mt-3 text-xs text-[#9ca3af] cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        Email me Black Friday offers and early access deals. Unsubscribe anytime.
      </label>
      {state === "done" && (
        <p className="mt-3 text-sm text-[#4ade80] font-semibold" role="status">
          You're on the list — we'll email your early-access deals.
        </p>
      )}
      {state === "error" && (
        <p className="mt-3 text-sm text-[#f87171]" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
