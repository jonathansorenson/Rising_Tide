"use client";

import { useState, FormEvent } from "react";

export default function BlogCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog_cta" }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="my-12 p-8 bg-cream rounded-lg border border-sage/20">
      <h3 className="text-lg font-bold text-text-dark">
        Market insights for CRE professionals
      </h3>
      <p className="mt-2 text-sm text-text-dark/70 leading-relaxed">
        Weekly Space Coast market intelligence, deal flow criteria, and broker
        partnership opportunities — straight to your inbox.
      </p>

      {status === "success" ? (
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-dark">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          You&apos;re subscribed. Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2.5 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="mt-3 text-xs text-text-dark/40">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
