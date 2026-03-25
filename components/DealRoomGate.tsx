'use client';

import { useState, FormEvent } from 'react';
import { Lock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DealRoomGateProps {
  onAuthenticated: () => void;
}

export default function DealRoomGate({ onAuthenticated }: DealRoomGateProps) {
  const [view, setView] = useState<'gate' | 'requestAccess' | 'success'>('gate');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setVerifying(true);
    setPasswordError(false);

    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onAuthenticated();
      } else {
        setPasswordError(true);
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
      }
    } catch {
      setPasswordError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    } finally {
      setVerifying(false);
    }
  }

  async function handleAccessRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');

    const fd = new FormData(e.currentTarget);

    // Honeypot
    if (fd.get('website')) {
      setView('success');
      return;
    }

    const name = fd.get('name') as string;
    const email = fd.get('email') as string;

    if (!name || !email) {
      setFormError('Name and email are required.');
      setFormStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/investor-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: fd.get('phone') || null,
          company: fd.get('company') || null,
          accredited: fd.get('accredited') || null,
          investmentRange: fd.get('investmentRange') || null,
          message: fd.get('message') || null,
          website: fd.get('website') || null,
        }),
      });

      if (!res.ok) {
        setFormError('Something went wrong. Please try again.');
        setFormStatus('error');
        return;
      }

      setView('success');
    } catch {
      setFormError('Something went wrong. Please try again.');
      setFormStatus('error');
    }
  }

  /* ─── Shared styles ─── */
  const inputBase =
    'w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574]/30 transition-colors';
  const labelBase = 'block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5';
  const copperBtn =
    'w-full py-3.5 bg-[#D4A574] text-white font-semibold rounded-lg hover:opacity-90 hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, rgba(212,165,116,0.06) 0%, transparent 60%), linear-gradient(180deg, #0f1923 0%, #1a2a35 100%)',
      }}
    >
      <AnimatePresence mode="wait">
        {/* ═══════════ GATE VIEW ═══════════ */}
        {view === 'gate' && (
          <motion.div
            key="gate"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <p className="text-[#D4A574] text-xs font-medium uppercase tracking-[0.2em] mb-3">
                Rising Tide CRE
              </p>
              <h1
                className="text-3xl md:text-4xl text-white font-bold mb-2"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Lake Washington Square
              </h1>
              <p className="text-white/50 text-sm">Investor Deal Room</p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div
                className={`relative mb-4 ${shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                style={
                  shaking
                    ? {
                        animation: 'shake 0.5s ease-in-out',
                      }
                    : undefined
                }
              >
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Enter password"
                  className={`${inputBase} pl-10 ${passwordError ? 'border-red-500/60 focus:border-red-500' : ''}`}
                  autoFocus
                />
              </div>

              {passwordError && (
                <p className="text-red-400/80 text-xs mb-3 text-center">
                  Incorrect password. Please try again or request access below.
                </p>
              )}

              <button type="submit" disabled={verifying} className={copperBtn}>
                {verifying ? 'Verifying...' : 'Enter Deal Room'}
              </button>
            </form>

            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <button
              onClick={() => setView('requestAccess')}
              className="w-full py-3.5 border border-[#D4A574]/40 text-[#D4A574] font-medium rounded-lg hover:border-[#D4A574]/70 hover:bg-[#D4A574]/5 transition-all text-sm flex items-center justify-center gap-2"
            >
              Request Access
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-white/25 text-[11px] text-center mt-8 leading-relaxed max-w-xs mx-auto">
              For qualified investors only. This does not constitute an offer to sell securities.
            </p>
          </motion.div>
        )}

        {/* ═══════════ REQUEST ACCESS FORM ═══════════ */}
        {view === 'requestAccess' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            <button
              onClick={() => {
                setView('gate');
                setFormStatus('idle');
                setFormError('');
              }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="mb-8">
              <h2
                className="text-2xl text-white font-bold mb-1"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Request Access
              </h2>
              <p className="text-white/45 text-sm">
                Complete the form below and our team will reach out within 24 hours.
              </p>
            </div>

            <form onSubmit={handleAccessRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gate-name" className={labelBase}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="gate-name"
                    name="name"
                    required
                    placeholder="John Smith"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="gate-email" className={labelBase}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="gate-email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gate-phone" className={labelBase}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="gate-phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="gate-company" className={labelBase}>
                    Company / Firm
                  </label>
                  <input
                    type="text"
                    id="gate-company"
                    name="company"
                    placeholder="Acme Capital"
                    className={inputBase}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gate-accredited" className={labelBase}>
                    Accredited Investor *
                  </label>
                  <select
                    id="gate-accredited"
                    name="accredited"
                    required
                    defaultValue=""
                    className={`${inputBase} appearance-none`}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="gate-investment" className={labelBase}>
                    Target Investment *
                  </label>
                  <select
                    id="gate-investment"
                    name="investmentRange"
                    required
                    defaultValue=""
                    className={`${inputBase} appearance-none`}
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="$250K - $500K">$250K – $500K</option>
                    <option value="$500K - $1M">$500K – $1M</option>
                    <option value="$1M+">$1M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="gate-message" className={labelBase}>
                  Message (optional)
                </label>
                <textarea
                  id="gate-message"
                  name="message"
                  rows={3}
                  placeholder="Any questions or comments..."
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Honeypot */}
              <div className="absolute opacity-0 -z-10" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {formError && <p className="text-red-400/80 text-sm">{formError}</p>}

              <button type="submit" disabled={formStatus === 'loading'} className={copperBtn}>
                {formStatus === 'loading' ? 'Submitting...' : 'Submit Request'}
              </button>

              <p className="text-white/25 text-[11px] text-center leading-relaxed">
                Your information is kept confidential and will only be used to evaluate your interest in this investment.
              </p>
            </form>
          </motion.div>
        )}

        {/* ═══════════ SUCCESS VIEW ═══════════ */}
        {view === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md text-center"
          >
            <div className="w-16 h-16 bg-[#D4A574]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#D4A574]" />
            </div>
            <h2
              className="text-2xl text-white font-bold mb-3"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Request Received
            </h2>
            <p className="text-white/50 text-sm mb-8 max-w-sm mx-auto">
              Thank you for your interest in Lake Washington Square. A member of our team will be in touch within 24 hours.
            </p>
            <a
              href="https://www.risingtidepg.com"
              className="inline-flex items-center gap-2 text-[#D4A574] text-sm hover:underline transition-all"
            >
              Back to Rising Tide CRE
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shake keyframes (injected inline since globals.css may not have it) */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
