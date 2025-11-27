import React from 'react';
import {
  HiCpuChip,
  HiServerStack,
  HiComputerDesktop,
  HiBattery50,
} from 'react-icons/hi2';

export default function FeaturesPerformance() {
  return (
    <section
      id="features-performance"
      className="px-6 py-20 bg-page text-ink min-h-screen flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
          <div className="w-full md:w-1/2">
            <div className="relative h-64 sm:h-80 md:h-[360px] rounded-3xl border border-border-soft/60 bg-gradient-to-br from-accent/20 via-surface/40 to-bg/80 overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.15),_transparent_55%)]" />
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="rounded-2xl border border-border-soft/50 bg-page/40 px-6 py-4 text-xs uppercase tracking-[0.25em] text-ink-softer">
                  Nova&nbsp;X1 internal layout (concept)
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold text-accent-dark">
              The numbers behind Nova&nbsp;X1.
            </h2>
            <p className="text-ink-soft text-base sm:text-lg max-w-xl">
              Nova X1 is a fictionally over‑spec&apos;d notebook, but every
              detail is grounded in numbers you&apos;d actually expect on a
              flagship machine—processor, graphics, memory, storage, battery,
              and wireless all tuned to work as a single system.
            </p>
            <p className="text-ink-softer text-sm max-w-xl">
              This is where the emotional promise of the hero section turns into
              hard specs: how many cores, how many watts, how many hours, and
              how quickly your work actually moves from idea to screen.
            </p>
          </div>
        </div>

        <div className="-mx-6 mt-auto">
          <div className="px-6 overflow-x-auto">
            <div className="flex gap-4 sm:gap-6 pb-2 snap-x snap-mandatory">
              <article className="min-w-[260px] sm:min-w-[280px] md:min-w-[320px] snap-start">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-accent-dark">
                    <HiCpuChip className="h-[50px] w-[50px]" />
                  </div>
                  <div className="mx-auto max-w-xs space-y-2">
                    <h3 className="text-sm font-semibold text-accent-dark">
                      Processor &amp; graphics
                    </h3>
                    <p className="text-xs text-ink-softer leading-relaxed">
                      12‑core NovaLogic X1 SoC (8P up to 4.9&nbsp;GHz, 4E up to 2.3&nbsp;GHz)
                      with a 32‑core ray‑trace GPU pushing up to 18&nbsp;TFLOPS FP32.
                    </p>
                  </div>
                </div>
              </article>

              <article className="min-w-[260px] sm:min-w-[280px] md:min-w-[320px] snap-start">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-accent-dark">
                    <HiServerStack className="h-[50px] w-[50px]" />
                  </div>
                  <div className="mx-auto max-w-xs space-y-2">
                    <h3 className="text-sm font-semibold text-accent-dark">
                      Memory &amp; storage
                    </h3>
                    <p className="text-xs text-ink-softer leading-relaxed">
                      Up to 64&nbsp;GB unified LPDDR6X at 8,400&nbsp;MT/s and PCIe&nbsp;5.0 SSDs
                      from 1–8&nbsp;TB delivering up to 13,000&nbsp;MB/s sequential reads.
                    </p>
                  </div>
                </div>
              </article>

              <article className="min-w-[260px] sm:min-w-[280px] md:min-w-[320px] snap-start">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-accent-dark">
                    <HiComputerDesktop className="h-[50px] w-[50px]" />
                  </div>
                  <div className="mx-auto max-w-xs space-y-2">
                    <h3 className="text-sm font-semibold text-accent-dark">
                      Display &amp; media engine
                    </h3>
                    <p className="text-xs text-ink-softer leading-relaxed">
                      16.3&quot; 8K panel (7680&nbsp;×&nbsp;4320) at 240&nbsp;Hz, 1,600&nbsp;nits
                      peak HDR and 100% DCI‑P3, driven by a dedicated 16‑bit media engine.
                    </p>
                  </div>
                </div>
              </article>

              <article className="min-w-[260px] sm:min-w-[280px] md:min-w-[320px] snap-start">
                <div className="space-y-3 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-accent-dark">
                    <HiBattery50 className="h-[50px] w-[50px]" />
                  </div>
                  <div className="mx-auto max-w-xs space-y-2">
                    <h3 className="text-sm font-semibold text-accent-dark">
                      Battery, thermals &amp; wireless
                    </h3>
                    <p className="text-xs text-ink-softer leading-relaxed">
                      102&nbsp;Wh pack for up to 18&nbsp;hours mixed use, 0–50% charge in
                      30&nbsp;minutes, fanless vapor‑mesh cooling, and Wi‑Fi&nbsp;7 with
                      sub‑2&nbsp;ms peripheral latency.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
