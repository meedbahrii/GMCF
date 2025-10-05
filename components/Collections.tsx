import React, { useRef, useState, useEffect } from 'react';
import { SERVICES_DATA } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';
import LoadingSpinner from './LoadingSpinner';
import Skeleton from './Skeleton';

interface CollectionCardProps {
    icon: string;
    title: string;
    description: string;
    index: number;
    isLoading?: boolean;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ icon, title, description, index, isLoading = false }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');

    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
                <div className="space-y-4">
                    <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full" />
                    <Skeleton lines={2} height="h-4" />
                    <Skeleton lines={3} height="h-3" />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={`bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 relative transition-all duration-700 ease-out overflow-hidden group interactive ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-bl from-[#FAFAFA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#C9A227] to-[#E67E22] rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-7 text-2xl sm:text-3xl md:text-4xl text-[#1B1B1B]">
                    {icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl text-[#FAFAFA] font-light mb-2 sm:mb-3 md:mb-4">{title}</h3>
                <p className="text-[#F5F5F5] leading-relaxed text-xs sm:text-sm">{description}</p>
            </div>
        </div>
    );
};

const Collections: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time for services data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-br from-[#1B1B1B] to-[#0F1C4D]/20">
            <div ref={ref} className={`text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-xs md:text-sm text-[#F5F5F5] tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-5">Technologies de Pointe</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent">
                    Nos Services
                </h2>
            </div>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <CollectionCard 
                            key={`loading-${index}`} 
                            icon="" 
                            title="" 
                            description="" 
                            index={index} 
                            isLoading={true} 
                        />
                    ))
                ) : (
                    SERVICES_DATA.map((item, index) => (
                        <CollectionCard key={item.title} {...item} index={index} />
                    ))
                )}
            </div>
        </section>
    );
};

export default Collections;