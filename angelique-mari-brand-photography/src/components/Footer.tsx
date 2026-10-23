import { Instagram, Mail } from "lucide-react";
import logoMain from "../assets/images/logo-main-nobg.png";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

interface FooterProps {
  onReviewClick?: () => void;
}

export default function Footer({ onReviewClick }: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black text-[#FF6800] py-16 md:py-24 px-6 md:px-12 z-10 border-t border-[#FF6800]/20">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Editorial Official Logo Centerpiece Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full pb-12 md:pb-16 pt-2 border-b border-[#FF6800]/20 select-none">
          {/* Left copyright with serif elegant font - slightly more faded */}
          <div className="font-['Playfair_Display',Georgia,serif] italic text-base md:text-lg text-[#FF6800]/40 leading-none whitespace-nowrap shrink-0 self-center md:self-end md:mb-4">
            © {currentYear}
          </div>

          {/* Center Dimensional Ring Logo & Brand Typography */}
          <div className="flex-1 flex flex-col items-center justify-center py-4 text-center group cursor-pointer">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-2 border-[#FF6800] border-t-[#FF8D33] border-b-[#C44E00] bg-[#050505] p-3 sm:p-4 flex items-center justify-center shadow-[0_6px_22px_rgba(255,104,0,0.35),inset_0_1.5px_3px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(255,104,0,0.5),inset_0_1.5px_3px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.85)] transition-all duration-500">
              <img
                src={logoMain}
                alt="Angelique-Mari AM Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/logo-main-nobg.png';
                }}
              />
            </div>

            <div className="mt-4 sm:mt-5 text-center select-none">
              <span className="block font-serif text-lg sm:text-xl md:text-2xl font-normal uppercase tracking-[0.12em] text-white group-hover:text-[#FF6800] transition-colors duration-300">
                Angelique-Mari
              </span>
              <span className="block font-sans text-[10px] sm:text-xs font-semibold lowercase tracking-[0.45em] text-[#FF6800] mt-1">
                photography
              </span>
            </div>
          </div>

          {/* Right graphic copyright - slightly more faded */}
          <div className="font-serif text-2xl md:text-3xl font-light text-[#FF6800]/40 leading-none select-none shrink-0 self-center md:self-end md:mb-4 pr-1">
            ©
          </div>
        </div>

        {/* Top bar replicated from the reference image, without navigation links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 md:pt-14 pb-4 w-full">
          {/* Left Email - Masking Tape Sticker with Orange Zigzag Underline */}
          <div className="flex-1 flex flex-col items-center md:items-start select-none">
            {/* Torn Masking Tape Strip */}
            <div className="relative w-full max-w-[310px] sm:max-w-[340px] transform -rotate-[0.6deg]">
              <svg
                viewBox="0 0 350 34"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ filter: 'drop-shadow(3px 3px 0px #000000)' }}
              >
                <defs>
                  <linearGradient id="footerMaskingTapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8e8e2" />
                    <stop offset="30%" stopColor="#deded6" />
                    <stop offset="65%" stopColor="#eaeae4" />
                    <stop offset="100%" stopColor="#d5d5cd" />
                  </linearGradient>
                </defs>
                {/* Torn Jagged Frayed Edges on Left and Right Ends */}
                <path
                  d="M 12 3 
                     L 6 0 L 11 6 L 4 10 L 9 16 L 3 21 L 9 27 L 4 30 L 14 29
                     L 336 31 
                     L 344 32 L 340 25 L 347 20 L 341 14 L 346 7 L 340 2 L 336 3
                     Z"
                  fill="url(#footerMaskingTapeGrad)"
                  stroke="#555"
                  strokeWidth="0.5"
                />
                {/* Fibrous tape grain lines */}
                <line x1="18" y1="11" x2="330" y2="12" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="16 10" />
                <line x1="22" y1="22" x2="324" y2="23" stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="12 14" />
              </svg>

              {/* Email Type inside Tape */}
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-5">
                <a
                  href="mailto:ang@amstudio.photography"
                  style={{
                    fontFamily: "'Glacial Indifference', sans-serif",
                    fontWeight: 400,
                  }}
                  className="font-glacial text-xs sm:text-[13px] md:text-[14px] font-normal tracking-[0.08em] lowercase text-black hover:text-[#FF5500] transition-colors select-all flex items-center gap-2 whitespace-nowrap"
                  title="Email: ang@amstudio.photography"
                >
                  <Mail className="w-3.5 h-3.5 stroke-[1.75] text-black shrink-0" />
                  <span>ang@amstudio.photography</span>
                </a>
              </div>
            </div>

            {/* Jagged Hand-Drawn Ink Underline */}
            <div className="w-full max-w-[270px] sm:max-w-[310px] pl-1 mt-0.5 transform rotate-[0.4deg]">
              <svg
                viewBox="0 0 320 14"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ filter: 'drop-shadow(2px 2px 0px #000000)' }}
              >
                <path
                  d="M 2 7 L 16 2 L 34 11 L 52 2 L 72 12 L 92 3 L 112 11 L 132 2 L 154 12 L 176 3 L 198 11 L 220 2 L 242 12 L 264 3 L 286 11 L 306 4 L 318 8"
                  stroke="#FF6800"
                  strokeWidth="3.2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
          </div>

          {/* Center Direct Review Hash Link to Modal */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <a
              href="#review"
              onClick={(e) => {
                if (onReviewClick) {
                  e.preventDefault();
                  onReviewClick();
                } else {
                  window.location.hash = '#review';
                }
              }}
              className="text-[#FF6800] hover:text-white uppercase tracking-wider font-semibold underline underline-offset-4 transition-colors flex items-center gap-1.5"
            >
              <span>+ LEAVE A REVIEW</span>
            </a>
          </div>

          {/* Social Icons: Instagram and WhatsApp */}
          <div className="flex justify-center md:justify-end items-center gap-5 flex-1 text-[#FF6800]">
            <a 
              href="https://www.instagram.com/iambrandthecreative" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors p-1" 
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a 
              href="https://wa.me/27686313538" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors p-1" 
              aria-label="WhatsApp"
              title="WhatsApp: 0686313538"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

