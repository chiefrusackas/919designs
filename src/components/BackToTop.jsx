import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-4 z-[90] bg-primary text-on-primary shadow-2xl transition-all duration-300 
        flex items-center justify-center
        w-10 h-10 rounded-full
        hover:bg-primary/90 active:scale-95
        md:bottom-8 md:right-8 md:w-12 md:h-12
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      // On mobile: sit just above the bottom nav (nav ~68px tall + 8px gap)
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}
    >
      <span className="material-symbols-outlined text-base md:text-xl">arrow_upward</span>
    </button>
  );
}
