import React, { useState } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import SocialIcons, { SocialLinks } from './SocialIcons';

export interface TeamMember {
  name: string;
  title: string;
  personalDetail: string;
  image: string;
  imageWebp?: string;
  socials: SocialLinks;
  expertise: string[];
  color: string;
  department?: string;
  featured?: boolean;
  location?: string;
  languages?: string[];
  bio?: string;
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number; onOpen: (member: TeamMember) => void; reduceMotion: boolean }>
  = ({ member, index, onOpen, reduceMotion }) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(elementRef, '-100px');
  const [isHovered, setIsHovered] = useState(false);

  const transitionDelay = reduceMotion ? undefined : { transitionDelay: `${index * 200}ms` } as React.CSSProperties;

  return (
    <div ref={elementRef}
      className={`transition-all ${reduceMotion ? '' : 'duration-1000 ease-out'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={transitionDelay}
    >
      <div 
        className="group relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-[#0F1C4D]/20 backdrop-blur-md rounded-3xl p-6 border border-[#5A3E85]/20 overflow-hidden transition-all duration-500 hover:border-[#5A3E85]/40 hover:shadow-2xl hover:shadow-[#5A3E85]/10 h-full flex flex-col focus-within:ring-2 focus-within:ring-[#B73239]">
          <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          <div className="absolute top-3 right-3 w-2 h-2 bg-[#0F7156] rounded-full opacity-60 motion-safe:animate-[pulse_2s_infinite]" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#B73239] rounded-full opacity-40 motion-safe:animate-[pulse_3s_infinite]" />

          <div className="relative mb-5 flex-shrink-0">
            <button
              type="button"
              onClick={() => onOpen(member)}
              className="block w-24 h-24 mx-auto relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B73239] focus-visible:ring-offset-[#1B1B1B]"
              aria-label={`View profile of ${member.name}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FAFAFA]/20 group-hover:border-[#FAFAFA]/40 transition-all duration-500">
                <picture>
                  {member.imageWebp ? <source srcSet={member.imageWebp} type="image/webp" /> : null}
                  <img src={member.image} alt={member.name} className={`w-full h-full object-cover object-center grayscale group-hover:grayscale-0 ${reduceMotion ? '' : 'transition-all duration-500 group-hover:scale-110'}`} loading="lazy" decoding="async" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#0F7156] rounded-full border-2 border-[#1B1B1B] motion-safe:animate-[pulse_2s_infinite]" />
            </button>
          </div>

          <div className="text-center space-y-3 flex-grow flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#FAFAFA] group-hover:text-[#FAFAFA] transition-colors duration-300 leading-tight">{member.name}</h3>
              <p className="text-sm text-[#F5F5F5] font-medium leading-tight">{member.title}</p>
              <p className="text-xs text-[#F5F5F5]/80 italic leading-relaxed">{member.personalDetail}</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {member.expertise.map((skill, skillIndex) => (
                  <span key={skill} className="px-2 py-1 text-xs bg-[#5A3E85]/20 text-[#F5F5F5] rounded-full border border-[#5A3E85]/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 mt-auto">
              <SocialIcons socials={member.socials} visible={isHovered} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;


