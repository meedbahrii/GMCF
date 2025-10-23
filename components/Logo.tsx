import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-24 h-12',
    lg: 'w-32 h-16',
    xl: 'w-40 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="/images/logo22.png"
        alt="GMCF Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;