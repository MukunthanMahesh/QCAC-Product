import React, { useEffect } from 'react';

// Modal component for Hero preorder button and other uses
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  titleId = 'dialog-title',
  descriptionId = 'dialog-description',
}) {
  if (!isOpen) return null;

  // close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="max-w-sm w-full rounded-2xl bg-surface text-ink p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <h2
            id={titleId}
            className="text-lg font-semibold mb-2"
          >
            {title}
          </h2>
        )}
        <div id={descriptionId}>
          {children}
        </div>
      </div>
    </div>
  );
}

