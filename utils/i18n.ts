// Simple i18n implementation without external dependencies
export type Language = 'fr' | 'en' | 'ar';

export interface Translations {
  [key: string]: any;
}

class I18nManager {
  private currentLanguage: Language = 'fr';
  private translations: Record<Language, Translations> = {
    fr: {},
    en: {},
    ar: {}
  };

  async loadTranslations(language: Language): Promise<void> {
    try {
      const response = await fetch(`/locales/${language}.json`);
      this.translations[language] = await response.json();
    } catch (error) {
      console.error(`Failed to load translations for ${language}:`, error);
    }
  }

  setLanguage(language: Language): void {
    this.currentLanguage = language;
    document.documentElement.lang = language;
    localStorage.setItem('gmcf-language', language);
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = this.translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found anywhere
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters in the string
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param]?.toString() || match;
      });
    }

    return value;
  }

  async initialize(): Promise<void> {
    // Load saved language or detect from browser
    const savedLanguage = localStorage.getItem('gmcf-language') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;
    const detectedLanguage = ['fr', 'en', 'ar'].includes(browserLanguage) ? browserLanguage : 'fr';
    
    const language = savedLanguage || detectedLanguage;
    
    await this.loadTranslations(language);
    this.setLanguage(language);
  }
}

export const i18n = new I18nManager();

// Hook for React components
export const useTranslation = () => {
  const [language, setLanguage] = React.useState<Language>(i18n.getLanguage());
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      await i18n.initialize();
      setIsLoading(false);
    };
    init();
  }, []);

  const changeLanguage = async (newLanguage: Language) => {
    await i18n.loadTranslations(newLanguage);
    i18n.setLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params);

  return { t, language, changeLanguage, isLoading };
};

// Import React for the hook
import * as React from 'react';
