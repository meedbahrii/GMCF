import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
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

        <div className="max-w-5xl mx-auto">
          {list.map((m, idx) => (
            <article key={m.name} className="py-6">
              <div className="grid grid-cols-[32px_1fr_96px] items-center gap-4 md:gap-6">
                {/* left socials (vertical) */}
                <div className="flex flex-col items-center gap-3 text-white/60">
                  {m.socials.linkedin ? (
                    <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
                      <FaLinkedinIn size={14} />
                    </a>
                  ) : null}
                  {m.socials.twitter ? (
                    <a href={m.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
                      <FaTwitter size={14} />
                    </a>
                  ) : null}
                  {m.socials.instagram ? (
                    <a href={m.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                      <FaInstagram size={14} />
                    </a>
                  ) : null}
                  {m.socials.email ? (
                    <a href={`mailto:${m.socials.email}`} className="hover:text-white" aria-label="Email">
                      <FaEnvelope size={14} />
                    </a>
                  ) : null}
                </div>

                {/* content */}
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg">{m.name}</h3>
                  <div className="text-[11px] md:text-xs text-white/60">{m.title}</div>
                  <p className="mt-2 text-xs md:text-sm text-white/70 max-w-2xl">{m.personalDetail}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.expertise?.slice(0,4).map(tag => (
                      <span key={tag} className="px-2 py-1 text-[10px] md:text-[11px] rounded-full border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* right avatar */}
                <div className="justify-self-end w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/15 bg-black/20">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover object-center" loading="lazy" />
                </div>
              </div>

              {/* divider */}
              {idx !== list.length - 1 ? (
                <div className="mt-6 h-px w-full bg-white/10" />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
