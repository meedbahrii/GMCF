import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnScreen } from '../hooks/useOnScreen';
import { useTranslation } from '../utils/i18n';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  slug: string;
}

interface BlogProps {
  className?: string;
  showFeatured?: boolean;
  limit?: number;
}

const BlogCard: React.FC<{ post: BlogPost; index: number; featured?: boolean }> = ({ post, index, featured = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F1C4D] to-[#5A3E85] hover:from-[#1a2a5c] hover:to-[#6b4a95] transition-all duration-500 cursor-pointer ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
        <img
          src={post.image || '/images/blog/placeholder.jpg'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 bg-[#B73239] text-white px-3 py-1 rounded-full text-xs font-medium">
            {t('blog.featured')}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-[#C9A227] text-[#1B1B1B] px-3 py-1 rounded-full text-xs font-medium">
          {t(`blog.categories.${post.category}`)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#F5F5F5]/60">
            {t('blog.published')} {formatDate(post.date)}
          </span>
          <span className="text-xs text-[#C9A227] font-medium">
            {post.readTime} {t('blog.readTime')}
          </span>
        </div>
        
        <h3 className={`font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#C9A227] transition-colors duration-300 ${
          featured ? 'text-xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>
        
        <p className={`text-[#F5F5F5]/80 mb-4 line-clamp-3 ${
          featured ? 'text-base' : 'text-sm'
        }`}>
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#B73239] rounded-full flex items-center justify-center text-white text-xs font-medium">
              {post.author.charAt(0)}
            </div>
            <span className="text-sm text-[#F5F5F5]/80">
              {t('blog.author')} {post.author}
            </span>
          </div>
          <span className="text-[#C9A227] text-sm font-medium group-hover:text-white transition-colors duration-300">
            {t('blog.readMore')} →
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#B73239]/20 text-[#B73239] text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-[#F5F5F5]/20 text-[#F5F5F5]/60 text-xs rounded-full">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Blog: React.FC<BlogProps> = ({ className = '', showFeatured = true, limit }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, '-100px');
  const { t } = useTranslation();

  const categories = [
    { key: 'all', label: t('blog.categories.all') },
    { key: 'technologie', label: t('blog.categories.technologie') },
    { key: 'formation', label: t('blog.categories.formation') },
    { key: 'vfx', label: t('blog.categories.vfx') },
    { key: 'industrie', label: t('blog.categories.industrie') },
    { key: 'equipement', label: t('blog.categories.equipement') },
    { key: 'equipe', label: t('blog.categories.equipe') },
  ];

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetch('/blog.json');
        const data = await response.json();
        const publishedPosts = data.filter((post: BlogPost) => post.published);
        setBlogPosts(publishedPosts);
        setFilteredPosts(publishedPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, []);

  useEffect(() => {
    let posts = blogPosts;
    
    if (selectedCategory !== 'all') {
      posts = blogPosts.filter(post => post.category === selectedCategory);
    }
    
    if (limit) {
      posts = posts.slice(0, limit);
    }
    
    setFilteredPosts(posts);
  }, [selectedCategory, blogPosts, limit]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
            {t('blog.subtitle')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light bg-gradient-to-r from-[#FAFAFA] to-[#F5F5F5] bg-clip-text text-transparent">
            {t('blog.title')}
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

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-[#0F1C4D]/30 rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-[#333] rounded-lg mb-4"></div>
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
              {/* Featured Posts */}
              {showFeatured && featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard post={post} index={index} featured={true} />
                </motion.div>
              ))}

              {/* Regular Posts */}
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard post={post} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#F5F5F5]/60 text-lg">
              {t('blog.noPosts')}
            </p>
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && !limit && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-[#B73239] hover:bg-[#a12a31] text-white rounded-full font-medium transition-colors duration-300">
              {t('blog.loadMore')}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
