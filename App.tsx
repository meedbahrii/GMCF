import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const Collections = React.lazy(() => import('./components/Collections'));
const Exhibitions = React.lazy(() => import('./components/Exhibitions'));
const About = React.lazy(() => import('./components/About'));
const Team = React.lazy(() => import('./components/Team'));
const Footer = React.lazy(() => import('./components/Footer'));
import ContactUs from './components/ContactUs';
import LoadingScreen from './components/LoadingScreen';
import SEO from './components/SEO';
import { Analytics } from '@vercel/analytics/react';

// CustomCursor Component
const CustomCursor: React.FC = () => {
    const { x, y } = useMousePosition();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseEnter = (e: MouseEvent) => {
            if (e.target instanceof Element && e.target.closest('a, button, .interactive')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.target instanceof Element && e.target.closest('a, button, .interactive')) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    const cursorStyle: React.CSSProperties = {
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
    };

    return (
        <div
            style={cursorStyle}
            className="fixed w-5 h-5 bg-[#FAFAFA]/60 rounded-full pointer-events-none z-[10000] transition-transform duration-300 ease-in-out mix-blend-difference"
        />
    );
};


// SideNav Component
interface SideNavProps {
    activeSection: string;
    sections: { id: string, label: string }[];
}

const SideNav: React.FC<SideNavProps> = ({ activeSection, sections }) => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                {sections.map(section => (
                    <div
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[#FAFAFA]/60 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#B73239] hover:scale-150 interactive ${
                            activeSection === section.id ? '!bg-[#B73239] scale-150' : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};


// App Component
const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const sectionRefs = {
        hero: useRef<HTMLDivElement>(null),
        services: useRef<HTMLDivElement>(null),
        formation: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        team: useRef<HTMLDivElement>(null),
        contact: useRef<HTMLDivElement>(null),
    };
    
    const sections = [
        { id: 'hero', label: 'Hero', ref: sectionRefs.hero },
        { id: 'services', label: 'Services', ref: sectionRefs.services },
        { id: 'formation', label: 'Formation', ref: sectionRefs.formation },
        { id: 'about', label: 'About', ref: sectionRefs.about },
        { id: 'team', label: 'Équipe', ref: sectionRefs.team },
    ];

    const sideNavSections = sections.map(({ id, label }) => ({ id, label }));


    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        for (const section of sections) {
            if (section.ref.current) {
                const { offsetTop, offsetHeight } = section.ref.current;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveSection(section.id);
                    return;
                }
            }
        }
    }, [sections]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const onScroll = () => {
            const el = document.getElementById('scroll-progress');
            if (!el) return;
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            el.style.transform = `scaleX(${progress})`;
        };
        window.addEventListener('scroll', onScroll, { passive: true } as any);
        onScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', onScroll);
        };
    }, [handleScroll]);

    const [isLoading, setIsLoading] = useState(true);
    const [isFinePointer, setIsFinePointer] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return;
        const fine = window.matchMedia('(any-pointer: fine)');
        const hover = window.matchMedia('(hover: hover)');
        const update = () => setIsFinePointer(fine.matches && hover.matches);
        update();
        const onFine = (e: MediaQueryListEvent) => setIsFinePointer(e.matches && hover.matches);
        const onHover = (e: MediaQueryListEvent) => setIsFinePointer(fine.matches && e.matches);
        fine.addEventListener('change', onFine);
        hover.addEventListener('change', onHover);
        return () => {
            fine.removeEventListener('change', onFine);
            hover.removeEventListener('change', onHover);
        };
    }, []);

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    return (
        <div className="bg-[#1B1B1B] min-h-screen">
            <SEO 
                title="GMCF - Création Audiovisuelle & Formation | Production Virtuelle LED Wall"
                description="GMCF révolutionne le paysage audiovisuel marocain avec des technologies de pointe : LED Wall pour production virtuelle, post-production VFX, et formation PIXELLAB. Hub africain d'excellence."
                keywords="audiovisuel maroc, production virtuelle, LED Wall, VFX, post-production, formation PIXELLAB, cinéma marocain, technologies audiovisuelles, GMCF"
                url="https://gmcf.ma"
            />
            {/* Render custom cursor only on fine pointer devices */}
            {isFinePointer && <div className="custom-cursor"><CustomCursor /></div>}
            <Navbar />
            <SideNav activeSection={activeSection} sections={sideNavSections} />
            {/* Top scroll progress bar */}
            <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-[300]">
                <div id="scroll-progress" className="h-full bg-[#B73239] origin-left scale-x-0" style={{ transform: 'scaleX(0)' }} />
            </div>
            
            <main>
                <div ref={sectionRefs.hero} id="hero"><Hero /></div>
                <React.Suspense fallback={<div className="p-8"><div className="animate-pulse h-6 w-40 bg-white/10 rounded" /></div>}>
                    <div ref={sectionRefs.services} id="services"><Collections /></div>
                    <div ref={sectionRefs.formation} id="formation"><Exhibitions /></div>
                    <div ref={sectionRefs.about} id="about"><About /></div>
                    <div ref={sectionRefs.team} id="team"><Team /></div>
                    <div ref={sectionRefs.contact} id="contact"><ContactUs /><Footer /></div>
                </React.Suspense>
            </main>
            <Analytics />
        </div>
    );
};

export default App;