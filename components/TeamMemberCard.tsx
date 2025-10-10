import React, { useState, useMemo } from 'react';
// Define types locally to avoid import issues
type SocialPlatform = 'github' | 'linkedin' | 'twitter';

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface TeamMember {
  name: string;
  description: string;
  role: string;
  imageUrl: string;
  socialLinks: SocialLink[];
}

const socialIcons = {
  github: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  linkedin: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  twitter: (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
};

const AIGenerateIcon: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <svg 
    className={`w-4 h-4 transition-all duration-300 ${isLoading ? 'animate-spin' : ''}`} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 3v2.35M12 18.65V21M3 12h2.35M18.65 12H21M5.64 5.64l1.66 1.66M16.7 16.7l1.66 1.66M5.64 18.36l1.66-1.66M16.7 7.3l1.66-1.66" />
    { !isLoading && <path d="M12 8l-2 4h4l-2 4" strokeWidth="2.5" /> }
  </svg>
);

export const TeamMemberCard: React.FC<TeamMember> = ({ name, description, role, imageUrl, socialLinks }) => {
  const [aiBio, setAiBio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiBioVisible, setIsAiBioVisible] = useState(false);

  const handleAiBioToggle = async () => {
    if (aiBio) {
      setIsAiBioVisible(!isAiBioVisible);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate AI generation for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      const cyberpunkBios = [
        "Neural pathways optimized for maximum efficiency.",
        "Code flows through their veins like digital blood.",
        "They speak fluent binary and dream in algorithms.",
        "Cybernetic enhancements include enhanced creativity modules.",
        "Their brain is a quantum computer running on coffee.",
        "They've never met a problem they couldn't hack.",
        "Their keyboard is their weapon of choice.",
        "They debug reality for fun on weekends."
      ];
      const randomBio = cyberpunkBios[Math.floor(Math.random() * cyberpunkBios.length)];
      setAiBio(randomBio);
      setIsAiBioVisible(true);
    } catch (error) {
      console.error("Error generating bio:", error);
      setAiBio("Error connecting to the neural network.");
      setIsAiBioVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs group">
      <div className="relative p-2 border border-gray-700/50 w-full bg-black">
        {/* Corner Brackets */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300 animate-pulse-border group-hover:shadow-[0_0_8px_rgba(6,182,212,0.7)]"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300 animate-pulse-border group-hover:shadow-[0_0_8px_rgba(6,182,212,0.7)]"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300 animate-pulse-border group-hover:shadow-[0_0_8px_rgba(6,182,212,0.7)]"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300 animate-pulse-border group-hover:shadow-[0_0_8px_rgba(6,182,212,0.7)]"></div>
        
        <div className="relative z-10">
            <div className="overflow-hidden h-64">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                />
            </div>
          <div className="pt-4 px-2 pb-1 text-left w-full">
            <h3 className="text-xl font-bold tracking-widest text-gray-200 uppercase">{name}</h3>
            <div className="flex items-center space-x-2 mt-1">
                 <p className="text-sm text-gray-400 flex-grow h-8">
                    {isAiBioVisible ? aiBio : description}
                 </p>
                <button 
                    onClick={handleAiBioToggle} 
                    disabled={isLoading}
                    className={`p-1 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${isAiBioVisible ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500 hover:text-cyan-400'}`}
                    aria-label="Generate AI Bio"
                >
                    <AIGenerateIcon isLoading={isLoading} />
                </button>
            </div>
            <p className="text-sm font-semibold text-cyan-400 mt-1 tracking-wider">[{role}]</p>
            
            <div className="flex items-center space-x-4 mt-3">
              {socialLinks.map((link) => (
                <div key={link.platform} className="relative flex flex-col items-center group/tooltip">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name}'s ${link.platform}`}
                    className="text-gray-500 hover:text-cyan-400 transition-all duration-300 transform hover:scale-125 hover:drop-shadow-[0_0_4px_rgba(6,182,212,0.7)]"
                  >
                    {socialIcons[link.platform]}
                  </a>
                  <div className="absolute bottom-full mb-2 px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;