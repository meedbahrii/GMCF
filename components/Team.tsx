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
  imageWebp?: string;
  socials: SocialLinks;
  expertise: string[];
  color: string;
}

// Data will be fetched from /team.json
const teamMembers: TeamMember[] = [];

const Team = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');

  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    let mounted = true;
    fetch('/team.json')
      .then(r => r.json())
      .then((data: TeamMember[]) => { if (mounted) setMembers(data); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const list = members;

  return (
    <section className="py-20 md:py-28 px-4 md:px-5 lg:px-12 bg-[#1B1B1B]" aria-labelledby="team-title">

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div 
          ref={ref} 
          className={`mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <h2 id="team-title" className="text-xl md:text-2xl font-mono text-white tracking-widest">03. Notre équipe</h2>
            <div className="h-px w-16 bg-white/20" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {list.map((m) => (
            <article key={m.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-white/15 mb-4">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover object-center" loading="lazy" />
              </div>
              <h3 className="text-white font-semibold">{m.name}</h3>
              <p className="text-white/70 text-sm">{m.title}</p>
              <p className="text-white/60 text-xs mt-2">{m.personalDetail}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {m.expertise?.slice(0,3).map(tag => (
                  <span key={tag} className="px-2 py-1 text-[11px] rounded-full border border-white/10 text-white/80">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
