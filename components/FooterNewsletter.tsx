"use client";

import { useState, FormEvent } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "footer_newsletter",
          utm: Object.fromEntries(
            new URLSearchParams(window.location.search)
          ),
        }),
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
    <div className="border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-lg font-bold text-white">
              Stay ahead of the market
            </h3>
            <p className="mt-1 text-sm text-white/60 leading-relaxed">
              Weekly CRE insights, deal flow updates, and broker partnership
              opportunities for Florida&apos;s Space Coast.
            </p>
          </div>

          {status === "success" ? (
            <div className="flex items-center gap-2 text-sm font-medium text-sage">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-5 py-2.5 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all text-sm disabled:opacity-60 whitespace-nowrap"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {status === "error" && (
          <p className="mt-2 text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
