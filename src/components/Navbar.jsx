import React, { useEffect, useState } from 'react';

// Fixed navbar with dyanamic styling based on scroll position and smooth scrolling

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);

  // Check if we've scrolled past the hero section    
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setIsPastHero(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setIsPastHero(rect.bottom <= 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Choose (black/white) logo based on scroll position
  const logoSrc = isPastHero
    ? '/Manora_Logo_Black.svg'
    : '/Manora_Logo_White.svg';

  // Scroll behaviour: fixed with background and border when past hero, absolute otherwise
  const headerPositionClass = isPastHero
    ? 'fixed bg-page/10 backdrop-blur border-b border-border-soft'
    : 'absolute';

  // Smooth scroll to section
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`${headerPositionClass} top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-10 ${
        isPastHero ? 'text-ink' : 'text-white'
      }`}
    >
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt="Manora Logo"
          className="h-4 w-auto"
        />
      </div>
      <nav className="flex items-center gap-6 text-sm font-bold">
        <button
          type="button"
          onClick={() => handleScroll('features')}
          className="hover:text-accent transition-colors"
        >
          FEATURES
        </button>
        <button
          type="button"
          onClick={() => handleScroll('reviews')}
          className="hover:text-accent transition-colors"
        >
          REVIEWS
        </button>
      </nav>
    </header>
  );
}
