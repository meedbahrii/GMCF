import React, { useState, useEffect, useRef } from 'react';
import { ABOUT_STATS } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';
import { useLanguage } from '../contexts/LanguageContext';

const StatItem: React.FC<{ value: number; label: string; suffix: string; }> = ({ value, label, suffix }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible) {
            const duration = 2000;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = value / totalSteps;
            let currentCount = 0;

            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(currentCount));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isVisible, value]);
    
    const formatCount = (num: number) => {
        return `${num}${suffix}`;
    };

    return (
        <div ref={ref} className="text-center p-3 md:p-5 bg-[#0F1C4D]/30 backdrop-blur-md rounded-lg md:rounded-xl">
            <div className="text-2xl md:text-4xl font-light text-[#FAFAFA] mb-1 md:mb-2">{formatCount(count)}</div>
            <div className="text-xs text-[#F5F5F5] tracking-widest uppercase">{label}</div>
        </div>
    );
};


const About: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-200px');
    const { t } = useLanguage();

    return (
        <section className="min-h-screen py-16 md:py-24 px-4 md:px-5 lg:px-12 bg-gradient-to-bl from-[#1B1B1B] to-[#0F1C4D]/10 flex items-center">
            <div 
                ref={ref} 
                className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="about-text">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent mb-5 md:mb-7">
                        {t('about.title')}
                    </h2>
                    <p className="text-[#F5F5F5] leading-loose text-sm md:text-base mb-4 md:mb-5">
                        {t('about.desc1')}
                    </p>
                    <p className="text-[#F5F5F5] leading-loose text-sm md:text-base mb-8 md:mb-10">
                        {t('about.desc2')}
                    </p>
                    <div className="grid grid-cols-2 gap-3 md:gap-5">
                        {ABOUT_STATS.map(stat => (
                            <StatItem 
                                key={stat.label} 
                                value={stat.value}
                                label={t(`about.stats.${stat.label.toLowerCase().replace(/\s+/g, '')}`)}
                                suffix={stat.suffix}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="about-visual relative h-[300px] md:h-[400px] lg:h-[500px] hidden lg:block">
                    <div className="relative w-full h-full">
                        <div className="absolute top-[10%] left-[10%] w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] rounded-2xl animate-[floatElement_8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute top-[60%] right-[20%] w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-[#B73239] to-[#E67E22] rounded-2xl animate-[floatElement_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute bottom-[20%] left-[30%] w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-[#0F7156] to-[#C9A227] rounded-2xl animate-[floatElement_8s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;