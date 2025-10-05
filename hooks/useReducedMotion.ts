import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(media.matches);
    update();
    try {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    } catch {
      // Safari
      media.addListener(update);
      return () => media.removeListener(update);
    }
  }, []);
  return reduce;
}


