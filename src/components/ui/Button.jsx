import React from 'react';

// Base styles and variant styles for reusable Button component

const baseClasses =
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-accent text-hero hover:brightness-110 px-6 py-3',
  secondary: 'border border-border-subtle text-white hover:border-accent px-6 py-3',
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
