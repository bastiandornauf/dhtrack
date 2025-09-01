import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'de' | 'en';

type TranslationMap = Record<string, string>;

const translations: Record<Locale, TranslationMap> = {
  de: {
    title: 'Daggerheart Tracker',
    addResource: '+ Neue Ressource',
    reset: 'Zurücksetzen',
    confirmReset: 'Möchten Sie alle Ressourcen auf ihre Standardwerte zurücksetzen?',
    removeResource: 'Ressource entfernen',
    player: 'Spieler',
    gamemaster: 'Spielleiter',
    toggleToPlayer: 'Wechseln zu Spieler Modus',
    toggleToGamemaster: 'Wechseln zu Spielleiter Modus',
    configMode: 'Config Modus',
    openRules: '📖 Regelübersicht',
    shortRest: '💤 Short Rest',
    longRest: '🛌 Long Rest',
    conditions: 'Conditions',
    hidden: '👁️ Hidden',
    restrained: '⛓️ Restrained',
    vulnerable: '⚡ Vulnerable',
    language: 'Sprache',
    formTitleAddResource: 'Neue Ressource hinzufügen',
    formName: 'Name:',
    formNamePlaceholder: 'z.B. Mana, Rage, Inspiration...',
    formCurrent: 'Aktueller Wert:',
    formMax: 'Maximaler Wert:',
    formColor: 'Farbe:',
    formCancel: 'Abbrechen',
    formSubmit: 'Hinzufügen',
    resHope: 'Hope',
    resArmor: 'Armor',
    resHitpoints: 'Hitpoints',
    resStress: 'Stress',
    resFear: 'Fear',
    footerTitle: 'Daggerheart Tracker – Fan-made tool. Not affiliated with Darrington Press or Critical Role.',
    footerLicenseLead: 'Licensed use under the',
    footerLicenseName: 'Darrington Press Community Gaming License (DPCGL)',
    footerSrdLead: 'Daggerheart SRD:',
    footerPrivacy: 'Datenschutz: Dieses Tool speichert Daten ausschließlich lokal in deinem Browser (Local Storage). Es werden keine personenbezogenen Daten übertragen. Export/Import erfolgt als JSON auf deinem Gerät.',
    footerMeta: 'Impressum',
    version: 'v0.4.0',
  },
  en: {
    title: 'Daggerheart Tracker',
    addResource: '+ Add Resource',
    reset: 'Reset',
    confirmReset: 'Do you want to reset all resources to their defaults?',
    removeResource: 'Remove resource',
    player: 'Player',
    gamemaster: 'Gamemaster',
    toggleToPlayer: 'Switch to Player mode',
    toggleToGamemaster: 'Switch to Gamemaster mode',
    configMode: 'Config Mode',
    openRules: '📖 Rules Overview',
    shortRest: '💤 Short Rest',
    longRest: '🛌 Long Rest',
    conditions: 'Conditions',
    hidden: '👁️ Hidden',
    restrained: '⛓️ Restrained',
    vulnerable: '⚡ Vulnerable',
    language: 'Language',
    formTitleAddResource: 'Add new resource',
    formName: 'Name:',
    formNamePlaceholder: 'e.g. Mana, Rage, Inspiration...',
    formCurrent: 'Current:',
    formMax: 'Max:',
    formColor: 'Color:',
    formCancel: 'Cancel',
    formSubmit: 'Add',
    resHope: 'Hope',
    resArmor: 'Armor',
    resHitpoints: 'Hitpoints',
    resStress: 'Stress',
    resFear: 'Fear',
    footerTitle: 'Daggerheart Tracker – Fan-made tool. Not affiliated with Darrington Press or Critical Role.',
    footerLicenseLead: 'Licensed use under the',
    footerLicenseName: 'Darrington Press Community Gaming License (DPCGL)',
    footerSrdLead: 'Daggerheart SRD:',
    footerPrivacy: 'Privacy: This tool stores data only locally in your browser (Local Storage). No personal data is transmitted. Export/Import happens as JSON on your device.',
    footerMeta: 'Imprint',
    version: 'v0.4.0',
  },
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  const stored = typeof window !== 'undefined' ? (localStorage.getItem('dh_lang') as Locale | null) : null;
  if (stored === 'de' || stored === 'en') return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
  return nav.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem('dh_lang', locale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (key: string) => translations[locale][key] ?? key,
  }), [locale]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

