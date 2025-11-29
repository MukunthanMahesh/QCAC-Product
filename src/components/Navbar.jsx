import React, { useEffect, useState } from 'react';

// Fixed navbar with dyanamic styling based on scroll position and smooth scrolling

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [introDone, setIntroDone] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Check if we've scrolled past the hero section    
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setIsPastHero(false);
      } else {
        const rect = hero.getBoundingClientRect();
        setIsPastHero(rect.bottom <= 0);
      }

      // Determine section under the navbar to pick theme
      const sections = [
        { id: 'hero', theme: 'dark' },
        { id: 'features-performance', theme: 'light' },
        { id: 'features', theme: 'dark' },
        { id: 'reviews', theme: 'light' },
      ];

      const probeY = 80; // roughly navbar height from top
      let nextTheme = theme;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          nextTheme = section.theme;
          break;
        }
      }

      if (nextTheme !== theme) {
        setTheme(nextTheme);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  // Mark intro as done shortly after mount (used to animate navbar only once)
  useEffect(() => {
    setHasMounted(true);
    const t = setTimeout(() => setIntroDone(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Choose (black/white) logo based on scroll position
  const isDark = theme === 'dark';
  const logoSrc = isDark
    ? '/brand/Manora_Logo_White.svg'
    : '/brand/Manora_Logo_Black.svg';

  // Fix scroll behaviour with background and border when past hero, absolute otherwise
  const headerPositionClass = isPastHero
    ? isDark
      ? 'fixed bg-black/40 backdrop-blur'
      : 'fixed bg-page/80 backdrop-blur border-b border-border-soft'
    : 'absolute';

  // Scroll to top when clicking the logo
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to section
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Change nav link hover styles based on navbar position (darker on light bg, lighter on dark bg)
  const navHoverAccent = isDark ? 'hover:text-accent' : 'hover:text-accent-dark';

  // Classes for intro animation and styling
  const baseClasses = `${headerPositionClass} top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-10`;
  const colorClasses = isDark ? 'text-white' : 'text-ink';
  const transitionClasses = introDone
    ? ''
    : 'transition-all duration-500 ease-out transform';
  const visibilityClasses = introDone
    ? ''
    : hasMounted
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 -translate-y-3';

  return (
    <header
      className={`${baseClasses} ${colorClasses} ${transitionClasses} ${visibilityClasses}`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={handleScrollToTop}
      >
        <img
          src={logoSrc}
          alt="Manora Logo"
          className="h-4 w-auto"
        />
      </div>
      <nav className="flex items-center gap-6 text-sm font-bold">
        <button
          type="button"
          onClick={() => handleScroll('features-performance')}
          className={`${navHoverAccent} transition-colors`}
        >
          FEATURES
        </button>
        <button
          type="button"
          onClick={() => handleScroll('reviews')}
          className={`${navHoverAccent} transition-colors`}
        >
          REVIEWS
        </button>
      </nav>
    </header>
  );
}
