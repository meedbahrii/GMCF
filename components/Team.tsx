import React, { useState, useEffect, useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useOnScreen } from '../hooks/useOnScreen';
import TeamMemberCard from './TeamMemberCard';
import TeamProfileModal from './TeamProfileModal';

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
  department?: string;
  featured?: boolean;
  location?: string;
  languages?: string[];
}

// Data will be fetched from /team.json
const teamMembers: TeamMember[] = [];

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

// external components are used for SocialIcons and TeamMemberCard

const Team = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');
  const reduceMotion = useReducedMotion();

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sort, setSort] = useState<'Featured' | 'A-Z'>('Featured');
  const [openMember, setOpenMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/team.json')
      .then(r => r.json())
      .then((data: TeamMember[]) => { if (mounted) setMembers(data); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const departments = useMemo(() => {
    const set = new Set<string>();
    members.forEach(m => m.department && set.add(m.department));
    return ['All', ...Array.from(set)];
  }, [members]);

  const skills = useMemo(() => {
    const set = new Set<string>();
    members.forEach(m => m.expertise?.forEach(e => set.add(e)));
    return ['All', ...Array.from(set)];
  }, [members]);

  const filteredAndSorted = useMemo(() => {
    let list = members.slice();
    if (selectedDepartment !== 'All') list = list.filter(m => m.department === selectedDepartment);
    if (selectedSkill !== 'All') list = list.filter(m => m.expertise?.includes(selectedSkill));
    if (sort === 'Featured') list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    if (sort === 'A-Z') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [members, selectedDepartment, selectedSkill, sort]);

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 md:px-5 lg:px-12 bg-[#1B1B1B] relative overflow-hidden" aria-labelledby="team-title">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full motion-safe:animate-[float_8s_infinite_ease-in-out]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent motion-safe:animate-[pulse_4s_infinite_ease-in-out]"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent motion-safe:animate-[pulse_4s_infinite_ease-in-out]"></div>
        <div className="absolute top-1/2 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent motion-safe:animate-[pulse_3s_infinite_ease-in-out]"></div>
        <div className="absolute top-1/2 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent motion-safe:animate-[pulse_3s_infinite_ease-in-out]"></div>
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
            <h2 id="team-title" className="text-lg md:text-2xl font-mono text-white tracking-widest">03. Notre équipe</h2>
            <div className="w-12 md:w-16 h-px bg-gray-400"></div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="dept-select">Département</label>
            <select id="dept-select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="bg-white/5 text-white text-sm rounded px-2 py-1 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239]">
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>

            <label className="sr-only" htmlFor="skill-select">Compétence</label>
            <select id="skill-select" value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="bg-white/5 text-white text-sm rounded px-2 py-1 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239]">
              {skills.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="ml-auto flex items-center gap-2">
              <button type="button" onClick={() => setSort('Featured')} className={`text-xs px-2 py-1 rounded border ${sort === 'Featured' ? 'bg-[#B73239] text-white border-[#B73239]' : 'bg-white/5 text-white/80 border-white/10'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239]`}>
                À la une
              </button>
              <button type="button" onClick={() => setSort('A-Z')} className={`text-xs px-2 py-1 rounded border ${sort === 'A-Z' ? 'bg-[#B73239] text-white border-[#B73239]' : 'bg-white/5 text-white/80 border-white/10'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239]`}>
                A → Z
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {filteredAndSorted.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} onOpen={setOpenMember} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      <TeamProfileModal open={!!openMember} member={openMember} onClose={() => setOpenMember(null)} />
    </section>
  );
};

export default Team;
