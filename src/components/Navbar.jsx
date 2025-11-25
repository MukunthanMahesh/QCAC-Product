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

  // Smooth scroll to section
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Choose (black/white) logo based on scroll position
  const logoSrc = isPastHero
    ? '/Manora_Logo_Black.svg'
    : '/Manora_Logo_White.svg';

  return (
    <header
      className={`fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between z-10 transition-colors duration-300 ${
        isPastHero ? 'text-black' : 'text-white'
      }`}
    >
      <div className="flex items-center">
        <img
          src={logoSrc}
          alt="Manora Logo"
          className="h-8 w-auto"
        />
      </div>
      <nav className="flex items-center gap-6 text-sm">
        <button
          type="button"
          onClick={() => handleScroll('features')}
          className="hover:text-blue-600 transition-colors"
        >
          Features
        </button>
        <button
          type="button"
          onClick={() => handleScroll('reviews')}
          className="hover:text-blue-600 transition-colors"
        >
          Reviews
        </button>
      </nav>
    </header>
  );
}
