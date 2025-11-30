import React, { useEffect, useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi2';

// Floating pre-order button that fades out and hides when hero section is in view.
// Click dispatches 'preorder:open' event to open pre-order modal.
// Positioned bottom-right, expands on hover/focus for accessibility.

export default function PreorderFab() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = document.getElementById('hero');

      if (!hero) {
        setIsVisible(true);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const heroInView = rect.top < viewportHeight && rect.bottom > 0;

      setIsVisible(!heroInView);
    };

    // Initial check and event listeners for scroll/resize
    updateVisibility();
    window.addEventListener('scroll', updateVisibility);
    window.addEventListener('resize', updateVisibility);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  // Handle button click to dispatch preorder event
  const handleClick = () => {
    const hero = document.getElementById('hero');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('preorder:open'));
    }
  };

  return (
    <button
      type="button"
      aria-label="Pre-order Nova X1"
      onClick={handleClick}
      className={`group fixed bottom-4 right-4 z-40 flex items-center justify-center rounded-full bg-accent text-hero shadow-lg h-11 w-11 p-3 text-xs font-medium transition-all duration-300 hover:w-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <HiShoppingCart className="h-5 w-5" />
      <span
        className="ml-0 max-w-0 overflow-hidden opacity-0 whitespace-nowrap transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-[200px] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[200px] group-focus-visible:opacity-100"
      >
        Pre-order Nova X1
      </span>
    </button>
  );
}
