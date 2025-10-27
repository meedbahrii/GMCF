import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.formation': 'Formation',
    'nav.contact': 'Contact',
    'nav.about': 'À Propos',
    'nav.menu': 'Menu',
    
    // Hero Section
    'hero.vision': 'Notre Vision',
    'hero.title': 'AUDIOVISUEL',
    'hero.subtitle': 'Notre passion est un audiovisuel moderne et innovant, la clé d\'une communication réussie avec nos clients et partenaires.',
    'hero.discover': 'Découvrir Plus',
    
    // Services
    'services.subtitle': 'Technologies de Pointe',
    'services.title': 'Nos Services',
    'services.virtual.title': 'Production Virtuelle',
    'services.virtual.desc': 'Nous démocratisons l\'accès à la production virtuelle sur LED Wall, une technologie de pointe pour des créations visuelles sans limites.',
    'services.vfx.title': 'Post-Production & VFX',
    'services.vfx.desc': 'Des services complets de post-production, VFX, CFX et CGI d\'un niveau international pour sublimer chaque projet.',
    'services.equipment.title': 'Équipement de Pointe',
    'services.equipment.desc': 'Accès à un parc de caméras et d\'équipements de dernière génération pour une qualité d\'image inégalée.',
    'services.creation.title': 'Création & Conception',
    'services.creation.desc': 'De la page blanche à l\'écran, notre équipe accompagne les projets les plus ambitieux avec créativité et expertise technique.',
    
    // Formation
    'formation.subtitle': 'Former les Talents de Demain',
    'formation.title': 'Formation PIXELLAB',
    'formation.inspiration.date': 'Inspiration',
    'formation.inspiration.title': 'Inspiré par l\'Excellence',
    'formation.inspiration.desc': 'PIXELLAB s\'inspire des modèles de réussite de l\'UM6P et de programmes innovants comme YouCode pour créer un cursus de formation unique.',
    'formation.objective.date': 'Objectif',
    'formation.objective.title': 'Maîtrise Technologique',
    'formation.objective.desc': 'Former une nouvelle génération de professionnels agiles, capables de maîtriser les outils de production de demain et de repousser les limites de la création.',
    'formation.impact.date': 'Impact',
    'formation.impact.title': 'Ambition Mondiale',
    'formation.impact.desc': 'Notre mission : élever le cinéma marocain et africain au rang mondial en formant des talents prêts à innover et à diriger.',
    
    // About
    'about.title': 'Notre Vision',
    'about.desc1': 'Nous ne nous contentons pas de suivre le marché — nous le créons. GMCF est né d\'une ambition : bâtir un hub cinématographique africain de référence au Maroc.',
    'about.desc2': 'En mobilisant des talents exigeants, des technologies de pointe et des investisseurs stratégiques, nous élevons la production artistique à un niveau d\'excellence international.',
    'about.stats.hub': 'Hub Africain',
    'about.stats.partners': 'Partenaires Stratégiques',
    'about.stats.ledwall': 'LED Wall au Maroc',
    'about.stats.ambition': 'Ambition',
    
    // Team
    'team.title': 'Notre Équipe',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Parlez-nous de votre projet. Nous reviendrons vers vous rapidement.',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.company': 'Société',
    'contact.form.phone': 'Téléphone',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.privacy': 'J\'accepte la politique de confidentialité',
    'contact.form.submit': 'Envoyer le message',
    'contact.coordinates': 'Coordonnées',
    'contact.follow': 'Suivez-nous',
    'contact.follow.desc': 'Rejoignez-nous sur nos réseaux pour découvrir nos dernières créations.',
    
    // Footer
    'footer.contact.title': 'Contactez-nous',
    'footer.nav.title': 'Navigation',
    'footer.nav.careers': 'Carrières',
    'footer.contact.title2': 'Contact',
    'footer.contact.open': 'Ouvert du Lundi au Vendredi',
    'footer.contact.followText': 'Suivez-nous sur les réseaux sociaux pour découvrir nos dernières créations.',
    'footer.vision.title': 'Notre Vision',
    'footer.vision.partners': 'Nos Partenaires',
    'footer.vision.invest': 'Investir',
    'footer.vision.press': 'Presse',
    'footer.copyright': 'Tous droits réservés. Créer l\'audiovisuel de demain.',
    
    // Language
    'lang.fr': 'FR',
    'lang.en': 'EN',
  },
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.formation': 'Training',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    
    // Hero Section
    'hero.vision': 'Our Vision',
    'hero.title': 'AUDIOVISUAL',
    'hero.subtitle': 'Our passion is modern and innovative audiovisual, the key to successful communication with our clients and partners.',
    'hero.discover': 'Discover More',
    
    // Services
    'services.subtitle': 'Cutting-Edge Technologies',
    'services.title': 'Our Services',
    'services.virtual.title': 'Virtual Production',
    'services.virtual.desc': 'We democratize access to virtual production on LED Wall, cutting-edge technology for limitless visual creations.',
    'services.vfx.title': 'Post-Production & VFX',
    'services.vfx.desc': 'Complete post-production, VFX, CFX and CGI services at an international level to enhance every project.',
    'services.equipment.title': 'Cutting-Edge Equipment',
    'services.equipment.desc': 'Access to a fleet of cameras and state-of-the-art equipment for unparalleled image quality.',
    'services.creation.title': 'Creation & Design',
    'services.creation.desc': 'From blank page to screen, our team accompanies the most ambitious projects with creativity and technical expertise.',
    
    // Formation
    'formation.subtitle': 'Training Tomorrow\'s Talents',
    'formation.title': 'PIXELLAB Training',
    'formation.inspiration.date': 'Inspiration',
    'formation.inspiration.title': 'Inspired by Excellence',
    'formation.inspiration.desc': 'PIXELLAB draws inspiration from UM6P\'s success models and innovative programs like YouCode to create a unique training curriculum.',
    'formation.objective.date': 'Objective',
    'formation.objective.title': 'Technological Mastery',
    'formation.objective.desc': 'Training a new generation of agile professionals, capable of mastering tomorrow\'s production tools and pushing the boundaries of creation.',
    'formation.impact.date': 'Impact',
    'formation.impact.title': 'Global Ambition',
    'formation.impact.desc': 'Our mission: elevate Moroccan and African cinema to world-class status by training talents ready to innovate and lead.',
    
    // About
    'about.title': 'Our Vision',
    'about.desc1': 'We don\'t just follow the market — we create it. GMCF was born from an ambition: to build a reference African cinematographic hub in Morocco.',
    'about.desc2': 'By mobilizing demanding talents, cutting-edge technologies and strategic investors, we elevate artistic production to a level of international excellence.',
    'about.stats.hub': 'African Hub',
    'about.stats.partners': 'Strategic Partners',
    'about.stats.ledwall': 'LED Wall in Morocco',
    'about.stats.ambition': 'Ambition',
    
    // Team
    'team.title': 'Our Team',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Tell us about your project. We\'ll get back to you quickly.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.privacy': 'I accept the privacy policy',
    'contact.form.submit': 'Send Message',
    'contact.coordinates': 'Coordinates',
    'contact.follow': 'Follow Us',
    'contact.follow.desc': 'Join us on our networks to discover our latest creations.',
    
    // Footer
    'footer.contact.title': 'Contact Us',
    'footer.nav.title': 'Navigation',
    'footer.nav.careers': 'Careers',
    'footer.contact.title2': 'Contact',
    'footer.contact.open': 'Open Monday to Friday',
    'footer.contact.followText': 'Follow us on social networks to discover our latest creations.',
    'footer.vision.title': 'Our Vision',
    'footer.vision.partners': 'Our Partners',
    'footer.vision.invest': 'Invest',
    'footer.vision.press': 'Press',
    'footer.copyright': 'All rights reserved. Creating tomorrow\'s audiovisual.',
    
    // Language
    'lang.fr': 'FR',
    'lang.en': 'EN',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('gmcf-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('gmcf-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
