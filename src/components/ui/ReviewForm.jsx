import React, { useRef, useState } from 'react';
import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import Button from './Button.jsx';

// controlled form for creating a new review
// onSubmit passes cleaned payload up
// onImageClick opens shared lightbox in parent
// maxBodyLength limits description characters
export default function ReviewForm({ onSubmit, onImageClick, maxBodyLength }) {
  // local form fields
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  // multiple images as data urls
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // read selected image files into data urls
  const handleImageChange = (event) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Allow selecting the same file again later
    if (fileInputRef.current) {
      // eslint-disable-next-line no-param-reassign
      fileInputRef.current.value = '';
    }
  };

  // trigger hidden file input
  const handleChooseImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // validate and submit payload
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    // title and description required
    if (!trimmedTitle || !trimmedBody) return;

    if (onSubmit) {
      onSubmit({
        name: trimmedName,
        title: trimmedTitle,
        rating,
        body: trimmedBody,
        images,
      });
    }

    // reset local form state
    setName('');
    setTitle('');
    setRating(5);
    setBody('');
    setImages([]);
    if (fileInputRef.current) {
      // Reset file input so the same file can be selected again
      // eslint-disable-next-line no-param-reassign
      fileInputRef.current.value = '';
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {/* optional name field, defaults to anonymous */}
      <div className="space-y-1">
        <label
          htmlFor="review-name"
          className="block text-xs font-medium text-ink-softer uppercase tracking-[0.16em]"
        >
          Name (Optional)
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-md border border-border-soft bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="Anonymous User"
        />
      </div>

      {/* star rating selector */}
      <div className="space-y-1">
        <label
          htmlFor="review-rating"
          className="block text-xs font-medium text-ink-softer uppercase tracking-[0.16em]"
        >
          Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-lg focus:outline-none"
              aria-label={`${star} star${star === 1 ? '' : 's'}`}
            >
              <span className={star <= rating ? 'text-accent-dark' : 'text-border-soft'}>
                ★
              </span>
            </button>
          ))}
          <span className="text-xs text-ink-softer">
            {rating} / 5
          </span>
        </div>
      </div>

      {/* optional review title */}
      <div className="space-y-1">
        <label
          htmlFor="review-title"
          className="block text-xs font-medium text-ink-softer uppercase tracking-[0.16em]"
        >
          Review title <span className="text-red-500">*</span>
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          maxLength={80}
          className="w-full rounded-md border border-border-soft bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          placeholder="Summarize your experience in a few words"
        />
        <p className="text-[11px] text-ink-softer text-right">
          {title.length}/80
        </p>
      </div>

      {/* description field required */}
      <div className="space-y-1">
        <label
          htmlFor="review-body"
          className="block text-xs font-medium text-ink-softer uppercase tracking-[0.16em]"
        >
          Your experience <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
          maxLength={maxBodyLength || undefined}
          className="w-full min-h-[96px] rounded-md border border-border-soft bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
          placeholder="Tell us about your experience with the Nova X1..."
        />
        {maxBodyLength && (
          <p className="text-[11px] text-ink-softer text-right">
            {body.length}/{maxBodyLength}
          </p>
        )}
      </div>

      {/* image attachment with hidden input and button */}
      <div className="space-y-1">
        <label
          htmlFor="review-image"
          className="block text-xs font-medium text-ink-softer uppercase tracking-[0.16em]"
        >
          Attach image (optional)
        </label>
        <input
          ref={fileInputRef}
          id="review-image"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondaryLight"
            className="px-4 py-1.5 text-xs whitespace-nowrap"
            onClick={handleChooseImage}
          >
            {images.length > 0 ? 'Add more images' : 'Attach images'}
          </Button>
          {/* image thumbnails strip */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative h-20 w-24 rounded-lg group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      onImageClick && onImageClick(src, 'Attached review image')
                    }
                    className="absolute inset-0 overflow-hidden rounded-lg border border-border-soft bg-black/5 focus:outline-none"
                  >
                    <img
                      src={src}
                      alt="Attached review"
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 cursor-zoom-in"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      <HiMagnifyingGlassPlus className="h-5 w-5 text-white" />
                    </div>
                  </button>
                  {/* remove image button */}
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent/90 text-ink text-[10px] font-semibold shadow-sm flex items-center justify-center hover:bg-accent-dark"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* submit row with full width button */}
      <div className="pt-3">
        <Button
          type="submit"
          className="w-full justify-center py-2.5 text-sm shadow-sm"
        >
          Post review
        </Button>
      </div>
    </form>
  );
}
