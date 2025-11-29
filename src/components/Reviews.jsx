import React, { useEffect, useState } from 'react';
import Button from './ui/Button.jsx';
import ReviewCard from './ui/ReviewCard.jsx';
import ReviewForm from './ui/ReviewForm.jsx';

// static sample reviews
const SAMPLE_REVIEWS = [
  {
    id: 'sample-1',
    name: 'Aiden K.',
    rating: 5,
    title: 'Desktop‑level power in my backpack',
    body: 'I replaced a full ATX tower with Nova X1 and have not missed it once. Renders, games, and ML workloads all feel instant.',
    createdAt: '2025-01-15T10:00:00.000Z',
  },
  {
    id: 'sample-2',
    name: 'Mia L.',
    rating: 4,
    title: 'Stays quiet under real work',
    body: 'The thermals are the real story. I can edit 8K footage for hours and the fans barely spin up.',
    createdAt: '2025-01-03T14:30:00.000Z',
  },
  {
    id: 'sample-3',
    name: 'Jordan P.',
    rating: 5,
    title: 'My new daily driver',
    body: 'Battery life, screen, and keyboard are all dialed in. It already replaced my work and personal machines.',
    createdAt: '2024-12-20T09:15:00.000Z',
  },
];

const STORAGE_KEY = 'nova-x1-user-reviews';

export default function Reviews() {
  // user reviews stored in localStorage
  const [userReviews, setUserReviews] = useState([]);
  // sort mode for combined sample + user reviews
  const [sortMode, setSortMode] = useState('newest');
  // image currently shown in lightbox
  const [lightboxImage, setLightboxImage] = useState(null);

  // load saved user reviews on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setUserReviews(parsed);
      }
    } catch {
      // If parsing fails, ignore and start fresh
    }
  }, []);

  // persist user reviews to localStorage when they change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userReviews));
    } catch {
      // If localStorage is unavailable or quota exceeded, fail silently
    }
  }, [userReviews]);

  // build persisted review object from form payload
  const handleAddReview = ({ name, title, rating, body, images = [], imageDataUrl }) => {
    const createdAt = new Date().toISOString();

    // normalise images array or single image
    const normalisedImages = Array.isArray(images)
      ? images
      : imageDataUrl
        ? [imageDataUrl]
        : [];

    const nextReview = {
      id: `user-${Date.now()}`,
      name,
      rating: Number(rating) || 5,
      title: title || 'Review',
      body,
      createdAt,
      images: normalisedImages,
    };

    setUserReviews((prev) => [...prev, nextReview]);
  };

  // clear all user reviews from state and localStorage
  const handleClearReviews = () => {
    setUserReviews([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore errors
    }
  };

  // copy user reviews json to clipboard or console
  const handleCopyJson = async () => {
    const payload = JSON.stringify(userReviews, null, 2);
    if (!payload || payload === '[]') return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(payload);
      } else {
        // eslint-disable-next-line no-console
        console.log(payload);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log(payload);
    }
  };

  // open and close image lightbox
  const handleOpenImage = (src, alt) => {
    if (!src) return;
    setLightboxImage({ src, alt: alt || 'Review image' });
  };

  const handleCloseImage = () => {
    setLightboxImage(null);
  };

  // combine sample and user reviews
  const allReviews = [...SAMPLE_REVIEWS, ...userReviews];

  // sort reviews by newest or oldest
  const sortedReviews = [...allReviews].sort((a, b) => {
    const aDate = new Date(a.createdAt || a.date || '1970-01-01');
    const bDate = new Date(b.createdAt || b.date || '1970-01-01');

    if (sortMode === 'oldest') {
      return aDate - bDate;
    }

    // Default: newest first
    return bDate - aDate;
  });

  return (
    <section
      id="reviews"
      className="px-6 py-20 bg-page text-ink min-h-screen flex items-center"
    >
      <div className="mx-auto max-w-6xl w-full flex flex-col gap-10">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-softer">
            Reviews
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-ink">
            Trusted by people who push their machines.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-soft">
            Read what early Nova X1 owners are saying, then share how it holds up in your own workflow. Reviews are stored locally in your browser&mdash;no accounts, no cloud, just your machine.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr] items-start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink-softer">
                Showing {sortedReviews.length} review{sortedReviews.length === 1 ? '' : 's'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.16em] text-ink-softer">
                  Sort
                </span>
                <Button
                  type="button"
                  variant={sortMode === 'newest' ? 'primary' : 'secondaryLight'}
                  className="px-3 py-1 text-xs"
                  onClick={() => setSortMode('newest')}
                >
                  Newest
                </Button>
                <Button
                  type="button"
                  variant={sortMode === 'oldest' ? 'primary' : 'secondaryLight'}
                  className="px-3 py-1 text-xs"
                  onClick={() => setSortMode('oldest')}
                >
                  Oldest
                </Button>
              </div>
            </div>

            {sortedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onImageClick={handleOpenImage}
              />
            ))}
            {sortedReviews.length === 0 && (
              <p className="text-sm text-ink-softer">
                No reviews yet. Be the first to share how Nova X1 fits into your day.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border-soft bg-white/80 p-4 shadow-sm backdrop-blur">
            <h3 className="text-sm font-semibold text-ink mb-2">
              Add your review
            </h3>
            <ReviewForm onSubmit={handleAddReview} onImageClick={handleOpenImage} />
            <p className="mt-2 text-[11px] leading-snug text-ink-softer">
              Your review is saved privately in this browser using localStorage. Clearing site data will remove it.
            </p>
            {userReviews.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-[11px] text-ink-softer">
                  Manage your local reviews
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondaryLight"
                    className="px-3 py-1 text-[11px]"
                    onClick={handleCopyJson}
                  >
                    Copy JSON
                  </Button>
                  <Button
                    type="button"
                    variant="secondaryLight"
                    className="px-3 py-1 text-[11px]"
                    onClick={handleClearReviews}
                  >
                    Clear local reviews
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* full screen image lightbox, click to close */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70"
            onClick={handleCloseImage}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-3xl w-[90%] max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}
