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

        <div className="grid grid-cols-1 gap-4 md:gap-5 max-w-5xl mx-auto">
          {list.map((m) => (
            <article key={m.name} className="relative rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
              {/* gradient hairline */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ padding: 1 as any }}>
                <div className="absolute inset-0 rounded-[14px] opacity-20 bg-[linear-gradient(90deg,rgba(183,50,57,.6),rgba(15,113,86,.6))]"></div>
              </div>

              <div className="flex items-center gap-4 md:gap-6">
                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-white/15 bg-black/20">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-white font-semibold text-base md:text-lg truncate">{m.name}</h3>
                    <span className="text-[11px] md:text-xs text-white/60">{m.title}</span>
                  </div>
                  <p className="mt-1 text-xs md:text-sm text-white/70 line-clamp-2">{m.personalDetail}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.expertise?.slice(0,4).map(tag => (
                      <span key={tag} className="px-2 py-1 text-[10px] md:text-[11px] rounded-full border border-white/10 text-white/80 bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
