'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
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
      await register(name, email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {t.startSelling?.createAccount || 'Create your creator account'}
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0_0_#000]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t.startSelling?.yourName || 'Full name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-2 border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FF90E8] transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                placeholder={t.startSelling?.namePlaceholder || "Sarah Chen"}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t.login?.email || 'Email address'}
              </label>
              <input
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
              <label className="block text-sm font-bold text-black mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {t.login?.password || 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border-2 border-black rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FF90E8] transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                placeholder="At least 6 characters"
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
              className="w-full bg-[#FF90E8] text-black font-bold py-4 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 text-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {loading ? (t.login?.signingIn || 'Creating account...') : (t.startSelling?.createFreeAccount || 'Create account →')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.startSelling?.alreadyHaveAccount || 'Already have an account?'} {' '}
              <Link href="/auth/login" className="font-bold text-black hover:text-[#FF90E8] transition-colors">
                {t.login?.signIn || 'Sign in'} →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
