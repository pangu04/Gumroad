'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n';

import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const pathname = usePathname();
  const { t, locale, toggleLocale } = useI18n();
  const { user } = useAuth();

  const navItems = [
    { label: t.nav.discover, path: '/' },
    { label: t.nav.pricing, path: '/pricing' },
    { label: t.nav.features, path: '/features' },
    { label: t.nav.about, path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname === '/discover';
    return pathname?.startsWith(path);
  };

  return (
    <header className="bg-black text-white px-8 py-4 flex items-center justify-between border-b-2 border-black sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-1">
        <span
          className="text-white font-bold text-xl tracking-tight select-none"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
        >
          gumroad
        </span>
      </Link>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 ${
              isActive(item.path)
                ? 'bg-[#FF90E8] text-black'
                : 'text-white hover:bg-white/10'
            }`}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-3 min-w-[280px]">
        {/* Language Toggle */}
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold hover:bg-white/10 transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          title={locale === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
        >
          <span className="text-sm">{locale === 'en' ? '🇺🇸' : '🇻🇳'}</span>
          <span>{locale === 'en' ? 'EN' : 'VI'}</span>
        </button>

        {user ? (
          <Link
            href="/admin"
            className="bg-[#FF90E8] text-black font-bold px-5 py-2 rounded-full text-sm border-2 border-[#FF90E8] hover:bg-white hover:text-black hover:border-white transition-colors duration-150"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-white text-sm font-semibold hover:text-[#FF90E8] transition-colors"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/auth/register"
              className="bg-[#FF90E8] text-black font-bold px-5 py-2 rounded-full text-sm border-2 border-[#FF90E8] hover:bg-white hover:text-black hover:border-white transition-colors duration-150"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {t.nav.startSelling}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
