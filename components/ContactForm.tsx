"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/contact-form`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || null,
          contact_type: formData.get("type") || null,
          message: formData.get("message"),
        }),
      }
    );

    setSubmitting(false);

    if (!res.ok) {
      setError("Something went wrong. Please try again or email us directly at nick@risingtidepg.com.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="w-12 h-12 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-slate-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text-dark">Message Received</h3>
        <p className="mt-2 text-text-dark/60 text-sm">
          Thank you for reaching out. We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 md:p-8 shadow-sm space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50"
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          I am a...
        </label>
        <select
          id="type"
          name="type"
          className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50"
        >
          <option value="">Select one</option>
          <option value="investor">Investor</option>
          <option value="broker">Broker</option>
          <option value="tenant">Tenant</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50 resize-none"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
