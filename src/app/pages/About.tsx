import { teamMembers } from '../data';
import { Link } from 'react-router';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b-2 border-black px-8 py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[#FF90E8] font-bold text-sm uppercase tracking-widest mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            About Gumroad
          </p>
          <h1
            className="font-bold text-black mb-8"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            We believe anyone should be
            <br />
            able to make a living from
            <br />
            their creativity.
          </h1>
          <p
            className="text-gray-500 text-xl max-w-2xl leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Gumroad was founded in 2011 with a simple idea: give creators a direct line to their audience, without intermediaries, without complicated setups, without monthly fees.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="border-b-2 border-black px-8 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="font-bold text-black text-3xl mb-6"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Our story
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <p>
                Sahil Lavingia built Gumroad at 19 years old after leaving Pinterest. He wanted a simple way to sell a Photoshop brush he'd made. Every solution he found was too complicated, too expensive, or required technical setup.
              </p>
              <p>
                So he built his own. In a weekend. Put it on Hacker News. It went viral.
              </p>
              <p>
                Over the next decade, Gumroad grew into a platform used by hundreds of thousands of creators worldwide — designers, writers, musicians, educators, developers, and more — earning billions of dollars directly from their audiences.
              </p>
              <p>
                We've had our setbacks. In 2015 we had to lay off most of our team. We almost shut down. Instead, Sahil wrote about the experience publicly, and it became one of the most-shared startup stories ever written.
              </p>
              <p>
                That honesty defines how we operate. We're transparent about our numbers, our decisions, and our mistakes. We believe the creator economy is better when everyone is playing with open cards.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { year: '2011', event: 'Gumroad founded. First product sold: a Photoshop brush.' },
              { year: '2012', event: 'Raised $8M from Kleiner Perkins and other investors.' },
              { year: '2015', event: 'Laid off most of the team. Decided to keep going as a small, profitable company.' },
              { year: '2019', event: 'Surpassed $100M in total creator payouts.' },
              { year: '2021', event: 'Equity crowdfunding raised $5M from fans and creators.' },
              { year: '2023', event: 'Surpassed $500M in total creator payouts.' },
              { year: '2026', event: 'Over 100,000 active creators. Growing every day.' },
            ].map((item) => (
              <div
                key={item.year}
                className="flex gap-6 items-start border-2 border-black rounded-xl p-4 hover:bg-[#FF90E8]/10 transition-colors"
              >
                <span
                  className="font-bold text-black text-sm bg-[#FF90E8] px-2 py-0.5 rounded flex-shrink-0"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.year}
                </span>
                <p
                  className="text-gray-700 text-sm leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b-2 border-black bg-[#FF90E8] px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="text-black/60 font-bold text-sm uppercase tracking-widest mb-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Our mission
          </p>
          <h2
            className="font-bold text-black"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            "Enable anyone in the world to earn a living doing what they love."
          </h2>
          <p
            className="mt-6 text-black/70 text-lg"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            — Sahil Lavingia, Founder
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="border-b-2 border-black px-8 py-20 bg-[#FFF7EE]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold text-black text-3xl mb-10 text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            What we believe
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: 'Creators first',
                description: 'Every decision we make is filtered through one question: does this help creators make more money? If not, we don\'t do it.',
              },
              {
                title: 'Radical transparency',
                description: 'We publish our revenue, share our mistakes, and write about our decisions publicly. Transparency builds trust.',
              },
              {
                title: 'Simple beats complex',
                description: 'Every feature we ship gets simpler over time. Complexity is a bug, not a feature. Our job is to make the hard things easy.',
              },
              {
                title: 'No gatekeeping',
                description: 'Anyone can use Gumroad. No application, no approval, no minimum follower count. Start selling today.',
              },
              {
                title: 'Small and mighty',
                description: 'We\'re a small team by choice. Small teams move faster, make better decisions, and care more about each customer.',
              },
              {
                title: 'Aligned incentives',
                description: 'We only make money when you make money. This is the best business model we know — and the most honest one.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white border-2 border-black rounded-2xl p-6 hover:shadow-[4px_4px_0_0_#000] transition-shadow duration-150"
              >
                <h3
                  className="font-bold text-black text-lg mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b-2 border-black px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-black text-3xl mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              The team
            </h2>
            <p
              className="text-gray-500"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              A small, distributed team obsessed with helping creators succeed.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="border-2 border-black rounded-2xl p-6 hover:shadow-[4px_4px_0_0_#000] transition-shadow duration-150"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-16 h-16 rounded-full border-2 border-black object-cover mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/100/100?random=${member.id}`;
                  }}
                />
                <h3
                  className="font-bold text-black text-base mb-0.5"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[#FF90E8] text-xs font-bold mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {member.role}
                </p>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/jobs"
              className="inline-block border-2 border-black text-black font-bold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              We're hiring — view open positions →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            {[
              { value: '$500M+', label: 'Paid to creators' },
              { value: '100K+', label: 'Active creators' },
              { value: '50M+', label: 'Products sold' },
              { value: '2011', label: 'Founded' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-bold text-white mb-2"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '2.5rem',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-white/50 text-sm"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
