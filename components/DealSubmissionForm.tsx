"use client";

import { useState, useRef, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

const assetTypeOptions = [
  "Retail",
  "Office",
  "Medical Office",
  "Mixed-Use",
  "Industrial",
  "Small-Bay Warehouse",
  "R&D / Flex",
  "Multifamily",
  "Other",
];

const referralOptions = [
  "Referral",
  "Broker Network",
  "CoStar / LoopNet",
  "LinkedIn",
  "Google",
  "Other",
];

export default function DealSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Upload file to Supabase Storage if provided
    let fileUrl: string | null = null;
    if (file) {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${timestamp}_${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("deal-submissions")
        .upload(filePath, file, { contentType: file.type });
      if (uploadError) {
        setSubmitting(false);
        setError("File upload failed. Please try again or email the document directly to nick@risingtidepg.com.");
        return;
      }
      fileUrl = filePath;
    }

    const res = await fetch("/api/deal-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || null,
        company: formData.get("company") || null,
        property_location: formData.get("property_location"),
        asset_type: formData.get("asset_type") || null,
        asking_price: formData.get("asking_price") || null,
        property_size: formData.get("property_size") || null,
        occupancy: formData.get("occupancy") || null,
        description: formData.get("description") || null,
        referral_source: formData.get("referral_source") || null,
        file_path: fileUrl,
        website: formData.get("website"), // honeypot
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError(
        "Something went wrong. Please try again or email us directly at nick@risingtidepg.com."
      );
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
        <h3 className="text-lg font-bold text-text-dark">
          Submission Received
        </h3>
        <p className="mt-2 text-text-dark/60 text-sm max-w-md mx-auto">
          Thank you &mdash; we review every submission and will be in touch if
          it fits our current focus. Typical response within 3-5 business days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-text-dark/20 rounded focus:outline-none focus:ring-2 focus:ring-warm-gold/50 focus:border-warm-gold text-sm bg-cream/50";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 md:p-8 shadow-sm space-y-5"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 3: Property Location + Asset Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="property_location"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Property Location (City, State) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="property_location"
            name="property_location"
            required
            placeholder="e.g. Melbourne, FL"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="asset_type"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Asset Type
          </label>
          <select id="asset_type" name="asset_type" className={inputClass}>
            <option value="">Select one</option>
            {assetTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Price + Size + Occupancy */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label
            htmlFor="asking_price"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Asking Price / Value
          </label>
          <input
            type="text"
            id="asking_price"
            name="asking_price"
            placeholder="e.g. $4,500,000"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="property_size"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Property Size (SF)
          </label>
          <input
            type="number"
            id="property_size"
            name="property_size"
            placeholder="e.g. 50000"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="occupancy"
            className="block text-sm font-medium text-text-dark mb-1.5"
          >
            Current Occupancy %
          </label>
          <input
            type="number"
            id="occupancy"
            name="occupancy"
            min="0"
            max="100"
            placeholder="e.g. 85"
            className={inputClass}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          Brief Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={500}
          placeholder="Key facts, deal thesis, or why you're bringing it to Rising Tide (500 char max)"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-text-dark mb-1.5">
          Upload OM / Teaser{" "}
          <span className="font-normal text-text-dark/40">(PDF, max 20MB)</span>
        </label>
        <div
          className={`relative border-2 border-dashed rounded p-4 text-center transition-colors ${
            file ? "border-warm-gold/50 bg-warm-gold/5" : "border-text-dark/20 hover:border-text-dark/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const selected = e.target.files?.[0] || null;
              if (selected && selected.size > 20 * 1024 * 1024) {
                setError("File must be under 20MB.");
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
              }
              if (selected && selected.type !== "application/pdf") {
                setError("Only PDF files are accepted.");
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
              }
              setError("");
              setFile(selected);
            }}
          />
          {file ? (
            <div className="flex items-center justify-center gap-2 text-sm text-text-dark">
              <svg className="w-4 h-4 text-warm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="ml-2 text-text-dark/40 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <p className="text-sm text-text-dark/40">
              Click or drag to upload a PDF
            </p>
          )}
        </div>
      </div>

      {/* Referral Source */}
      <div>
        <label
          htmlFor="referral_source"
          className="block text-sm font-medium text-text-dark mb-1.5"
        >
          How did you hear about us?
        </label>
        <select
          id="referral_source"
          name="referral_source"
          className={inputClass}
        >
          <option value="">Select one</option>
          {referralOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-warm-gold text-white font-semibold rounded hover:bg-warm-gold/90 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Deal"}
      </button>

      <p className="text-xs text-text-dark/40 text-center">
        Questions? Contact us at{" "}
        <a
          href="mailto:nick@risingtidepg.com"
          className="text-warm-gold hover:underline"
        >
          nick@risingtidepg.com
        </a>
      </p>
    </form>
  );
}
