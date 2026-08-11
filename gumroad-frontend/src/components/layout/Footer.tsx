'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-black text-white border-t-2 border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/">
              <span
                className="text-white font-bold text-2xl"
                style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
              >
                DigitalNook
              </span>
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.footer.description}
            </p>
            <div className="mt-6 flex gap-3">
              {['Twitter', 'Instagram', 'YouTube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-[#FF90E8] hover:border-[#FF90E8] transition-colors text-xs font-bold"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: t.footer.productTitle,
              links: [t.nav.discover, t.nav.features, t.nav.pricing, t.nav.startSelling],
              paths: ['/', '/features', '/pricing', '/start-selling'],
            },
            {
              title: t.footer.companyTitle,
              links: [t.nav.about, t.footer.press],
              paths: ['/about', '#'],
            },
            {
              title: t.footer.supportTitle,
              links: [t.footer.helpCenter, t.footer.creatorGuide, t.footer.apiDocs, t.footer.status],
              paths: ['#', '#', '#', '#'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="text-white font-bold text-sm mb-4 uppercase tracking-wider"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <li key={link}>
                    <Link
                      href={col.paths[i]}
                      className="text-white/60 text-sm hover:text-[#FF90E8] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex items-center justify-between">
          <p className="text-white/40 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/40 text-sm hover:text-white/80 transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
