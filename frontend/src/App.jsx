import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { WorkflowSection } from './components/landing/WorkflowSection';
import { StatsSection } from './components/landing/StatsSection';
import { Footer } from './components/landing/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

function AppContent() {
  const { isAuthenticated, notification } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

  const handleOpenAuth = (mode = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 fade-in duration-200">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : notification.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                : 'bg-indigo-950/90 border-indigo-500/40 text-indigo-200'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {notification.type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0" />}
            <span className="text-xs font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onNavigateToDashboard={() => setCurrentView('dashboard')}
        onNavigateHome={() => setCurrentView('landing')}
        currentView={currentView}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'dashboard' && isAuthenticated ? (
          <DashboardOverview onNavigateHome={() => setCurrentView('landing')} />
        ) : (
          <>
            <HeroSection onOpenAuth={handleOpenAuth} />
            <FeaturesSection />
            <WorkflowSection onOpenAuth={handleOpenAuth} />
            <StatsSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal (Sign In / Sign Up / Verify OTP) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
