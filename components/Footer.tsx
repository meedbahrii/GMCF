import React from 'react';
import { FOOTER_SECTIONS } from '../constants';
import Logo from './Logo';
import { SiLinkedin, SiVimeo, SiDailymotion, SiYoutube, SiTiktok } from 'react-icons/si';
import SocialLink from './SocialLink';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterLink {
    href: string;
    label: string;
}
interface FooterSectionData {
    title: string;
    content?: string[];
    links?: FooterLink[];
}

const FooterSection: React.FC<{ section: FooterSectionData; t: (key: string) => string }> = ({ section, t }) => {
    // Map footer titles to translation keys
    const titleKeyMap: { [key: string]: string } = {
        'Contactez-nous': 'footer.contact.title',
        'Navigation': 'footer.nav.title',
        'Contact': 'footer.contact.title2',
        'Notre Vision': 'footer.vision.title',
    };

    // Map link labels to translation keys
    const getLinkKey = (label: string): string => {
        const linkKeyMap: { [key: string]: string } = {
            'Services': 'nav.services',
            'Formation': 'nav.formation',
            'À Propos': 'nav.about',
            'Carrières': 'footer.nav.careers',
            'Nos Partenaires': 'footer.vision.partners',
            'Investir': 'footer.vision.invest',
            'Presse': 'footer.vision.press',
        };
        return linkKeyMap[label] || label;
    };

    const translatedTitle = titleKeyMap[section.title] ? t(titleKeyMap[section.title]) : section.title;
    
    // Map content lines to translation keys
    const getContentKey = (content: string): string => {
        const contentKeyMap: { [key: string]: string } = {
            'Ouvert du Lundi au Vendredi': 'footer.contact.open',
            'Suivez-nous sur les réseaux sociaux pour découvrir nos dernières créations.': 'footer.contact.followText',
        };
        return contentKeyMap[content] || content;
    };
    
    return (
        <div>
            <h3 className="text-[#FAFAFA] text-base md:text-lg font-light mb-4 md:mb-5">{translatedTitle}</h3>
            {section.content?.map((line, i) => {
                const translatedLine = getContentKey(line) !== line ? t(getContentKey(line)) : line;
                return (
                    <p key={i} className="text-[#F5F5F5] leading-relaxed text-xs md:text-sm mb-2">{translatedLine}</p>
                );
            })}
            {section.links?.map(link => (
                <a key={link.label} href={link.href} className="block text-[#F5F5F5] leading-relaxed text-xs md:text-sm mb-2 transition-colors duration-300 hover:text-[#B73239]">
                    {getLinkKey(link.label) !== link.label ? t(getLinkKey(link.label)) : link.label}
                </a>
            ))}
        </div>
    );
};

const Footer: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <footer className="py-16 md:py-20 px-4 md:px-5 lg:px-12 bg-[#1B1B1B] border-t border-[#5A3E85]/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-8 md:mb-12">
                    <a
                        href="#hero"
                        aria-label="Go to top"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Logo size="xl" />
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 items-start">
                    {FOOTER_SECTIONS.map(section => (
                        <FooterSection key={section.title} section={section} t={t} />
                    ))}

                    {/* Social Icons column (matches style used in Contact form) */}
                    <div>
                        <h3 className="text-[#FAFAFA] text-base md:text-lg font-light mb-4 md:mb-5">{t('contact.follow')}</h3>
                        <p className="text-[#F5F5F5] leading-relaxed text-xs md:text-sm mb-4">{t('contact.follow.desc')}</p>
                        <div className="flex gap-3">
                            <SocialLink href="https://www.linkedin.com/company/gmcf-group/" label="LinkedIn">
                                <SiLinkedin className="w-5 h-5" />
                            </SocialLink>
                            <SocialLink href="https://vimeo.com/user249139979" label="Vimeo">
                                <SiVimeo className="w-5 h-5" />
                            </SocialLink>
                            <SocialLink href="https://dailymotion.com/gmcf-official" label="Dailymotion">
                                <SiDailymotion className="w-5 h-5" />
                            </SocialLink>
                            <SocialLink href="https://youtube.com/@gmcfofficial" label="YouTube">
                                <SiYoutube className="w-5 h-5" />
                            </SocialLink>
                            <SocialLink href="https://www.tiktok.com/@gcmfofficial" label="TikTok">
                                <SiTiktok className="w-5 h-5" />
                            </SocialLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto text-center pt-8 md:pt-10 mt-8 md:mt-10 border-t border-[#5A3E85]/10">
                <p className="text-[#F5F5F5] text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} GMCF. {t('footer.copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;