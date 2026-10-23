import React from 'react';
import logoMain from '../assets/images/logo-main-nobg.png';

export interface LogoProps {
  /**
   * Logo mode:
   * - 'full': Complete formal lockup (ANGELIQUE-MARI + AM monogram + PHOTOGRAPHY)
   * - 'monogram': Monogram or logo brand mark
   */
  mode?: 'full' | 'monogram';
  /**
   * Theme variant of the logo
   */
  variant?: 'black' | 'white' | 'orange' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  ariaLabel?: string;
}

export default function Logo({
  mode = 'full',
  variant = 'auto',
  className = '',
  size = 'md',
  ariaLabel = 'Angelique-Mari Photography Logo'
}: LogoProps) {
  // Responsive size defaults
  const sizeClasses = {
    sm: 'h-8 sm:h-10 md:h-12',
    md: 'h-12 sm:h-16 md:h-20 lg:h-24',
    lg: 'h-16 sm:h-22 md:h-28 lg:h-32',
    xl: 'h-24 sm:h-32 md:h-40',
    custom: ''
  };

  const selectedSize = size === 'custom' ? '' : (sizeClasses[size] || sizeClasses.md);

  return (
    <div className={`inline-flex items-center justify-center shrink-0 ${selectedSize} ${className}`}>
      <img
        src={logoMain}
        alt={ariaLabel}
        className="w-auto h-full max-h-full object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to public path if bundler import fails
          (e.currentTarget as HTMLImageElement).src = '/assets/images/logo-main-nobg.png';
        }}
      />
    </div>
  );
}

