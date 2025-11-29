import React, { useState } from 'react';
import FeatureCard from './ui/FeatureCard.jsx';

const DESIGN_FEATURES = [
  {
    id: 'colors',
    label: 'Colors',
    text: 'Graphite, Glacier and Copper finishes that stay low‑glare and hide fingerprints beside the 16.3" 8K display.',
    image: '/images/Manora_FeaturesPerformance_Scene.webp',
    swatches: [
      {
        id: 'graphite',
        label: 'Graphite',
        image: '/images/Manora_Color_Graphite.webp',
        className: 'bg-[#1f2329]',
      },
      {
        id: 'glacier',
        label: 'Glacier',
        image: '/images/Manora_Color_Glacier.webp',
        className: 'bg-[#dfe9f4]',
      },
      {
        id: 'copper',
        label: 'Copper',
        image: '/images/Manora_Color_Copper.webp',
        className: 'bg-[#f27b3a]',
      },
    ],
  },
  {
    id: 'chassis',
    label: 'Chassis & cooling',
    text: 'CNC aluminum unibody wrapped around NovaLogic X1 and the vapor chamber for cool, even thermals under sustained load.',
    image: '/images/Manora_FeaturesPerformance_Scene.webp',  },
  {
    id: 'ports',
    label: 'Ports',
    text: 'Side‑mounted ports keep the 4.5L footprint clean: dual USB‑C, HDMI for 8K displays and an SD slot.',
    image: '/images/Manora_FeaturesPerformance_Scene.webp',  },
  {
    id: 'display',
    label: 'Screen',
    text: '16.3" 8K 240 Hz panel with slim bezels, factory calibration and a dedicated media engine for smooth motion.',
    image: '/images/Manora_FeaturesPerformance_Scene.webp',  },
  {
    id: 'input',
    label: 'Keyboard',
    text: 'Quiet low‑profile keyboard and a glass trackpad tuned for precise edits, gestures and long sessions.',
    image: '/images/Manora_FeaturesPerformance_Scene.webp',  },
  {
    id: 'battery_enclosure',
    label: 'Battery & enclosure',
    text: 'High‑density battery for up to 18 hours in an aluminum body that doubles as a passive heatsink.',
    image: '/images/Manora_FeaturesPerformance_Scene.webp',  },
];

export default function Features() {
  const initialId = DESIGN_FEATURES[0]?.id ?? 'colors';
  const [activeId, setActiveId] = useState(initialId);
  // Keep track of which feature image to animate out
  const [prevId, setPrevId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  // Track which color swatch is selected when Colors is active
  const [activeColorId, setActiveColorId] = useState(
    DESIGN_FEATURES[0]?.swatches?.[0]?.id ?? 'graphite',
  );

  const activeFeature =
    DESIGN_FEATURES.find((item) => item.id === activeId) ?? DESIGN_FEATURES[0];
  const prevFeature =
    prevId != null
      ? DESIGN_FEATURES.find((item) => item.id === prevId) ?? null
      : null;

  const handleSetActive = (id) => {
    // Ignore clicks on the already‑active card
    if (id === activeId) return;
    setPrevId(activeId);
    setActiveId(id);
    setIsAnimating(true);
    setTimeout(() => {
      setPrevId(null);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section
      id="features"
      className="px-6 py-20 bg-hero text-white min-h-screen flex items-center"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 md:flex-row md:items-center">

        {/* Left: feature list (below image on mobile) */}
        <div className="w-full md:w-2/5 space-y-10">
          <div>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Take a closer look.
            </h2>
          </div>

          <div className="flex flex-col items-start space-y-3">
            {DESIGN_FEATURES.map((item) => {
              const isActive = item.id === activeFeature.id;
              const isColors = item.id === 'colors';
              const swatches = isColors ? item.swatches ?? [] : [];

              return (
                <div key={item.id} className="w-full">
                  <FeatureCard
                    label={item.label}
                    text={item.text}
                    isActive={isActive}
                    onClick={() => handleSetActive(item.id)}
                  >
                    {isColors && swatches.length > 0 && (
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        {swatches.map((swatch) => {
                          const selected = swatch.id === activeColorId;
                          return (
                            <button
                              key={swatch.id}
                              type="button"
                              onClick={() => setActiveColorId(swatch.id)}
                              className={`flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors ${
                                selected
                                  ? 'border-accent bg-accent-soft text-ink'
                                  : 'border-white/20 bg-white/5 text-ink-softer hover:border-accent'
                              }`}
                            >
                              <span
                                className={`mr-2 h-4 w-4 rounded-full border border-white/40 ${swatch.className}`}
                              />
                              <span>{swatch.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </FeatureCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: activeFeature carousel */}
        <div className="w-full md:w-3/5 flex items-center justify-center">
          <div className="relative h-72 w-full max-w-xl overflow-hidden sm:h-80 md:h-[360px]">
            {prevFeature && isAnimating && (
              <img
                key={prevFeature.id}
                src={prevFeature.image}
                alt={prevFeature.label}
                className="absolute inset-0 h-full w-full object-contain animate-slide-out-left"
              />
            )}
            {activeFeature && (
              <img
                key={
                  activeFeature.id === 'colors'
                    ? `${activeFeature.id}-${activeColorId}`
                    : activeFeature.id
                }
                src={
                  activeFeature.id === 'colors' &&
                  activeFeature.swatches &&
                  activeFeature.swatches.length > 0
                    ? (
                        activeFeature.swatches.find(
                          (s) => s.id === activeColorId,
                        ) ?? activeFeature.swatches[0]
                      ).image
                    : activeFeature.image
                }
                alt={activeFeature.label}
                className={`absolute inset-0 h-full w-full object-contain ${
                  isAnimating && prevFeature
                    ? 'animate-slide-in-right'
                    : 'opacity-100'
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
