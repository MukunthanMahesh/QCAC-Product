import React from 'react';

// static 1–5 star rating display
export default function RatingStars({ value }) {
  const ratingValue = Number.isFinite(Number(value)) ? Number(value) : 0;

  return (
    <div
      className="inline-flex items-center gap-0.5"
      aria-label={`Rated ${ratingValue} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= ratingValue ? 'text-accent-dark' : 'text-border-soft'}
        >
          ★
        </span>
      ))}
    </div>
  );
}
