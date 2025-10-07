import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
    fetch('/team.json')
      .then((r) => r.json())
      .then((data: TeamMember[]) => {
        if (mounted) setMembers(data);
      })
      .catch(() => {});
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
    <section className="py-16 md:py-24 px-4 md:px-6 lg:px-12 bg-[#0d0d0d]" aria-labelledby="team-title">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-14 md:mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono tracking-[0.25em] text-[#666] text-lg">03.</span>
            <h2
              id="team-title"
              className="font-mono text-white text-[32px] sm:text-[40px] md:text-[48px] tracking-[0.02em]"
            >
              Our Teams
            </h2>
          </div>
        </div>

        {/* Two-column grid */}
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          {members.map((m, idx) => {
            const isLeft = idx % 2 === 0; // image on left for even rows
            return (
            <motion.article
              key={m.name}
              className={`group relative py-10 ${idx !== members.length - 1 ? 'border-b border-white/10' : ''}`}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
              }}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              tabIndex={0}
            >
              <motion.div
                className={`flex items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-120px' }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } }
                }}
              > 
                {/* Portrait */}
                <motion.div className="relative shrink-0" whileHover={{ y: -2, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  <div className={`relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.35)] ring-2 ${m.featured ? 'ring-[#00e091]/40' : 'ring-white/10'} bg-[#111]`}> 
                    <picture>
                      {m.imageWebp && <source srcSet={m.imageWebp} type="image/webp" />}
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover grayscale" loading="lazy" />
                    </picture>
                  </div>
                  {/* Social icons stack */}
                  <motion.div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${isLeft ? '-left-10' : '-right-10'} flex-col items-center gap-3 text-[#7ddac0]`}
                    initial={{ opacity: 0, x: isLeft ? -6 : 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    {/* bullets rendered based on available socials */}
                    <span className="w-2 h-2 rounded-full bg-[#00e091] opacity-70" />
                    <span className="w-2 h-2 rounded-full bg-[#00e091] opacity-70" />
                    <span className="w-2 h-2 rounded-full bg-[#00e091] opacity-70" />
                  </motion.div>
                </motion.div>

                {/* Text */}
                <motion.div className="min-w-0 text-[#e5e7eb] outline-none focus-visible:ring-2 focus-visible:ring-[#00e091]/20 rounded-sm" variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                  <motion.h3 className="text-[12px] tracking-[0.2em] text-[#9ca3af] uppercase font-mono" variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>{getAcronymWithDots(m.title)}</motion.h3>
                  <motion.div className="mt-1 flex items-center justify-between" variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
                    <p className="text-[22px] sm:text-[24px] font-mono text-white">{m.name}</p>
                  </motion.div>
                  <motion.p className="mt-3 text-[13px] leading-relaxed text-[#c5c7cb] max-w-[56ch]" variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>{m.personalDetail}</motion.p>
                </motion.div>
              </motion.div>
              {idx !== members.length - 1 && (
                <motion.div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.6, ease: 'easeOut' }} style={{ transformOrigin: 'center' }} />
              )}
            </motion.article>
          );})}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
