"use client";

import { useState, FormEvent, ReactNode } from "react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface GatedFormProps {
  fields: FormField[];
  leadSource: string;
  ctaText?: string;
  successMessage?: string;
  pdfUrl?: string;
  children?: ReactNode;
}

export default function GatedForm({
  fields,
  leadSource,
  ctaText = "Get Access",
  successMessage = "Check your email for the download link.",
  pdfUrl,
}: GatedFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: formData.get("phone") || null,
          contact_type: formData.get("role") || formData.get("contact_type") || null,
          message: `Gated content request: ${leadSource}. Company: ${formData.get("company") || "N/A"}`,
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");

      // If there's a PDF, trigger download
      if (pdfUrl) {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "";
        link.click();
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="w-12 h-12 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-slate-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-text-dark">You&apos;re in.</h3>
        <p className="mt-2 text-text-dark/60 text-sm">{successMessage}</p>
        {pdfUrl && (
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center mt-4 px-6 py-2.5 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all text-sm"
          >
            Download PDF
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 md:p-8 shadow-sm space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-text-dark mb-1.5">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50"
            >
              <option value="">Select one</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50"
            />
          )}
        </div>
      ))}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Processing..." : ctaText}
      </button>

      <p className="text-xs text-text-dark/40 text-center">
        We respect your privacy. No spam.
      </p>
    </form>
  );
}
