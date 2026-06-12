'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StartSelling() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'cta' | 'success'>('cta');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep('success');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#FF90E8] border-b-2 border-black px-8 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <h1
              className="font-bold text-black mb-6"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              Turn your knowledge into income.
            </h1>
            <p
              className="text-black/70 text-xl leading-relaxed mb-8"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Join 100,000+ creators who earn a living selling digital products on Gumroad. Start in minutes. No monthly fees.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['No monthly fees', 'Start for free', 'Keep 90%'].map((badge) => (
                <span
                  key={badge}
                  className="bg-black text-white font-bold text-sm px-4 py-1.5 rounded-full"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Sign up form */}
          <div className="bg-white border-2 border-black rounded-3xl p-8">
            {step === 'cta' ? (
              <>
                <h2
                  className="font-bold text-black text-2xl mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
                >
                  Create your account
                </h2>
                <p
                  className="text-gray-500 text-sm mb-6"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Free to start. No credit card required.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-bold text-black mb-1.5"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      className="w-full border-2 border-black rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#FF90E8] focus:border-[#FF90E8]"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    />
                  </div>
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
                      placeholder="jane@example.com"
                      required
                      className="w-full border-2 border-black rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#FF90E8] focus:border-[#FF90E8]"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold text-black mb-1.5"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full border-2 border-black rounded-xl px-4 py-3 text-black font-medium focus:outline-none focus:ring-2 focus:ring-[#FF90E8] focus:border-[#FF90E8]"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white font-bold py-3.5 rounded-full border-2 border-black hover:bg-[#FF90E8] hover:text-black transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Create free account <ArrowRight size={16} />
                  </button>
                </form>
                <p
                  className="text-center text-xs text-gray-400 mt-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Already have an account?{' '}
                  <Link href="/login" className="text-black font-bold underline">
                    Log in
                  </Link>
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#FF90E8] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <Check size={28} className="text-black" strokeWidth={3} />
                </div>
                <h2
                  className="font-bold text-black text-2xl mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  You're in!
                </h2>
                <p
                  className="text-gray-500 text-sm mb-6"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  We sent a confirmation to <strong>{email}</strong>. Check your inbox to complete setup.
                </p>
                <button
                  onClick={() => setStep('cta')}
                  className="text-sm text-gray-400 underline"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Use a different email
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b-2 border-black px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-10 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Why creators choose Gumroad
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {[
              {
                stat: '$500M+',
                label: 'Paid to creators',
                description: 'Real money, real creators, real impact.',
              },
              {
                stat: '10%',
                label: 'Our only fee',
                description: 'No monthly cost. We earn when you do.',
              },
              {
                stat: '100K+',
                label: 'Active creators',
                description: 'Join a community of successful sellers.',
              },
              {
                stat: '∞',
                label: 'Products you can sell',
                description: 'No limits on what or how much you sell.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border-2 border-black rounded-2xl p-6 text-center hover:shadow-[4px_4px_0_0_#FF90E8] transition-shadow duration-150"
              >
                <p
                  className="font-bold text-black mb-1"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {item.stat}
                </p>
                <p
                  className="font-bold text-black text-sm mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-gray-400 text-xs"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you can sell */}
      <section className="border-b-2 border-black bg-[#FFF7EE] px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-4 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Sell whatever you create
          </h2>
          <p
            className="text-gray-500 text-center mb-10"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            If you can create it, you can sell it on Gumroad.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { emoji: '📚', title: 'Ebooks & guides', desc: 'Sell your knowledge in PDF or epub format.' },
              { emoji: '🎓', title: 'Online courses', desc: 'Video courses with structured lessons and progress tracking.' },
              { emoji: '🎵', title: 'Music & audio', desc: 'Samples, beats, albums, and audio files of all kinds.' },
              { emoji: '🎨', title: 'Design assets', desc: 'Figma files, UI kits, fonts, illustrations, and more.' },
              { emoji: '💻', title: 'Software & code', desc: 'Apps, scripts, plugins, and templates with license keys.' },
              { emoji: '📸', title: 'Photography', desc: 'Photo packs, presets, and stock images.' },
              { emoji: '🎥', title: 'Videos', desc: 'Tutorials, films, documentaries, and more.' },
              { emoji: '🔄', title: 'Memberships', desc: 'Recurring revenue with exclusive member content.' },
              { emoji: '📦', title: 'Physical products', desc: 'Prints, merch, and physical goods shipped worldwide.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border-2 border-black rounded-xl p-5 hover:bg-[#FF90E8]/10 transition-colors"
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <h3
                  className="font-bold text-black mb-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b-2 border-black px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-10 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            From real creators
          </h2>
          <div className="grid grid-cols-3 gap-5">
            {[
              {
                quote: 'Gumroad changed my life. I make more from my digital products than I did at my 9-5. The simplicity is the killer feature.',
                name: 'Sarah Chen',
                role: 'UI Designer',
                avatar: 'https://picsum.photos/seed/sarah1/100/100',
              },
              {
                quote: 'I tried 5 different platforms before landing on Gumroad. Nothing comes close for simplicity. I launched my first product in 20 minutes.',
                name: 'Marcus Webb',
                role: 'Author & Consultant',
                avatar: 'https://picsum.photos/seed/marcus2/100/100',
              },
              {
                quote: 'The 10% fee sounds high but when you realize there\'s no monthly cost and they handle everything, it\'s absolutely worth it.',
                name: 'Alex Kim',
                role: 'Software Educator',
                avatar: 'https://picsum.photos/seed/alex4/100/100',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="border-2 border-black rounded-2xl p-6 hover:shadow-[4px_4px_0_0_#000] transition-shadow"
              >
                <p
                  className="text-gray-700 text-sm leading-relaxed mb-6 italic"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border-2 border-black object-cover"
                  />
                  <div>
                    <p className="font-bold text-black text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.name}</p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
