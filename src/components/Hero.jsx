import React from 'react';
import { HiShoppingCart, HiArrowDown } from 'react-icons/hi2';
import Button from './ui/Button.jsx';

export default function Hero() {
  return (
    <section
      id="hero"
      className="px-6 pt-24 pb-0 bg-hero text-white min-h-screen flex items-stretch"
    >
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-stretch gap-10 flex-1">
        <div className="w-full md:w-2/5 text-center md:text-left flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[1em] text-ink-softer mb-4">
            Nova Series
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-4 flex items-center gap-3">
            <img
              src="/brand/Manora_Logo_White.svg"
              alt="Manora"
              className="h-9 w-auto pr-1"
            />
            <span>Nova&nbsp;X1</span>
          </h1>
          <p className="text-lg text-ink-soft mb-6">
            Manora Nova X1 ignites next-level computing with agile performance, all-day mobility, and a refined design built to drive your ideas, projects, and entertainment the instant they emerge.
          </p>
          <ul className="hidden md:block text-sm text-ink-softer space-y-1 mb-8">
            <li>• Pixel‑perfect 8K photon‑emissive display</li>
            <li>• Fanless quantum‑phase cooling at full boost</li>
            <li>• On‑device AI studio for render, grade, and mix</li>
          </ul>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Button>
              <span className="flex items-center gap-2">
                <HiShoppingCart className="h-4 w-4" />
                <span>Pre‑order Nova X1</span>
              </span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const el = document.getElementById('features');
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
          <div className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
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
    </section>
  );
}
