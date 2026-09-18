import React from 'react';
import { ShieldCheck, Mail, Zap, Lock } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { label: 'Password Encryption', value: 'BCrypt', icon: Lock, desc: 'Cryptographically secured' },
    { label: 'Verification Protocol', value: '6-Digit OTP', icon: Mail, desc: 'SMTP email token validation' },
    { label: 'Social Sign-On', value: 'OAuth2.0', icon: ShieldCheck, desc: 'Google & Facebook supported' },
    { label: 'API Architecture', value: 'Spring Boot 3', icon: Zap, desc: 'RESTful endpoints on :8080' },
  ];

  return (
    <section id="stats" className="py-16 border-t border-slate-900 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center space-y-2 hover:border-slate-700 transition"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-500">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
