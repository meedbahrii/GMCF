import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  duration = 2000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsVisible(false);
        setTimeout(onComplete, 500);
      }
    };

    requestAnimationFrame(updateProgress);
    return () => setIsVisible(false);
  }, [duration, onComplete]);

  // Stagger animation for letters
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Center Content */}
      <div className="relative">
        {/* Animated circles */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* GMCF Logo */}
        <motion.div
          className="relative z-10 w-40 h-40 flex items-center justify-center"
          animate={{
            rotateZ: [-2, 2, -2],
            y: [-4, 4, -4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="/icons/favicons/favicon.svg" 
            alt="GMCF"
            className="w-24 h-24"
          />
        </motion.div>

        {/* Animated text */}
        <motion.div 
          className="mt-8 text-center"
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-center space-x-2">
            {['G', 'M', 'C', 'F'].map((letter, i) => (
              <motion.span
                key={letter}
                custom={i}
                variants={letterVariants}
                className="text-[#B73239] text-4xl font-bold"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div 
          className="mt-8 w-48 h-0.5 bg-gray-800 relative overflow-hidden rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-[#B73239]"
            initial={{ width: "0%" }}
            animate={{ width: progress + "%" }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="mt-4 text-[#B73239] text-sm tracking-widest"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          LOADING
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;