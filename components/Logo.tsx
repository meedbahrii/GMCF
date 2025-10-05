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
        {/* Logo Container with angled corner */}
        <div className="absolute inset-0 bg-[#0F1C4D] rounded-tr-lg rounded-br-lg rounded-bl-lg"
             style={{
               clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
             }}>
          {/* White outline */}
          <div className="absolute inset-0 bg-[#FAFAFA] rounded-tr-lg rounded-br-lg rounded-bl-lg"
               style={{
                 clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                 padding: '2px'
               }}>
            <div className="w-full h-full bg-[#0F1C4D] rounded-tr-lg rounded-br-lg rounded-bl-lg flex items-center justify-center"
                 style={{
                   clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                 }}>
              {/* GMCF Text */}
              <div className="text-[#FAFAFA] font-black tracking-wider flex items-center justify-center">
                <span className="block">GMCF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;