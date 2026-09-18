import React from 'react';
import { UserPlus, Mail, ShieldCheck, ArrowRight, FileCheck } from 'lucide-react';

export function WorkflowSection({ onOpenAuth }) {
  const steps = [
    {
      step: '01',
      icon: UserPlus,
      title: 'Sign Up Profile',
      description: 'Submit your business details and credentials via the REST API endpoint (/api/invoice/signup).',
    },
    {
      step: '02',
      icon: Mail,
      title: 'Receive 6-Digit OTP',
      description: 'Spring Boot SMTP service delivers a unique 6-digit verification code directly to your email inbox.',
    },
    {
      step: '03',
      icon: ShieldCheck,
      title: 'Verify Account',
      description: 'Validate your one-time code to transition your account status from disabled to active (/api/invoice/verify).',
    },
    {
      step: '04',
      icon: FileCheck,
      title: 'Dispatch Invoices',
      description: 'Sign in securely and generate compliant, printable invoices with custom rates and auto-totals.',
    },
  ];

  return (
    <section id="workflow" className="py-20 md:py-28 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Automated Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
            How S-Bill Verifies & Protects You
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From initial registration to your first generated invoice, security is embedded into every HTTP cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition duration-200"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-mono font-extrabold text-slate-800 select-none">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/30 via-slate-900/60 to-violet-900/30 border border-indigo-500/20 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-white">Ready to test the live backend?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Test account registration and email OTP delivery right now.</p>
          </div>
          <button
            onClick={() => onOpenAuth('signup')}
            className="shrink-0 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition"
          >
            <span>Launch Sign Up</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
