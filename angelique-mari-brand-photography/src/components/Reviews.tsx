import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Testimonial } from '../types';

import avatarBrideGroom from '../assets/images/Bride & Groom Stories/1/1.jpg';
import avatarYourStage from '../assets/images/Your Stage/1/1.jpg';
import avatarFamily from '../assets/images/Family Moments/1/1.jpg';
import avatarLifestyle from '../assets/images/Lifestyle/1/1.jpg';

interface ReviewsProps {
  onReviewClick?: () => void;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-1',
    author: 'Elena & Marcus Vance',
    role: 'Bride & Groom Stories',
    company: 'Cathedral Courtyard Wedding',
    quote: "Angelique-Mari didn't just document our day—she captured the unseen glances, the quiet tears before walking down the aisle, and the golden hour warmth in a way that feels like pure cinema. Looking through our gallery feels like stepping right back into the emotion itself.",
    image: avatarBrideGroom,
    year: '2026',
    rating: 5,
    emotionalLabel: 'BLOWN AWAY',
  },
  {
    id: 'review-2',
    author: 'Kofi Mensah',
    role: 'Visual Artist & Performer',
    company: 'Your Stage • Johannesburg Studio',
    quote: "Rarely do you meet a photographer who understands creative presence without forcing a pose. She caught the raw intensity of our studio rehearsal without ever interrupting the rhythm. Her framing is bold, tactile, and unforgettable.",
    image: avatarYourStage,
    year: '2026',
    rating: 5,
    emotionalLabel: 'BLOWN AWAY',
  },
  {
    id: 'review-3',
    author: 'Dr. Sarah & Neil Jenkins',
    role: 'Family Moments',
    company: 'Westcliff Loft Session',
    quote: "With two toddlers and a newborn, photoshoots are usually chaotic. Angelique-Mari turned it into an effortless afternoon of genuine laughter. The framed prints on our wall are timeless treasures we will cherish for the rest of our lives.",
    image: avatarFamily,
    year: '2026',
    rating: 5,
    emotionalLabel: 'BLOWN AWAY',
  },
  {
    id: 'review-4',
    author: 'Liam & Chloe Du Plessis',
    role: 'Lifestyle & Hospitality Editorial',
    company: 'Maboneng Precinct Curation',
    quote: "Every single photograph looks like a cover spread from a high-end European monograph. Her eye for natural light, architectural texture, and organic composition elevated our space into something truly iconic.",
    image: avatarLifestyle,
    year: '2026',
    rating: 5,
    emotionalLabel: 'BLOWN AWAY',
  },
];

export default function Reviews({ onReviewClick }: ReviewsProps) {
  // onReviewClick kept in props signature for interface backwards-compatibility
  void onReviewClick;

  const testimonials = DEFAULT_TESTIMONIALS;
  // Current active review ID
  const [activeId, setActiveId] = useState<string>(DEFAULT_TESTIMONIALS[0].id);
  // The current pair index (showing strictly 2 avatars at a time)
  const [pairIndex, setPairIndex] = useState(0);
  // Card quote expand/collapse state (truncated to 2 lines by default)
  const [isExpanded, setIsExpanded] = useState(false);

  // Clear any test review submissions from localStorage on mount
  useEffect(() => {
    try {
      localStorage.removeItem('am_custom_testimonials');
    } catch {
      // ignore
    }
  }, []);

  // Reset expand state whenever active testimonial changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeId]);

  // Ensure activeId is always valid
  useEffect(() => {
    if (!testimonials.some((t) => t.id === activeId)) {
      setActiveId(DEFAULT_TESTIMONIALS[0].id);
    }
  }, [testimonials, activeId]);

  // Compute pairs of 2 avatars
  const totalReviews = testimonials.length;
  const totalPairs = Math.ceil(totalReviews / 2);
  const safePairIndex = Math.min(pairIndex, Math.max(0, totalPairs - 1));

  // The 2 visible avatars for the current pair
  const startIndex = safePairIndex * 2;
  const visiblePair = testimonials.slice(startIndex, startIndex + 2);

  // Active testimonial object
  const activeTestimonial =
    testimonials.find((t) => t.id === activeId) || visiblePair[0] || testimonials[0];

  const handleSelectAvatar = (id: string) => {
    setActiveId(id);
  };

  const handlePrevPair = () => {
    const nextPair = (safePairIndex - 1 + totalPairs) % totalPairs;
    setPairIndex(nextPair);
    const newVisible = testimonials.slice(nextPair * 2, nextPair * 2 + 2);
    if (newVisible.length > 0) {
      setActiveId(newVisible[0].id);
    }
  };

  const handleNextPair = () => {
    const nextPair = (safePairIndex + 1) % totalPairs;
    setPairIndex(nextPair);
    const newVisible = testimonials.slice(nextPair * 2, nextPair * 2 + 2);
    if (newVisible.length > 0) {
      setActiveId(newVisible[0].id);
    }
  };

  return (
    <section
      id="reviews"
      aria-label="Client Reviews and Testimonials"
      className="relative w-full bg-[#FAF9F6] text-neutral-950 py-16 sm:py-24 md:py-32 px-6 sm:px-10 md:px-16 border-t border-neutral-200 overflow-hidden selection:bg-[#FF6800] selection:text-white scroll-mt-6 sm:scroll-mt-10"
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Minimalist Section Header with Magazine-Style Composition & Deliberate Framing Device */}
        <div className="flex flex-col items-center mb-10 sm:mb-14 text-center select-none">
          <div className="relative inline-block text-left px-6 py-4 sm:px-10 sm:py-6 md:px-12 md:py-7">
            
            {/* Top-Left Framing Device: Printer Crop / Viewfinder Mark with Ink Bleed */}
            <div 
              className="absolute top-0 left-0 w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 pointer-events-none select-none"
              aria-hidden="true"
            >
              {/* Capillary ink absorption halo */}
              <span 
                className="absolute inset-0 border-t-2 border-l-2 border-[#FF5500]/50 blur-[0.8px] scale-[1.02] -translate-x-[0.5px] -translate-y-[0.5px] pointer-events-none"
                style={{ mixBlendMode: 'multiply' }}
              />
              {/* Primary 2px solid toxic orange bracket with printed ink-bleed filter */}
              <span 
                className="absolute inset-0 border-t-2 border-l-2 border-[#FF6800] pointer-events-none"
                style={{
                  filter: 'drop-shadow(0.5px 0.4px 0.4px rgba(255, 104, 0, 0.65)) drop-shadow(-0.4px -0.3px 0.6px rgba(210, 45, 0, 0.4))',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Printer Registration Overhang Ticks */}
              <span className="absolute -top-1.5 left-0 w-[2px] h-2 bg-[#FF6800]/85" />
              <span className="absolute top-0 -left-1.5 h-[2px] w-2 bg-[#FF6800]/85" />
            </div>

            {/* Asymmetrical Magazine-Style Heading in Tan Pearl */}
            <h2
              style={{
                fontFamily: "'Tan Pearl', 'Playfair Display', Georgia, serif",
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
              className="font-tan-pearl text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.18] tracking-normal select-none"
            >
              <span className="block text-neutral-950">
                no notes.
              </span>
              <span className="block pl-8 sm:pl-14 md:pl-20 text-neutral-800">
                all heart.
              </span>
            </h2>

            {/* Bottom-Right Framing Device: Printer Crop / Viewfinder Mark with Ink Bleed */}
            <div 
              className="absolute bottom-0 right-0 w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 pointer-events-none select-none"
              aria-hidden="true"
            >
              {/* Capillary ink absorption halo */}
              <span 
                className="absolute inset-0 border-b-2 border-r-2 border-[#FF5500]/50 blur-[0.8px] scale-[1.02] translate-x-[0.5px] translate-y-[0.5px] pointer-events-none"
                style={{ mixBlendMode: 'multiply' }}
              />
              {/* Primary 2px solid toxic orange bracket with printed ink-bleed filter */}
              <span 
                className="absolute inset-0 border-b-2 border-r-2 border-[#FF6800] pointer-events-none"
                style={{
                  filter: 'drop-shadow(0.5px 0.4px 0.4px rgba(255, 104, 0, 0.65)) drop-shadow(-0.4px -0.3px 0.6px rgba(210, 45, 0, 0.4))',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Printer Registration Overhang Ticks */}
              <span className="absolute -bottom-1.5 right-0 w-[2px] h-2 bg-[#FF6800]/85" />
              <span className="absolute bottom-0 -right-1.5 h-[2px] w-2 bg-[#FF6800]/85" />
            </div>

          </div>
        </div>

        {/* ================================================================= */}
        {/* THE QUOTE CARD (Minimalist clean white card inspired by ref)       */}
        {/* ================================================================= */}
        <div className="w-full relative bg-white text-neutral-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-neutral-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300">
          
          {/* Subtle Fine-Art Grain Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-neutral-50/40 pointer-events-none" />

          {/* Large Stylized Opening Quotation Glyph (Top-Left) */}
          <span 
            className="absolute top-5 left-6 sm:top-8 sm:left-10 font-serif text-5xl sm:text-7xl text-neutral-300 select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            “
          </span>

          {/* Quote Body with 2-Line Truncation and Expand/Collapse Option */}
          <div className="relative z-10 my-3 sm:my-5 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full flex flex-col items-center"
              >
                <blockquote
                  className={`font-sans text-base sm:text-lg md:text-xl lg:text-[21px] font-normal leading-relaxed sm:leading-loose text-neutral-700 text-center px-4 sm:px-10 antialiased max-w-2xl transition-all duration-200 ${
                    isExpanded ? '' : 'line-clamp-2'
                  }`}
                >
                  {activeTestimonial.quote}
                </blockquote>

                {/* Option to Expand / Collapse */}
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#FF6800] hover:text-black font-semibold transition-colors cursor-pointer select-none py-1 px-3 rounded-full hover:bg-neutral-100/80 active:scale-95"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Read less' : 'Read more'}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Large Stylized Closing Quotation Glyph (Bottom-Right) */}
          <span 
            className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 font-serif text-5xl sm:text-7xl text-neutral-300 select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            ”
          </span>
        </div>

        {/* ================================================================= */}
        {/* AVATAR ROW: STRICTLY LIMITED TO 2 AVATARS AT A TIME               */}
        {/* ================================================================= */}
        <div className="w-full flex flex-col items-center mt-8 sm:mt-10">
          
          {/* Avatars Container flanked by Prev / Next navigation */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            
            {/* Prev Pair Button */}
            {totalPairs > 1 && (
              <button
                type="button"
                onClick={handlePrevPair}
                aria-label="Previous pair of reviews"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-[#FF6800] hover:border-[#FF6800] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* Exactly 2 Avatars visible at a time */}
            <div className="flex items-center justify-center gap-5 sm:gap-8">
              {visiblePair.map((review) => {
                const isActive = review.id === activeId;

                return (
                  <button
                    key={review.id}
                    type="button"
                    onClick={() => handleSelectAvatar(review.id)}
                    aria-label={`View review from ${review.author}`}
                    aria-pressed={isActive}
                    className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none select-none"
                  >
                    {/* Speech Bubble Avatar Card */}
                    <div
                      className={`relative w-15 h-15 sm:w-17 sm:h-17 rounded-2xl p-1 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-white shadow-[0_8px_20px_rgba(255,104,0,0.18)] scale-105'
                          : 'bg-white border border-neutral-200/80 hover:border-neutral-300 opacity-60 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Active Speech-Bubble Pointer linking up to the Quote Card */}
                      {isActive && (
                        <div 
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-b-[8px] border-b-[#FF6800]"
                          aria-hidden="true"
                        />
                      )}

                      {/* Continuous Active Accent Outline */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-2xl border-2 border-[#FF6800] pointer-events-none" />
                      )}

                      {/* Reviewer Headshot / Avatar */}
                      <div className="w-full h-full rounded-xl overflow-hidden bg-neutral-100">
                        <img
                          src={review.image}
                          alt={review.author}
                          decoding="async"
                          loading="lazy"
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            isActive ? 'grayscale-0 contrast-105' : 'grayscale contrast-110'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Pair Button */}
            {totalPairs > 1 && (
              <button
                type="button"
                onClick={handleNextPair}
                aria-label="Next pair of reviews"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 bg-white text-neutral-500 hover:text-[#FF6800] hover:border-[#FF6800] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

          </div>

          {/* Active Reviewer Details (Name and Role directly under active avatar) */}
          <div className="flex flex-col items-center mt-5 text-center min-h-[52px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <span className="font-sans text-base sm:text-lg font-bold text-[#FF6800] tracking-tight">
                  {activeTestimonial.author}
                </span>
                {/* Attribution link pointing to Google.com */}
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-neutral-500 hover:text-[#FF6800] uppercase tracking-wider mt-1 transition-colors group cursor-pointer select-none"
                  title="View Google Review"
                >
                  <span>Google Review</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-[#FF6800] transition-colors" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators for review pairs */}
          {totalPairs > 1 && (
            <div className="flex items-center gap-2 mt-4 select-none">
              {Array.from({ length: totalPairs }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPairIndex(idx);
                    const newVisible = testimonials.slice(idx * 2, idx * 2 + 2);
                    if (newVisible.length > 0) {
                      setActiveId(newVisible[0].id);
                    }
                  }}
                  aria-label={`Go to review pair ${idx + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    safePairIndex === idx
                      ? 'w-6 bg-[#FF6800]'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
