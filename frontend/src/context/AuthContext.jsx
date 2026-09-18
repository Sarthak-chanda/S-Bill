import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn, signUp, verifyEmail } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sbill_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const login = async (email, password) => {
    const res = await signIn({ email, password });
    const userData = { email, loggedInAt: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem('sbill_user', JSON.stringify(userData));
    showNotification('success', res.message || 'Login successful!');
    return res;
  };

  const register = async (formData) => {
    const res = await signUp(formData);
    showNotification('success', res.message || 'Sign up successful! Please check your email.');
    return res;
  };

  const verify = async (email, code) => {
    const res = await verifyEmail({ email, code });
    showNotification('success', res.message || 'Email verified successfully! You can now sign in.');
    return res;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sbill_user');
    showNotification('info', 'Logged out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        verify,
        logout,
        notification,
        showNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
