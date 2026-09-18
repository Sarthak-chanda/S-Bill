import React from 'react';
import { FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">S-Bill</span>
              <p className="text-xs text-slate-500">Invoice & Billing Management Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#security" className="hover:text-white transition">Security</a>
            <a href="#workflow" className="hover:text-white transition">Workflow</a>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Backend Ready (:8080)
            </span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} S-Bill. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Spring Boot 3 REST API &bull; React 19 Frontend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
