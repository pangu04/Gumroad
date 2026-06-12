'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = typeof window !== 'undefined'
  ? `http://${window.location.hostname}:3001`
  : 'http://localhost:3001';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('gumroad_token');
    const savedUser = localStorage.getItem('gumroad_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const backendUrl = `http://${window.location.hostname}:3001`;
    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }

    const data = await res.json();
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem('gumroad_token', data.access_token);
    localStorage.setItem('gumroad_user', JSON.stringify(data.user));
  };

  const register = async (name: string, email: string, password: string) => {
    const backendUrl = `http://${window.location.hostname}:3001`;
    const res = await fetch(`${backendUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }

    const data = await res.json();
    setToken(data.access_token);
    setUser(data.user);
    localStorage.setItem('gumroad_token', data.access_token);
    localStorage.setItem('gumroad_user', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('gumroad_token');
    localStorage.removeItem('gumroad_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
