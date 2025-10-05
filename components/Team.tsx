import React, { useState, useEffect } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  github?: string;
  email?: string;
  website?: string;
}

interface TeamMember {
  name: string;
  title: string;
  personalDetail: string;
  image: string;
  socials: SocialLinks;
  expertise: string[];
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "MOHAMMED BAHRI",
    title: "Chief Executive Officer",
    personalDetail: "Visionnaire de l'innovation audiovisuelle",
    image: "/images/team/mohammed.jpg",
    expertise: ["Leadership", "Innovation", "Stratégie"],
    color: "from-[#0F1C4D] to-[#5A3E85]",
    socials: {
      linkedin: "https://linkedin.com/in/mohammed-bahri",
      twitter: "https://twitter.com/mohammedbahri",
      instagram: "https://instagram.com/mohammedbahri",
      facebook: "https://facebook.com/mohammed.bahri",
      github: "https://github.com/mohammedbahri",
      website: "https://mohammedbahri.com",
      email: "mohammed@example.com"
    }
  },
  {
    name: "SARAH LAMBERT",
    title: "Chief Financial Officer",
    personalDetail: "Passionnée de cinéma et de finance",
    image: "/images/team/mohaccccmmed.jpg",
    expertise: ["Finance", "Cinéma", "Management"],
    color: "from-[#B73239] to-[#E67E22]",
    socials: {
      linkedin: "https://linkedin.com/in/sarah-lambert",
      twitter: "https://twitter.com/sarahlambert",
      email: "sarah@example.com"
    }
  },
  {
    name: "JEAN DUPONT",
    title: "Chief Technology Officer",
    personalDetail: "Expert en technologies de pointe",
    image: "/images/team/mohammed.jpg",
    expertise: ["Technologie", "Innovation", "Développement"],
    color: "from-[#0F7156] to-[#C9A227]",
    socials: {
      linkedin: "https://linkedin.com/in/jean-dupont",
      email: "jean@example.com"
    }
  },
  {
    name: "MARIE CHEN",
    title: "Chief Design Officer",
    personalDetail: "Créatrice d'expériences visuelles",
    image: "/images/team/mohaccccmmed.jpg",
    expertise: ["Design", "Créativité", "UX/UI"],
    color: "from-[#5A3E85] to-[#B73239]",
    socials: {
      linkedin: "https://linkedin.com/in/marie-chen",
      twitter: "https://twitter.com/mariechen",
      email: "marie@example.com"
    }
  }
];

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-[#0F7156]/30 rounded-full animate-[float_8s_infinite_ease-in-out]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Social Media Icons Component
const SocialIcons: React.FC<{ socials: SocialLinks; isHovered: boolean }> = ({ socials, isHovered }) => {
  const socialLinks = [
    { key: 'linkedin', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { key: 'twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
    { key: 'instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { key: 'email', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' }
  ];

  return (
    <div className={`flex space-x-3 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {socialLinks.map((social) => {
        const url = socials[social.key as keyof SocialLinks];
        if (!url) return null;
        
  return (
          <a
            key={social.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-[#FAFAFA]/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FAFAFA]/20 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-4 h-4 text-[#FAFAFA]" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.icon} />
            </svg>
          </a>
        );
      })}
    </div>
  );
};

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
            const elementRef = React.useRef<HTMLDivElement>(null);
            const isVisible = useOnScreen(elementRef, '-100px');
  const [isHovered, setIsHovered] = useState(false);

            return (
              <div
                ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div 
        className="group relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container */}
        <div className="relative bg-[#0F1C4D]/20 backdrop-blur-md rounded-3xl p-6 border border-[#5A3E85]/20 overflow-hidden transition-all duration-500 hover:border-[#5A3E85]/40 hover:shadow-2xl hover:shadow-[#5A3E85]/10 h-full flex flex-col">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Floating Elements */}
          <div className="absolute top-3 right-3 w-2 h-2 bg-[#0F7156] rounded-full opacity-60 animate-[pulse_2s_infinite]" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-[#B73239] rounded-full opacity-40 animate-[pulse_3s_infinite]" />
          
          {/* Image Container */}
          <div className="relative mb-5 flex-shrink-0">
            <div className="w-24 h-24 mx-auto relative">
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Image Frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FAFAFA]/20 group-hover:border-[#FAFAFA]/40 transition-all duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#0F7156] rounded-full border-2 border-[#1B1B1B] animate-[pulse_2s_infinite]" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-3 flex-grow flex flex-col justify-between">
            <div className="space-y-3">
              {/* Name */}
              <h3 className="text-lg font-bold text-[#FAFAFA] group-hover:text-[#FAFAFA] transition-colors duration-300 leading-tight">
                {member.name}
              </h3>

              {/* Title */}
              <p className="text-sm text-[#F5F5F5] font-medium leading-tight">
                {member.title}
              </p>

              {/* Personal Detail */}
              <p className="text-xs text-[#F5F5F5]/80 italic leading-relaxed">
                {member.personalDetail}
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {member.expertise.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-[#5A3E85]/20 text-[#F5F5F5] rounded-full border border-[#5A3E85]/30"
                    style={{ animationDelay: `${(index * 200) + (skillIndex * 100)}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-3 mt-auto">
              <SocialIcons socials={member.socials} isHovered={isHovered} />
            </div>
                    </div>
                  </div>
                </div>
              </div>
            );
};

const Team = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 md:px-5 lg:px-12 bg-[#1B1B1B] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-[float_8s_infinite_ease-in-out]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-[pulse_4s_infinite_ease-in-out]"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-[pulse_4s_infinite_ease-in-out]"></div>
        <div className="absolute top-1/2 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-[pulse_3s_infinite_ease-in-out]"></div>
        <div className="absolute top-1/2 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-[pulse_3s_infinite_ease-in-out]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div 
          ref={ref} 
          className={`mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
            <span className="text-lg md:text-2xl font-mono text-white tracking-widest">03. Our Teams</span>
            <div className="w-12 md:w-16 h-px bg-gray-400"></div>
          </div>
        </div>

        {/* Team Grid - 4 members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name} 
              className={`text-center transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Pixelated Image Frame */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 md:mb-4 group hover:scale-105 transition-transform duration-500">
                {/* L-shaped corner brackets with animation */}
                <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-gray-400 group-hover:border-cyan-400 transition-colors duration-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-gray-400 group-hover:border-cyan-400 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-gray-400 group-hover:border-cyan-400 transition-colors duration-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-r-2 border-b-2 border-gray-400 group-hover:border-cyan-400 transition-colors duration-500"></div>
                
                {/* Horizontal lines with animation */}
                <div className="absolute top-1/2 left-0 w-6 md:w-8 h-px bg-gray-400 group-hover:bg-cyan-400 group-hover:w-8 md:group-hover:w-12 transition-all duration-500"></div>
                <div className="absolute top-1/2 right-0 w-6 md:w-8 h-px bg-gray-400 group-hover:bg-cyan-400 group-hover:w-8 md:group-hover:w-12 transition-all duration-500"></div>
                
                {/* Team Member Image */}
                <div className="w-full h-full rounded-sm overflow-hidden">
                  <img
                    src={member.image}
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 128px"
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-sm bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
              
              {/* Name with animation */}
              <h3 className="text-sm md:text-lg font-mono font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-500">
                {member.name}
              </h3>
              
              {/* Personal Detail with animation */}
              <p className="text-xs font-mono text-white mb-1 group-hover:text-gray-300 transition-colors duration-500">
                {member.personalDetail}
              </p>
              
              {/* Role with animation */}
              <span className="text-xs font-mono text-green-400 group-hover:text-green-300 transition-colors duration-500">
                [{member.title}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
