import React, { useEffect, useState } from 'react';

export default function FeatureCard({
  // Represents a single feature card with expandable text
  label,
  text,
  isActive,
  onClick,
  children,
}) {
  // Track a simple three‑phase state so we can
  // animate height first, then fade text in.
  const [phase, setPhase] = useState(isActive ? 'expanded' : 'collapsed');

  useEffect(() => {
    if (isActive) {
      setPhase('expanding');
      const timer = setTimeout(() => setPhase('expanded'), 500);
      return () => clearTimeout(timer);
    }
    setPhase('collapsed');
    return undefined;
  }, [isActive]);

  const isCollapsed = phase === 'collapsed';
  const isExpanding = phase === 'expanding';
  const isExpanded = phase === 'expanded';

  // Core shape + transition behaviour
  const baseClasses =
    'w-full rounded-2xl border text-left text-sm overflow-hidden transition-[height,padding,border-color,background-color] duration-300';
  const stateClasses = isExpanding || isExpanded
    ? 'border-accent bg-accent/12 backdrop-blur-sm px-4 py-3'
    : 'border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2';

  // Collapsed vs expanded card height; tuned so one line fits when collapsed and content (+ children for colors) when open.
  const collapsedHeight = 40;
  const expandedHeight = 164;
  const height = isExpanding || isExpanded ? expandedHeight : collapsedHeight;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${stateClasses}`}
      style={{ height }}
    >
      <div className="flex items-center gap-3">
        {isCollapsed && (
          <>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent-soft text-xl text-white">
              +
            </span>
            <span className="text-xs font-medium text-white sm:text-sm">
              {label}
            </span>
          </>
        )}

        {(isExpanding || isExpanded) && (
          <div
            className={`flex flex-col gap-2 text-xs text-ink-softer sm:text-sm transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p>
              <span className="font-semibold text-white">{label}.</span>{' '}
              {text && <span>{text}</span>}
            </p>
            {/*  Extra content */}
            {children}
          </div>
        )}
      </div>
    </button>
  );
}
