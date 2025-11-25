import React from 'react';

// Base styles and variant styles for reusable Button component

const baseClasses =
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-soft disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-brand-accent text-black hover:brightness-110 px-6 py-3',
  secondary: 'border border-gray-700 text-gray-100 hover:border-gray-500 px-6 py-3',
  ghost: 'text-gray-200 hover:bg-white/5 px-4 py-2 rounded-full',
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

