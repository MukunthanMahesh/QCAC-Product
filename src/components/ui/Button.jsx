import React from 'react';

// base button styles
const baseClasses =
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  // primary on dark background
  primary: 'bg-accent text-hero hover:brightness-110 px-6 py-3',
  // secondary outline on dark background
  secondary: 'border border-border-subtle text-white hover:border-accent px-6 py-3',
  // secondary outline on light background
  secondaryLight:
    'border border-border-soft bg-white text-ink hover:border-accent-dark hover:bg-white px-6 py-3',
  // ghost button for subtle actions
  ghost: 'text-white/80 hover:bg-white/10 px-4 py-2 rounded-full',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const variantClasses = variants[variant] || variants.primary;
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
