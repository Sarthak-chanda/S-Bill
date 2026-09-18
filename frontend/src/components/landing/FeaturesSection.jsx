import React from 'react';
import { 
  ShieldCheck, 
  MailCheck, 
  KeyRound, 
  Cpu, 
  Layers, 
  Zap, 
  FileSpreadsheet,
  Lock
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: MailCheck,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      title: '6-Digit Email OTP Verification',
      description: 'Account activation secured by one-time password verification dispatched instantly via Spring Boot SMTP Mailer.',
    },
    {
      icon: Lock,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20',
      title: 'BCrypt Password Encryption',
      description: 'Zero plaintext passwords. All user credentials are cryptographic hashed using industrial-grade BCrypt encoders.',
    },
    {
      icon: KeyRound,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Social OAuth2 Authentication',
      description: 'Streamlined one-click onboarding with Google and Facebook OAuth2 integration built into Spring Security.',
    },
    {
      icon: Cpu,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      title: 'Unique User Code Generation',
      description: 'Automated tenant identification generates deterministic <PREFIX>-<UUID> codes on initial user creation.',
    },
    {
      icon: Layers,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Clean Architecture Isolation',
      description: 'Strict boundary between the Spring Boot REST API and the React 19 frontend workspace for reliable deployments.',
    },
    {
      icon: Zap,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
      title: 'Real-time Session Management',
      description: 'Secured HTTP session context cookies prevent unauthorized invoice dispatch before email verification occurs.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Engineered for Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
            Security & Billing Under One Roof
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every feature is backed by the Spring Boot invoice management service, ensuring ironclad verification and seamless financial transactions.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition duration-200 group hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.bg} mb-5 group-hover:scale-110 transition duration-200`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
