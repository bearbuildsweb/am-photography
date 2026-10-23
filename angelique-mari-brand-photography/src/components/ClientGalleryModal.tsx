import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, MessageCircle } from 'lucide-react';

interface ClientGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PIXIESET_GALLERY_URL = 'https://ambrandcreatives.pixieset.com/';
const WHATSAPP_PASSCODE_URL =
  'https://wa.me/27686313538?text=Hi%20Angelique-Mari%2C%20could%20you%20please%20send%20me%20the%20passcode%20for%20my%20Pixieset%20client%20gallery%3F';

/* Metallic Industrial Archival Staple */
function MetallicStaple({ className = 'w-7 h-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 14"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.95))' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stapleChrome" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="15%" stopColor="#f4f4f5" />
          <stop offset="45%" stopColor="#a1a1aa" />
          <stop offset="75%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
      </defs>
      {/* Puncture slot shadow indentations */}
      <rect x="2" y="3" width="2.5" height="8" rx="1" fill="#000000" />
      <rect x="39.5" y="3" width="2.5" height="8" rx="1" fill="#000000" />
      {/* Main metal staple bar */}
      <path
        d="M 3.2 10.5 L 3.2 3.5 C 3.2 2.5 4.2 1.8 5.2 1.8 L 38.8 1.8 C 39.8 1.8 40.8 2.5 40.8 3.5 L 40.8 10.5"
        stroke="url(#stapleChrome)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Jagged Tailor's Zig-Zag Stitch Line */
function JaggedStitchLine({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 18"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }}
    >
      {/* Punctured thread holes */}
      <circle cx="6" cy="9" r="1.5" fill="#000000" />
      <circle cx="18" cy="2" r="1.5" fill="#000000" />
      <circle cx="30" cy="16" r="1.5" fill="#000000" />
      <circle cx="42" cy="2" r="1.5" fill="#000000" />
      <circle cx="54" cy="16" r="1.5" fill="#000000" />
      <circle cx="66" cy="2" r="1.5" fill="#000000" />
      <circle cx="78" cy="16" r="1.5" fill="#000000" />
      <circle cx="90" cy="2" r="1.5" fill="#000000" />
      <circle cx="102" cy="16" r="1.5" fill="#000000" />
      <circle cx="114" cy="2" r="1.5" fill="#000000" />
      <circle cx="126" cy="16" r="1.5" fill="#000000" />
      <circle cx="134" cy="9" r="1.5" fill="#000000" />

      {/* Crisp White Stitched Thread with tactile dashes */}
      <path
        d="M 6 9 L 18 2 L 30 16 L 42 2 L 54 16 L 66 2 L 78 16 L 90 2 L 102 16 L 114 2 L 126 16 L 134 9"
        stroke="#ffffff"
        strokeWidth="2"
        strokeDasharray="6 2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

/* Frayed-Edge Electrical Tape Cross 'X' Button */
function ElectricalTapeCross({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(1px 3px 4px rgba(0,0,0,0.92))' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tapeStrip1" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#343438" />
          <stop offset="35%" stopColor="#1c1c1e" />
          <stop offset="65%" stopColor="#28282c" />
          <stop offset="100%" stopColor="#141416" />
        </linearGradient>
        <linearGradient id="tapeStrip2" x1="44" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3c3c42" />
          <stop offset="40%" stopColor="#202023" />
          <stop offset="60%" stopColor="#2c2c30" />
          <stop offset="100%" stopColor="#161618" />
        </linearGradient>
      </defs>

      {/* Strip 1: Bottom-left to top-right with frayed torn jagged edges */}
      <path
        d="M 7 35 L 4 38 L 7 40 L 5 42 L 11 40 L 37 13 L 41 11 L 39 8 L 42 6 L 38 4 L 33 6 L 7 33 Z"
        fill="url(#tapeStrip1)"
        stroke="#48484c"
        strokeWidth="0.6"
      />
      {/* Specular sheen down strip 1 */}
      <path d="M 9 35 L 35 9" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* Strip 2: Top-left to bottom-right overlapping with frayed torn jagged edges */}
      <path
        d="M 6 7 L 4 4 L 8 3 L 5 1 L 11 3 L 37 31 L 41 33 L 39 36 L 42 38 L 38 41 L 33 38 L 6 9 Z"
        fill="url(#tapeStrip2)"
        stroke="#505055"
        strokeWidth="0.6"
      />
      {/* Specular sheen down strip 2 */}
      <path d="M 8 9 L 35 36" stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" strokeDasharray="4 2.5" />

      {/* Overlap contact shadow */}
      <circle cx="22" cy="22" r="4.5" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}

export default function ClientGalleryModal({ isOpen, onClose }: ClientGalleryModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-[410px] bg-[#0c0c0e] border border-neutral-700/60 p-7 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_40px_rgba(0,0,0,0.8)] z-10 text-white overflow-hidden"
        >
          {/* Subtle Noise / Grain Overlay (Matte Screen-Printed Texture) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.16] mix-blend-screen z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Frayed-Edge Electrical Tape Cross Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 cursor-pointer group transition-transform duration-200 hover:rotate-6 hover:scale-105 active:scale-95 z-20"
            aria-label="Close client gallery modal"
          >
            <ElectricalTapeCross className="w-9 h-9 sm:w-10 sm:h-10" />
          </button>

          {/* Asymmetric Header Lockup: Metallic Staples & Jagged Stitch Accent */}
          <div className="relative z-10 pt-1 mb-6">
            <div className="flex items-center gap-2.5 mb-3.5">
              {/* Dual Metallic Industrial Staples */}
              <div className="flex items-center gap-1.5 shrink-0 transform -rotate-3">
                <MetallicStaple className="w-6 h-3" />
                <MetallicStaple className="w-6 h-3" />
              </div>

              {/* Jagged tailor's stitch line spanning across */}
              <div className="flex-1 opacity-90 overflow-hidden">
                <JaggedStitchLine className="w-full max-w-[130px] h-3.5" />
              </div>
            </div>

            {/* Stark Screen-Printed Sub-label */}
            <div className="inline-block mb-1.5">
              <span
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                }}
                className="font-mono text-[10px] sm:text-[11px] font-black tracking-[0.24em] uppercase text-black bg-white px-2 py-0.5 border border-white inline-block shadow-[2px_2px_0px_rgba(255,104,0,1)]"
              >
                PIXIESET PORTAL
              </span>
            </div>

            {/* Stark High-Contrast White 'CLIENT GALLERY' Headline in Tan Pearl */}
            <h3
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
              }}
              className="font-heading font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.05em] text-[#FFFFFF] leading-[1.2] select-none mt-2"
            >
              CLIENT GALLERY
            </h3>
          </div>

          {/* Asymmetric Action Elements */}
          <div className="relative z-10 flex flex-col gap-3.5 pt-1">
            {/* Primary Bridge Button: Bold screenprint block */}
            <a
              href={PIXIESET_GALLERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full py-4 px-6 bg-[#FF6800] hover:bg-white text-black font-sans text-xs sm:text-sm uppercase tracking-[0.2em] font-black flex items-center justify-between transition-all cursor-pointer shadow-[0_6px_22px_rgba(255,104,0,0.32),3px_3px_0px_#000000] active:scale-[0.98] group"
            >
              <span className="font-extrabold tracking-[0.22em]">ENTER GALLERY</span>
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
            </a>

            {/* Secondary Passcode Action: Pushed slightly off-center to the left */}
            <div className="w-full flex justify-start -translate-x-1 sm:-translate-x-2">
              <a
                href={WHATSAPP_PASSCODE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[88%] sm:w-[84%] py-3 px-4 bg-neutral-900/90 hover:bg-neutral-800 text-white hover:text-[#FF6800] border border-white/20 hover:border-[#FF6800] font-sans text-[11px] sm:text-xs uppercase tracking-[0.16em] font-bold flex items-center justify-between transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.7),2px_2px_0px_rgba(255,255,255,0.08)]"
              >
                <span>REQUEST PASSCODE</span>
                <MessageCircle className="w-3.5 h-3.5 text-[#FF6800]" />
              </a>
            </div>
          </div>

          {/* Elevated, Centered, Muted Archival Footer */}
          <div className="relative z-10 mt-7 pt-4 border-t border-neutral-800/80 flex items-center justify-center text-center">
            <span className="text-[10px] sm:text-[11px] font-sans font-extrabold text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.26em] select-none">
              AM PHOTOGRAPHY
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
