'use client';

/**
 * SVG animated laser background for hero sections.
 * Cyan (#00D4FF) and violet (#7C3AED) animated paths.
 */
export function KineticBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cyan laser lines */}
        <g opacity={0.15}>
          <path
            d="M-200,300 Q200,100 400,400 T1000,200 T1600,500"
            stroke="#00D4FF"
            strokeWidth="1.5"
            fill="none"
            className="animate-laser-flow"
            strokeDasharray="4 8"
          />
          <path
            d="M-100,600 Q300,300 600,600 T1200,400 T1700,700"
            stroke="#00D4FF"
            strokeWidth="1"
            fill="none"
            className="animate-laser-flow"
            strokeDasharray="2 6"
            style={{ animationDelay: '0.5s' }}
          />
        </g>

        {/* Violet laser lines */}
        <g opacity={0.12}>
          <path
            d="M-300,500 Q100,800 500,500 T1100,700 T1600,300"
            stroke="#7C3AED"
            strokeWidth="1.5"
            fill="none"
            className="animate-laser-flow"
            strokeDasharray="3 7"
            style={{ animationDelay: '1s' }}
          />
          <path
            d="M0,200 Q400,500 800,200 T1400,500 T1800,200"
            stroke="#7C3AED"
            strokeWidth="1"
            fill="none"
            className="animate-laser-flow"
            strokeDasharray="5 10"
            style={{ animationDelay: '1.5s' }}
          />
        </g>

        {/* Ambient glow circles */}
        <g opacity={0.06}>
          <circle cx="720" cy="450" r="300" fill="#00D4FF" className="animate-pulse-glow" />
          <circle cx="500" cy="300" r="200" fill="#7C3AED" className="animate-pulse-glow" style={{ animationDelay: '0.7s' }} />
        </g>
      </svg>
    </div>
  );
}
