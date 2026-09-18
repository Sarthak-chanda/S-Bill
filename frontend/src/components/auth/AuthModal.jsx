import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building2, 
  MapPin, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Loader2,
  Terminal,
  WifiOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OAUTH_GOOGLE_URL, OAUTH_FACEBOOK_URL, checkBackendHealth } from '../../api/auth';

export function AuthModal({ isOpen, onClose, initialMode = 'signin', onLoginSuccess }) {
  const { login, register, verify } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'verify'
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  // Form states
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    businessName: '',
  });
  const [verifyData, setVerifyData] = useState({ email: '', code: '' });


  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccess(null);
    if (isOpen) {
      checkBackendHealth().then((online) => setIsBackendOnline(online));
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(signinData.email)) {
      setError('Please enter a valid email address (e.g., name@domain.com)');
      return;
    }

    setLoading(true);
    try {
      await login(signinData.email, signinData.password);
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
      if (err.message && err.message.toLowerCase().includes('verify')) {
        setVerifyData((prev) => ({ ...prev, email: signinData.email }));
      }
      if (err.message && (err.message.includes('offline') || err.message.includes('port 8080'))) {
        setIsBackendOnline(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(signupData.email)) {
      setError('Please enter a valid email address with @ and domain (e.g. user@gmail.com)');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await register(signupData);
      setSuccess(res.message || 'Account created! Enter the 6-digit code sent to your email.');
      setVerifyData({ email: signupData.email, code: '' });
      setTimeout(() => {
        setMode('verify');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registration failed.');
      if (err.message && (err.message.includes('offline') || err.message.includes('port 8080'))) {
        setIsBackendOnline(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(verifyData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (verifyData.code.trim().length !== 6) {
      setError('Verification code must be exactly 6 digits');
      return;
    }

    setLoading(true);
    try {
      const res = await verify(verifyData.email, verifyData.code);
      setSuccess(res.message || 'Email verified successfully! You can now log in.');
      setSigninData((prev) => ({ ...prev, email: verifyData.email }));
      setTimeout(() => {
        setMode('signin');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Invalid or expired verification code.');
      if (err.message && (err.message.includes('offline') || err.message.includes('port 8080'))) {
        setIsBackendOnline(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md my-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Glow Header */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500" />

        <div className="p-6 sm:p-8">
          {/* Close Button & Header */}
          <div className="flex items-center justify-between pb-3">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {mode === 'signin' && 'Sign in to S-Bill'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'verify' && 'Verify Email Address'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'signin' && 'Secure access to your invoicing portal'}
                {mode === 'signup' && 'Get started in seconds with instant OTP'}
                {mode === 'verify' && 'Enter the 6-digit code sent to your inbox'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Backend Status Warning if Offline */}
          {!isBackendOnline && (
            <div className="my-3 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-semibold">
                <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Backend server is currently offline (:8080)</span>
              </div>
              <p className="text-[11px] text-amber-300/80">
                To test live account registration & authentication, start Spring Boot in a separate terminal:
              </p>
              <div className="bg-slate-950/80 rounded-lg p-2 font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 border border-slate-800">
                <Terminal className="w-3 h-3 text-slate-500 shrink-0" />
                <span>.\mvnw.cmd spring-boot:run</span>
              </div>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          {mode !== 'verify' && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 my-3">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setSuccess(null);
                }}
                className={`py-2 rounded-lg text-xs font-semibold transition ${
                  mode === 'signin'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                  setSuccess(null);
                }}
                className={`py-2 rounded-lg text-xs font-semibold transition ${
                  mode === 'signup'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Error Notification */}
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
                {error.toLowerCase().includes('verify') && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('verify');
                      setError(null);
                    }}
                    className="block text-indigo-400 underline font-semibold mt-1 hover:text-indigo-300"
                  >
                    Click here to enter verification code &rarr;
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Success Notification */}
          {success && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSigninSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={signinData.email}
                    onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={signinData.password}
                    onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900 px-3 text-slate-500 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={OAUTH_GOOGLE_URL}
                  className="py-2.5 px-3 rounded-xl border border-slate-700/80 hover:bg-slate-800/80 text-xs font-semibold text-center text-slate-200 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.7 0 3 .7 3.7 1.3l2.8-2.8C16.8 2 14.6 1.2 12 1.2 7.5 1.2 3.7 3.8 1.9 7.6l3.4 2.6C6.2 7.3 8.8 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"/>
                    <path fill="#FBBC05" d="M5.3 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.6C.7 9 0 10.4 0 12s.7 3 1.9 5.4l3.4-2.6z"/>
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.2-6.7-5.2L1.9 15.8C3.7 19.6 7.5 23 12 23z"/>
                  </svg>
                  <span>Google</span>
                </a>
                <a
                  href={OAUTH_FACEBOOK_URL}
                  className="py-2.5 px-3 rounded-xl border border-slate-700/80 hover:bg-slate-800/80 text-xs font-semibold text-center text-slate-200 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </form>
          )}

          {/* 2. SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Password (min. 6 chars)
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={signupData.phoneNumber}
                      onChange={(e) => setSignupData({ ...signupData, phoneNumber: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Business Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={signupData.businessName}
                      onChange={(e) => setSignupData({ ...signupData, businessName: e.target.value })}
                      placeholder="Acme Studio"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Business Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={signupData.address}
                      onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                      placeholder="123 Financial Way"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering with backend...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account & Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                Have a verification code already?{' '}
                <button
                  type="button"
                  onClick={() => setMode('verify')}
                  className="text-indigo-400 hover:underline font-semibold"
                >
                  Verify Now
                </button>
              </p>
            </form>
          )}

          {/* 3. VERIFY OTP FORM */}
          {mode === 'verify' && (
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={verifyData.email}
                    onChange={(e) => setVerifyData({ ...verifyData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    6-Digit Verification Code
                  </label>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verifyData.code}
                    onChange={(e) => setVerifyData({ ...verifyData, code: e.target.value })}
                    placeholder="123456"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-center text-lg font-mono font-bold tracking-widest text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Check your registered email inbox for the 6-digit OTP code.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying code...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Activate Account</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('signin')}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 transition py-1"
              >
                &larr; Return to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
