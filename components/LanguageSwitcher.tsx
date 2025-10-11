import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../utils/i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = async (langCode: string) => {
    await changeLanguage(langCode as 'fr' | 'en' | 'ar');
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-10 h-10 bg-[#0F1C4D]/30 rounded-full animate-pulse"></div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#0F1C4D]/30 hover:bg-[#0F1C4D]/50 text-[#F5F5F5] rounded-full transition-colors duration-300"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLanguage?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-[#1B1B1B] border border-[#333] rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#0F1C4D]/30 transition-colors duration-200 ${
                  language === lang.code ? 'bg-[#B73239]/20 text-[#B73239]' : 'text-[#F5F5F5]'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
