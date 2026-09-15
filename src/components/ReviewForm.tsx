// Shared review-submission form — posts to the ks-reviews-api endpoint.
// Used by the default product page and the Terminal skin (shop1).
import { useState, type FormEvent } from "react";
import { api } from "../site-config";

export default function ReviewForm({ productId, theme = "light" }: { productId: number; theme?: "light" | "terminal" }) {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating) return;
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const r = await fetch(api("/wp-json/keystarter/v1/product-reviews/" + productId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name: String(fd.get("name") || ""),
          text: String(fd.get("text") || ""),
          order_number: String(fd.get("order_number") || ""),
        }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className={theme === "terminal" ? "ks-mono" : ""} style={{ color: theme === "terminal" ? "#34d399" : "#059669" }}>
        Thanks! Your review was submitted and is pending moderation.
      </p>
    );
  }

  const border = theme === "terminal" ? "#1c2230" : "#e5e7eb";
  const inputBg = theme === "terminal" ? "#0a0c11" : "#ffffff";

  return (
    <form onSubmit={submit} style={{ borderColor: border, background: inputBg }} className="rounded-xl border p-4 space-y-3">
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map(v => (
          <button
            key={v}
            type="button"
            aria-label={v + " star" + (v > 1 ? "s" : "")}
            onClick={() => setRating(v)}
            className="text-xl leading-none transition-transform hover:scale-110"
            style={{ color: v <= rating ? "#f59e0b" : theme === "terminal" ? "#2a3140" : "#d1d5db", background: "none", border: "none", cursor: "pointer" }}
          >★</button>
        ))}
      </div>
      <input name="name" required placeholder="Your name" className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: border, background: inputBg, color: "inherit" }} />
      <input name="order_number" placeholder="Order number (optional — gets a Verified badge)" className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: border, background: inputBg, color: "inherit" }} />
      <textarea name="text" required minLength={10} rows={3} placeholder="Share your experience: activation, delivery speed, support..." className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: border, background: inputBg, color: "inherit" }} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg px-4 py-2 text-sm font-bold transition disabled:opacity-50"
        style={{ background: "#635bff", color: "#fff", border: "none", cursor: "pointer" }}
      >
        {status === "sending" ? "Sending…" : "Submit Review"}
      </button>
      <p className="text-[11px]" style={{ color: theme === "terminal" ? "#8b93a7" : "#86868b" }}>
        Reviews are moderated. Add your order number to get a Verified badge.
      </p>
    </form>
  );
}
