import React, { useRef } from 'react';
import { FORMATION_DATA } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';

interface TimelineItemProps {
    date: string;
    title: string;
    description: string;
    isEven: boolean;
    index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, isEven, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-150px');

    return (
        <div 
            ref={ref}
            className={`flex justify-between items-center w-full my-6 md:my-0 transition-all duration-700 ease-out ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="hidden md:block w-5/12"></div>
            <div className="hidden md:flex w-2/12 justify-center">
                <div className="w-4 h-4 bg-[#B73239] rounded-full z-10 shadow-[0_0_20px_rgba(183,50,57,0.5)]"></div>
            </div>
            <div className="w-full md:w-5/12">
                <div className="p-8 bg-[#0F1C4D]/30 backdrop-blur-md border border-[#5A3E85]/20 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#0F1C4D]/40">
                    <p className="text-sm text-[#F5F5F5] tracking-widest mb-2">{date}</p>
                    <h3 className="text-xl text-[#FAFAFA] mb-3">{title}</h3>
                    <p className="text-sm text-[#F5F5F5] leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

const Exhibitions: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    
    return (
        <section className="min-h-screen py-24 px-5 md:px-12 bg-[#1B1B1B] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(15,28,77,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(183,50,57,0.2)_0%,transparent_50%)] z-0" />
            <div className="relative z-10">
                <div ref={ref} className={`text-center mb-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-sm text-[#F5F5F5] tracking-[3px] uppercase mb-5">Former les Talents de Demain</p>
                    <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent">
                        Formation PIXELLAB
                    </h2>
                </div>
                
                <div className="max-w-4xl mx-auto relative">
                    <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-[#B73239] to-transparent -translate-x-1/2" />
                    <div className="relative flex flex-col items-center">
                        {FORMATION_DATA.map((item, index) => (
                            <TimelineItem key={item.title} {...item} isEven={index % 2 !== 0} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Exhibitions;