import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  duration = 2000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#1B1B1B] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-sm px-8">
        {/* GMCF wordmark with staggered rise */}
        <div className="text-center mb-6 select-none">
          <div className="font-gmc text-[40px] xs:text-[44px] sm:text-[48px] leading-none font-extrabold tracking-wider">
            <span className="loading-stagger text-[#FAFAFA]"><span>G</span><span>M</span><span>C</span><span>F</span></span>
          </div>
        </div>

        {/* Progress bar sweep */}
        <div className="loading-bar bg-white/10">
          {/* animated track is via ::before in CSS */}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;