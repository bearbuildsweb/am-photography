import { useState, useEffect, useId, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, CheckCheck, MessageSquare } from 'lucide-react';
import { EmotionalReactionKey, Testimonial } from '../types';

interface ReviewModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onReviewSubmitted?: (newTestimonial: Testimonial) => void;
}

interface EmotionalOption {
  key: EmotionalReactionKey;
  label: string;
  rating: number;
}

const EMOTIONAL_OPTIONS: EmotionalOption[] = [
  {
    key: 'okay',
    label: 'OKAY',
    rating: 3,
  },
  {
    key: 'impressed',
    label: 'IMPRESSED',
    rating: 4,
  },
  {
    key: 'blown-away',
    label: 'BLOWN AWAY',
    rating: 5,
  },
];

interface StencilStarProps {
  key?: string | number;
  filled: boolean;
  selected: boolean;
  className?: string;
}

/* Rough, Stenciled Screen-Printed Star Shape */
function StencilStar({
  filled,
  selected,
  className = 'w-3.5 h-3.5',
}: StencilStarProps) {
  const activeColor = selected ? '#FF5500' : '#d4d4d8';
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Stenciled, raw geometric star shape */}
      <path
        d="M 12 2 L 14.8 8.5 L 22 9.2 L 16.8 14.2 L 18.2 21.2 L 12 17.5 L 5.8 21.2 L 7.2 14.2 L 2 9.2 L 9.2 8.5 Z"
        fill={filled ? activeColor : 'none'}
        stroke={filled ? activeColor : '#3f3f46'}
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
      {/* Stencil bridge incision cutout */}
      <line x1="12" y1="9.5" x2="12" y2="15" stroke="#09090c" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

/* Raw Screen-Printed Line-Art Reaction Graphic */
function EmotionIcon({
  reaction,
  selected,
  className = 'w-10 h-10',
}: {
  reaction: EmotionalReactionKey;
  selected: boolean;
  className?: string;
}) {
  const activeColor = selected ? '#FF5500' : '#71717a';

  switch (reaction) {
    case 'okay':
    case 'satisfied':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="#09090c" stroke={activeColor} strokeWidth="2.2" />
          <rect x="16" y="20" width="3.5" height="3.5" fill={activeColor} />
          <rect x="28.5" y="20" width="3.5" height="3.5" fill={activeColor} />
          <path d="M 17 31 L 31 31" fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      );
    case 'impressed':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="#09090c" stroke={activeColor} strokeWidth="2.2" />
          <path d="M 15 22 Q 18.5 16.5 22 22" fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="square" />
          <path d="M 26 22 Q 29.5 16.5 33 22" fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="square" />
          <path d="M 17 29 Q 24 36.5 31 29" fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      );
    case 'blown-away':
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="20" fill="#09090c" stroke={activeColor} strokeWidth="2.2" />
          <circle cx="17.5" cy="21.5" r="2.5" fill={activeColor} />
          <circle cx="30.5" cy="21.5" r="2.5" fill={activeColor} />
          {/* Stenciled stars at temples */}
          <path d="M 10 13 L 11 11 L 13 10 L 11 9 L 10 7 L 9 9 L 7 10 L 9 11 Z" fill={activeColor} />
          <path d="M 38 13 L 39 11 L 41 10 L 39 9 L 38 7 L 37 9 L 35 10 L 37 11 Z" fill={activeColor} />
          <path d="M 16 27.5 Q 24 38 32 27.5" fill="none" stroke={activeColor} strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      );
  }
}

const DEFAULT_REVIEWS_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxpYscWeC2VOYvio6-W3hyJHCi0_ALtx31kvpyZXo1AuOwmtLfRwv2RxlsZOU3GV5lPow/exec';

export default function ReviewModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onReviewSubmitted,
}: ReviewModalProps) {
  // Support hash routing: checks #review
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Form states: Default to 'impressed'
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionalReactionKey>('impressed');
  const [authorName, setAuthorName] = useState('');
  const [roleAndCompany, setRoleAndCompany] = useState('');
  const [reviewText, setReviewText] = useState('');

  // UI states
  const [errors, setErrors] = useState<{ author?: string; role?: string; text?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const authorInputId = useId();
  const roleInputId = useId();
  const reviewTextareaId = useId();

  // Hash route listener: #review
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (
        hash === '#review' ||
        hash === '#review-freelancer' ||
        hash === '#write-review' ||
        hash === '#leave-review'
      ) {
        setInternalIsOpen(true);
      } else if (hash === '' || hash === '#portfolio' || hash === '#about' || hash === '#booking') {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(false);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [controlledIsOpen]);

  // Lock scroll when open & handle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }

    const currentHash = window.location.hash.toLowerCase();
    if (
      currentHash === '#review' ||
      currentHash === '#review-freelancer' ||
      currentHash === '#write-review' ||
      currentHash === '#leave-review'
    ) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }

    if (isSuccess) {
      setIsSuccess(false);
      setAuthorName('');
      setRoleAndCompany('');
      setReviewText('');
      setSelectedEmotion('impressed');
    }
  };

  const handleCopyLink = () => {
    const directLink = `${window.location.origin}${window.location.pathname}#review`;
    navigator.clipboard.writeText(directLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const validate = () => {
    const newErrors: { author?: string; role?: string; text?: string } = {};

    if (!authorName.trim()) {
      newErrors.author = 'Name is required';
    }
    // Company / Role is optional
    if (!reviewText.trim()) {
      newErrors.text = 'Please enter your review';
    } else if (reviewText.trim().length < 10) {
      newErrors.text = 'Review should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const emotionConfig = EMOTIONAL_OPTIONS.find((o) => o.key === selectedEmotion) || EMOTIONAL_OPTIONS[1];

    let role = 'Client';
    let company = roleAndCompany.trim() || 'Client';

    if (roleAndCompany.includes(',')) {
      const parts = roleAndCompany.split(',');
      role = parts[0].trim() || 'Client';
      company = parts.slice(1).join(',').trim() || 'Client';
    } else if (roleAndCompany.trim()) {
      company = roleAndCompany.trim();
    }

    const newTestimonial: Testimonial = {
      id: `review-${Date.now()}`,
      author: authorName.trim(),
      role: role,
      company: company,
      quote: reviewText.trim(),
      image: '',
      year: new Date().getFullYear().toString(),
      rating: emotionConfig.rating,
      emotionalReaction: selectedEmotion,
      emotionalLabel: emotionConfig.label,
      date: 'Just now',
    };

    setTimeout(() => {
      try {
        const stored = localStorage.getItem('am_custom_testimonials');
        const list: Testimonial[] = stored ? JSON.parse(stored) : [];
        list.unshift(newTestimonial);
        localStorage.setItem('am_custom_testimonials', JSON.stringify(list));
      } catch (err) {
        console.error('Failed to store testimonial locally', err);
      }

      // Sync to Google Sheet
      const sheetUrl = (import.meta.env.VITE_REVIEWS_SHEET_URL || DEFAULT_REVIEWS_SHEET_URL)?.trim();
      if (sheetUrl) {
        try {
          const payload = {
            clientName: authorName.trim(),
            brandOrCompany: roleAndCompany.trim(),
            rating: `${emotionConfig.rating} / 5 (${emotionConfig.label})`,
            reviewText: reviewText.trim(),
            author: authorName.trim(),
            roleAndCompany: roleAndCompany.trim(),
            quote: reviewText.trim(),
          };

          fetch(sheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload),
          })
            .then(() => {
              console.log('Review successfully dispatched to Google Sheet webhook.');
            })
            .catch((err) => console.error('Sheet sync network error:', err));
        } catch (err) {
          console.error('Failed to post review to Google Sheet', err);
        }
      }

      onReviewSubmitted?.(newTestimonial);
      window.dispatchEvent(new CustomEvent('new-testimonial-added', { detail: newTestimonial }));

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop with brutalist dark grain */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/92 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container: Physical poster look with hard un-blurred black drop shadow */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-freelancer-modal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-[#09090c] border-2 border-[#FF5500] shadow-[10px_10px_0px_#000000,12px_12px_0px_#1c1c20] text-[#FF5500] my-auto overflow-hidden z-10 rounded-none"
          >
            {/* Subtle Noise / Grain Overlay over Entire Modal */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.16] mix-blend-screen z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='modalNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23modalNoise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Toxic Fluorescent Neon Orange Accent Strip */}
            <div className="relative z-10 h-2.5 w-full bg-gradient-to-r from-[#FF0040] via-[#FF5500] via-[#FF7700] to-[#FF0055] shadow-[0_0_16px_rgba(255,85,0,0.85)]" />

            {/* Clean Modal Top Bar */}
            <div className="relative z-10 px-6 sm:px-8 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-black/80">
              <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.24em] text-white">
                AM COMMUNITY
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy direct link to this review modal"
                  className="px-2.5 py-1.5 rounded-none border border-neutral-800 hover:border-[#FF5500] bg-neutral-900 text-neutral-300 hover:text-white transition-none flex items-center gap-1.5 text-xs font-mono cursor-pointer shadow-[2px_2px_0px_#000000]"
                >
                  {copiedLink ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FF5500]" />
                      <span className="hidden sm:inline">Share Link</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-none border border-neutral-800 hover:border-[#FF5500] bg-neutral-900 text-neutral-400 hover:text-white flex items-center justify-center transition-none cursor-pointer shadow-[2px_2px_0px_#000000]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Success Celebration View */}
            {isSuccess ? (
              <div className="relative z-10 p-10 sm:p-14 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-none border-2 border-[#FF5500] bg-black shadow-[4px_4px_0px_#000000] flex items-center justify-center mb-6 text-3xl select-none">
                  🥂
                </div>
                <h3 className="font-heading font-serif text-2xl sm:text-3xl font-normal uppercase tracking-wide text-white mb-2 leading-snug">
                  THE WORD IS OUT.
                </h3>
                <p className="text-sm font-sans text-neutral-300 max-w-md leading-relaxed mb-6">
                  Thank you, <span className="text-[#FF5500] font-bold">{authorName}</span>. Your review has been captured.
                </p>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-black border-2 border-emerald-500/40 px-4 py-2 mb-8 shadow-[3px_3px_0px_#000000]">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ARCHIVED WITH CARE</span>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close"
                  className="w-10 h-10 rounded-none border-2 border-neutral-700 hover:border-[#FF5500] bg-neutral-900 text-neutral-300 hover:text-white flex items-center justify-center transition-none cursor-pointer shadow-[3px_3px_0px_#000000]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Main Form View */
              <form onSubmit={handleSubmit} className="relative z-10 px-6 sm:px-8 py-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Rating Cards: Raw Screen-Printed Panels with zero transition, solid offset border, hard drop-shadow */}
                <div>
                  <div className="mb-3">
                    <label className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FF5500] inline-block" />
                      RATING *
                    </label>
                  </div>

                  {/* 3 Screen-Printed Emoji Cards: OKAY, IMPRESSED, BLOWN AWAY */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                    {EMOTIONAL_OPTIONS.map((item) => {
                      const isSelected = selectedEmotion === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setSelectedEmotion(item.key)}
                          className={`relative flex flex-col items-center justify-between px-1.5 py-3 sm:px-3 sm:py-4 border-2 rounded-none transition-none cursor-pointer text-center select-none overflow-hidden ${
                            isSelected
                              ? 'bg-[#141417] border-[#FF5500] shadow-[4px_4px_0px_#000000] -translate-x-[2px] -translate-y-[2px]'
                              : 'bg-[#0b0b0e] border-neutral-800 hover:border-neutral-500 hover:bg-[#111114] shadow-[2px_2px_0px_#000000]'
                          }`}
                        >
                          {/* Subtle Screenprint Grain Overlay on each Card Background */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-screen z-0"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardNoise)'/%3E%3C/svg%3E")`,
                              backgroundRepeat: 'repeat',
                            }}
                          />

                          {/* Raw Face Icon */}
                          <div className="relative z-10 my-0.5 sm:my-1 flex items-center justify-center">
                            <EmotionIcon reaction={item.key} selected={isSelected} className="w-8 h-8 sm:w-10 sm:h-10" />
                          </div>

                          {/* High-Contrast Text: Perfectly centered, sized to never overflow on mobile */}
                          <div className="relative z-10 mt-1.5 sm:mt-2.5 w-full flex items-center justify-center px-0.5">
                            <span
                              className={`block font-sans text-[10px] sm:text-xs md:text-sm font-black tracking-normal sm:tracking-tight uppercase leading-tight text-center ${
                                isSelected ? 'text-white' : 'text-neutral-300'
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>

                          {/* Rough Stenciled Star Score at Bottom - Scaled appropriately for mobile */}
                          <div className="relative z-10 mt-2 sm:mt-3 flex items-center justify-center gap-0.5 sm:gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <StencilStar
                                key={idx}
                                filled={idx < item.rating}
                                selected={isSelected}
                                className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Client Details (Name & Optional Company / Brand) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={authorInputId}
                      className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2 mb-1.5"
                    >
                      <span className="w-2 h-2 bg-[#FF5500] inline-block" />
                      YOUR NAME *
                    </label>
                    <input
                      id={authorInputId}
                      type="text"
                      value={authorName}
                      onChange={(e) => {
                        setAuthorName(e.target.value);
                        if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
                      }}
                      className={`w-full bg-black border-2 ${
                        errors.author ? 'border-red-500' : 'border-neutral-800 focus:border-[#FF5500]'
                      } text-white text-sm px-3.5 py-2.5 font-sans rounded-none outline-none transition-none shadow-[2px_2px_0px_#000000]`}
                    />
                    {errors.author && <p className="text-red-400 text-xs mt-1 font-mono">{errors.author}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor={roleInputId}
                      className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold flex items-center gap-2 mb-1.5"
                    >
                      <span className="w-2 h-2 bg-neutral-600 inline-block" />
                      COMPANY (OPTIONAL)
                    </label>
                    <input
                      id={roleInputId}
                      type="text"
                      placeholder="Agency, Brand, etc. (optional)"
                      value={roleAndCompany}
                      onChange={(e) => {
                        setRoleAndCompany(e.target.value);
                      }}
                      className="w-full bg-black border-2 border-neutral-800 focus:border-[#FF5500] text-white text-sm px-3.5 py-2.5 font-sans rounded-none outline-none transition-none shadow-[2px_2px_0px_#000000] placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                {/* Review Textarea */}
                <div>
                  <div className="mb-1.5">
                    <label
                      htmlFor={reviewTextareaId}
                      className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-[#FF5500] inline-block" />
                      YOUR EXPERIENCE *
                    </label>
                  </div>
                  <textarea
                    id={reviewTextareaId}
                    rows={4}
                    maxLength={500}
                    value={reviewText}
                    onChange={(e) => {
                      setReviewText(e.target.value);
                      if (errors.text) setErrors((prev) => ({ ...prev, text: undefined }));
                    }}
                    placeholder="Describe working with Angelique-Mari"
                    className={`w-full bg-black border-2 ${
                      errors.text ? 'border-red-500' : 'border-neutral-800 focus:border-[#FF5500]'
                    } text-neutral-100 text-sm p-3.5 font-sans rounded-none outline-none transition-none leading-relaxed shadow-[2px_2px_0px_#000000]`}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <div>{errors.text && <p className="text-red-400 text-xs font-mono">{errors.text}</p>}</div>
                    <span className="text-xs font-mono text-neutral-500 ml-auto">
                      {reviewText.length} / 500 characters
                    </span>
                  </div>
                </div>

                {/* Modal Footer Action */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-black px-8 py-3.5 border-2 border-[#FF5500] hover:border-white transition-none shadow-[4px_4px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] cursor-pointer disabled:opacity-50 rounded-none"
                  >
                    {isSubmitting ? (
                      <span>SUBMITTING...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>SUBMIT REVIEW</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
