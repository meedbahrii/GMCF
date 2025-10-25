import React from 'react';
import { motion } from 'framer-motion';

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, children }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#B73239] hover:border-[#B73239] hover:bg-[#B73239]/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B73239] focus-visible:ring-offset-2"
    >
      {children}
    </motion.a>
  );
};

export default SocialLink;
