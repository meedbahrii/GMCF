import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  lines = 1, 
  height = 'h-4',
  width = 'w-full'
}) => {
  if (lines === 1) {
    return (
      <div className={`animate-pulse bg-[#B73239]/10 rounded ${height} ${width} ${className}`} />
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-[#B73239]/10 rounded ${height} ${
            index === lines - 1 ? 'w-3/4' : width
          }`}
        />
      ))}
    </div>
  );
};

export default Skeleton;
