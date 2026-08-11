'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span
              className="font-bold text-3xl text-black"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}
            >
              DigitalNook
            </span>
          </Link>
          <p
            className="text-gray-500 mt-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {t.login?.subtitle || 'Sign in to your account'}
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0_0_#000]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-black mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {t.login?.email || 'Email address'}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FF90E8] transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-black mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {t.login?.password || 'Password'}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-2 border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FF90E8] transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-400 rounded-xl px-4 py-3">
                <p className="text-red-600 text-sm font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF90E8] text-black font-bold py-4 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {loading ? (t.login?.signingIn || 'Signing in...') : (t.login?.signIn || 'Sign in')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.login?.noAccount || "Don't have an account?"}{' '}
              <Link href="/auth/register" className="font-bold text-black hover:text-[#FF90E8] transition-colors">
                {t.startSelling?.createAccount || 'Create one'} →
              </Link>
            </p>
          </div>
        </div>

        <p
          className="text-center text-gray-400 text-xs mt-6"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline">Terms</Link> and{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
