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
        <nav className="fixed top-0 left-0 right-0 p-3 sm:p-4 md:px-8 lg:px-12 md:py-5 flex justify-between items-center z-[200] bg-[#1B1B1B]">
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
                {/* Dim backdrop (solid) */}
                <div className="absolute inset-0 bg-black" />
                {/* Slide-in drawer - white, minimal */}
                <div 
                    className={`absolute right-0 top-0 h-full w-4/5 max-w-[360px] bg-white border-l border-black/5 shadow-2xl
                                rounded-l-3xl px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] flex flex-col
                                transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with logo and close */}
                    <div className="flex items-center justify-between mb-6">
                        <Logo size="sm" />
                        <button 
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 text-black transition-transform duration-200 active:scale-95"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-[22px] font-semibold text-black mb-4">Menu</h2>

                    {/* Nav links */}
                    <ul className="flex-1 space-y-3">
                        {NAV_LINKS.map(link => (
                            <li key={link.label}>
                                <a 
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className={`group flex items-center justify-between w-full rounded-3xl border-2 px-6 py-5 text-black text-xl font-semibold tracking-wide
                                               hover:bg-black/5 active:scale-95 transition-[transform,background,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239] focus-visible:ring-offset-2 focus-visible:ring-offset-white
                                               ${typeof window !== 'undefined' && window.location.hash === link.href ? 'bg-[#B73239] border-[#B73239] text-white' : 'bg-white border-black/10'}`}
                                    aria-current={typeof window !== 'undefined' && window.location.hash === link.href ? 'page' : undefined}
                                >
                                    <span className="inline-block group-hover:translate-x-0.5 transition-transform uppercase">{link.label}</span>
                                    <span className={`ml-4 text-lg transition-transform group-hover:translate-x-0.5 ${typeof window !== 'undefined' && window.location.hash === link.href ? 'text-white' : 'text-black/40'}`}>›</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Footer actions */}
                    <div className="mt-8 space-y-3">
                        <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="block text-center w-full py-3 rounded-2xl bg-[#B73239] text-white uppercase tracking-wide">
                            Contact
                        </a>
                        <div className="flex items-center justify-center gap-4 text-black/60 text-sm">
                            <span>FR</span>
                            <span className="opacity-30">|</span>
                            <span>EN</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;