import React, { useEffect, useRef, useState } from 'react';

// Fixed navbar with dyanamic styling based on scroll position and smooth scrolling

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [introDone, setIntroDone] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const sectionMetaRef = useRef([]);

  // Check if we've scrolled past the hero section + pick navbar theme
  useEffect(() => {
    const sections = [
      { id: 'hero', theme: 'dark' },
      { id: 'features-performance', theme: 'light' },
      { id: 'features-design', theme: 'dark' },
      { id: 'reviews', theme: 'light' },
    ];

    const computeOffsets = () => {
      const meta = sections
        .map((section) => {
          const el = document.getElementById(section.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          return { ...section, top };
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);

      sectionMetaRef.current = meta;
    };

    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setIsPastHero(false);
      } else {
        const rect = hero.getBoundingClientRect();
        setIsPastHero(rect.bottom <= 0);
      }

      // Ensure we have section offsets computed
      if (!sectionMetaRef.current || sectionMetaRef.current.length === 0) {
        computeOffsets();
      }

      // Use scroll position plus + offset so that the section whose top we've scrolled past controls the theme
      const referenceY = window.scrollY + 40;

      let activeTheme = null;

      for (const section of sectionMetaRef.current) {
        if (referenceY >= section.top) {
          activeTheme = section.theme;
        } else {
          break;
        }
      }

      if (activeTheme) {
        setTheme((prev) => (prev === activeTheme ? prev : activeTheme));
      }
    };

    computeOffsets();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', computeOffsets);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', computeOffsets);
    };
  }, []);

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
