import React, { useState, useEffect, useRef, useId } from 'react';
import { Check, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

import imageBrideGroomStories from '../assets/images/Bride & Groom Stories/title_image.jpg';
import imageYourStageArtist from '../assets/images/Your Stage/title_image.jpg';
import imageJoburgFamily from '../assets/images/Family Moments/title_image.jpg';
import imageJoburgLifestyle from '../assets/images/Lifestyle/title_image.jpg';

const WHATSAPP_BASE = 'https://wa.me/27686313538';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

interface ShootCategory {
  id: string;
  title: string;
  image: string;
}

const SHOOT_CATEGORIES: ShootCategory[] = [
  {
    id: 'bride-and-groom-stories',
    title: 'BRIDE & GROOM STORIES',
    image: imageBrideGroomStories,
  },
  {
    id: 'your-stage',
    title: 'YOUR STAGE',
    image: imageYourStageArtist,
  },
  {
    id: 'family-moments',
    title: 'FAMILY MOMENTS',
    image: imageJoburgFamily,
  },
  {
    id: 'lifestyle',
    title: 'LIFESTYLE',
    image: imageJoburgLifestyle,
  },
];

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const WEEKDAY_NAMES = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

/* Tactile Masking Tape / Torn Paper Badge for Dynamic Message Spans */
function MaskingTapeTag({
  children,
  tilt = 'rotate-0',
}: {
  children: React.ReactNode;
  tilt?: string;
}) {
  return (
    <span
      className={`inline-flex items-center align-middle my-1 mx-1 px-2.5 py-0.5 font-mono text-xs sm:text-[13px] font-black text-black select-none transform ${tilt} transition-transform hover:rotate-0`}
      style={{
        backgroundColor: '#eae5d9',
        backgroundImage: `
          repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 6px),
          linear-gradient(180deg, #f8f6f0 0%, #ece7dd 45%, #ded8cc 100%)
        `,
        filter: 'drop-shadow(2px 2px 0px #000000) drop-shadow(0px 2px 4px rgba(0,0,0,0.75))',
        clipPath: `polygon(
          0% 3px, 3px 0%,
          calc(100% - 3px) 0%, 100% 3px,
          99.1% 22%, 97.4% 48%, 99.2% 76%,
          100% calc(100% - 3px), calc(100% - 3px) 100%,
          3px 100%, 0% calc(100% - 3px),
          0.8% 74%, 2.5% 50%, 0.8% 24%
        )`,
      }}
    >
      <span className="relative z-10 text-black drop-shadow-[0_0_0.5px_rgba(0,0,0,0.7)] tracking-tight sm:tracking-normal">
        {children}
      </span>
    </span>
  );
}

export default function EnquiryForm() {
  const [clientName, setClientName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('bride-and-groom-stories');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const nameInputId = useId();
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen]);

  // Listen for external focus triggers
  useEffect(() => {
    const handleSelectFocus = (e: Event) => {
      const customEvent = e as CustomEvent<{ topic: string }>;
      const topic = customEvent.detail?.topic?.toLowerCase();
      if (!topic) return;

      if (topic.includes('bride') || topic.includes('groom') || topic.includes('wedding')) {
        setSelectedCategoryId('bride-and-groom-stories');
      } else if (topic.includes('stage') || topic.includes('performance') || topic.includes('dj')) {
        setSelectedCategoryId('your-stage');
      } else if (topic.includes('family')) {
        setSelectedCategoryId('family-moments');
      } else if (topic.includes('lifestyle')) {
        setSelectedCategoryId('lifestyle');
      }
    };

    window.addEventListener('select-booking-focus', handleSelectFocus);
    return () => window.removeEventListener('select-booking-focus', handleSelectFocus);
  }, []);

  const selectedCategory = SHOOT_CATEGORIES.find((c) => c.id === selectedCategoryId) || SHOOT_CATEGORIES[0];

  const formatDisplayDate = (d: Date | null) => {
    if (!d) return '';
    const day = d.getDate();
    const month = MONTH_NAMES[d.getMonth()].slice(0, 3);
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const generateWhatsAppMessage = () => {
    const trimmedName = clientName.trim() || '[name]';
    const categoryName = selectedCategory ? selectedCategory.title : 'FOCUS';
    let message = `Hi Angelique-Mari, my name is ${trimmedName}. I would love to enquire about a ${categoryName} session.`;
    if (selectedDate) {
      message += `\n\nPreferred Date: ${formatDisplayDate(selectedDate)}`;
    }
    return message;
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((prev) => prev - 1);
    } else {
      setCalMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((prev) => prev + 1);
    } else {
      setCalMonth((prev) => prev + 1);
    }
  };

  // Generate day cells for calendar
  const generateCalendarDays = () => {
    const firstDay = new Date(calYear, calMonth, 1);
    const lastDay = new Date(calYear, calMonth + 1, 0);

    // Monday as starting day (0 = Mon, ..., 6 = Sun)
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek < 0) startDayOfWeek = 6;

    const totalDays = lastDay.getDate();
    const cells: (number | null)[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      cells.push(d);
    }

    return cells;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setNameError(true);
      const inputEl = document.getElementById(nameInputId);
      if (inputEl) inputEl.focus();
      return;
    }

    setNameError(false);
    setIsRedirecting(true);

    const message = generateWhatsAppMessage();
    const finalUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false);
    }, 400);
  };

  return (
    <section
      id="booking"
      className="relative w-full bg-black text-[#FF6800] py-20 sm:py-28 md:py-36 px-6 sm:px-10 md:px-16 z-10 border-t border-[#FF6800]/20 overflow-hidden"
    >
      {/* Background Architectural Ambient Glow (Isolated on GPU compositor layer) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20 blur-[120px] rounded-full transform-gpu will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255,104,0,0.3) 0%, transparent 70%)',
          transform: 'translate3d(-50%, 0, 0)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Editorial Screen-Printed Title Lockup */}
        <div className="flex flex-col items-start mb-10 sm:mb-14 select-none">
          {/* Main Title Plaque with Asphalt Grit Texture Background matching reference image */}
          <div 
            className="relative inline-block border-2 border-black transform -rotate-1 origin-bottom-left px-3.5 sm:px-5 md:px-7 py-1.5 sm:py-2 md:py-2.5"
            style={{
              backgroundColor: '#303033',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.32)), url('/assets/asphalt-texture.png')`,
              backgroundRepeat: 'repeat',
              backgroundSize: '160px 160px',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -1px 2px rgba(0,0,0,0.85), inset 0 0 8px rgba(0,0,0,0.55), 4px 4px 0px #000000',
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                textShadow: '3px 3px 0px #000000, 4px 4px 2px rgba(0,0,0,0.85)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
              }}
              className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-serif font-bold uppercase tracking-tight text-white leading-tight"
            >
              CHOOSE YOUR SHOOT
            </h2>
          </div>

          {/* Rough Torn Masking-Tape Strip with Jagged Underline beneath */}
          <div className="mt-3.5 flex flex-col items-start gap-1 w-full max-w-[340px] sm:max-w-[420px]">
            {/* Torn Masking Tape Strip */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] transform rotate-[0.6deg]">
              <svg
                viewBox="0 0 340 32"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ filter: 'drop-shadow(3px 3px 0px #000000)' }}
              >
                <defs>
                  <linearGradient id="maskingTapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
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
                     L 326 31 
                     L 334 32 L 330 25 L 337 20 L 331 14 L 336 7 L 330 2 L 326 3
                     Z"
                  fill="url(#maskingTapeGrad)"
                  stroke="#555"
                  strokeWidth="0.5"
                />
                {/* Fibrous tape grain lines */}
                <line x1="20" y1="10" x2="318" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="16 10" />
                <line x1="24" y1="21" x2="312" y2="22" stroke="rgba(0,0,0,0.12)" strokeWidth="1" strokeDasharray="12 14" />
              </svg>

              {/* Stamped Gig Poster Type inside Tape */}
              <div className="absolute inset-0 flex items-center px-6">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-black text-black select-none">
                  START HERE
                </span>
              </div>
            </div>

            {/* Jagged Hand-Drawn Ink Underline */}
            <div className="w-full max-w-[280px] sm:max-w-[340px] pl-1 transform -rotate-[0.5deg]">
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
        </div>

        {/* Enquiry Form */}
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
          
          {/* Visual Category Selection Cards (High Letter-Spacing for Maximum Legibility) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {SHOOT_CATEGORIES.map((category) => {
              const isSelected = selectedCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`group relative text-center p-2.5 sm:p-3 transition-all duration-300 cursor-pointer flex flex-col justify-between border select-none ${
                    isSelected
                      ? 'bg-neutral-950 border-[#FF6800] shadow-[0_0_25px_rgba(255,104,0,0.25)]'
                      : 'bg-[#09090b] border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {/* Viewfinder Registration Corners when Selected */}
                  {isSelected && (
                    <>
                      <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FF6800]" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FF6800]" />
                      <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FF6800]" />
                      <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FF6800]" />
                    </>
                  )}

                  {/* Image Chamber */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-black border border-neutral-900 mb-3">
                    <img
                      src={category.image}
                      alt={category.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isSelected
                          ? 'grayscale-0 scale-[1.02]'
                          : 'grayscale contrast-110 opacity-75 group-hover:grayscale-0 group-hover:opacity-100'
                      }`}
                    />

                    {/* Selected Check Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-20 w-5 h-5 bg-[#FF6800] text-black flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Category Title with Generous Letter Spacing for High Legibility */}
                  <span
                    className={`font-sans text-[11px] sm:text-xs md:text-[13px] font-extrabold uppercase tracking-[0.22em] py-1 transition-colors leading-relaxed block ${
                      isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                    }`}
                  >
                    {category.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Form Fields: Name & Interactive Optional Calendar Picker */}
          <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              
              {/* Name Input */}
              <div>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (nameError) setNameError(false);
                  }}
                  placeholder="ENTER YOUR NAME"
                  className={`w-full bg-[#0a0a0c] border ${
                    nameError ? 'border-red-500' : 'border-neutral-800'
                  } focus:border-[#FF6800] text-white text-sm px-4 py-3.5 font-sans rounded-none outline-none transition-all placeholder:text-neutral-500 text-center sm:text-left`}
                />
                {nameError && (
                  <p className="text-red-400 text-xs mt-1.5 font-mono text-center sm:text-left">
                    * Please enter your name
                  </p>
                )}
              </div>

              {/* Optional Calendar Date Picker Trigger & Popover */}
              <div className="relative" ref={calendarRef}>
                <div
                  onClick={() => setIsCalendarOpen((prev) => !prev)}
                  className={`w-full bg-[#0a0a0c] border ${
                    isCalendarOpen ? 'border-[#FF6800]' : 'border-neutral-800'
                  } hover:border-neutral-700 text-sm px-4 py-3.5 font-sans rounded-none transition-all cursor-pointer flex items-center justify-between select-none ${
                    selectedDate ? 'text-white' : 'text-neutral-500'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsCalendarOpen((prev) => !prev);
                    }
                  }}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <CalendarIcon className="w-4 h-4 text-[#FF6800] shrink-0" />
                    <span className="truncate">
                      {selectedDate ? formatDisplayDate(selectedDate) : 'Date (Optional)'}
                    </span>
                  </div>

                  {selectedDate ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate(null);
                      }}
                      className="p-0.5 text-neutral-400 hover:text-white transition-colors"
                      title="Clear date"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest shrink-0">
                      CALENDAR
                    </span>
                  )}
                </div>

                {/* Calendar Dropdown Popover */}
                {isCalendarOpen && (
                  <div className="absolute top-full left-0 right-0 sm:left-auto sm:right-0 sm:w-72 mt-2 bg-[#09090b] border border-[#FF6800]/50 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(255,104,0,0.15)] z-50 select-none">
                    
                    {/* Calendar Month Navigation Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#FF6800]">
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Weekday Labels */}
                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-neutral-500 mb-2 tracking-wider">
                      {WEEKDAY_NAMES.map((w, idx) => (
                        <span key={idx}>{w}</span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                      {generateCalendarDays().map((dayNumber, index) => {
                        if (dayNumber === null) {
                          return <div key={`empty-${index}`} className="h-7 w-7" />;
                        }

                        const cellDate = new Date(calYear, calMonth, dayNumber);
                        const isToday =
                          today.getDate() === dayNumber &&
                          today.getMonth() === calMonth &&
                          today.getFullYear() === calYear;
                        const isCurrentSelected =
                          selectedDate &&
                          selectedDate.getDate() === dayNumber &&
                          selectedDate.getMonth() === calMonth &&
                          selectedDate.getFullYear() === calYear;

                        return (
                          <button
                            key={`day-${dayNumber}`}
                            type="button"
                            onClick={() => {
                              setSelectedDate(cellDate);
                              setIsCalendarOpen(false);
                            }}
                            className={`h-7 w-7 flex items-center justify-center transition-all cursor-pointer text-xs rounded-none ${
                              isCurrentSelected
                                ? 'bg-[#FF6800] text-black font-extrabold shadow-[0_0_10px_rgba(255,104,0,0.6)]'
                                : isToday
                                ? 'border border-[#FF6800]/60 text-white hover:bg-neutral-800'
                                : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                            }`}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer Actions: Clear Date or Close */}
                    <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDate(null);
                          setIsCalendarOpen(false);
                        }}
                        className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        CLEAR
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(false)}
                        className="text-[#FF6800] font-semibold hover:text-white transition-colors cursor-pointer"
                      >
                        CLOSE
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>

            {/* Dynamic Real-Time Message Preview */}
            <div className="w-full bg-[#08080a] border border-neutral-800/80 p-3.5 sm:p-4 mt-1">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800">
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#FF6800]">
                  MESSAGE PREVIEW
                </span>
                <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-label="WhatsApp live status">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </span>
              </div>
              <div className="bg-black border border-neutral-900 p-3 sm:p-4 font-mono text-xs sm:text-[13px] text-neutral-300 leading-relaxed sm:leading-loose whitespace-pre-wrap select-text">
                Hi Angelique-Mari, my name is{' '}
                <MaskingTapeTag tilt="-rotate-[1.5deg]">
                  {clientName.trim() ? clientName.trim() : '[name]'}
                </MaskingTapeTag>
                . I would love to enquire about a{' '}
                <MaskingTapeTag tilt="rotate-[1deg]">
                  {selectedCategory ? selectedCategory.title : '[FOCUS]'}
                </MaskingTapeTag>{' '}
                session.
                {selectedDate && (
                  <>
                    {'\n\n'}
                    Preferred Date:{' '}
                    <MaskingTapeTag tilt="-rotate-[0.5deg]">
                      {formatDisplayDate(selectedDate)}
                    </MaskingTapeTag>
                  </>
                )}
              </div>
            </div>

            {/* Submission CTA: "CONFIRM ON {WHATSAPP-ICON}" */}
            <button
              type="submit"
              disabled={isRedirecting}
              className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 bg-[#FF6800] hover:bg-white text-black font-sans text-xs sm:text-sm uppercase tracking-[0.22em] font-extrabold transition-all duration-300 shadow-[0_4px_30px_rgba(255,104,0,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-[0.98] cursor-pointer disabled:opacity-50 mt-2"
            >
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FF6800] group-hover/btn:border-white transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FF6800] group-hover/btn:border-white transition-colors duration-300" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FF6800] group-hover/btn:border-white transition-colors duration-300" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FF6800] group-hover/btn:border-white transition-colors duration-300" />

              <span className="relative z-10 select-none">
                {isRedirecting ? 'CONNECTING...' : 'SEND ON'}
              </span>

              <WhatsAppIcon className="relative z-10 w-5 h-5 fill-current transition-transform duration-300 group-hover/btn:scale-110" />
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}
