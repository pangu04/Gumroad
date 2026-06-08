import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router';

const faqs = [
  {
    q: 'Are there any monthly fees?',
    a: 'No. Gumroad has no monthly fees, no setup fees, and no hidden costs. We only take 10% when you make a sale.',
  },
  {
    q: 'What payment methods do you support?',
    a: 'We support all major credit cards, PayPal, and Apple Pay. Payouts to creators happen via PayPal or direct deposit.',
  },
  {
    q: 'Can I sell any type of digital product?',
    a: 'You can sell ebooks, courses, music, software, templates, memberships, and more. Physical products are supported too.',
  },
  {
    q: 'How do payouts work?',
    a: 'We pay out weekly via PayPal or direct bank deposit. There\'s a $10 minimum payout threshold.',
  },
  {
    q: 'Is there a free trial?',
    a: 'There\'s nothing to trial — start selling for free immediately. We only charge when you make money.',
  },
  {
    q: 'Can I use a custom domain?',
    a: 'Yes, you can use your own custom domain on your Gumroad store page for free.',
  },
];

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b-2 border-black px-8 py-20 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[#FF90E8] font-bold text-sm uppercase tracking-widest mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Pricing
          </p>
          <h1
            className="font-bold text-black mb-6"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Simple pricing.
            <br />
            No surprises.
          </h1>
          <p
            className="text-gray-500 text-xl max-w-lg mx-auto"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            We take 10% of every sale. That's it. No monthly fees, no setup costs, no hidden charges.
          </p>
        </div>
      </section>

      {/* Main pricing card */}
      <section className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Free plan */}
            <div className="border-2 border-black rounded-3xl p-10">
              <div className="mb-8">
                <h2
                  className="font-bold text-black text-2xl mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Gumroad
                </h2>
                <p
                  className="text-gray-500"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  For anyone who wants to start selling
                </p>
                <div className="mt-6">
                  <span
                    className="text-black font-bold"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '3rem', lineHeight: 1 }}
                  >
                    10%
                  </span>
                  <span
                    className="text-gray-500 ml-2"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    + payment processing
                  </span>
                </div>
                <p
                  className="text-sm text-gray-400 mt-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  No monthly fees. We only earn when you do.
                </p>
              </div>
              <Link
                to="/start-selling"
                className="block w-full text-center bg-black text-white font-bold py-4 rounded-full border-2 border-black hover:bg-white hover:text-black transition-colors mb-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Start selling for free
              </Link>
              <ul className="space-y-3">
                {[
                  'Unlimited products',
                  'Unlimited sales',
                  'Custom domain',
                  'Analytics dashboard',
                  'Email marketing tools',
                  'Discount codes',
                  'Membership support',
                  'File hosting (any size)',
                  'Instant payouts',
                  'Customer support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#FF90E8] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-black" strokeWidth={3} />
                    </span>
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee breakdown */}
            <div className="bg-[#FF90E8] border-2 border-black rounded-3xl p-10">
              <h2
                className="font-bold text-black text-2xl mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                How our fee works
              </h2>
              <p
                className="text-black/70 mb-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                When you make a sale, here's exactly what happens:
              </p>

              {[
                { label: 'Your product price', value: '$100.00', positive: true },
                { label: 'Gumroad fee (10%)', value: '−$10.00', positive: false },
                { label: 'Payment processing (~3%)', value: '−$3.00', positive: false },
                { label: 'You receive', value: '$87.00', positive: true, total: true },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 ${
                    i < 3 ? 'border-b border-black/20' : ''
                  }`}
                >
                  <span
                    className={`${row.total ? 'font-bold text-black text-lg' : 'text-black/80'}`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {row.label}
                  </span>
                  <span
                    className={`font-bold ${row.total ? 'text-black text-xl' : row.positive ? 'text-black' : 'text-black/60'}`}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-black/20">
                <p
                  className="text-sm text-black/70 leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Payment processing fees vary by card type and country. The example above uses typical US card rates.
                </p>
              </div>

              <div className="mt-6 bg-black rounded-2xl p-5">
                <p
                  className="text-white font-bold mb-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Sell $1,000 → Keep $870
                </p>
                <p
                  className="text-white/60 text-sm"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  We win when you win. That's the deal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with competitors */}
      <section className="border-t-2 border-black bg-[#FFF7EE] px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-10 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            How we compare
          </h2>
          <div className="border-2 border-black rounded-2xl overflow-hidden bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th
                    className="text-left p-5 font-bold text-black"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Platform
                  </th>
                  <th
                    className="text-center p-5 font-bold text-black"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Monthly Fee
                  </th>
                  <th
                    className="text-center p-5 font-bold text-black"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Transaction Fee
                  </th>
                  <th
                    className="text-center p-5 font-bold text-black"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Setup Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { platform: 'Gumroad', monthly: '$0', transaction: '10%', setup: '$0', highlight: true },
                  { platform: 'Teachable', monthly: '$39–$299', transaction: '0–5%', setup: '$0' },
                  { platform: 'Podia', monthly: '$33–$89', transaction: '0%', setup: '$0' },
                  { platform: 'Shopify', monthly: '$39–$399', transaction: '0.5–2%', setup: '$0' },
                ].map((row, i) => (
                  <tr
                    key={row.platform}
                    className={`${i < 3 ? 'border-b border-black/10' : ''} ${row.highlight ? 'bg-[#FF90E8]/20' : ''}`}
                  >
                    <td
                      className={`p-5 font-bold text-black`}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {row.platform}
                      {row.highlight && (
                        <span className="ml-2 bg-[#FF90E8] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          You are here
                        </span>
                      )}
                    </td>
                    <td
                      className={`p-5 text-center ${row.highlight ? 'font-bold text-black' : 'text-gray-700'}`}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {row.monthly}
                    </td>
                    <td
                      className={`p-5 text-center ${row.highlight ? 'font-bold text-black' : 'text-gray-700'}`}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {row.transaction}
                    </td>
                    <td
                      className={`p-5 text-center ${row.highlight ? 'font-bold text-black' : 'text-gray-700'}`}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {row.setup}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-black px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-10 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-0 border-2 border-black rounded-2xl overflow-hidden">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${i > 0 ? 'border-t-2 border-black' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span
                    className="font-bold text-black"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {faq.q}
                  </span>
                  <span className="text-2xl font-light text-gray-400 ml-4">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-black/10 pt-4">
                    <p
                      className="text-gray-600 leading-relaxed"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-black bg-[#FF90E8] px-8 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-bold text-black text-4xl mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Start selling. Keep more.
          </h2>
          <p
            className="text-black/70 text-lg mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            No risk, no monthly fees. Create your first product in minutes.
          </p>
          <Link
            to="/start-selling"
            className="inline-block bg-black text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-900 transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Get started for free →
          </Link>
        </div>
      </section>
    </div>
  );
}
