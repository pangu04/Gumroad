'use client';

import { useState } from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { jobs } from '@/data';

const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Support', 'Data'];

const benefits = [
  {
    title: 'Fully remote',
    description: 'Work from anywhere in the world. We\'ve been remote-first since day one.',
    icon: '🌍',
  },
  {
    title: 'Async first',
    description: 'No mandatory meetings. We communicate through writing and trust each other to get work done.',
    icon: '✍️',
  },
  {
    title: 'Competitive salary',
    description: 'We pay at the top of market for every role, regardless of where you live.',
    icon: '💰',
  },
  {
    title: 'Equity',
    description: 'Everyone gets equity. You help build it, you should own part of it.',
    icon: '📈',
  },
  {
    title: 'Health coverage',
    description: 'Full health, dental, and vision coverage for you and your dependents.',
    icon: '🏥',
  },
  {
    title: 'Sabbatical',
    description: 'After 3 years, take a 6-week paid sabbatical to recharge and explore.',
    icon: '🏖️',
  },
];

export default function Jobs() {
  const [activeDept, setActiveDept] = useState('All');

  const filtered = activeDept === 'All'
    ? jobs
    : jobs.filter((j) => j.department === activeDept);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b-2 border-black px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-[#FF90E8] font-bold text-sm uppercase tracking-widest mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Careers at Gumroad
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
            Help us build the future
            <br />
            of the creator economy.
          </h1>
          <p
            className="text-gray-500 text-xl max-w-xl leading-relaxed"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            We're a small, remote team with a massive mission. Every person here has real ownership and real impact.
          </p>
          <div className="flex gap-6 mt-8">
            {[
              { value: '24', label: 'Team members' },
              { value: '16', label: 'Countries' },
              { value: '100%', label: 'Remote' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-bold text-black text-2xl"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-bold text-black text-3xl"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Open positions
            </h2>
            <span
              className="text-sm font-semibold text-gray-400"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {filtered.length} roles
            </span>
          </div>

          {/* Dept filters */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-1.5 rounded-full border-2 border-black font-bold text-sm transition-colors ${
                  activeDept === dept ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job listings */}
          <div className="space-y-0 border-2 border-black rounded-2xl overflow-hidden">
            {filtered.map((job, i) => (
              <div
                key={job.id}
                className={`${i > 0 ? 'border-t-2 border-black' : ''} p-6 hover:bg-[#FF90E8]/10 transition-colors cursor-pointer group`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="bg-[#FF90E8] text-black text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {job.department}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock size={12} />
                        <span
                          className="text-xs"
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={12} />
                        <span
                          className="text-xs"
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <h3
                      className="font-bold text-black text-xl mb-2"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {job.title}
                    </h3>
                    <p
                      className="text-gray-500 text-sm leading-relaxed max-w-xl"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {job.description}
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-2 bg-black text-white font-bold px-5 py-2.5 rounded-full text-sm group-hover:bg-[#FF90E8] group-hover:text-black transition-colors flex-shrink-0 ml-6"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Apply <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 border-2 border-black rounded-2xl">
              <p
                className="text-gray-400 text-lg"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                No open positions in {activeDept} right now.
              </p>
              <p
                className="text-gray-400 text-sm mt-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Send us your resume anyway — we keep great candidates on file.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t-2 border-black bg-[#FFF7EE] px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-black text-3xl mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Why Gumroad?
            </h2>
            <p
              className="text-gray-500"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              We're a small team building something meaningful. Here's what comes with the job.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border-2 border-black rounded-2xl p-6 hover:shadow-[4px_4px_0_0_#000] transition-shadow duration-150"
              >
                <span className="text-3xl block mb-4">{benefit.icon}</span>
                <h3
                  className="font-bold text-black text-lg mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No-fit CTA */}
      <section className="border-t-2 border-black bg-black px-8 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-bold text-white text-3xl mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Don't see a perfect fit?
          </h2>
          <p
            className="text-white/60 mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            We're always looking for exceptional people. Send us your resume and tell us what you'd build.
          </p>
          <a
            href="mailto:jobs@gumroad.com"
            className="inline-block bg-[#FF90E8] text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-white transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Get in touch →
          </a>
        </div>
      </section>
    </div>
  );
}
