'use client';

import React from 'react';

interface WasleenGarageLogoProps {
  /** Logo size in pixels (width and height will be equal) */
  size?: number;
  /** Show the wordmark text next to the icon */
  showWordmark?: boolean;
  /** Render in white for dark backgrounds (disables gold gradient) */
  inverted?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Wasleen Foldable Garage — "W-Shape Pergola" Logo
 *
 * A premium architectural mark featuring a W-shaped pergola roof profile
 * (two peaks), horizontal rafter beams, decorative grill/lattice work
 * between columns, and a rich gold-to-copper gradient for a luxury
 * Middle Eastern aesthetic.
 *
 * @example
 * ```tsx
 * <WasleenGarageLogo size={48} />
 * <WasleenGarageLogo size={80} showWordmark />
 * <WasleenGarageLogo size={40} inverted />  // white on dark
 * ```
 */
export function WasleenGarageLogo({
  size = 40,
  showWordmark = false,
  inverted = false,
  className,
  style,
}: WasleenGarageLogoProps) {

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      role="img"
      aria-label="Wasleen Foldable Garage"
    >
      {/* ─── Always gold gradient (inverted prop ignored for icon) ─── */}
      <defs>
        <linearGradient id="pg-gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9D976" />
          <stop offset="25%" stopColor="#E8B84B" />
          <stop offset="60%" stopColor="#D4A02B" />
          <stop offset="100%" stopColor="#A67C00" />
        </linearGradient>
        <linearGradient id="pg-copper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8A87C" />
          <stop offset="50%" stopColor="#CD7F32" />
          <stop offset="100%" stopColor="#A0652A" />
        </linearGradient>
        <linearGradient id="pg-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F9D976" stopOpacity={0} />
          <stop offset="40%" stopColor="#F9D976" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#F9D976" stopOpacity={0} />
        </linearGradient>
        <filter id="pg-glow" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="1" />
          <feComponentTransfer><feFuncA type="linear" slope={0.15} /></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* W-Shape Roof Profile */}
      <path
        d="M 37,85 L 65,25 L 100,55 L 135,25 L 163,85"
        stroke="url(#pg-gold)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"
        filter="url(#pg-glow)"
      />

      {/* Rafters */}
      <line x1="42" y1="72" x2="158" y2="72" stroke="url(#pg-gold)" strokeWidth="3.5" strokeLinecap="round" opacity={0.9} />
      <line x1="38" y1="82" x2="162" y2="82" stroke="url(#pg-gold)" strokeWidth="3" strokeLinecap="round" opacity={0.8} />
      <line x1="35" y1="92" x2="165" y2="92" stroke="url(#pg-gold)" strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />

      {/* Columns */}
      <rect x="30" y="95" width="10" height="88" rx="4" fill="url(#pg-gold)" />
      <rect x="32" y="97" width="6" height="84" rx="2" fill="url(#pg-highlight)" opacity={0.5} />
      <rect x="160" y="95" width="10" height="88" rx="4" fill="url(#pg-gold)" />
      <rect x="162" y="97" width="6" height="84" rx="2" fill="url(#pg-highlight)" opacity={0.5} />

      {/* Column Capitals */}
      <rect x="28" y="93" width="14" height="4" rx="2" fill="url(#pg-gold)" opacity={0.8} />
      <rect x="158" y="93" width="14" height="4" rx="2" fill="url(#pg-gold)" opacity={0.8} />

      {/* Grills — Lattice */}
      <g stroke="url(#pg-copper)" strokeWidth="1.5">
        <line x1="40" y1="110" x2="160" y2="150" opacity={0.45} />
        <line x1="40" y1="130" x2="160" y2="170" opacity={0.45} />
        <line x1="40" y1="150" x2="160" y2="190" opacity={0.35} />
        <line x1="160" y1="110" x2="40" y2="150" opacity={0.45} />
        <line x1="160" y1="130" x2="40" y2="170" opacity={0.45} />
        <line x1="160" y1="150" x2="40" y2="190" opacity={0.35} />
      </g>

      {/* Horizontal Divider Bars */}
      <g stroke="url(#pg-gold)" strokeWidth="1.5">
        <line x1="40" y1="120" x2="160" y2="120" opacity={0.35} />
        <line x1="40" y1="140" x2="160" y2="140" opacity={0.35} />
        <line x1="40" y1="160" x2="160" y2="160" opacity={0.35} />
      </g>

      {/* Base Platform */}
      <rect x="26" y="183" width="148" height="4" rx="2" fill="url(#pg-gold)" opacity={0.25} />

      {/* Wordmark */}
      {showWordmark && (
        <g transform="translate(170, 110)">
          <text
            x="0" y="0"
            fill={inverted ? '#FFFFFF' : '#1A1A1A'}
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="22"
            fontWeight={600}
            letterSpacing="0.04em"
          >
            Wasleen
          </text>
          <text
            x="0" y="16"
            fill={inverted ? '#999999' : '#999999'}
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="8"
            fontWeight={400}
            letterSpacing="0.2em"
          >
            FOLDABLE GARAGE
          </text>
        </g>
      )}
    </svg>
  );
}

export default WasleenGarageLogo;
