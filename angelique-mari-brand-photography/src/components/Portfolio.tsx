import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { CATEGORY_STORIES } from '../data/portfolioStories';
import { ArrowUpRight, Columns2, Image as ImageIcon, ArrowRight } from 'lucide-react';

type ViewMode = 'both' | 'photo1' | 'photo2';

// Global cache of successfully loaded image URLs to prevent preloader flicker on tab toggles
const LOADED_IMAGES_CACHE = new Set<string>();

/* Harsh, Raw Cross Close Icon with Square Caps & Heavy Weight */
function RawHarshCross({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 2.5 2.5 L 15.5 15.5 M 15.5 2.5 L 2.5 15.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/* Elegant Minimal Editorial Frame with Stuttering Scanline Pre-loader */
function ContactSheetPrint({ src, isSingle = false, alt = '' }: { src: string; isSingle?: boolean; alt?: string }) {
  const [loaded, setLoaded] = useState(() => LOADED_IMAGES_CACHE.has(src));
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (LOADED_IMAGES_CACHE.has(src)) {
      setLoaded(true);
      return;
    }
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      LOADED_IMAGES_CACHE.add(src);
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  const handleLoad = () => {
    LOADED_IMAGES_CACHE.add(src);
    setLoaded(true);
  };

  return (
    <div 
      className={`relative ${
        isSingle
          ? 'p-2 sm:p-3 md:p-3.5 max-h-[82vh] max-w-[92vw]'
          : 'p-1.5 sm:p-2 md:p-2.5 max-h-[40vh] md:max-h-[80vh] max-w-[90vw] md:max-w-[45vw]'
      } bg-[#0c0c0e] border border-[#303030] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden select-none`}
    >
      {/* Subtle On-Brand Stuttering Scanline Pre-loader */}
      {!loaded && (
        <div className="absolute inset-1.5 sm:inset-2 bg-[#080808] scanline-grid-pattern overflow-hidden flex flex-col justify-between p-2.5 sm:p-3 z-10 select-none pointer-events-none w-[70vw] sm:w-[45vw] md:w-[32vw] h-[35vh] sm:h-[45vh] md:h-[62vh]">
          {/* Top Scanline Header Info */}
          <div className="flex items-center justify-between w-full opacity-70">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#FF6800] tracking-[0.2em] uppercase font-bold">
              FRAME // EXPOSURE
            </span>
            <span className="font-mono text-[9px] text-neutral-400 tracking-widest">
              35MM_RAW
            </span>
          </div>

          {/* Stuttering Moving Scanline Beam */}
          <div className="absolute inset-x-0 h-[2px] bg-[#FF6800] shadow-[0_0_10px_#FF6800,0_0_3px_#FFF] animate-scanline-beam pointer-events-none">
            <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-gradient-to-t from-[#FF6800]/25 to-transparent pointer-events-none" />
          </div>

          {/* Bottom Scanline Status */}
          <div className="flex items-center justify-between w-full mt-auto opacity-70">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#FF6800] animate-ping" />
              <span className="font-mono text-[9px] text-[#FF6800] tracking-[0.2em] uppercase font-bold">
                FETCHING
              </span>
            </div>
            <span className="font-mono text-[9px] text-neutral-500 tracking-widest">
              ISO_400
            </span>
          </div>
        </div>
      )}

      {/* Actual Artwork Image */}
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        className={`relative z-10 ${
          isSingle
            ? 'max-h-[78vh] w-auto max-w-[88vw]'
            : 'max-h-[38vh] md:max-h-[76vh] w-auto max-w-[86vw] md:max-w-[44vw]'
        } object-contain block shadow-none transition-opacity duration-200 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function Portfolio() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('both');

  const currentCategoryStories =
    activeCategoryIndex !== null ? CATEGORY_STORIES[activeCategoryIndex] : null;

  const currentStory =
    currentCategoryStories && currentCategoryStories.stories[activeStoryIndex]
      ? currentCategoryStories.stories[activeStoryIndex]
      : null;

  const openStoryModal = useCallback((categoryIndex: number) => {
    setActiveCategoryIndex(categoryIndex);
    setActiveStoryIndex(0); // Always start at folder /1
    setViewMode('both'); // Default view is always "both"
  }, []);

  const handleNextStory = useCallback(() => {
    if (!currentCategoryStories) return;
    setActiveStoryIndex((prev) => (prev + 1) % currentCategoryStories.stories.length);
  }, [currentCategoryStories]);

  const handlePrevStory = useCallback(() => {
    if (!currentCategoryStories) return;
    setActiveStoryIndex(
      (prev) => (prev - 1 + currentCategoryStories.stories.length) % currentCategoryStories.stories.length
    );
  }, [currentCategoryStories]);

  // Lock body scroll and keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCategoryIndex(null);
      if (e.key === 'ArrowRight') handleNextStory();
      if (e.key === 'ArrowLeft') handlePrevStory();
    };

    if (activeCategoryIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCategoryIndex, handleNextStory, handlePrevStory]);

  const p1 = PROJECTS[0]; // Bride & Groom Stories
  const p2 = PROJECTS[1]; // Your Stage
  const p3 = PROJECTS[2]; // Family Moments
  const p4 = PROJECTS[3]; // Lifestyle

  // Single-sentence truncated version for the portfolio grid
  const getSingleSentence = (text?: string) => {
    if (!text) return '';
    const match = text.match(/^.*?[.!?](?:\s|$)/);
    return match ? match[0].trim() : text;
  };

  return (
    <section 
      id="portfolio" 
      className="relative w-full bg-black text-[#FF6800] py-24 sm:py-32 md:py-44 px-6 sm:px-10 md:px-16 z-10 border-t border-neutral-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-28 sm:space-y-36 md:space-y-48">
        
        {/* ==================================================================== */}
        {/* SPREAD 01: High-Fashion Editorial Cover Spread                       */}
        {/* BRIDE & GROOM STORIES                                                */}
        {/* ==================================================================== */}
        {p1 && (
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 items-center">
              
              {/* Left Column: Asymmetric Editorial Masthead Lockup */}
              <motion.div 
                className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Integrated Editorial Title: "what [ I ] love to photograph" in Tan Pearl with Light Background */}
                <div className="mb-7 relative inline-block w-full max-w-lg bg-[#FAF9F5] p-5 sm:p-7 md:p-8 border border-neutral-300 shadow-[6px_6px_0px_#FF6800] sm:shadow-[8px_8px_0px_#FF6800]">
                  {/* Archival Corner Registration Ticks */}
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF6800] pointer-events-none" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF6800] pointer-events-none" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF6800] pointer-events-none" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF6800] pointer-events-none" />

                  <h2
                    className="font-tan-pearl text-2xl sm:text-3xl md:text-[2.15rem] lg:text-[2.35rem] xl:text-[2.5rem] leading-[1.22] tracking-normal font-normal select-none"
                    style={{ 
                      fontFamily: "'Tan Pearl', 'Playfair Display', Georgia, serif",
                      WebkitFontSmoothing: 'antialiased'
                    }}
                  >
                    <span className="flex items-center gap-2 sm:gap-3 text-neutral-950">
                      <span>“What</span>
                      
                      {/* High-Street Punk-Rock Spotlight on 'I' in Tan Pearl */}
                      <span className="inline-block relative -rotate-3 hover:rotate-0 transition-transform duration-300 mx-1 align-middle not-italic group select-none">
                        {/* Raw Angled Punk Badge with Brutalist Offset Shadow */}
                        <span className="relative inline-flex items-center justify-center px-2.5 sm:px-3 py-0.5 sm:py-1 bg-black border-2 border-[#FF6800] shadow-[2.5px_2.5px_0px_#FF6800] sm:shadow-[3px_3px_0px_#FF6800]">
                          {/* Corner Viewfinder / Punk Registration Ticks */}
                          <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#FF6800]" />
                          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#FF6800]" />
                          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#FF6800]" />
                          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#FF6800]" />

                          {/* The Capitalized 'I' in Brand Orange in Tan Pearl */}
                          <span 
                            className="font-tan-pearl text-xl sm:text-2xl md:text-[1.75rem] text-[#FF6800] font-normal leading-none tracking-normal drop-shadow-[0_0_8px_rgba(255,104,0,0.5)]"
                            style={{ fontFamily: "'Tan Pearl', 'Playfair Display', Georgia, serif" }}
                          >
                            i
                          </span>
                        </span>
                      </span>
                    </span>
                    <span className="block pl-3 sm:pl-4 text-[#B83E00]">love to</span>
                    <span className="block pl-6 sm:pl-8 text-[#B83E00]">photograph”</span>
                  </h2>
                </div>

                {/* Monumental Architectural Project Title - Matching the font of the other categories */}
                <h3 
                  onClick={() => openStoryModal(0)}
                  className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-white font-bold tracking-tight mb-5 uppercase leading-[1.08] drop-shadow-[0_2px_18px_rgba(255,104,0,0.15)] cursor-pointer hover:text-[#FF6800] transition-colors"
                >
                  {p1.title}
                </h3>

                {/* Sharp Supporting Statement with Curatorial Hairline */}
                <div className="relative pl-5 sm:pl-6 border-l-2 border-[#FF6800]/40 mb-8 max-w-lg">
                  <p className="text-neutral-300 text-sm sm:text-base md:text-[17px] leading-[1.7] font-normal tracking-wide antialiased">
                    {getSingleSentence(p1.description)}
                  </p>
                </div>

                {/* Tactile Architectural Action & Index */}
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => openStoryModal(0)}
                    className="group/btn relative inline-flex items-center gap-3 px-6 py-3.5 bg-black/80 hover:bg-[#FF6800] border border-[#FF6800]/50 hover:border-[#FF6800] text-[#FF6800] hover:text-black transition-colors duration-200 cursor-pointer w-fit shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(255,104,0,0.12)] hover:shadow-[0_0_30px_rgba(255,104,0,0.4)]"
                  >
                    <span className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 border-t border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                    <span className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 border-t border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                    <span className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 border-b border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                    <span className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 border-b border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />

                    <span className="font-sans text-xs uppercase tracking-[0.24em] font-extrabold text-[#FF6800] group-hover/btn:text-black transition-colors duration-200 pointer-events-none select-none">
                      VIEW
                    </span>
                    <span className="w-5 h-5 flex items-center justify-center border border-[#FF6800]/40 group-hover/btn:border-black/40 bg-[#FF6800]/10 group-hover/btn:bg-black/10 transition-colors duration-200 pointer-events-none">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6800] group-hover/btn:text-black transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 pointer-events-none" />
                    </span>
                  </button>
                  <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.25em] select-none">
                    <span className="text-[#FF6800] font-bold">01</span>
                    <span className="text-neutral-600 font-light">/</span>
                    <span className="text-neutral-500 font-medium">04</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Expansive Framed Museum Artwork */}
              <motion.div 
                className="lg:col-span-7 group cursor-pointer order-1 lg:order-2 transform-gpu"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openStoryModal(0)}
              >
                <div className="relative">
                  {/* Viewfinder Framing Brackets that Snap Inward on Hover */}
                  <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#FF6800] z-30 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#FF6800] z-30 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#FF6800] z-30 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#FF6800] z-30 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />

                  {/* Fine-Art Gallery Matting Frame with Full-Vibrancy Image */}
                  <div className="relative w-full aspect-[16/10] bg-[#FAF8F5] p-3 sm:p-4.5 border border-[#E2DDD3] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(255,104,0,0.06)] group-hover:shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(255,104,0,0.22)] group-hover:border-[#FF6800]/50 transition-all duration-500 ease-out overflow-hidden transform-gpu">
                    <div className="relative w-full h-full overflow-hidden bg-[#101012] border border-black/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]">
                      <img 
                        src={p1.image} 
                        alt={p1.title} 
                        decoding="async"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover brightness-100 contrast-[1.02] group-hover:scale-[1.03] group-hover:brightness-105 transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/15 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* SPREAD 02: High-Fashion Asymmetrical Diptych                         */}
        {/* YOUR STAGE + FAMILY MOMENTS                                          */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-start">
          
          {/* Left Diptych Frame: YOUR STAGE (Vertical 4:5 portrait) */}
          {p2 && (
            <motion.div 
              className="lg:col-span-5 flex flex-col group/card cursor-pointer transform-gpu"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              onClick={() => openStoryModal(1)}
            >
              <div className="relative">
                {/* Viewfinder Framing Brackets that Snap Inward on Hover */}
                <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover/card:translate-x-2.5 group-hover/card:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:translate-y-2.5 group-hover/card:-translate-x-2.5 group-hover/card:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:-translate-y-2.5 group-hover/card:translate-x-2.5 group-hover/card:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 group-hover/card:-translate-x-2.5 group-hover/card:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />

                <div className="relative w-full aspect-[4/5] bg-[#FAF8F5] p-3 sm:p-4 border border-[#E2DDD3] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(255,104,0,0.06)] group-hover/card:shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(255,104,0,0.22)] group-hover/card:border-[#FF6800]/50 transition-all duration-500 ease-out overflow-hidden transform-gpu">
                  <div className="relative w-full h-full overflow-hidden bg-[#101012] border border-black/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]">
                    <img 
                      src={p2.image} 
                      alt={p2.title} 
                      decoding="async"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-100 contrast-[1.02] group-hover/card:scale-[1.03] group-hover/card:brightness-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/15 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.25em] select-none">
                    <span className="text-[#FF6800] font-bold">02</span>
                    <span className="text-neutral-600 font-light">/</span>
                    <span className="text-neutral-500 font-medium">04</span>
                  </div>
                  <div className="h-[1px] w-8 bg-gradient-to-r from-[#FF6800]/50 to-transparent" />
                </div>

                <h3 
                  onClick={(e) => {
                    e.stopPropagation();
                    openStoryModal(1);
                  }}
                  className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight mb-4 uppercase drop-shadow-[0_2px_14px_rgba(255,104,0,0.12)] hover:text-[#FF6800] transition-colors"
                >
                  {p2.title}
                </h3>

                <div className="relative pl-4 border-l-2 border-[#FF6800]/30 mb-6">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal tracking-wide antialiased">
                    {getSingleSentence(p2.description)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openStoryModal(1);
                  }}
                  className="group/btn relative inline-flex items-center gap-2.5 px-5 py-3 bg-black/80 hover:bg-[#FF6800] border border-[#FF6800]/50 hover:border-[#FF6800] text-[#FF6800] hover:text-black transition-colors duration-200 cursor-pointer w-fit shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(255,104,0,0.12)] hover:shadow-[0_0_25px_rgba(255,104,0,0.4)]"
                >
                  <span className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 border-t border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                  <span className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 border-t border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                  <span className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 border-b border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                  <span className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 border-b border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />

                  <span className="font-sans text-xs uppercase tracking-[0.24em] font-extrabold text-[#FF6800] group-hover/btn:text-black transition-colors duration-200 pointer-events-none select-none">
                    VIEW
                  </span>
                  <span className="w-5 h-5 flex items-center justify-center border border-[#FF6800]/40 group-hover/btn:border-black/40 bg-[#FF6800]/10 group-hover/btn:bg-black/10 transition-colors duration-200 pointer-events-none">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6800] group-hover/btn:text-black transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 pointer-events-none" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Right Diptych Frame: FAMILY MOMENTS (Horizontal 16:10 frame offset higher) */}
          {p3 && (
            <motion.div 
              className="lg:col-span-7 flex flex-col group/card cursor-pointer lg:pt-14 transform-gpu"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
              onClick={() => openStoryModal(2)}
            >
              <div className="relative">
                {/* Viewfinder Framing Brackets that Snap Inward on Hover */}
                <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover/card:translate-x-2.5 group-hover/card:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:translate-y-2.5 group-hover/card:-translate-x-2.5 group-hover/card:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:-translate-y-2.5 group-hover/card:translate-x-2.5 group-hover/card:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 group-hover/card:-translate-x-2.5 group-hover/card:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />

                <div className="relative w-full aspect-[16/10] bg-[#FAF8F5] p-3 sm:p-4 border border-[#E2DDD3] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(255,104,0,0.06)] group-hover/card:shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(255,104,0,0.22)] group-hover/card:border-[#FF6800]/50 transition-all duration-500 ease-out overflow-hidden transform-gpu">
                  <div className="relative w-full h-full overflow-hidden bg-[#101012] border border-black/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]">
                    <img 
                      src={p3.image} 
                      alt={p3.title} 
                      decoding="async"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-100 contrast-[1.02] group-hover/card:scale-[1.03] group-hover/card:brightness-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/15 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.25em] select-none">
                    <span className="text-[#FF6800] font-bold">03</span>
                    <span className="text-neutral-600 font-light">/</span>
                    <span className="text-neutral-500 font-medium">04</span>
                  </div>
                  <div className="h-[1px] w-8 bg-gradient-to-r from-[#FF6800]/50 to-transparent" />
                </div>

                <h3 
                  onClick={(e) => {
                    e.stopPropagation();
                    openStoryModal(2);
                  }}
                  className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight mb-4 uppercase drop-shadow-[0_2px_14px_rgba(255,104,0,0.12)] hover:text-[#FF6800] transition-colors"
                >
                  {p3.title}
                </h3>

                <div className="relative pl-4 border-l-2 border-[#FF6800]/30 mb-6 max-w-xl">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal tracking-wide antialiased">
                    {getSingleSentence(p3.description)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openStoryModal(2);
                  }}
                  className="group/btn relative inline-flex items-center gap-2.5 px-5 py-3 bg-black/80 hover:bg-[#FF6800] border border-[#FF6800]/50 hover:border-[#FF6800] text-[#FF6800] hover:text-black transition-colors duration-200 cursor-pointer w-fit shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(255,104,0,0.12)] hover:shadow-[0_0_25px_rgba(255,104,0,0.4)]"
                >
                  <span className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 border-t border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                  <span className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 border-t border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                  <span className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 border-b border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                  <span className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 border-b border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />

                  <span className="font-sans text-xs uppercase tracking-[0.24em] font-extrabold text-[#FF6800] group-hover/btn:text-black transition-colors duration-200 pointer-events-none select-none">
                    VIEW
                  </span>
                  <span className="w-5 h-5 flex items-center justify-center border border-[#FF6800]/40 group-hover/btn:border-black/40 bg-[#FF6800]/10 group-hover/btn:bg-black/10 transition-colors duration-200 pointer-events-none">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6800] group-hover/btn:text-black transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 pointer-events-none" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* ==================================================================== */}
        {/* SPREAD 03: The Runway Letterbox                                      */}
        {/* LIFESTYLE (Panoramic 21:9 Spread)                                    */}
        {/* ==================================================================== */}
        {p4 && (
          <motion.div 
            className="group/card cursor-pointer flex flex-col transform-gpu"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => openStoryModal(3)}
          >
            <div className="relative">
              {/* Viewfinder Framing Brackets that Snap Inward on Hover */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:translate-y-2.5 group-hover/card:translate-x-2.5 group-hover/card:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:translate-y-2.5 group-hover/card:-translate-x-2.5 group-hover/card:translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5 group-hover:-translate-y-2.5 group-hover/card:translate-x-2.5 group-hover/card:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#FF6800] z-20 pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 group-hover/card:-translate-x-2.5 group-hover/card:-translate-y-2.5 drop-shadow-[0_0_6px_rgba(255,104,0,0.6)]" />

              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#FAF8F5] p-3 sm:p-4.5 border border-[#E2DDD3] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(255,104,0,0.06)] group-hover/card:shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(255,104,0,0.22)] group-hover/card:border-[#FF6800]/50 transition-all duration-500 ease-out overflow-hidden transform-gpu">
                <div className="relative w-full h-full overflow-hidden bg-[#101012] border border-black/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]">
                  <img 
                    src={p4.image} 
                    alt={p4.title} 
                    decoding="async"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-100 contrast-[1.02] group-hover/card:scale-[1.03] group-hover/card:brightness-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/15 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Editorial Caption Bar */}
            <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.25em] select-none">
                  <span className="text-[#FF6800] font-bold">04</span>
                  <span className="text-neutral-600 font-light">/</span>
                  <span className="text-neutral-500 font-medium">04</span>
                </div>
                <div className="h-4 w-[1px] bg-[#FF6800]/40" />
                <h3 
                  onClick={(e) => {
                    e.stopPropagation();
                    openStoryModal(3);
                  }}
                  className="font-serif text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight drop-shadow-[0_2px_14px_rgba(255,104,0,0.12)] hover:text-[#FF6800] transition-colors"
                >
                  {p4.title}
                </h3>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal tracking-wide max-w-xl antialiased">
                {getSingleSentence(p4.description)}
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openStoryModal(3);
                }}
                className="group/btn relative inline-flex items-center gap-2.5 px-5 py-3 bg-black/80 hover:bg-[#FF6800] border border-[#FF6800]/50 hover:border-[#FF6800] text-[#FF6800] hover:text-black transition-colors duration-200 cursor-pointer w-fit shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(255,104,0,0.12)] hover:shadow-[0_0_25px_rgba(255,104,0,0.4)]"
              >
                <span className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 border-t border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                <span className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 border-t border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                <span className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 border-b border-l border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />
                <span className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 border-b border-r border-[#FF6800] group-hover/btn:border-black transition-colors duration-200 pointer-events-none" />

                <span className="font-sans text-xs uppercase tracking-[0.24em] font-extrabold text-[#FF6800] group-hover/btn:text-black transition-colors duration-200 pointer-events-none select-none">
                  VIEW
                </span>
                <span className="w-5 h-5 flex items-center justify-center border border-[#FF6800]/40 group-hover/btn:border-black/40 bg-[#FF6800]/10 group-hover/btn:bg-black/10 transition-colors duration-200 pointer-events-none">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6800] group-hover/btn:text-black transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 pointer-events-none" />
                </span>
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* Localized Story Modal: 3 View CTAs ("both", "photo 1", "photo 2"),   */}
      {/* "next story" CTA, starts at /1, pure visuals with no text/annotations*/}
      {/* ==================================================================== */}
      <AnimatePresence>
        {currentStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none"
            onClick={() => setActiveCategoryIndex(null)}
          >
            {/* Top Minimalist Action Bar */}
            <div 
              className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#202020]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 3 View Mode CTAs with Icons: 'BOTH', 'PHOTO 1', 'PHOTO 2' */}
              <div className="flex items-center gap-2 sm:gap-4 bg-transparent border-0 p-0 shadow-none">
                {([
                  { id: 'both' as const, label: 'BOTH', icon: Columns2 },
                  { id: 'photo1' as const, label: 'PHOTO 1', icon: ImageIcon },
                  { id: 'photo2' as const, label: 'PHOTO 2', icon: ImageIcon },
                ]).map((tab) => {
                  const isActive = viewMode === tab.id;
                  const Icon = tab.icon;

                  if (isActive) {
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setViewMode(tab.id)}
                        className="relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#FF6800] text-black font-glacial font-bold text-xs sm:text-[13px] uppercase tracking-[0.16em] border-2 border-black rounded-none shadow-[3.5px_3.5px_0px_#000000] cursor-pointer select-none transition-none"
                        title={`View ${tab.label}`}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setViewMode(tab.id)}
                      className="group/tab relative inline-flex flex-col items-center bg-transparent border-0 p-0 cursor-pointer select-none"
                      title={`View ${tab.label}`}
                    >
                      <div className="flex items-center gap-2 px-1 py-1.5 text-neutral-300 group-hover/tab:text-[#FF6800] font-glacial font-semibold text-xs sm:text-[13px] uppercase tracking-[0.16em] transition-colors duration-150">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                        <span>{tab.label}</span>
                      </div>
                      {/* Subtle Jagged Underline on Hover */}
                      <div className="w-full h-1 -mt-0.5 overflow-visible opacity-0 group-hover/tab:opacity-100 transition-opacity duration-150 pointer-events-none">
                        <svg
                          viewBox="0 0 60 6"
                          className="w-full h-full"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M 1 3 L 6 1 L 12 5 L 18 1 L 24 5 L 30 1 L 36 5 L 42 1 L 48 5 L 54 1 L 59 4"
                            stroke="#FF6800"
                            strokeWidth="1.6"
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                          />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Story Stamped Ticket CTA & Harsh Raw Cross Close */}
              <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                <button
                  type="button"
                  onClick={handleNextStory}
                  className="modal-ticket-stub group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 font-glacial font-bold text-xs sm:text-[13px] uppercase tracking-[0.16em] cursor-pointer select-none"
                  title="Next story"
                >
                  <span>NEXT STORY</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-100 group-hover:translate-x-1" />
                </button>

                <button 
                  type="button"
                  onClick={() => setActiveCategoryIndex(null)}
                  className="relative p-2 sm:p-2.5 bg-neutral-950 hover:bg-[#FF6800] text-neutral-300 hover:text-black border-2 border-black rounded-none shadow-[3.5px_3.5px_0px_#000000] cursor-pointer select-none transition-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000]"
                  aria-label="Close modal"
                  title="Close modal"
                >
                  <RawHarshCross className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Pure Photographic Canvas (No text or annotations) */}
            <div 
              className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 my-auto overflow-hidden" 
              onClick={(e) => e.stopPropagation()}
            >
              {viewMode === 'both' && (
                <div 
                  key={`both-${activeStoryIndex}`}
                  className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-full max-h-full transition-opacity duration-150"
                >
                  <ContactSheetPrint src={currentStory.photo1} isSingle={false} />
                  <ContactSheetPrint src={currentStory.photo2} isSingle={false} />
                </div>
              )}

              {viewMode === 'photo1' && (
                <div 
                  key={`photo1-${activeStoryIndex}`}
                  className="flex items-center justify-center max-w-full max-h-full transition-opacity duration-150"
                >
                  <ContactSheetPrint src={currentStory.photo1} isSingle={true} />
                </div>
              )}

              {viewMode === 'photo2' && (
                <div 
                  key={`photo2-${activeStoryIndex}`}
                  className="flex items-center justify-center max-w-full max-h-full transition-opacity duration-150"
                >
                  <ContactSheetPrint src={currentStory.photo2} isSingle={true} />
                </div>
              )}
            </div>

            {/* Bottom spacer for balance */}
            <div className="w-full max-w-7xl mx-auto h-2" />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
