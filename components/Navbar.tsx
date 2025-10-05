import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Close mobile menu after click
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [isMobileMenuOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 p-3 sm:p-4 md:px-8 lg:px-12 md:py-5 flex justify-between items-center z-[200] bg-[#1B1B1B]/80 backdrop-blur-md">
            <Logo size="md" />
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-6 lg:gap-8 xl:gap-10 list-none">
                {NAV_LINKS.map(link => (
                    <li key={link.label}>
                        <a 
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="link-underline text-[#FAFAFA] text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#B73239] focus-visible:outline-none"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
            >
                <span className={`w-7 h-0.5 bg-[#FAFAFA] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-7 h-0.5 bg-[#FAFAFA] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-7 h-0.5 bg-[#FAFAFA] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Mobile Navigation Menu */}
            <div 
                className={`fixed inset-0 z-[190] md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300`}
                onClick={() => setIsMobileMenuOpen(false)}
                role="dialog"
                aria-modal="true"
            >
                {/* Dim backdrop */}
                <div className="absolute inset-0 bg-black/80" />
                {/* Slide-in drawer */}
                <div 
                    className={`absolute right-0 top-0 h-full w-4/5 max-w-[340px] bg-[#0F1C4D] border-l border-white/10 shadow-2xl
                                rounded-l-2xl px-6 pt-5 pb-8 flex flex-col
                                transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with logo and close */}
                    <div className="flex items-center justify-between mb-8">
                        <Logo size="sm" />
                        <button 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-[#FAFAFA] transition-transform duration-200 active:scale-95"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Nav links */}
                    <ul className="flex-1 space-y-2">
                        {NAV_LINKS.map(link => (
                            <li key={link.label}>
                                <a 
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="group block w-full rounded-lg px-4 py-3 text-[#FAFAFA] text-base tracking-wider uppercase
                                               hover:bg-white/5 hover:text-[#B73239] active:scale-95 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1C4D] link-underline"
                                    aria-current={typeof window !== 'undefined' && window.location.hash === link.href ? 'page' : undefined}
                                >
                                    <span className="inline-block group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Footer actions */}
                    <div className="mt-8 space-y-3">
                        <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="block text-center w-full py-3 rounded-lg bg-[#B73239] text-white uppercase tracking-wide">
                            Contact
                        </a>
                        <div className="flex items-center justify-center gap-4 text-[#FAFAFA]/70 text-sm">
                            <span>FR</span>
                            <span className="opacity-50">|</span>
                            <span>EN</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;