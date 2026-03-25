'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import {
  DollarSign, TrendingUp, Shield, Lock, ChevronDown, ArrowRight,
  Building, Users, MapPin, FileText, Phone, Mail, ExternalLink,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   CUSTOM HOOKS
   ═══════════════════════════════════════════════════════════════ */

function useScrollProgressRef() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const h = document.documentElement;
          const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
          if (barRef.current) barRef.current.style.width = `${pct * 100}%`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return barRef;
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const idsRef = useRef(ids);
  idsRef.current = ids;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    idsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

function useCountUp(target: number, duration: number, isActive: boolean) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!isActive) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(eased * target);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, isActive]);
  return { value, done };
}

function useMouseGradient() {
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let scheduled = false;
    const handler = (e: MouseEvent) => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          if (heroRef.current) {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            heroRef.current.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(212,165,116,0.06) 0%, transparent 50%), linear-gradient(135deg, #0f1923 0%, #1a2a35 50%, #0f1923 100%)`;
          }
          scheduled = false;
        });
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return heroRef;
}

/* ═══════════════════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'investment', label: 'Investment' },
  { id: 'financials', label: 'Financials' },
  { id: 'tenants', label: 'Tenants' },
  { id: 'market', label: 'Market' },
  { id: 'structure', label: 'Structure' },
  { id: 'team', label: 'Team' },
  { id: 'documents', label: 'Documents' },
];
const NAV_IDS = NAV_ITEMS.map((n) => n.id);

const KPI_DATA = [
  { value: 18.1, label: 'Purchase Price', prefix: '$', suffix: 'M', decimals: 1 },
  { value: 7.7, label: 'Going-In Cap Rate', prefix: '', suffix: '%', decimals: 1 },
  { value: 15.9, label: 'Target IRR (Base)', prefix: '', suffix: '%', decimals: 1 },
  { value: 3.22, label: 'Equity Multiple', prefix: '', suffix: 'x', decimals: 2 },
  { value: 100, label: 'Leased at Acquisition', prefix: '', suffix: '%', decimals: 0 },
  { value: 6.8, label: 'Total Equity', prefix: '$', suffix: 'M', decimals: 1 },
];

const NOI_DATA = [
  { year: '2026', noi: 1403110 },
  { year: '2027', noi: 1527185 },
  { year: '2028', noi: 1589619 },
  { year: '2029', noi: 1546082 },
  { year: '2030', noi: 1635297 },
  { year: '2031', noi: 1696192 },
];

const COC_RETURNS = ['7.8%', '10.1%', '4.9%', '(1.8%)', '8.1%', 'Exit'];

const LEASE_EXPIRY = [
  { year: '2026', inline: 4300, anchor: 0 },
  { year: '2027', inline: 2682, anchor: 0 },
  { year: '2028', inline: 25000, anchor: 0 },
  { year: '2029', inline: 0, anchor: 53542 },
  { year: '2030', inline: 6270, anchor: 0 },
  { year: '2031', inline: 0, anchor: 0 },
];

const SCENARIOS = [
  { label: 'Bull', exit: '6.75%', irr: '18.1%', multiple: '3.48x', exitValue: '$25.6M', accent: 'border-sage-dark' },
  { label: 'Base', exit: '7.25%', irr: '15.9%', multiple: '3.22x', exitValue: '$23.9M', accent: 'border-copper' },
  { label: 'Bear', exit: '7.75%', irr: '13.8%', multiple: '3.00x', exitValue: '$22.3M', accent: 'border-slate-dark/40' },
];

const FINANCIAL_TABLE = [
  ['Purchase Price', '$18,125,000'],
  ['Price Per SF', '$162/SF'],
  ['Total Capitalization', '$18,578,125'],
  ['Equity Required', '$6,796,875 (35%)'],
  ['Senior Debt', '$11,781,250 (65% LTV)'],
  ['Interest Rate', '6.50% Fixed'],
  ['Year-1 NOI', '$1,403,110'],
  ['Going-In Cap Rate', '7.7%'],
  ['Year-1 DSCR', '1.83x'],
  ['Year-1 Cash-on-Cash', '7.8%'],
  ['Hold Period', '6 Years'],
  ['Exit Cap (Base)', '7.25%'],
];

type Tenant = {
  tenant: string; suite: string; sf: number; rent: number;
  market: number; expiry: string; structure: string;
};

const TENANTS: Tenant[] = [
  { tenant: 'LA Fitness', suite: '102', sf: 38305, rent: 14.76, market: 15.50, expiry: 'Mar 2029', structure: 'NNN' },
  { tenant: 'Thrifty Specialty Produce', suite: '104', sf: 15237, rent: 8.04, market: 8.75, expiry: 'Feb 2029', structure: 'NNN' },
  { tenant: 'Envisionalize (Control Jiu-Jitsu)', suite: '112', sf: 10244, rent: 11.04, market: 12.00, expiry: 'Mar 2032', structure: 'NNN' },
  { tenant: 'Dollar General', suite: '130', sf: 9824, rent: 8.64, market: 10.00, expiry: 'May 2028', structure: 'NNN' },
  { tenant: 'DEEBA LLC', suite: '126', sf: 6270, rent: 14.28, market: 14.50, expiry: 'Dec 2030', structure: 'NNN' },
  { tenant: 'IHOP', suite: '144', sf: 3461, rent: 37.80, market: 28.00, expiry: 'Jan 2029', structure: 'NNN' },
  { tenant: 'Kiatticchai', suite: '136', sf: 3000, rent: 18.00, market: 22.00, expiry: 'Jul 2026', structure: 'NNN' },
  { tenant: 'Giant Communications', suite: '128', sf: 2730, rent: 13.73, market: 22.00, expiry: 'Jan 2028', structure: 'NNN' },
  { tenant: 'Grupo Martinez', suite: '124', sf: 2600, rent: 14.08, market: 22.00, expiry: 'Apr 2028', structure: 'NNN' },
  { tenant: 'Pragathi Foods', suite: '148', sf: 2463, rent: 27.00, market: 28.00, expiry: 'Jul 2035', structure: 'NNN' },
  { tenant: 'Hop Bo Chinese', suite: '146', sf: 2000, rent: 16.32, market: 22.00, expiry: 'Sep 2028', structure: 'NNN' },
  { tenant: 'Pho Thien Vietnamese', suite: '138', sf: 1577, rent: 15.22, market: 22.00, expiry: 'Apr 2027', structure: 'NNN' },
  { tenant: 'Harbor City Salon', suite: '118', sf: 1300, rent: 17.54, market: 22.00, expiry: 'Expired Feb 2026', structure: 'NNN' },
  { tenant: 'Island Root Kava', suite: '120', sf: 1300, rent: 18.46, market: 22.00, expiry: 'Jan 2028', structure: 'NNN' },
  { tenant: 'Inline Tenant 15', suite: '108', sf: 1200, rent: 16.00, market: 22.00, expiry: 'Jun 2027', structure: 'NNN' },
  { tenant: 'Inline Tenant 16', suite: '110', sf: 1200, rent: 15.50, market: 22.00, expiry: 'Aug 2028', structure: 'NNN' },
  { tenant: 'Inline Tenant 17', suite: '114', sf: 1100, rent: 17.00, market: 22.00, expiry: 'Nov 2027', structure: 'NNN' },
  { tenant: 'Inline Tenant 18', suite: '116', sf: 1050, rent: 16.75, market: 22.00, expiry: 'Mar 2028', structure: 'NNN' },
  { tenant: 'Inline Tenant 19', suite: '122', sf: 1000, rent: 18.00, market: 22.00, expiry: 'Sep 2027', structure: 'NNN' },
  { tenant: 'Inline Tenant 20', suite: '132', sf: 950, rent: 17.50, market: 22.00, expiry: 'Dec 2027', structure: 'NNN' },
  { tenant: 'Inline Tenant 21', suite: '134', sf: 900, rent: 19.00, market: 22.00, expiry: 'Feb 2028', structure: 'NNN' },
  { tenant: 'Inline Tenant 22', suite: '140', sf: 850, rent: 18.25, market: 22.00, expiry: 'May 2028', structure: 'NNN' },
  { tenant: 'Inline Tenant 23', suite: '142', sf: 800, rent: 17.75, market: 22.00, expiry: 'Jul 2028', structure: 'NNN' },
];

const MARKET_STATS = [
  { value: '80,000+', label: 'Residents (5-mi)' },
  { value: '60,000+', label: 'Aerospace/Defense Jobs' },
  { value: '<5%', label: 'Retail Vacancy' },
  { value: '~3.5%', label: 'Annual Rent Growth' },
  { value: '45,000', label: 'VPD Traffic Count' },
  { value: '$62,000+', label: 'Median HHI (3-mi)' },
];

const RISK_FACTORS = [
  {
    title: 'Anchor Concentration (2029)',
    body: 'LA Fitness + Thrifty = 48% GLA, both expiring 2029.',
    mitigant: 'Both hold 3\u00d75yr renewal options (terminal 2044); $675K TI/LC fully reserved in Year 4.',
  },
  {
    title: 'Interest Rate / Refinancing',
    body: '6.50% fixed loan matures at Year 6 exit.',
    mitigant: 'Model assumes 55bps exit cap expansion; bear case still delivers 13.8% IRR.',
  },
  {
    title: 'Retail Market / E-Commerce',
    body: 'Consumer spending and e-commerce pressures on brick-and-mortar.',
    mitigant: '23-tenant diversification, NNN structure, service-oriented/experiential tenancy (fitness, restaurants, salon).',
  },
  {
    title: 'Liquidity',
    body: 'Private real estate, no public market for LP interests.',
    mitigant: '6-year hold with monthly distributions; strong projected exit proceeds.',
  },
];

const DOCUMENTS = [
  'Full Excel Financial Model',
  'Rent Roll & Lease Abstracts',
  'Phase I ESA',
  '3-Year Operating History',
  'Subscription Documents & Operating Agreement',
];

/* ═══════════════════════════════════════════════════════════════
   HELPER COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;
const hoverEase = [0.4, 0, 0.2, 1] as const;

function fmt$(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function fmtNum(n: number, d = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
}

/* KPI Card with count-up */
function KpiCard({ kpi, index }: { kpi: typeof KPI_DATA[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { value, done } = useCountUp(kpi.value, 2000, inView);

  const display = `${kpi.prefix}${fmtNum(value, kpi.decimals)}${kpi.suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease }}
      className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-copper/10 transition-shadow duration-300"
    >
      <p className={`font-serif font-bold text-3xl md:text-4xl text-copper ${done ? 'deal-room-animate' : ''}`}
        style={done ? { animation: 'scalePulse 0.3s ease-out' } : undefined}
      >
        {display}
      </p>
      <p className="text-xs uppercase tracking-wider text-slate-dark/60 mt-2">{kpi.label}</p>
    </motion.div>
  );
}

/* Section wrapper with stagger children */
function Section({ id, className = '', children, style }: {
  id?: string; className?: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <section id={id} className={`relative ${className}`} style={style}>
      {children}
    </section>
  );
}

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-6xl mx-auto px-6 ${className}`}>{children}</div>;
}

const CTA_EMAIL = 'mailto:nick@risingtidepg.com,jonathan@risingtidepg.com,nickwest@risingtidepg.com?subject=Lake%20Washington%20Square%20-%20Investor%20Inquiry';
const CTA_CALL = 'mailto:nick@risingtidepg.com,jonathan@risingtidepg.com,nickwest@risingtidepg.com?subject=Lake%20Washington%20Square%20-%20Schedule%20Call';

/* Inline CTA Banner — reusable between sections */
function CtaBanner({ dark = false, headline, sub }: { dark?: boolean; headline?: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-14 md:py-16 ${dark ? 'bg-navy' : 'bg-slate-dark'}`}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-serif font-bold text-2xl md:text-3xl text-white mb-3">
          {headline || 'Interested in This Opportunity?'}
        </p>
        <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto">
          {sub || '$6.8M equity raise for qualified investors. Minimum investment: $250,000. Target close: Q2 2026.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={CTA_EMAIL}
            className="px-8 py-3.5 bg-copper text-white font-semibold rounded-md hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 text-sm"
            style={{ animation: 'glowPulse 3s ease-in-out infinite' }}
          >
            Request Investment Package
          </a>
          <a
            href={CTA_CALL}
            className="flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white/80 font-medium rounded-md hover:border-copper hover:text-copper transition-all duration-200 text-sm"
          >
            <Phone className="w-4 h-4" /> Schedule a Call
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Floating CTA — fixed bottom-right after scrolling past hero */
function FloatingCta() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          <a
            href={CTA_EMAIL}
            className="flex items-center gap-2 px-6 py-3 bg-copper text-white font-semibold rounded-full shadow-lg shadow-copper/25 hover:shadow-xl hover:shadow-copper/30 hover:-translate-y-0.5 transition-all duration-200 text-sm"
            style={{ animation: 'glowPulse 2.5s ease-in-out infinite' }}
          >
            <Mail className="w-4 h-4" />
            Invest Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Accordion item for risk factors */
function Accordion({ item, index }: { item: typeof RISK_FACTORS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-serif text-lg text-white group-hover:text-copper transition-colors duration-200">
          {item.title}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-copper" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: hoverEase }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-white/70 text-sm leading-relaxed">
              <p className="mb-3">{item.body}</p>
              <p className="text-sage-dark font-medium">
                <span className="text-sage">Mitigant:</span> {item.mitigant}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* Floating particles for hero — seeded values to avoid hydration mismatch */
const PARTICLE_SEEDS = [
  { left: 7, size: 2.4, dur: 18, del: 2, op: 0.09 },
  { left: 14, size: 3.1, dur: 22, del: 7, op: 0.12 },
  { left: 22, size: 2.0, dur: 16, del: 0, op: 0.10 },
  { left: 31, size: 3.8, dur: 24, del: 11, op: 0.08 },
  { left: 38, size: 2.6, dur: 19, del: 4, op: 0.14 },
  { left: 45, size: 3.3, dur: 21, del: 9, op: 0.11 },
  { left: 52, size: 2.2, dur: 17, del: 1, op: 0.09 },
  { left: 59, size: 3.5, dur: 23, del: 13, op: 0.13 },
  { left: 65, size: 2.8, dur: 20, del: 6, op: 0.10 },
  { left: 72, size: 2.1, dur: 15, del: 3, op: 0.12 },
  { left: 78, size: 3.0, dur: 25, del: 10, op: 0.08 },
  { left: 84, size: 2.5, dur: 18, del: 5, op: 0.11 },
  { left: 90, size: 3.6, dur: 22, del: 14, op: 0.09 },
  { left: 95, size: 2.3, dur: 16, del: 8, op: 0.13 },
  { left: 3, size: 3.2, dur: 20, del: 12, op: 0.10 },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {PARTICLE_SEEDS.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full deal-room-animate"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: '#D4A574',
            opacity: p.op,
            animation: `floatUp ${p.dur}s linear ${p.del}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* SVG Wave mark for hero background */
function WaveMark() {
  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-[0.04] pointer-events-none"
      viewBox="0 0 600 200"
      fill="none"
      aria-hidden
    >
      {[60, 100, 140].map((y, i) => (
        <path
          key={i}
          d={`M0 ${y} Q150 ${y - 40} 300 ${y} Q450 ${y + 40} 600 ${y}`}
          stroke="#D4A574"
          strokeWidth="2"
          strokeDasharray="400"
          strokeDashoffset="400"
          className="deal-room-animate"
          style={{ animation: `drawWave 2.5s ease-out ${0.3 * i}s forwards` }}
        />
      ))}
    </svg>
  );
}

/* Custom tooltip for NOI chart */
function NoiTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy border border-white/10 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-white/60 text-xs">{label}</p>
      <p className="text-copper font-serif font-bold text-lg">{fmt$(payload[0].value)}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function LakeWashingtonDealRoom() {
  const progressBarRef = useScrollProgressRef();
  const activeSection = useScrollSpy(NAV_IDS);
  const heroGradientRef = useMouseGradient();

  /* Tenant table sort state */
  const [sortKey, setSortKey] = useState<keyof Tenant>('sf');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sortedTenants = useMemo(() => {
    return [...TENANTS].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [sortKey, sortDir]);

  const toggleSort = (key: keyof Tenant) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  /* Hero section refs */
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setHeroVisible(true); }, []);

  /* Lazy chart init */
  const noiRef = useRef<HTMLDivElement>(null);
  const noiInView = useInView(noiRef, { once: true, margin: '200px' });
  const leaseRef = useRef<HTMLDivElement>(null);
  const leaseInView = useInView(leaseRef, { once: true, margin: '200px' });

  return (
    <div className="relative -mt-16 md:-mt-20">
      {/* ─── Scroll Progress Bar ─── */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2px] bg-copper z-[60]"
        style={{ width: '0%' }}
      />

      {/* ─── Floating CTA ─── */}
      <FloatingCta />

      {/* ─── Sticky Section Nav ─── */}
      <nav className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-slate-dark/95 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-1 overflow-x-auto scrollbar-hide h-11">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
                activeSection === item.id ? 'text-copper' : 'text-white/60 hover:text-white/90'
              }`}
            >
              {item.label}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-copper transition-transform duration-300 origin-left ${
                  activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
          <a
            href={CTA_EMAIL}
            className="ml-auto shrink-0 px-4 py-1.5 bg-copper text-white text-xs font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Request Access
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
         1. HERO — "The Opportunity"
         ═══════════════════════════════════════════════════════════ */}
      <section
        id="overview"
        ref={heroGradientRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,165,116,0.06) 0%, transparent 50%), linear-gradient(135deg, #0f1923 0%, #1a2a35 50%, #0f1923 100%)',
          backgroundSize: '200% 200%',
          animation: 'heroGradientShift 12s ease-in-out infinite',
        }}
      >
        <Particles />
        <WaveMark />

        <Container className="relative z-10 text-center pt-32 pb-20">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="inline-block"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-cream/10 border border-sage-dark/30 text-cream/80">
              Capital Raise &middot; Retail
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="font-serif font-bold text-5xl md:text-7xl text-white mt-6"
          >
            Lake Washington Square
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            className="text-lg md:text-xl text-white/70 mt-4"
          >
            Melbourne, Florida &middot; 111,858 SF &middot; 100% Leased
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3, ease }}
            className="text-base text-white/50 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            A fully stabilized, NNN neighborhood retail center with institutional-quality tenancy,
            7.7% going-in yield, and identifiable mark-to-market upside across a 23-tenant portfolio.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <a
              href={CTA_EMAIL}
              className="px-10 py-4 bg-copper text-white font-semibold rounded-md text-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-copper/20"
              style={{ animation: 'glowPulse 3s ease-in-out infinite' }}
            >
              Request Investment Package
            </a>
            <a
              href={CTA_CALL}
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-medium rounded-md hover:border-copper hover:text-copper transition-all duration-200"
            >
              <Phone className="w-4 h-4" /> Schedule a Call
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.0, ease }}
            className="text-white/30 text-xs mt-6 uppercase tracking-wider"
          >
            $250K minimum &middot; Target close Q2 2026 &middot; Limited allocation
          </motion.p>
        </Container>

        {/* Diagonal bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════
         2. KPI TICKER STRIP
         ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {KPI_DATA.map((kpi, i) => (
              <KpiCard key={kpi.label} kpi={kpi} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         3. INVESTMENT THESIS
         ═══════════════════════════════════════════════════════════ */}
      <Section id="investment" className="bg-cream py-20 md:py-28" style={{ clipPath: 'polygon(0 4%, 100% 0, 100% 100%, 0 100%)' }}>
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-3xl md:text-4xl text-text-dark mb-12 text-center"
          >
            Investment Thesis
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: 'Day-One Cash Flow',
                points: [
                  '7.8% Year-1 Cash-on-Cash return',
                  '100% leased, 23-tenant NNN portfolio',
                  '$1.40M Year-1 NOI with monthly distributions',
                  '1.83x DSCR \u2014 positive leverage from day one',
                ],
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Mark-to-Market Upside',
                points: [
                  '60% of rent roll currently below market',
                  'Inline tenants at $15.23/SF vs. $22/SF market = ~45% upside',
                  'Restaurant space at $28/SF market potential',
                  'Systematic rollover calendar provides visibility to each event',
                ],
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Below Replacement Cost',
                points: [
                  'Acquiring at $162/SF vs. $350+/SF new development',
                  'Supply-constrained Brevard County submarket (sub-5% vacancy)',
                  'No significant new anchored center supply in 3-mile trade area',
                  '45,000 VPD traffic count at property frontage',
                ],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.2, ease }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Copper accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease }}
                  className="h-1 bg-copper origin-left"
                />
                <div className="p-6 md:p-8">
                  <div className="w-10 h-10 rounded-lg bg-copper/10 flex items-center justify-center text-copper mb-4 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-text-dark mb-4">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.points.map((p) => (
                      <li key={p} className="text-sm text-text-dark/70 leading-relaxed flex gap-2">
                        <span className="text-copper mt-1 shrink-0">&bull;</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CTA BANNER — After Thesis ─── */}
      <CtaBanner
        headline="7.8% Year-1 Cash Yield. 15.9% Target IRR."
        sub="This opportunity won't last. Request the full investment package to review the underwriting."
      />

      {/* ═══════════════════════════════════════════════════════════
         4. FINANCIAL OVERVIEW — Dark Section
         ═══════════════════════════════════════════════════════════ */}
      <Section id="financials" className="bg-navy py-20 md:py-28 text-white" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 100%, 0 100%)' }}>
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-white mb-12"
          >
            Financial Summary
          </motion.h2>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Data Table — 3 cols */}
            <div className="lg:col-span-3">
              <div className="rounded-xl overflow-hidden border border-white/10">
                {FINANCIAL_TABLE.map(([label, val], i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease }}
                    className={`flex justify-between items-center px-5 py-3.5 text-sm ${
                      i % 2 === 0 ? 'bg-white/[0.03]' : ''
                    } ${i < FINANCIAL_TABLE.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <span className="text-white/60">{label}</span>
                    <span className="font-medium text-white">{val}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scenario Cards — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Return Scenarios</p>
              {SCENARIOS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2, ease }}
                  className={`border-l-4 ${s.accent} rounded-lg bg-white/[0.04] p-5 ${
                    s.label === 'Base' ? 'ring-1 ring-copper/20' : ''
                  }`}
                  style={s.label === 'Base' ? { animation: 'glowPulse 3s ease-in-out infinite' } : {}}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-white/50">{s.label} Case ({s.exit} exit)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-copper font-serif font-bold text-xl">{s.irr}</p>
                      <p className="text-[11px] text-white/40 uppercase">IRR</p>
                    </div>
                    <div>
                      <p className="text-copper font-serif font-bold text-xl">{s.multiple}</p>
                      <p className="text-[11px] text-white/40 uppercase">Multiple</p>
                    </div>
                    <div>
                      <p className="text-copper font-serif font-bold text-xl">{s.exitValue}</p>
                      <p className="text-[11px] text-white/40 uppercase">Exit</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         5. NOI GROWTH CHART
         ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-navy py-16 md:py-20 text-white border-t border-white/5">
        <Container>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl text-white mb-8"
          >
            Projected NOI &mdash; 6-Year Hold
          </motion.h3>

          <div ref={noiRef} className="h-[320px] md:h-[380px]">
            {noiInView && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={NOI_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <defs>
                    <linearGradient id="noiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#D4A574" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#ffffff30" tick={{ fill: '#ffffff60', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    stroke="#ffffff30"
                    tick={{ fill: '#ffffff60', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1e6).toFixed(1)}M`}
                  />
                  <Tooltip content={<NoiTooltip />} />
                  <ReferenceLine x="2029" stroke="#D4A574" strokeDasharray="4 4" strokeOpacity={0.4} />
                  <Area
                    type="monotone"
                    dataKey="noi"
                    stroke="#D4A574"
                    strokeWidth={2.5}
                    fill="url(#noiGrad)"
                    isAnimationActive={true}
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Annotation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="flex items-center gap-2 mt-2 text-xs text-white/50"
          >
            <span className="inline-block w-3 h-[2px] bg-copper" />
            Year 4: Anchor lease rollover &mdash; fully reserved ($675K TI/LC budget)
          </motion.div>

          {/* Cash-on-Cash badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {COC_RETURNS.map((coc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.5 }}
                className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs"
              >
                <span className="text-white/40">{NOI_DATA[i]?.year || ''}</span>{' '}
                <span className={`font-medium ${coc.startsWith('(') ? 'text-red-400' : 'text-copper'}`}>{coc}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CTA BANNER — After Financials ─── */}
      <CtaBanner
        dark
        headline="The Numbers Speak for Themselves"
        sub="3.22x equity multiple at base case. Request the full financial model and underwriting package."
      />

      {/* ═══════════════════════════════════════════════════════════
         6. TENANT OVERVIEW
         ═══════════════════════════════════════════════════════════ */}
      <Section id="tenants" className="bg-cream py-20 md:py-28" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 100%, 0 100%)' }}>
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-text-dark mb-6"
          >
            Tenant Portfolio
          </motion.h2>

          {/* Stat badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['23 Tenants', '100% Leased', '3.95-Year WALT', 'NNN Structure'].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-white border border-sage-dark/20 text-text-dark/70"
              >
                {badge}
              </motion.span>
            ))}
          </div>

          {/* Anchor spotlight */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { name: 'LA Fitness', sf: '38,305 SF', rent: '$14.76/SF', exp: 'Mar 2029', options: '3\u00d75yr options to 2044' },
              { name: 'Thrifty Specialty Produce', sf: '15,237 SF', rent: '$8.04/SF', exp: 'Feb 2029', options: '3\u00d75yr options to 2044' },
            ].map((anchor, i) => (
              <motion.div
                key={anchor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-xl p-6 border border-sage-dark/10"
              >
                <h4 className="font-serif font-bold text-lg text-text-dark">{anchor.name}</h4>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-text-dark/70">
                  <span>{anchor.sf}</span><span>{anchor.rent}</span>
                  <span>Exp. {anchor.exp}</span><span className="text-sage-dark">{anchor.options}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sortable tenant table */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-sage-dark/10">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-dark text-white text-xs uppercase tracking-wider">
                    {([
                      ['tenant', 'Tenant'],
                      ['suite', 'Suite'],
                      ['sf', 'SF'],
                      ['rent', 'Rent/SF'],
                      ['market', 'Market/SF'],
                      ['expiry', 'Lease Expiry'],
                      ['structure', 'Structure'],
                    ] as [keyof Tenant, string][]).map(([key, label]) => (
                      <th
                        key={key}
                        onClick={() => toggleSort(key)}
                        className="px-4 py-3 text-left cursor-pointer hover:text-copper transition-colors select-none whitespace-nowrap"
                      >
                        {label}
                        {sortKey === key && (
                          <span className="ml-1">{sortDir === 'asc' ? '\u25B2' : '\u25BC'}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTenants.map((t, i) => {
                    const belowMarket = t.rent < t.market;
                    return (
                      <motion.tr
                        key={t.suite}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.8) }}
                        className={`border-b border-gray-100 hover:bg-cream/50 transition-colors ${
                          belowMarket ? 'border-l-2 border-l-sage-dark' : ''
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-text-dark whitespace-nowrap">{t.tenant}</td>
                        <td className="px-4 py-3 text-text-dark/60">{t.suite}</td>
                        <td className="px-4 py-3 text-text-dark/80">{fmtNum(t.sf)}</td>
                        <td className="px-4 py-3 text-text-dark/80">${t.rent.toFixed(2)}</td>
                        <td className="px-4 py-3 text-text-dark/80">${t.market.toFixed(2)}</td>
                        <td className="px-4 py-3 text-text-dark/60 whitespace-nowrap">{t.expiry}</td>
                        <td className="px-4 py-3 text-text-dark/60">{t.structure}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         7. LEASE EXPIRATION TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-cream py-16 md:py-20">
        <Container>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl text-text-dark mb-8"
          >
            Lease Expiration Schedule
          </motion.h3>

          <div ref={leaseRef} className="h-[300px] md:h-[340px]">
            {leaseInView && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LEASE_EXPIRY} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis dataKey="year" stroke="#4A5D5E50" tick={{ fill: '#2C3E3F99', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    stroke="#4A5D5E30"
                    tick={{ fill: '#2C3E3F99', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #6B8F7B30', borderRadius: 8 }}
                    formatter={(value: any, name: any) => [fmtNum(Number(value)) + ' SF', name === 'inline' ? 'Inline' : 'Anchor']}
                  />
                  <Bar dataKey="inline" stackId="a" fill="#6B8F7B" radius={[0, 0, 0, 0]} isAnimationActive={true} animationDuration={1500} />
                  <Bar dataKey="anchor" stackId="a" fill="#D4A574" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1500} animationBegin={300} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            className="flex items-center gap-2 mt-2 text-xs text-text-dark/50"
          >
            <span className="inline-block w-3 h-3 rounded-sm bg-copper" />
            2029: Anchor Rollover &mdash; LA Fitness + Thrifty (both hold options to 2044)
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         8. MARKET & LOCATION
         ═══════════════════════════════════════════════════════════ */}
      <Section id="market" className="bg-white py-20 md:py-28" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 100%, 0 100%)' }}>
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-text-dark mb-12"
          >
            Melbourne, Florida &mdash; Space Coast
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {MARKET_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease }}
                  className="bg-cream rounded-xl p-5 text-center border border-transparent hover:border-copper/20 transition-colors duration-300"
                >
                  <p className="font-serif font-bold text-2xl text-copper">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-text-dark/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-text-dark/70 text-sm leading-relaxed"
            >
              <p>Located on Florida&apos;s Space Coast &mdash; 60 miles SE of Orlando. Economic engine: Kennedy Space Center, Lockheed Martin, L3Harris, Boeing, Northrop Grumman.</p>
              <p>Net domestic migration driving sustained population growth. Supply-constrained retail submarket with no new anchored center supply in the trade area.</p>
              <p>Property sits on US-192 (New Haven Ave) &mdash; Melbourne&apos;s highest-traffic commercial corridor. Shadow-anchored by Publix; adjacent to Walmart and Home Depot traffic generators.</p>
              <div className="flex items-center gap-2 pt-2">
                <MapPin className="w-4 h-4 text-copper" />
                <span className="text-text-dark font-medium">US-192 & Lake Washington Rd, Melbourne, FL 32935</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ─── CTA BANNER — After Market ─── */}
      <CtaBanner
        headline="Space Coast. Below Replacement Cost. 100% Leased."
        sub="Join institutional-quality investors in Florida's fastest-growing corridor. Limited allocation remaining."
      />

      {/* ═══════════════════════════════════════════════════════════
         9. DEAL STRUCTURE
         ═══════════════════════════════════════════════════════════ */}
      <Section id="structure" className="bg-navy py-20 md:py-28 text-white" style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 100%, 0 100%)' }}>
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-white mb-12"
          >
            Investment Structure
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Capital Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-4">Capital Structure</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Vehicle', 'Limited Partnership via SPE'],
                  ['Minimum Investment', '$250,000'],
                  ['Hold Period', '6 Years'],
                  ['Target Close', 'Q2 2026'],
                  ['Preferred Return', '9% Cumulative to LPs'],
                  ['GP Promote', '20% above 9% pref / 30% above 15% hurdle'],
                  ['Distributions', 'Monthly, subject to cash availability'],
                ].map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex justify-between py-2 border-b border-white/5"
                  >
                    <span className="text-white/50">{k}</span>
                    <span className="text-white font-medium text-right">{v}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fee Structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-4">Fee Structure</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Acquisition Fee', '1%'],
                  ['Asset Management', '0.5% of EGI'],
                  ['Financing Fee', '1%'],
                  ['Disposition Fee', '1%'],
                  ['Management Fee', '3.5% of EGI'],
                ].map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                    className="flex justify-between py-2 border-b border-white/5"
                  >
                    <span className="text-white/50">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Waterfall Visual */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/40 mb-6">Distribution Waterfall</h3>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {[
                { label: 'LP Preferred Return', sub: '9% Cumulative', pct: 100, color: 'bg-sage-dark' },
                { label: 'GP Catch-Up', sub: '20% of profits', pct: 60, color: 'bg-copper' },
                { label: 'Above 15% Hurdle', sub: '70 / 30 LP / GP', pct: 40, color: 'bg-slate-dark' },
              ].map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.3, ease }}
                  className="flex-1 origin-left"
                >
                  <div className={`${step.color} rounded-lg p-5 h-full`}>
                    <p className="text-white font-medium text-sm">{step.label}</p>
                    <p className="text-white/60 text-xs mt-1">{step.sub}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:flex items-center justify-center text-white/20 text-lg py-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         10. RISK FACTORS
         ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-navy py-16 md:py-20 text-white border-t border-white/5">
        <Container>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl text-white mb-8"
          >
            Key Risk Factors &amp; Mitigants
          </motion.h3>
          <div className="max-w-3xl">
            {RISK_FACTORS.map((rf, i) => (
              <Accordion key={rf.title} item={rf} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         11. TEAM
         ═══════════════════════════════════════════════════════════ */}
      <Section id="team" className="bg-cream py-20 md:py-28" style={{ clipPath: 'polygon(0 4%, 100% 0, 100% 100%, 0 100%)' }}>
        <Container>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl text-text-dark mb-8"
          >
            Rising Tide CRE
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-text-dark/70 leading-relaxed mb-6">
              Rising Tide is a Florida-based private real estate investment firm focused on value-add and
              cash-flowing commercial assets across the Southeast&apos;s highest-growth markets. We acquire
              below replacement cost, execute disciplined asset management, and deliver institutional-quality
              returns to our investors.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-dark/40 mb-2">Target Markets</p>
                <p className="text-text-dark/70">FL, NC, SC, TN</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-text-dark/40 mb-2">Specialization</p>
                <p className="text-text-dark/70">NNN Retail, Neighborhood Centers, Value-Add Office, Industrial, Mixed-Use</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="font-serif font-bold text-text-dark">Nicholas White</p>
                <p className="text-text-dark/60 text-sm">Managing Partner</p>
              </div>
              <a
                href="mailto:nick@risingtidepg.com,jonathan@risingtidepg.com,nickwest@risingtidepg.com"
                className="flex items-center gap-1.5 text-sm text-copper hover:underline"
              >
                <Mail className="w-4 h-4" /> nick@risingtidepg.com
              </a>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         12. DOCUMENTS & CTA
         ═══════════════════════════════════════════════════════════ */}
      <Section id="documents" className="bg-slate-dark py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-copper/10 border border-copper/30 text-copper mb-6"
            >
              Limited Allocation &middot; Q2 2026 Close
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-5xl text-white mb-4"
            >
              Take the Next Step
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-white/60 text-lg mb-4 max-w-xl mx-auto"
            >
              Request the full due diligence package and connect directly with our team.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-copper font-serif font-bold text-2xl mb-10"
            >
              $6.8M Equity &middot; $250K Minimum &middot; 9% Preferred Return
            </motion.p>

            {/* Document list */}
            <div className="max-w-md mx-auto mb-12">
              <p className="text-xs uppercase tracking-wider text-white/30 mb-4">Available Upon Request (NDA Required)</p>
              {DOCUMENTS.map((doc, i) => (
                <motion.div
                  key={doc}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 py-3 text-left border-b border-white/10 text-sm text-white/70 group hover:bg-white/[0.03] px-3 rounded transition-colors"
                >
                  <Lock className="w-4 h-4 text-white/30 shrink-0" />
                  <span>{doc}</span>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <a
                href={CTA_EMAIL}
                className="inline-flex items-center gap-3 px-12 py-5 bg-copper text-white font-bold rounded-lg text-xl hover:opacity-90 hover:-translate-y-1 transition-all duration-200 shadow-xl shadow-copper/20"
                style={{ animation: 'glowPulse 2.5s ease-in-out infinite' }}
              >
                <Mail className="w-5 h-5" />
                Request Investment Package
              </a>
              <span className="text-white/30 text-xs">or</span>
              <a
                href={CTA_CALL}
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-medium rounded-lg hover:border-copper hover:text-copper transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Schedule a Call with the Team
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/40"
            >
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> LP via SPE Structure</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Monthly Distributions</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 9% Preferred Return</span>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         13. LEGAL DISCLAIMER
         ═══════════════════════════════════════════════════════════ */}
      <Section className="bg-navy py-12">
        <Container>
          <div className="text-center">
            <p className="text-white/30 text-[11px] leading-relaxed max-w-3xl mx-auto">
              Confidential. For qualified investors only. This material is provided for informational purposes
              only and does not constitute an offer to sell or a solicitation of an offer to buy any security.
              Any such offering will be made only pursuant to a Private Placement Memorandum and related
              subscription documents. Past performance is not indicative of future results. Investing in real
              estate involves risk, including the potential loss of principal. This does not constitute an
              offer to sell securities.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
