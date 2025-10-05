import React, { useEffect, useRef } from 'react';
import { TeamMember } from './TeamMemberCard';

interface Props {
  open: boolean;
  member?: TeamMember | null;
  onClose: () => void;
}

const TeamProfileModal: React.FC<Props> = ({ open, member, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !member) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    address: { '@type': 'PostalAddress', addressCountry: 'MA' },
    sameAs: [
      member.socials.linkedin,
      member.socials.twitter,
      member.socials.instagram,
      member.socials.facebook,
      member.socials.github,
      member.socials.website,
    ].filter(Boolean),
  } as any;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-profile-title"
    >
      <div className="bg-[#0d0f12] border border-white/10 rounded-2xl w-[min(92vw,720px)] max-h-[90vh] overflow-auto shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 id="team-profile-title" className="text-xl md:text-2xl font-bold text-white">{member.name}</h3>
                <p className="text-sm md:text-base text-white/80">{member.title}</p>
              </div>
            </div>
            <button ref={closeButtonRef} onClick={onClose} aria-label="Close" className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239] rounded p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {member.personalDetail ? (
            <p className="mt-4 text-white/80 leading-relaxed">{member.personalDetail}</p>
          ) : null}

          {member.expertise?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {member.expertise.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs bg-white/10 text-white rounded-full border border-white/15">{tag}</span>
              ))}
            </div>
          ) : null}

          <div className="sr-only" aria-hidden="true">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfileModal;


