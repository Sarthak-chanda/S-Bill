import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Clock, 
  FilePlus2, 
  History, 
  DollarSign, 
  ArrowUpRight, 
  LogOut,
  Sparkles,
  Receipt,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function DashboardOverview({ onNavigateHome }) {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Bar */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-2xl shadow-lg shadow-indigo-600/20">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Welcome back, {user?.email?.split('@')[0]}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified Account
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-1.5">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Session Active (Spring Boot :8080)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onNavigateHome}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            View Landing Page
          </button>
          <button
            onClick={logout}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/40 text-rose-300 text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
            <span>Total Invoices</span>
            <Receipt className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">24</div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            +4 new this month
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
            <span>Dispatched Amount</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">$14,250.00</div>
          <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            100% verified totals
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
            <span>Auth Protocol</span>
            <ShieldCheck className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-xl font-bold text-white">Spring Security</div>
          <div className="text-[11px] text-slate-400 mt-2">
            Local session authenticated
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-3">
            <span>SMTP Service</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">Gmail Mailer</div>
          <div className="text-[11px] text-slate-400 mt-2">
            6-digit OTP delivery active
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <FilePlus2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Invoice Generator Ready</h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              Create customizable, branded PDF invoices with real-time tax computation, line item breakdown, and automatic currency conversion.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => alert('Invoice Sheet ready for next feature integration!')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
            >
              Draft New Invoice
            </button>
            <span className="text-xs text-slate-500">Auto-saved to session</span>
          </div>
        </div>

        <div className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Security & Account Status</h3>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              Your account is validated via Spring Boot OTP verification. Password is encrypted with BCrypt in MySQL persistence.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Connected to Spring Boot API backend</span>
          </div>
        </div>
      </div>
    </div>
  );
}
