import React, { useEffect, useState } from 'react';
import { HiShoppingCart, HiArrowDown } from 'react-icons/hi2';
import Button from './ui/Button.jsx';
import Modal from './ui/Modal.jsx';

// Hero Component with staged intro animations

export default function Hero({ onIntroComplete }) {
  const [stage, setStage] = useState(0);
  const [showPreorderModal, setShowPreorderModal] = useState(false);

  // Handle staged animations on mount
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 150), // headline
      setTimeout(() => setStage(2), 450), // body + video
      setTimeout(() => setStage(3), 850), // CTA
      setTimeout(() => {
        setStage(4);
        if (onIntroComplete) onIntroComplete();
      }, 1300),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      id="hero"
      className="px-6 pt-24 pb-0 bg-hero text-white min-h-screen flex items-stretch"
    >
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-stretch gap-10 flex-1">
        <div className="w-full md:w-2/5 text-center md:text-left flex flex-col justify-center">
          <p
            className={`text-sm uppercase tracking-[1em] text-ink-softer mb-4 transition-all duration-500 ease-out transform ${
              stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Nova Series
          </p>
          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-4 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2 sm:gap-3 transition-all duration-500 ease-out transform ${
              stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <img
              src="/brand/Manora_Logo_White.svg"
              alt="Manora"
              className="h-7 sm:h-9 w-auto pr-1"
            />
            <span>Nova&nbsp;X1</span>
          </h1>
          <p
            className={`text-lg text-ink-soft mb-6 transition-all duration-500 ease-out transform ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Manora Nova X1 ignites next-level computing with agile performance, all-day mobility, and a refined design built to drive your ideas, projects, and entertainment the instant they emerge.
          </p>
          <ul
            className={`hidden md:block text-sm text-ink-softer space-y-1 mb-8 transition-all duration-500 ease-out transform ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <li>• Pixel‑perfect 8K photon‑emissive display</li>
            <li>• Fanless quantum‑phase cooling at full boost</li>
            <li>• On‑device AI studio for render, grade, and mix</li>
          </ul>
          <div
            className={`flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start transition-all duration-500 ease-out transform ${
              stage >= 3
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
          >
            <Button
              type="button"
              onClick={() => setShowPreorderModal(true)}
            >
              <span className="flex items-center gap-2">
                <HiShoppingCart className="h-4 w-4" />
                <span>Pre‑order Nova X1</span>
              </span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const el = document.getElementById('features-performance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="flex items-center gap-2">
                <span>Explore the features</span>
                <HiArrowDown className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>

        <div className="w-full md:w-3/5 flex items-end justify-center md:justify-end">
          <div
            className={`relative w-full h-[55vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden transition-all duration-700 ease-out transform ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            <video
              className="h-full w-full object-cover object-bottom"
              src="/media/Manora_Hero_Scene.webm"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>

      {/* Pre-order Modal */}
      <Modal
        isOpen={showPreorderModal}
        onClose={() => setShowPreorderModal(false)}
        title="Thanks for your enthusiasm!"
        titleId="preorder-dialog-title"
        descriptionId="preorder-dialog-description"
      >
        <p className="text-sm text-ink-soft mb-4">
          We&apos;re glad you&apos;re excited, but this product page
          is fictional for demo purposes only :&#40;
        </p>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondaryLight"
            className="text-xs px-4 py-2"
            onClick={() => setShowPreorderModal(false)}
          >
            Aww man
          </Button>
        </div>
      </Modal>
    </section>
  );
}
