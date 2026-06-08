import { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFF7EE] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <span
              className="font-bold text-black text-3xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}
            >
              gumroad
            </span>
          </Link>
        </div>

        <div className="bg-white border-2 border-black rounded-3xl p-8">
          {loggedIn ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#FF90E8] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                <span className="text-2xl">✓</span>
              </div>
              <h2
                className="font-bold text-black text-2xl mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Welcome back!
              </h2>
              <p
                className="text-gray-500 text-sm mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                You're signed in as <strong>{email}</strong>
              </p>
              <Link
                to="/"
                className="inline-block bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-[#FF90E8] hover:text-black transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Go to Discover →
              </Link>
            </div>
          ) : (
            <>
              <h1
                className="font-bold text-black text-2xl mb-1"
                style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
              >
                Log in to Gumroad
              </h1>
              <p
                className="text-gray-500 text-sm mb-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Good to have you back.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-bold text-black mb-1.5"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full border-2 border-black rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:border-[#FF90E8] transition-colors"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="text-sm font-bold text-black"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-gray-400 hover:text-black transition-colors underline"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      required
                      className="w-full border-2 border-black rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:border-[#FF90E8] transition-colors pr-12"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-bold py-3.5 rounded-full border-2 border-black hover:bg-[#FF90E8] hover:text-black transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black/10" />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className="bg-white px-4 text-gray-400 text-xs"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Google', 'Twitter'].map((provider) => (
                  <button
                    key={provider}
                    className="border-2 border-black rounded-xl py-3 font-semibold text-sm text-black hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {provider}
                  </button>
                ))}
              </div>

              <p
                className="text-center text-xs text-gray-400 mt-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Don't have an account?{' '}
                <Link
                  to="/start-selling"
                  className="text-black font-bold underline hover:text-[#FF90E8]"
                >
                  Start selling for free
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
