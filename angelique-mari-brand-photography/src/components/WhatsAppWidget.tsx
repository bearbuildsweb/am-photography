import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';

const WHATSAPP_NUMBER = '27686313538';
const DEFAULT_MESSAGE = "Hi Angelique-Mari, I'm interested in discussing a shoot with AM Photography";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

function WhatsAppGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

interface WhatsAppWidgetProps {
  isHidden?: boolean;
}

type SectionKey = 'hero' | 'portfolio' | 'about' | 'booking-or-below';

export default function WhatsAppWidget({ isHidden = false }: WhatsAppWidgetProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionKey>('hero');

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    let ticking = false;

    const updateSection = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      // Section detection trigger point (approx 45% of viewport)
      const triggerPoint = viewportHeight * 0.45;

      const portfolioEl = document.getElementById('portfolio');
      const aboutEl = document.getElementById('about');
      const bookingEl = document.getElementById('booking');

      let nextSection: SectionKey = 'hero';
      if (bookingEl && bookingEl.getBoundingClientRect().top <= triggerPoint) {
        nextSection = 'booking-or-below';
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= triggerPoint) {
        nextSection = 'about';
      } else if (portfolioEl && portfolioEl.getBoundingClientRect().top <= triggerPoint) {
        nextSection = 'portfolio';
      }

      setCurrentSection((prev) => (prev !== nextSection ? nextSection : prev));
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateSection();
          ticking = false;
        });
      }
    };

    updateSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mobile rules:
  // - Hero: visible on left-hand side
  // - Portfolio: hidden
  // - About: visible on right-hand side
  // - Enquiry & below: hidden
  const isHiddenOnMobile = currentSection === 'portfolio' || currentSection === 'booking-or-below';
  const isHiddenOnDesktop = currentSection === 'booking-or-below';
  const shouldHide = isHidden || (isMobile ? isHiddenOnMobile : isHiddenOnDesktop);

  const mobileAlignmentClass =
    isMobile && currentSection === 'about'
      ? 'right-4 left-auto'
      : isMobile
      ? 'left-4 right-auto'
      : 'right-6 lg:right-8 left-auto';

  const widgetMarkup = (
    <aside
      id="floating-whatsapp-widget"
      aria-label="Direct studio conversation"
      className={`fixed z-[9999] transform-gpu will-change-transform transition-all duration-500 ease-out ${
        shouldHide
          ? 'opacity-0 translate-y-8 pointer-events-none'
          : 'opacity-100 translate-y-0 pointer-events-auto'
      } bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] lg:bottom-8 ${mobileAlignmentClass}`}
    >
      {/* MOBILE & TABLET VIEW: Floating Circular Action Button (FAB) Styled like a Wax Seal / Stamped Metal Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct on WhatsApp with Angelique-Mari"
        title="WhatsApp: +27 68 631 3538"
        className="flex lg:hidden group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black border-[3px] border-[#FF5500] items-center justify-center cursor-pointer select-none active:translate-x-[2px] active:translate-y-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] hover:scale-105 transition-transform duration-200"
        style={{
          boxShadow: '4px 4px 0px #000000',
        }}
      >
        {/* Subtle stamped wax-seal / metal coin concentric contour */}
        <span className="absolute inset-[2.5px] rounded-full border border-[#FF5500]/35 pointer-events-none" />

        {/* WhatsApp Icon Only */}
        <WhatsAppGlyph className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-current text-[#FF5500] group-hover:text-white transition-colors" />
      </a>

      {/* DESKTOP VIEW: Classic Editorial Pill Widget */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-trigger"
        aria-label="Let's talk on WhatsApp with Angelique-Mari"
        className="hidden lg:flex group relative items-center gap-3 bg-[#0a0a0a]/95 text-[#FF6800] hover:text-white border border-[#FF6800]/50 hover:border-[#FF6800] px-4 py-3 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(255,104,0,0.15)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.95),0_0_28px_rgba(255,104,0,0.35)] backdrop-blur-xl transition-all duration-300 active:scale-[0.97]"
      >
        {/* Subtle Live Status Indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6800] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6800]" />
        </span>

        {/* Brand-Styled WhatsApp Icon */}
        <WhatsAppGlyph className="w-4 h-4 fill-current text-[#FF6800] group-hover:text-white transition-colors shrink-0" />

        {/* Confident, Understated Editorial Text */}
        <div className="flex flex-col text-left">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] leading-tight flex items-center gap-1">
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
            START CHAT
          </span>
        </div>
      </a>
    </aside>
  );

  if (!mounted || typeof document === 'undefined') {
    return widgetMarkup;
  }

  return createPortal(widgetMarkup, document.body);
}
