import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = "GMCF - Création Audiovisuelle & Formation | Production Virtuelle LED Wall",
  description = "GMCF révolutionne le paysage audiovisuel marocain avec des technologies de pointe : LED Wall pour production virtuelle, post-production VFX, et formation PIXELLAB. Hub africain d'excellence.",
  keywords = "audiovisuel maroc, production virtuelle, LED Wall, VFX, post-production, formation PIXELLAB, cinéma marocain, technologies audiovisuelles, GMCF",
  image = "https://gmcf.ma/images/og-image.jpg",
  url = "https://gmcf.ma",
  type = "website",
  author = "GMCF - Groupe Marocain de Création Audiovisuelle",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Update Open Graph tags
    updateMetaTag('', type, 'og:type');
    updateMetaTag('', url, 'og:url');
    updateMetaTag('', title, 'og:title');
    updateMetaTag('', description, 'og:description');
    updateMetaTag('', image, 'og:image');
    updateMetaTag('', 'GMCF', 'og:site_name');
    updateMetaTag('', 'fr_FR', 'og:locale');

    // Update Twitter Card tags
    updateMetaTag('', 'summary_large_image', 'twitter:card');
    updateMetaTag('', url, 'twitter:url');
    updateMetaTag('', title, 'twitter:title');
    updateMetaTag('', description, 'twitter:description');
    updateMetaTag('', image, 'twitter:image');

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add additional meta tags for articles
    if (type === 'article') {
      if (publishedTime) updateMetaTag('', publishedTime, 'article:published_time');
      if (modifiedTime) updateMetaTag('', modifiedTime, 'article:modified_time');
      if (author) updateMetaTag('', author, 'article:author');
      if (section) updateMetaTag('', section, 'article:section');
      tags.forEach(tag => {
        updateMetaTag('', tag, 'article:tag');
      });
    }

    // Update structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? 'Article' : 'WebPage',
      "headline": title,
      "description": description,
      "url": url,
      "author": {
        "@type": "Organization",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "GMCF",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gmcf.ma/images/logo.png"
        }
      },
      ...(type === 'article' && publishedTime && {
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime
      }),
      ...(image && {
        "image": {
          "@type": "ImageObject",
          "url": image
        }
      })
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

  return null;
};

export default SEO;
