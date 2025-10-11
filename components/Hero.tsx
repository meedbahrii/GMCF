import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import Logo from './Logo';

// Particles Component
const Particles: React.FC = React.memo(() => {
    const [particles, setParticles] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map(() => ({
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {particles.map((style, i) => (
                <div
                    key={i}
                    style={style}
                    className="absolute w-0.5 h-0.5 bg-[#B73239]/20 rounded-full animate-[particleFloat_10s_infinite_linear]"
                />
            ))}
        </div>
    );
});

// Hero Component
const Hero: React.FC = () => {
    const { x, y } = useMousePosition();
    const [lightingStyle, setLightingStyle] = useState({});
    const [viewport, setViewport] = useState({ w: 0, h: 0 });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 0 && window.innerHeight > 0) {
            setLightingStyle({
                '--mouse-x': `${(x / window.innerWidth) * 100}%`,
                '--mouse-y': `${(y / window.innerHeight) * 100}%`,
            });
        }
    }, [x, y]);
    
    useEffect(() => {
        const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Detect reduced motion and touch devices
    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return;
        const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
        const touch = window.matchMedia('(pointer: coarse)');
        const apply = () => {
            setPrefersReducedMotion(rm.matches);
            setIsTouchDevice(touch.matches);
        };
        apply();
        const onRM = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        const onTouch = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
        rm.addEventListener('change', onRM);
        touch.addEventListener('change', onTouch);
        return () => {
            rm.removeEventListener('change', onRM);
            touch.removeEventListener('change', onTouch);
        };
    }, []);

    // Parallax tilt based on mouse position
    const tiltStyle = useMemo<React.CSSProperties>(() => {
        if (viewport.w === 0 || viewport.h === 0) return {};
        if (prefersReducedMotion || isTouchDevice) return {};
        const nx = (x / viewport.w) * 2 - 1; // -1..1
        const ny = (y / viewport.h) * 2 - 1; // -1..1
        const maxTilt = 6; // degrees
        const rotateY = nx * maxTilt;
        const rotateX = -ny * maxTilt;
        return {
            transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
        } as React.CSSProperties;
    }, [x, y, viewport, prefersReducedMotion, isTouchDevice]);
    
    const scrollToServices = () => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1B1B1B] py-16 sm:py-20 md:py-0">
            {/* Background Effects */}
            <div
                style={lightingStyle as React.CSSProperties}
                className="absolute inset-0 bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(183,50,57,0.1)_0%,transparent_40%)] z-10"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,28,77,0.05)_0%,rgba(27,27,27,0.95)_70%)] z-0" />
            {!(prefersReducedMotion || isTouchDevice) && <Particles />}
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col lg:flex-row items-center relative z-20 gap-6 sm:gap-8 lg:gap-12">
                {/* Content Section */}
                <motion.div 
                    className="flex-1 max-w-2xl text-center lg:text-left"
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
                >
                    <div className="mb-6 lg:mb-8">
                        <Logo size="lg" />
                    </div>
                    
                    <p className="text-xs md:text-sm text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#0d0f12] tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-5 animate-[slideUp_1s_ease_0.5s_forwards] opacity-0">
                        Notre Vision
                    </p>
                    
                    <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4 sm:mb-5 md:mb-7 text-[#FAFAFA] dark:text-[#FAFAFA] light:text-[#0d0f12] animate-[slideUp_1s_ease_0.7s_forwards] opacity-0 [text-wrap:balance]">
                        AUDIOVISUEL
                    </h1>
                    
                    <p className="text-sm sm:text-base md:text-lg text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#0d0f12] leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 animate-[slideUp_1s_ease_0.9s_forwards] opacity-0">
                        Notre passion est un audiovisuel moderne et innovant, la clé d'une communication réussie avec nos clients et partenaires.
                    </p>
                    
                    <motion.div 
                        className="flex items-center justify-center lg:justify-start gap-4"
                        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
                    >
                        <button 
                            onClick={scrollToServices}
                            className="w-10 h-10 md:w-12 md:h-12 border border-[#FAFAFA] dark:border-[#FAFAFA] light:border-[#0d0f12] rounded-full flex items-center justify-center hover:bg-[#B73239] hover:border-[#B73239] transition-all duration-300 group">
                            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <span className="text-[#FAFAFA] dark:text-[#FAFAFA] light:text-[#0d0f12] text-xs md:text-sm tracking-wider uppercase">Découvrir Plus</span>
                    </motion.div>
                </motion.div>

                {/* Classical Bust Image */}
                <motion.div 
                    className="flex-1 flex justify-center items-center relative w-full max-w-md lg:max-w-lg"
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeOut' }}
                >
                    <div className="relative w-full h-64 md:h-80 lg:h-96" style={tiltStyle}>
                        {/* Classical Bust Image with Fire Effect */}
                        <div className="w-full h-full relative overflow-hidden rounded-lg">
                            {/* Classical Bust Image */}
                            <img
                                src="/images/classical-bust.png"
                                srcSet="/images/classical-bust.png 800w, /images/classical-bust1.png 1600w"
                                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 40vw"
                                alt="Classical Bust with Fire"
                                className="w-full h-full object-cover"
                                loading="eager"
                                decoding="async"
                                fetchpriority="high"
                            />
                            
                            {/* Fire Effect Overlay */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Red/Orange Fire Flames */}
                                <div className="absolute top-0 right-0 w-24 md:w-32 h-32 md:h-40 bg-gradient-to-l from-red-500/80 via-orange-500/60 to-transparent rounded-full blur-sm animate-[pulse_2s_infinite_ease-in-out]"></div>
                                <div className="absolute top-6 md:top-8 right-3 md:right-4 w-18 md:w-24 h-24 md:h-32 bg-gradient-to-l from-red-400/70 via-orange-400/50 to-transparent rounded-full blur-sm animate-[pulse_3s_infinite_ease-in-out]"></div>
                                <div className="absolute top-10 md:top-12 right-6 md:right-8 w-16 md:w-20 h-20 md:h-28 bg-gradient-to-l from-orange-500/60 via-red-500/40 to-transparent rounded-full blur-sm animate-[pulse_2.5s_infinite_ease-in-out]"></div>
                                <div className="absolute top-12 md:top-16 right-9 md:right-12 w-12 md:w-16 h-16 md:h-24 bg-gradient-to-l from-red-400/50 via-orange-400/30 to-transparent rounded-full blur-sm animate-[pulse_1.5s_infinite_ease-in-out]"></div>
                                
                                {/* Fire Particles */}
                                <div className="absolute top-3 md:top-4 right-6 md:right-8 w-1.5 md:w-2 h-1.5 md:h-2 bg-red-500 rounded-full animate-[float_1s_infinite_ease-in-out]"></div>
                                <div className="absolute top-8 md:top-12 right-3 md:right-4 w-1 h-1 bg-orange-500 rounded-full animate-[float_1.2s_infinite_ease-in-out]"></div>
                                <div className="absolute top-12 md:top-16 right-4 md:right-6 w-1 h-1 bg-red-500 rounded-full animate-[float_0.8s_infinite_ease-in-out]"></div>
                                <div className="absolute top-16 md:top-20 right-8 md:right-10 w-1 h-1 bg-orange-400 rounded-full animate-[float_1.5s_infinite_ease-in-out]"></div>
                            </div>
                            
                            {/* Fire Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-l from-red-500/20 via-orange-500/10 to-transparent rounded-lg"></div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Pagination */}
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 flex items-center gap-3 md:gap-4 text-[#FAFAFA] z-30">
                <span className="text-xs md:text-sm font-light">01</span>
                <div className="w-12 md:w-16 h-px bg-[#FAFAFA]"></div>
                <span className="text-xs md:text-sm font-light opacity-50">03</span>
            </div>

            {/* Bottom Right Circle */}
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-[#B73239] rounded-full opacity-60 z-30"></div>
        </section>
    );
};

export default Hero;