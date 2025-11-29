import React, { useState } from 'react';
import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import RatingStars from './RatingStars.jsx';

// format iso date into "november 2nd, 2025"
function formatReviewDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinal = (d) => {
    if (d > 3 && d < 21) return 'th';
    const lastDigit = d % 10;
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
  };

  return `${month} ${day}${getOrdinal(day)}, ${year}`;
}

// presentational card for a single review
// onImageClick opens zoomed image in parent
export default function ReviewCard({ review, onImageClick }) {
  if (!review) return null;

  // local toggle for read more
  const [isExpanded, setIsExpanded] = useState(false);

  // normalise single image or images[]
  const images = Array.isArray(review.images)
    ? review.images
    : review.imageDataUrl
      ? [review.imageDataUrl]
      : [];

  const body = review.body || '';
  const maxPreviewLength = 220;
  const shouldClamp = body.length > maxPreviewLength;
  const visibleBody = !shouldClamp || isExpanded
    ? body
    : `${body.slice(0, maxPreviewLength).trimEnd()}…`;

  return (
    <article className="rounded-xl border border-border-soft bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">
            {review.title}
          </h3>
          <p className="text-xs text-ink-softer mt-0.5">
            {review.name}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.18em] uppercase text-ink-softer">
              Rating
            </span>
            <RatingStars value={review.rating} />
          </div>
          {(review.date || review.createdAt) && (
            <p className="text-[10px] text-ink-softer">
              {formatReviewDate(review.date || review.createdAt)}
            </p>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        {visibleBody}
      </p>
      {shouldClamp && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-1 text-xs font-medium text-accent-dark hover:underline"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {images.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() =>
                onImageClick && onImageClick(src, `Review from ${review.name}`)
              }
              className="relative h-20 w-24 overflow-hidden rounded-lg border border-border-soft bg-black/5 group focus:outline-none"
            >
              <img
                src={src}
                alt={`Review from ${review.name}`}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 cursor-zoom-in"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-150 group-hover:opacity-100 rounded-lg">
                <HiMagnifyingGlassPlus className="h-5 w-5 text-white" />
              </div>
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
