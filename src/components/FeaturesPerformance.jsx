import React, { useEffect, useRef, useState } from 'react';
import { HiCpuChip, HiServerStack, HiComputerDesktop, HiBattery50 } from 'react-icons/hi2';

// The Features (Performance) section of the webpage.
export default function FeaturesPerformance() {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer to trigger staged animations when the section enters the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || stage > 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            const timers = [
              setTimeout(() => setStage(1), 100), // Manora Laptop Image (Front-Angle)
              setTimeout(() => setStage(2), 250), // Headllin 'n body text
              setTimeout(() => setStage(3), 500), // Specs list
            ];

            return () => {
              timers.forEach(clearTimeout);
            };
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -15% 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [stage]);

  return (
    <section
      id="features-performance"
      ref={sectionRef}
      className="px-6 py-20 bg-page text-ink min-h-screen flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
          <div className="w-full md:w-1/2">
            <div
              className={`relative h-64 sm:h-80 md:h-[360px] overflow-visible transition-all duration-700 ease-out transform ${
                stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <img
                src="/images/Manora_FeaturesPerformance_Scene.webp"
                alt="Nova X1 performance"
                className="absolute inset-y-0 right-0 h-full w-full object-contain md:translate-x-[-10%]"
              />
            </div>
          </div>

          <div
            className={`w-full md:w-1/2 flex flex-col justify-center space-y-4 text-center md:text-left transition-all duration-500 ease-out transform ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-accent-dark">
              Nova X1 is a supercomputer made mini.
            </h2>
            <p className="text-ink-soft text-base sm:text-lg max-w-xl">
              Absurd compute headroom, high-speed storage, and whisper-quiet cooling, all in 4.5L.
            </p>
            <p className="text-ink-softer text-sm max-w-xl">
              Comfortably render a 10,000-frame Blender animation, keep a maxed out Cyberpunk 2077 session smooth, and still have room left over to train your next ML model. Trust us, the numbers are wild.
            </p>
            <ul
              className={`mt-3 space-y-2 text-sm text-ink-soft transition-all duration-500 ease-out transform ${
                stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <li className="flex items-start gap-2">
                <HiCpuChip className="mt-[2px] h-4 w-4 text-ink-soft" />
                <span>12‑core NovaLogic X1 SoC, 32‑core ray‑trace GPU</span>
              </li>
              <li className="flex items-start gap-2">
                <HiServerStack className="mt-[2px] h-4 w-4 text-ink-soft" />
                <span>Up to 128&nbsp;GB unified LPDDR6X & 1–8&nbsp;TB PCIe&nbsp;5.0 SSD</span>
              </li>
              <li className="flex items-start gap-2">
                <HiComputerDesktop className="mt-[2px] h-4 w-4 text-ink-soft" />
                <span>16.3&quot; 8K 240&nbsp;Hz display w/ dedicated media engine</span>
              </li>
              <li className="flex items-start gap-2">
                <HiBattery50 className="mt-[2px] h-4 w-4 text-ink-soft" />
                <span>Up to 18&nbsp;hours battery, fast charge, Wi‑Fi&nbsp;7</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-10 border-t border-border-soft/60 md:pt-6 transition-all duration-500 ease-out transform ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="grid gap-4 text-center text-sm text-ink-softer sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">Sustained real-world speed</p>
              <p className="mt-1 text-2xl font-semibold text-accent-dark">
                4.9<span className="align-top text-xs">GHz</span>
              </p>
              <p className="mt-1 text-xs">on performance cores across workloads</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">All-day battery</p>
              <p className="mt-1 text-2xl font-semibold text-accent-dark">
                18<span className="align-top text-xs">hrs</span>
              </p>
              <p className="mt-1 text-xs">mixed use from coast to coast</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">SSD throughput</p>
              <p className="mt-1 text-2xl font-semibold text-accent-dark">
                13,000<span className="align-top text-xs">MB/s</span>
              </p>
              <p className="mt-1 text-xs">sequential reads on PCIe&nbsp;5.0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
