import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TeamMemberCard } from './TeamMemberCard';
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
  imageWebp?: string;
  socials: SocialLinks;
  expertise: string[];
  color: string;
  featured?: boolean;
}

const teamMembers: TeamMember[] = [];

// Returns acronym with dots from a full title, e.g. "Chief Executive Officer" -> "C.E.O"
const getAcronymWithDots = (title: string): string => {
  if (!title) return '';
  const letters = title
    .replace(/[^a-zA-Z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase());
  return letters.join('.');
};

const Team: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useOnScreen(headerRef, '-100px');
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    let mounted = true;
    // Use relative path so it works when the site is served under a subpath/base URL
    fetch('team.json')
      .then((r) => {
        console.log('Team fetch response:', r.status, r.statusText);
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        return r.json();
      })
      .then((data: TeamMember[]) => {
        console.log('Team data loaded:', data.length, 'members');
        if (mounted) setMembers(data);
      })
      .catch((err) => {
        // Surface an error to help diagnose missing data in production
        console.error('Failed to load team.json', err);
        // Set empty array to prevent infinite loading state
        if (mounted) setMembers([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Preload first two images for better LCP
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    members.slice(0, 2).forEach((m) => {
      const l = document.createElement('link');
      l.rel = 'preload';
      l.as = 'image';
      l.href = m.imageWebp || m.image;
      document.head.appendChild(l);
      links.push(l);
    });
    return () => {
      links.forEach((l) => l.parentElement?.removeChild(l));
    };
  }, [members]);

  return (
    <motion.section
      className="py-16 md:py-24 px-4 md:px-6 lg:px-12 bg-[#0d0d0d] dark:bg-[#0d0d0d] light:bg-[#FAFAFA]"
      aria-labelledby="team-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-14 md:mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono tracking-[0.25em] text-[#666] dark:text-[#666] light:text-[#999] text-lg">03.</span>
            <h2
              id="team-title"
              className="font-mono text-white dark:text-white light:text-[#0d0f12] text-[32px] sm:text-[40px] md:text-[48px] tracking-[0.02em]"
            >
              Our Teams
            </h2>
          </div>
        </div>

        {/* Grid of cyberpunk cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-16 justify-items-center">
          {members.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                Loading team members...
              </p>
            </div>
          ) : (
            members.map((m, i) => {
              const links: Array<{platform: 'github' | 'linkedin' | 'twitter', url: string}> = [];
              if (m.socials?.github) links.push({ platform: 'github', url: m.socials.github });
              if (m.socials?.linkedin) links.push({ platform: 'linkedin', url: m.socials.linkedin });
              if (m.socials?.twitter) links.push({ platform: 'twitter', url: m.socials.twitter });
              const cm = {
                name: m.name,
                description: m.personalDetail,
                role: getAcronymWithDots(m.title),
                imageUrl: m.image,
                socialLinks: links,
              };
              return (
                <div 
                  key={m.name}
                  className="animate-card-enter"
                  style={{ animationDelay: `${100 + i * 100}ms` }}
                >
                  <TeamMemberCard {...cm} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Team;
