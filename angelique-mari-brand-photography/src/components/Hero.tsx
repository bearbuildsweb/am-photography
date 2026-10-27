import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, ChevronDown } from 'lucide-react';
import Logo from './Logo';

import heroImg1 from '../assets/images/Hero/1.jpg';
import heroImg2 from '../assets/images/Hero/2.jpg';
import heroImg3 from '../assets/images/Hero/3.jpg';
import heroImg4 from '../assets/images/Hero/4.jpg';
import heroImg5 from '../assets/images/Hero/5.jpg';
import heroImg6 from '../assets/images/Hero/6.jpg';
import heroImg7 from '../assets/images/Hero/7.jpg';

const WHATSAPP_URL = 'https://wa.me/27686313538?text=Hi%20Angelique-Mari%2C%20I%27d%20like%20to%20talk%20about%20a%20shoot%20with%20AM%20Photography.';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

/* Sophisticated Screen-Printed Stitch Underline with Subtle Risograph Misregistration */
function RoughPaintUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 12"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Subtle Risograph ghost ink plate offset */}
      <path
        d="M 2 7 L 12 3 L 24 9 L 36 2 L 48 9 L 60 3 L 72 9 L 84 2 L 96 9 L 108 3 L 120 9 L 132 2 L 144 8 L 158 5"
        stroke="#FF3700"
        strokeWidth="2.2"
        strokeLinecap="square"
        transform="translate(1, 0.75)"
        opacity="0.35"
      />
      {/* Primary sharp screen-printed warm orange stroke */}
      <path
        d="M 2 7 L 12 3 L 24 9 L 36 2 L 48 9 L 60 3 L 72 9 L 84 2 L 96 9 L 108 3 L 120 9 L 132 2 L 144 8 L 158 5"
        stroke="#FF6800"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* Rough Screen-Printed Hamburger Icon with Uneven Edges & Subtle Grain */
function RoughScreenPrintHamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 22 16"
      className="w-4.5 h-3.5 sm:w-5 sm:h-4 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Screenprint Grain & Ink Bleed Filter */}
        <filter id="inkRoughness" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Top Rough Screen-Printed Stroke */}
      <path
        d="M 1 2.5 L 5.5 2.2 L 11 2.6 L 16.5 2.3 L 21 2.5"
        stroke="#FF5500"
        strokeWidth="2.6"
        strokeLinecap="square"
        filter="url(#inkRoughness)"
        className={`transition-none origin-center transform ${
          isOpen ? 'translate-y-[5.5px] rotate-45' : 'translate-y-0 rotate-0'
        }`}
      />

      {/* Middle Rough Screen-Printed Stroke */}
      <path
        d="M 1 8 L 6.5 8.3 L 12 7.8 L 17.5 8.2 L 21 8"
        stroke="#FF5500"
        strokeWidth="2.6"
        strokeLinecap="square"
        filter="url(#inkRoughness)"
        className={`transition-none ${isOpen ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Bottom Rough Screen-Printed Stroke */}
      <path
        d="M 1 13.5 L 5 13.2 L 10.5 13.7 L 16 13.3 L 21 13.5"
        stroke="#FF5500"
        strokeWidth="2.6"
        strokeLinecap="square"
        filter="url(#inkRoughness)"
        className={`transition-none origin-center transform ${
          isOpen ? '-translate-y-[5.5px] -rotate-45' : 'translate-y-0 rotate-0'
        }`}
      />
    </svg>
  );
}

/* Frayed-Edge Masking Tape 'CLOSE' Button with Stamped Feel */
function MaskingTapeCloseButton({
  onClick,
  className = '',
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close navigation menu"
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none transition-none transform -rotate-[2deg] hover:-rotate-[1deg] active:translate-x-[2px] active:translate-y-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] ${className}`}
      style={{
        filter: 'drop-shadow(3px 3px 0px #000000)',
      }}
    >
      <svg
        viewBox="0 0 105 34"
        className="w-[96px] h-[30px] sm:w-[104px] sm:h-[32px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Default Masking Tape Texture */}
          <linearGradient id="tapeNormal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#edece6" />
            <stop offset="35%" stopColor="#deddd5" />
            <stop offset="70%" stopColor="#ecebe3" />
            <stop offset="100%" stopColor="#d8d7cf" />
          </linearGradient>
          {/* Hover High-Contrast Fluorescent Orange Tape */}
          <linearGradient id="tapeHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6800" />
            <stop offset="50%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF3700" />
          </linearGradient>
        </defs>

        {/* Frayed Torn Tape Path with jagged ripped edges on left and right */}
        <path
          d="M 5 2 
             L 2 5 L 4 9 L 1 13 L 5 17 L 1 21 L 4 26 L 2 30 L 6 32
             L 99 32 
             L 103 29 L 100 25 L 104 20 L 101 15 L 104 10 L 101 6 L 103 2
             Z"
          className="fill-[url(#tapeNormal)] group-hover:fill-[url(#tapeHover)] transition-none"
          stroke="#27272a"
          strokeWidth="0.8"
        />

        {/* Subtle fibrous tape grain texture */}
        <line x1="8" y1="9" x2="96" y2="10" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeDasharray="8 5" />
        <line x1="10" y1="23" x2="94" y2="24" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" strokeDasharray="6 7" />
      </svg>

      {/* Stamped Ink Text on Tape */}
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] sm:text-xs font-black tracking-[0.2em] text-black transition-none uppercase">
        CLOSE ✕
      </span>
    </button>
  );
}

/* Hand-Stamped Directional Arrow Icon */
function StampedArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M 10 2.5 L 10 15.5 M 4.5 10.5 L 10 16 L 15.5 10.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <rect x="8.5" y="17" width="3" height="1" fill="currentColor" />
    </svg>
  );
}

const HERO_IMAGES = [
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
  heroImg6,
  heroImg7,
];

interface HeroProps {
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
  onReviewClick?: () => void;
  onClientGalleryClick?: () => void;
}

export default function Hero({
  menuOpen: controlledMenuOpen,
  setMenuOpen: controlledSetMenuOpen,
  onReviewClick,
  onClientGalleryClick,
}: HeroProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [isDeveloping, setIsDeveloping] = useState(true);
  const [clientAccessDropdownOpen, setClientAccessDropdownOpen] = useState(false);

  const menuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : internalMenuOpen;
  const setMenuOpen = controlledSetMenuOpen || setInternalMenuOpen;

  // Keep dropdown hidden by default whenever the menu closes
  useEffect(() => {
    if (!menuOpen) {
      setClientAccessDropdownOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    const devTimer = setTimeout(() => {
      setIsDeveloping(false);
    }, 2200);
    return () => clearTimeout(devTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeImage = HERO_IMAGES[currentSlide];

  const handleScrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between bg-black text-[#FF6800] overflow-hidden z-10">
      
      {/* 1. Cinematic Ambient Background (Lightweight, GPU-friendly) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={activeImage}
            alt=""
            decoding="async"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'linear' }}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 will-change-opacity"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black z-10" />
      </div>

      {/* 2. Sleek Top Navigation Header */}
      <header className="relative w-full z-40 px-4 sm:px-6 py-3.5 sm:py-4 md:px-12 flex justify-between items-center border-b border-[#FF6800]/20 bg-black/60 backdrop-blur-md transform-gpu">
        {/* Brand Lockup */}
        <div 
          className="flex items-center gap-3 sm:gap-4 md:gap-5 cursor-pointer group py-1" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="AM Studio — Angelique-Mari Photography"
        >
          <Logo 
            mode="full" 
            variant="orange" 
            size="md" 
            className="h-10 sm:h-12 md:h-14 group-hover:scale-[1.02] transition-transform duration-300 ease-out" 
          />

          {/* Archival Studio Badge */}
          <div className="hidden sm:flex flex-col justify-center border border-[#FF6800] px-3 py-1.5 sm:px-3.5 sm:py-2 bg-black/60 backdrop-blur-sm select-none">
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold text-[#FF6800] leading-tight">
              FROM THE STUDIO OF
            </span>
            <span className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.16em] font-extrabold text-white leading-tight mt-0.5">
              ANGELIQUE-MARI
            </span>
          </div>
        </div>

        {/* Physical Stamped Navigation Toggle with Deliberate 2px Press */}
        <div className="inline-flex items-center justify-center p-[2px] rounded-full bg-gradient-to-b from-[#0a0a0c] via-[#050506] to-[#000000] border border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(0,0,0,0.95)]">
          <button
            id="header-nav-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative flex items-center justify-center w-12 h-7 sm:w-14 sm:h-8 rounded-full bg-gradient-to-b from-[#252528] via-[#18181a] to-[#101012] border-t border-white/15 border-b border-black/90 shadow-[2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-none cursor-pointer select-none"
          >
            <RoughScreenPrintHamburger isOpen={menuOpen} />
          </button>
        </div>
      </header>

      {/* 3. Navigation Drawer & Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[380px] md:w-[390px] bg-black/98 border-l border-[#FF6800]/30 z-50 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl text-[#FF6800] overflow-y-auto sm:overflow-y-visible"
            >
            <div className="flex flex-col gap-3.5 border-b border-[#FF6800]/20 pb-4 sm:pb-5">
              {/* Row 1: Logo & Masking Tape [ CLOSE ] Button */}
              <div className="flex justify-between items-center w-full">
                <Logo mode="full" variant="orange" size="md" className="h-9 sm:h-11" />
                <div className="flex justify-end items-center pr-0.5">
                  <MaskingTapeCloseButton onClick={() => setMenuOpen(false)} />
                </div>
              </div>

              {/* Row 2: Studio Badge & Stamped Instagram Icon */}
              <div className="flex justify-between items-center w-full">
                {/* Studio Badge for Drawer with subtle tilt */}
                <div className="border border-[#FF6800] px-2.5 py-1 sm:px-3 sm:py-1.5 self-start bg-black/60 shadow-[2px_2px_0px_#000000] transform -rotate-[0.8deg]">
                  <span className="font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.22em] font-semibold text-[#FF6800] block leading-tight">
                    FROM THE STUDIO OF
                  </span>
                  <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] font-extrabold text-white block leading-tight mt-0.5">
                    ANGELIQUE-MARI
                  </span>
                </div>

                {/* Stamped Instagram Badge with uneven rotation & harsh drop shadow */}
                <div className="flex justify-end items-center pr-1.5">
                  <a
                    href="https://www.instagram.com/iambrandthecreative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[#111113] border-2 border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500] hover:text-black transition-none cursor-pointer transform rotate-[2.5deg] hover:rotate-[1deg] shadow-[3px_3px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
                    aria-label="Follow AM Studio on Instagram"
                    title="Instagram @iambrandthecreative"
                  >
                    <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2] fill-none transition-none" />
                    {/* Stamped registration tick in corner */}
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#FF5500] group-hover:bg-black transition-none" />
                  </a>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-4 sm:gap-5 my-auto py-2">
              {/* 01 / COLLECTION */}
              <a
                href="#portfolio"
                onClick={() => setMenuOpen(false)}
                className="group relative flex flex-col items-start transition-all duration-300 ease select-none pl-3 border-l-2 border-transparent hover:border-[#FF6800]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm sm:text-xs text-neutral-500 group-hover:text-[#FF6800] transition-colors duration-300 ease">
                    01 /
                  </span>
                  <span className="nav-stencil-link text-2xl xs:text-[26px] sm:text-xl md:text-[22px] font-normal uppercase tracking-[0.05em]">
                    COLLECTION
                  </span>
                </div>
                {/* Screen-Printed Stitch Mark with Subtle Risograph Misregistration */}
                <div className="w-full max-w-[240px] sm:max-w-[190px] h-2 mt-0.5 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease pointer-events-none">
                  <RoughPaintUnderline className="w-full h-full" />
                </div>
              </a>

              {/* 02 / ABOUT */}
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="group relative flex flex-col items-start transition-all duration-300 ease select-none pl-3 border-l-2 border-transparent hover:border-[#FF6800]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm sm:text-xs text-neutral-500 group-hover:text-[#FF6800] transition-colors duration-300 ease">
                    02 /
                  </span>
                  <span className="nav-stencil-link text-2xl xs:text-[26px] sm:text-xl md:text-[22px] font-normal uppercase tracking-[0.05em]">
                    ABOUT <span className="font-light text-neutral-400 group-hover:text-[#FF6800] transition-colors duration-300 ease font-sans">Ang-Mari</span>
                  </span>
                </div>
                <div className="w-full max-w-[270px] sm:max-w-[220px] h-2 mt-0.5 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease pointer-events-none">
                  <RoughPaintUnderline className="w-full h-full" />
                </div>
              </a>

              {/* 03 / ENQUIRE */}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="group relative flex flex-col items-start transition-all duration-300 ease select-none pl-3 border-l-2 border-transparent hover:border-[#FF6800]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm sm:text-xs text-neutral-500 group-hover:text-[#FF6800] transition-colors duration-300 ease">
                    03 /
                  </span>
                  <span className="nav-stencil-link text-2xl xs:text-[26px] sm:text-xl md:text-[22px] font-normal uppercase tracking-[0.05em]">
                    ENQUIRE
                  </span>
                </div>
                <div className="w-full max-w-[200px] sm:max-w-[150px] h-2 mt-0.5 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease pointer-events-none">
                  <RoughPaintUnderline className="w-full h-full" />
                </div>
              </a>

              {/* 04 / CLIENT ACCESS Drop-down (sub-links hidden by default) */}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setClientAccessDropdownOpen((prev) => !prev)}
                  className="group relative flex flex-col items-start w-full text-left cursor-pointer transition-all duration-300 ease select-none pl-3 border-l-2 border-transparent hover:border-[#FF6800]"
                  aria-expanded={clientAccessDropdownOpen}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm sm:text-xs text-neutral-500 group-hover:text-[#FF6800] transition-colors duration-300 ease">
                        04 /
                      </span>
                      <span className="nav-stencil-link text-2xl xs:text-[26px] sm:text-xl md:text-[22px] font-normal uppercase tracking-[0.05em]">
                        CLIENT ACCESS
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 group-hover:text-[#FF6800] transition-all duration-300 ease ${
                        clientAccessDropdownOpen ? 'rotate-180 text-[#FF6800]' : 'rotate-0'
                      }`}
                    />
                  </div>
                  <div className="w-full max-w-[270px] sm:max-w-[220px] h-2 mt-0.5 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease pointer-events-none">
                    <RoughPaintUnderline className="w-full h-full" />
                  </div>
                </button>

                <AnimatePresence>
                  {clientAccessDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2.5 pl-8 pt-2 pb-0.5">
                        <a
                          href="#reviews"
                          onClick={(e) => {
                            setMenuOpen(false);
                            const el = document.getElementById('reviews');
                            if (el) {
                              e.preventDefault();
                              el.scrollIntoView({ behavior: 'smooth' });
                            } else if (onReviewClick) {
                              e.preventDefault();
                              onReviewClick();
                            }
                          }}
                          className="group/sub relative flex flex-col items-start transition-all duration-300 ease select-none"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF6800] text-sm sm:text-xs font-mono transition-colors duration-300 ease">↳</span>
                            <span className="nav-stencil-link text-lg sm:text-base font-normal uppercase tracking-[0.08em]">
                              REVIEWS
                            </span>
                          </div>
                          <div className="w-full max-w-[120px] sm:max-w-[100px] h-1.5 mt-0.5 overflow-hidden opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 ease pointer-events-none">
                            <RoughPaintUnderline className="w-full h-full" />
                          </div>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            if (onClientGalleryClick) {
                              onClientGalleryClick();
                            }
                          }}
                          className="group/sub relative flex flex-col items-start text-left cursor-pointer transition-all duration-300 ease select-none"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF6800] text-sm sm:text-xs font-mono transition-colors duration-300 ease">↳</span>
                            <span className="nav-stencil-link text-lg sm:text-base font-normal uppercase tracking-[0.08em]">
                              CLIENT GALLERY
                            </span>
                          </div>
                          <div className="w-full max-w-[170px] sm:max-w-[140px] h-1.5 mt-0.5 overflow-hidden opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 ease pointer-events-none">
                            <RoughPaintUnderline className="w-full h-full" />
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Nav Drawer Footer: Centered WhatsApp CTA */}
            <div className="border-t border-[#FF6800]/20 pt-4 sm:pt-5 flex justify-center items-center w-full">
              <div className="p-[3px] rounded-full bg-[#050505] shadow-[0_6px_20px_rgba(0,0,0,0.95),inset_0_4px_12px_rgba(0,0,0,1),inset_0_-1px_1px_rgba(255,255,255,0.1)] border-t border-black border-b border-white/15">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct on WhatsApp with AM Studio"
                  title="WhatsApp: +27 68 631 3538"
                  className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1c1c1e] hover:bg-[#232326] shadow-[inset_0_5px_12px_rgba(0,0,0,0.95),inset_0_1px_3px_rgba(0,0,0,1),inset_0_-1px_2px_rgba(255,255,255,0.12)] border-t border-black/80 border-b border-white/10 transition-all duration-300 active:scale-[0.96] text-[#FF6800] hover:text-white cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      {/* 4. Minimal, Cinematic Editorial Hero Stage (Centered on All Viewports) */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 px-6 sm:px-10 md:px-14 lg:px-16 py-8 sm:py-12 md:py-16 w-full max-w-7xl mx-auto text-center">
        
        {/* Crisp Museum Print Centerpiece — The Hero Statement */}
        <div 
          className="relative group cursor-pointer self-center"
          onClick={handleScrollToPortfolio}
          title="View Portfolio"
        >
          {/* Subtle Archival Corner Brackets */}
          <div className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-[#FF6800] z-30 pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-[#FF6800] z-30 pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-[#FF6800] z-30 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-[#FF6800] z-30 pointer-events-none" />

          {/* Center Target Crosshair (revealed once image is developed) */}
          {!isDeveloping && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <span className="text-[#FF6800] text-xl font-sans font-light select-none tracking-widest opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500">
                +
              </span>
            </div>
          )}

          {/* Crisp White Museum Matting Frame */}
          <div className="w-[290px] h-[360px] sm:w-[350px] sm:h-[440px] md:w-[410px] md:h-[510px] lg:w-[450px] lg:h-[560px] max-h-[64vh] bg-white p-2.5 sm:p-3.5 border-4 border-white shadow-[0_30px_90px_rgba(0,0,0,0.98)] relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.015]">
            <div className="relative w-full h-full overflow-hidden bg-black">
              {/* Darkroom Preloader (Only for hero framed image) */}
              <AnimatePresence>
                {isDeveloping && (
                  <motion.div
                    key="hero-preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-4 text-center select-none"
                  >
                    <div className="font-mono flex flex-col items-center justify-center space-y-2">
                      <span className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#FF6800] font-bold">
                        DEVELOPING IMAGE
                      </span>
                      <span className="text-base sm:text-lg tracking-widest text-[#FF6800] leading-none">
                        ██████░░░░
                      </span>
                      <span className="text-xs sm:text-sm tracking-wider text-[#FF6800] font-medium">
                        72%
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={activeImage}
                  alt="Editorial Photography"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.9 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stark Ticket Stub / Printed Label CTA with Instant Physical Snap */}
        <div className="mt-8 sm:mt-11 self-center select-none">
          <a
            href="#portfolio"
            id="hero-view-portfolio-cta"
            aria-label="View portfolio of works"
            className="hero-ticket-stub group relative inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 bg-[#FF5500] text-black font-mono font-black text-xs sm:text-sm uppercase tracking-[0.2em] border-2 border-black cursor-pointer select-none"
          >
            <span>VIEW PORTFOLIO</span>
            <StampedArrowIcon className="w-4 h-4 text-black shrink-0" />
          </a>
        </div>

      </div>

    </section>
  );
}
