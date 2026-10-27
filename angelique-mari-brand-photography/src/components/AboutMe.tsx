import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Instagram } from 'lucide-react';
import bioPortrait from '../assets/images/bio_potrait.jpg';

interface AboutMeProps {
  onBioModalToggle?: (isOpen: boolean) => void;
}

export default function AboutMe({ onBioModalToggle }: AboutMeProps) {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  // Notify parent component of modal open/close state
  useEffect(() => {
    onBioModalToggle?.(isBioModalOpen);
  }, [isBioModalOpen, onBioModalToggle]);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBioModalOpen(false);
      }
    };

    if (isBioModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBioModalOpen]);

  return (
    <section 
      id="about" 
      className="relative w-full bg-white text-neutral-950 py-20 sm:py-28 md:py-36 px-6 sm:px-10 md:px-16 overflow-hidden border-t border-neutral-200 selection:bg-neutral-950 selection:text-white"
    >
      <div className="max-w-xl mx-auto">
        
        {/* Top Minimalist Header Tag & Hairline (exact match to "AHA BHA" line) */}
        <div className="w-full mb-8 sm:mb-12">
          <span className="block font-sans text-xs sm:text-sm tracking-tight text-neutral-400 font-normal mb-2 uppercase">
            AM PHOTOGRAPHY
          </span>
          <div className="w-full h-[1px] bg-neutral-200" />
        </div>

        {/* Content Block */}
        <div className="relative">
          
          {/* Top Label & Organic Pebble Image Lockup (matching "Moringa Oil" & pebble crop) */}
          <div className="relative mb-6 sm:mb-8">
            <div className="flex items-start">
              {/* Bold label matching "Moringa Oil" */}
              <span className="font-sans font-bold text-sm sm:text-base md:text-lg text-neutral-950 tracking-tight mr-4 sm:mr-6 pt-2 shrink-0">
                Angelique-Mari
              </span>

              {/* Organic Pebble Image Cutout (mirroring reference shape and placement) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative cursor-pointer group"
                onClick={() => setIsBioModalOpen(true)}
              >
                <div className="w-36 h-40 sm:w-48 sm:h-52 md:w-56 md:h-60 overflow-hidden rounded-[38%_62%_58%_42%/42%_46%_54%_58%] shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-neutral-100 border border-neutral-200/60 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    src={bioPortrait}
                    alt="Angelique-Mari"
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Headline, Intersecting Geometric Circle, and Indented "See More →" Pill */}
          <div className="relative pt-2">
            
            {/* The Geometric Wireframe Circle intersecting right side of headline */}
            <div 
              className="absolute right-[-20px] sm:right-[-40px] md:right-[-60px] top-[40%] -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full border border-neutral-300 pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Display Typography */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10"
            >
              <h2 
                style={{
                  fontFamily: "'Tan Pearl', 'Playfair Display', Georgia, serif",
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
                className="font-tan-pearl text-3xl sm:text-5xl md:text-6xl font-normal text-neutral-950 tracking-normal leading-[1.18] mb-8 sm:mb-10"
              >
                a lens for<br />
                expression<br />
                and space
              </h2>
            </motion.div>

            {/* Indented Tab/Pill Link: "See More →" (Grey indent cavity matching hero "view portfolio" CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 inline-block"
            >
              {/* Outer Cavity / Recessed Depression with tactile depth */}
              <div className="p-[3px] rounded-full bg-[#050505] shadow-[0_6px_20px_rgba(0,0,0,0.25),inset_0_4px_12px_rgba(0,0,0,1),inset_0_-1px_1px_rgba(255,255,255,0.1)] border-t border-black border-b border-white/15">
                <button
                  type="button"
                  onClick={() => setIsBioModalOpen(true)}
                  aria-label="Read full biography and artist dossier"
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#1c1c1e] hover:bg-[#232326] shadow-[inset_0_5px_12px_rgba(0,0,0,0.95),inset_0_1px_3px_rgba(0,0,0,1),inset_0_-1px_2px_rgba(255,255,255,0.12)] border-t border-black/80 border-b border-white/10 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <div className="relative flex flex-col">
                    <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.24em] font-bold text-[#FF6800] group-hover:text-white transition-colors pb-0.5">
                      ZOOM IN
                    </span>
                    <span className="relative w-full h-[1.5px] bg-[#FF6800]/25 overflow-hidden block">
                      <motion.span
                        className="absolute top-0 bottom-0 w-full bg-[#FF6800] group-hover:bg-white block shadow-[0_0_6px_rgba(255,104,0,0.8)]"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          ease: 'easeInOut',
                        }}
                      />
                    </span>
                  </div>
                  <span className="text-[#FF6800] group-hover:text-white text-xs sm:text-sm font-bold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Bio Modal Overlay */}
      <AnimatePresence>
        {isBioModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsBioModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-2xl bg-[#FAF9F6] text-neutral-950 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-neutral-300 overflow-hidden z-10 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Nav Bar */}
              <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-neutral-200 bg-white/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6800]" />
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
                    BEHIND THE LENS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBioModalOpen(false)}
                  className="group flex items-center gap-1.5 text-xs font-mono tracking-widest text-neutral-500 hover:text-neutral-950 uppercase transition-colors px-2 py-1 rounded cursor-pointer"
                  aria-label="Close bio modal"
                >
                  <span className="hidden sm:inline">[ CLOSE ]</span>
                  <X className="w-4 h-4 sm:hidden group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 space-y-6">
                
                {/* Header: Photo + Identity Lockup */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-neutral-200">
                  <div className="w-28 h-32 sm:w-32 sm:h-36 shrink-0 overflow-hidden rounded-[40%_60%_55%_45%/45%_50%_50%_55%] shadow-md bg-neutral-200 border border-neutral-300">
                    <img
                      src={bioPortrait}
                      alt="Angelique-Mari"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                      Angelique-Mari
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6800] font-semibold mt-1">
                      Lead Photographer & Visual Director
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-neutral-500 mt-2 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Johannesburg, South Africa</span>
                    </div>
                  </div>
                </div>

                {/* Manifesto & Narrative */}
                <div className="space-y-4 text-neutral-700 leading-relaxed font-light text-sm sm:text-base">
                  <p>
                    Photography has always been my way of noticing the little things — the fleeting expressions, the beautiful details and the moments that might otherwise go unnoticed.
                  </p>
                  <p>
                    Whether we’re capturing a milestone, building your brand’s visual identity or simply creating beautiful photographs for the sake of it, I’ll bring my whole heart, a creative perspective and a calm, comfortable approach to every shoot.
                  </p>
                  <p className="font-sans italic text-base sm:text-lg font-medium text-neutral-900 border-l-2 border-[#FF6800] pl-4 py-2 bg-neutral-100/70 rounded-r-md leading-relaxed my-2">
                    “As a creative photographer, I love bringing together natural emotion and thoughtful direction to create images that feel personal, expressive and unmistakably yours.”
                  </p>
                  <p>
                    I don’t believe you need to be a professional model to look incredible in photographs. You just need to feel comfortable enough to be yourself. That’s where I come in.
                  </p>
                </div>

              </div>

              {/* Modal Footer: Instagram CTA */}
              <div className="flex items-center justify-between gap-3 px-6 py-4 sm:px-10 sm:py-5 border-t border-neutral-200 bg-white/90 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6800]" />
                  <span>CONNECT ON INSTAGRAM</span>
                </div>

                {/* Indented white pill with depth (icon only) */}
                <div className="p-[3px] rounded-full bg-[#E5E3DE] shadow-[inset_0_3px_8px_rgba(0,0,0,0.18),inset_0_-1px_1px_rgba(255,255,255,0.95),0_2px_5px_rgba(0,0,0,0.04)] border-t border-neutral-300/80 border-b border-white">
                  <a
                    href="https://www.instagram.com/iambrandthecreative"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Instagram: @iambrandthecreative"
                    title="Instagram: @iambrandthecreative"
                    className="group relative inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#FAF9F6] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.08)] border-t border-white border-b border-neutral-200 text-[#FF6800] hover:text-black transition-all duration-300 active:scale-[0.96] cursor-pointer"
                  >
                    <Instagram className="w-5 h-5 stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
