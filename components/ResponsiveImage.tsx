import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  widths?: number[]; // e.g., [320, 640, 960, 1280]
  sizes?: string;    // e.g., "(max-width: 640px) 100vw, 50vw"
  className?: string;
  priority?: boolean; // above-the-fold
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  widths = [320, 640, 960, 1280],
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = '',
  priority = false,
}) => {
  // Build srcset by reusing the same file at different descriptors when variants aren't provided
  // If you have file variants, adjust to match your naming scheme
  const srcSet = widths.map((w) => `${src} ${w}w`).join(', ');
  const loading = priority ? 'eager' : 'lazy';
  const fetchpriority = priority ? 'high' : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading as any}
      decoding="async"
      {...(fetchpriority ? { fetchpriority } : {})}
    />
  );
};

export default ResponsiveImage;


