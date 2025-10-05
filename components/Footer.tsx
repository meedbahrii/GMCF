import React from 'react';
import { FOOTER_SECTIONS } from '../constants';
import Logo from './Logo';

interface FooterLink {
    href: string;
    label: string;
}
interface FooterSectionData {
    title: string;
    content?: string[];
    links?: FooterLink[];
}

const FooterSection: React.FC<{ section: FooterSectionData }> = ({ section }) => (
    <div>
        <h3 className="text-[#FAFAFA] text-base md:text-lg font-light mb-4 md:mb-5">{section.title}</h3>
        {section.content?.map((line, i) => (
            <p key={i} className="text-[#F5F5F5] leading-relaxed text-xs md:text-sm mb-2">{line}</p>
        ))}
        {section.links?.map(link => (
            <a key={link.label} href={link.href} className="block text-[#F5F5F5] leading-relaxed text-xs md:text-sm mb-2 transition-colors duration-300 hover:text-[#B73239]">
                {link.label}
            </a>
        ))}
    </div>
);

const Footer: React.FC = () => {
    return (
        <footer className="py-16 md:py-20 px-4 md:px-5 lg:px-12 bg-[#1B1B1B] border-t border-[#5A3E85]/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-8 md:mb-12">
                    <Logo size="lg" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {FOOTER_SECTIONS.map(section => (
                        <FooterSection key={section.title} section={section} />
                    ))}
                </div>
            </div>
            <div className="max-w-6xl mx-auto text-center pt-8 md:pt-10 mt-8 md:mt-10 border-t border-[#5A3E85]/10">
                <p className="text-[#F5F5F5] text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} GMCF. All rights reserved. Créer l'audiovisuel de demain.
                </p>
            </div>
        </footer>
    );
};

export default Footer;