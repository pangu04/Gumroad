'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { en, type Translations } from './en';
import { vi } from './vi';

export type Locale = 'en' | 'vi';

const translations: Record<Locale, Translations> = { en, vi };

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: en,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gumroad-locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('gumroad-locale', newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'vi' : 'en');
  }, [locale, setLocale]);

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
