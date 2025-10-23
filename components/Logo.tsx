import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-8 text-xs',
    md: 'w-24 h-12 text-sm',
    lg: 'w-32 h-16 text-base',
    xl: 'w-40 h-20 text-lg'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        {/* SIM Card Shape with cut corner */}
        <div className="absolute inset-0 bg-[#FAFAFA] rounded-sm"
             style={{
               clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)'
             }}>
          {/* Inner dark background */}
          <div className="absolute inset-0.5 bg-black rounded-sm flex items-center justify-center"
               style={{
                 clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 0 100%)'
               }}>
            {/* GMCF Text - Blocky/Pixelated Style */}
            <div className="text-white font-black tracking-tight flex items-center justify-center">
              <span className="block font-mono" style={{ 
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                fontWeight: '900'
              }}>GMCF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;