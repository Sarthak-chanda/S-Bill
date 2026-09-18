import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck2, 
  Receipt, 
  CreditCard,
  Building,
  Calendar
} from 'lucide-react';

export function HeroSection({ onOpenAuth }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Spring Boot 3 &bull; React 19 &bull; OAuth2</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Next-Gen Invoicing &{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
                Billing Security
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Issue, verify, and dispatch compliant invoices with enterprise email OTP validation, OAuth2 social sign-on, and real-time backend verification.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('signin')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 backdrop-blur-sm transition flex items-center justify-center gap-2"
              >
                <span>Sign In to Portal</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>6-Digit Email OTP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Google & FB OAuth2</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Frontend-Backend Latency</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Invoice Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500" />

              {/* Glassmorphic Invoice Sheet */}
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl p-6 shadow-2xl space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">INVOICE #SB-2026-09</h4>
                      <p className="text-[11px] text-slate-400">Issued to Acme Cloud Inc.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified
                  </span>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Due Date</span>
                    <span className="text-slate-200 font-medium">October 15, 2026</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Account Code</span>
                    <span className="text-indigo-300 font-mono font-medium">ACME-90A41</span>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">Items Breakdown</div>
                  <div className="divide-y divide-slate-800/80 rounded-xl bg-slate-950/40 border border-slate-800/60 overflow-hidden text-xs">
                    <div className="p-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-200">Cloud Backend Architecture</div>
                        <div className="text-[10px] text-slate-500">40 hrs @ $85/hr</div>
                      </div>
                      <span className="font-semibold text-slate-200">$3,400.00</span>
                    </div>
                    <div className="p-2.5 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-200">Security & OAuth2 Hardening</div>
                        <div className="text-[10px] text-slate-500">12 hrs @ $110/hr</div>
                      </div>
                      <span className="font-semibold text-slate-200">$1,320.00</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Total */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Total Due (USD)</span>
                    <span className="text-2xl font-bold text-white">$4,720.00</span>
                  </div>
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition"
                  >
                    Pay Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
