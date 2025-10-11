import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnScreen } from '../hooks/useOnScreen';
import { useTranslation } from '../utils/i18n';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  year: number;
  technologies: string[];
  images: string[];
  video?: string;
  duration: string;
  team: string[];
  location: string;
  budget: string;
  featured: boolean;
  tags: string[];
}

interface PortfolioProps {
  className?: string;
}

const PortfolioCard: React.FC<{ item: PortfolioItem; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');
  const { t } = useTranslation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] hover:from-[#1a2a5c] hover:to-[#6b4a95] transition-all duration-500 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.images[0] || '/images/portfolio/placeholder.jpg'}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-4 left-4 bg-[#B73239] text-white px-3 py-1 rounded-full text-xs font-medium">
            {t('portfolio.featured')}
          </div>
        )}

        {/* Play Button for Video */}
        {item.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#C9A227] font-medium uppercase tracking-wider">
            {item.category}
          </span>
          <span className="text-xs text-[#F5F5F5]/60">{item.year}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#C9A227] transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-sm text-[#F5F5F5]/80 mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#B73239]/20 text-[#B73239] text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="px-2 py-1 bg-[#F5F5F5]/20 text-[#F5F5F5]/60 text-xs rounded-full">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Client & Duration */}
        <div className="flex items-center justify-between text-xs text-[#F5F5F5]/60">
          <span>{item.client}</span>
          <span>{item.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioModal: React.FC<{ item: PortfolioItem | null; onClose: () => void }> = ({ item, onClose }) => {
  const { t } = useTranslation();

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1B1B1B] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-[#F5F5F5]/80">{item.client} • {item.year}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#333] hover:bg-[#444] rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Video or Image */}
            {item.video ? (
              <div className="mb-6">
                <video
                  src={item.video}
                  controls
                  className="w-full h-64 object-cover rounded-lg"
                  poster={item.images[0]}
                />
              </div>
            ) : (
              <div className="mb-6">
                <img
                  src={item.images[0] || '/images/portfolio/placeholder.jpg'}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Description */}
            <p className="text-[#F5F5F5] mb-6 leading-relaxed">{item.description}</p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#0F1C4D]/30 p-4 rounded-lg">
                <h4 className="text-sm text-[#C9A227] font-medium mb-1">{t('portfolio.client')}</h4>
                <p className="text-white text-sm">{item.client}</p>
              </div>
              <div className="bg-[#0F1C4D]/30 p-4 rounded-lg">
                <h4 className="text-sm text-[#C9A227] font-medium mb-1">{t('portfolio.year')}</h4>
                <p className="text-white text-sm">{item.year}</p>
              </div>
              <div className="bg-[#0F1C4D]/30 p-4 rounded-lg">
                <h4 className="text-sm text-[#C9A227] font-medium mb-1">{t('portfolio.duration')}</h4>
                <p className="text-white text-sm">{item.duration}</p>
              </div>
              <div className="bg-[#0F1C4D]/30 p-4 rounded-lg">
                <h4 className="text-sm text-[#C9A227] font-medium mb-1">{t('portfolio.budget')}</h4>
                <p className="text-white text-sm">{item.budget}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('portfolio.technologies')}</h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#B73239] text-white text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('portfolio.team')}</h4>
              <div className="flex flex-wrap gap-2">
                {item.team.map((member, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#5A3E85] text-white text-sm rounded-full"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">{t('portfolio.location')}</h4>
              <p className="text-[#F5F5F5]">{item.location}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ className = '' }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');
  const { t } = useTranslation();

  const categories = [
    { key: 'all', label: t('portfolio.filter.all') },
    { key: 'production', label: t('portfolio.filter.production') },
    { key: 'vfx', label: t('portfolio.filter.vfx') },
    { key: 'formation', label: t('portfolio.filter.formation') },
    { key: 'equipement', label: t('portfolio.filter.equipement') },
    { key: 'evenementiel', label: t('portfolio.filter.evenementiel') },
    { key: 'corporate', label: t('portfolio.filter.corporate') },
  ];

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch('/portfolio.json');
        const data = await response.json();
        setPortfolioItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, portfolioItems]);

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedItem(item);
  };

  return (
    <section ref={ref} className={`py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-[#1B1B1B] to-[#0F1C4D]/20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs md:text-sm text-[#F5F5F5] tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-5">
            {t('portfolio.subtitle')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-[#B73239] text-white'
                  : 'bg-[#0F1C4D]/30 text-[#F5F5F5] hover:bg-[#0F1C4D]/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-[#0F1C4D]/30 rounded-xl p-6 animate-pulse">
                <div className="h-64 bg-[#333] rounded-lg mb-4"></div>
                <div className="h-4 bg-[#333] rounded mb-2"></div>
                <div className="h-4 bg-[#333] rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-[#333] rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleCardClick(item)}
                >
                  <PortfolioCard item={item} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#F5F5F5]/60 text-lg">
              {t('portfolio.noItems')}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};

export default Portfolio;
