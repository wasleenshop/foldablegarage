'use client';

import { motion } from 'framer-motion';

/**
 * Quote page hero section with animated gradient background.
 * Features a rotating conic gradient + ambient glow orbs + laser lines.
 */
export function QuoteHeroSection() {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-bg-primary md:min-h-[400px]">
      {/* ── Animated gradient background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Rotating conic gradient orb */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'clamp(400px, 60vw, 900px)',
            height: 'clamp(400px, 60vw, 900px)',
            background:
              'conic-gradient(from var(--angle, 0deg), #C9A84C 0%, #00D4FF 25%, #7C3AED 50%, #C9A84C 75%, #00D4FF 100%)',
            animation: 'gradientOrbRotate 8s linear infinite',
            filter: 'blur(100px)',
            opacity: 0.15,
          }}
        />

        {/* Secondary ambient glow */}
        <div
          className="absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'clamp(300px, 40vw, 600px)',
            height: 'clamp(300px, 40vw, 600px)',
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            opacity: 0.08,
            animation: 'pulseGlowSlow 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4"
          style={{
            width: 'clamp(250px, 30vw, 500px)',
            height: 'clamp(250px, 30vw, 500px)',
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
            opacity: 0.06,
            animation: 'pulseGlowSlow 5s ease-in-out infinite 1s',
          }}
        />

        {/* Animated laser lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g opacity={0.12}>
            <path
              d="M-200,150 Q400,50 720,250 T1640,150"
              stroke="#00D4FF"
              strokeWidth="1.5"
              fill="none"
              className="animate-laser-flow"
              strokeDasharray="4 8"
            />
            <path
              d="M-100,350 Q300,200 720,400 T1640,300"
              stroke="#7C3AED"
              strokeWidth="1"
              fill="none"
              className="animate-laser-flow"
              strokeDasharray="3 7"
              style={{ animationDelay: '0.8s' }}
            />
            <path
              d="M0,100 Q500,300 720,150 T1440,250 T1800,100"
              stroke="#C9A84C"
              strokeWidth="0.8"
              fill="none"
              className="animate-laser-flow"
              strokeDasharray="5 10"
              style={{ animationDelay: '1.5s' }}
            />
          </g>
        </svg>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <span className="inline-block rounded-full border border-accent-gold/20 bg-accent-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-gold">
            Instant Quote
          </span>

          <h1 className="mt-6 font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-text-primary">
            Configure Your{' '}
            <span className="bg-gradient-to-r from-accent-gold via-accent-cyan to-accent-violet bg-clip-text text-transparent">
              Foldable Garage
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Select your dimensions, colour, and premium options for an instant price estimate.
            Every Wasleen carport is precision-engineered for the UAE climate.
          </p>
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
