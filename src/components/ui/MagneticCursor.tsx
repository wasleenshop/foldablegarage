'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

// ─── Types ───────────────────────────────────────────

interface RippleRing {
  id: number;
  x: number;
  y: number;
}

// ─── Constants ───────────────────────────────────────

const OUTER_RING_SIZE = 32;
const INNER_DOT_SIZE = 6;
const TRAIL_DOT_SIZE = 14;
const HALF_OUTER = OUTER_RING_SIZE / 2;
const HALF_TRAIL = TRAIL_DOT_SIZE / 2;

const MAX_RINGS = 8;
const RING_LIFETIME_MS = 1200;
const SPAWN_THROTTLE_MS = 60;
const RING_MAX_SIZE = 48;

const GOLD = 'rgba(201, 168, 76,';
const CYAN = 'rgba(0, 212, 255,';

// ─── Component ───────────────────────────────────────

export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [ripples, setRipples] = useState<RippleRing[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // ── Mouse position (spring-smoothed) ────────────────

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.5 });

  // ── Trailing dot (more damped → follows behind like a droplet tail) ──

  const trailX = useSpring(mouseX, { stiffness: 200, damping: 35, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 200, damping: 35, mass: 0.8 });

  // ── Velocity tracking (for liquid morph) ────────────

  const prevMouseX = useRef(-100);
  const prevMouseY = useRef(-100);
  const rawVelocityX = useMotionValue(0);
  const rawVelocityY = useMotionValue(0);

  // Smooth velocity with very light spring — feels organic
  const velocityX = useSpring(rawVelocityX, { stiffness: 80, damping: 12 });
  const velocityY = useSpring(rawVelocityY, { stiffness: 80, damping: 12 });

  // ── Liquid droplet transforms ───────────────────────

  // Rotation angle: direction of movement
  const rotate = useTransform(
    [velocityX, velocityY],
    ([vx, vy]) => {
      const angle = Math.atan2(vy as number, vx as number);
      return `${angle}rad`;
    },
  );

  // Stretch: elongate in direction of movement
  // velocity magnitude 0–50 → stretch 1–1.45
  const dropletStretch = useTransform(
    [velocityX, velocityY],
    ([vx, vy]) => {
      const speed = Math.sqrt(
        (vx as number) ** 2 + (vy as number) ** 2,
      );
      return 1 + Math.min(speed * 0.012, 0.45);
    },
  );

  // Perpendicular compression (area-preserving)
  const dropletCompress = useTransform(dropletStretch, (s) => 1 / s);

  // ── Scale (expands on hover) ────────────────────────

  const cursorScale = useMotionValue(1);
  const springScale = useSpring(cursorScale, { stiffness: 400, damping: 20 });

  // Combined scale = hover scale × droplet morph
  const combinedScaleX = useTransform(
    [dropletStretch, springScale],
    ([stretch, scale]) => (scale as number) * (stretch as number),
  );
  const combinedScaleY = useTransform(
    [dropletCompress, springScale],
    ([compress, scale]) => (scale as number) * (compress as number),
  );

  // ── "DRAG" label opacity ────────────────────────────

  const dragLabelOpacity = useMotionValue(0);
  const springDragLabel = useSpring(dragLabelOpacity, {
    stiffness: 300,
    damping: 25,
  });

  // ── Ring spawn refs ─────────────────────────────────

  const lastSpawnRef = useRef(0);
  const rippleIdRef = useRef(0);
  const cleanupRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // ── Handlers ────────────────────────────────────────

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update positions
      mouseX.set(clientX);
      mouseY.set(clientY);

      // Calculate raw velocity
      const dx = clientX - prevMouseX.current;
      const dy = clientY - prevMouseY.current;
      rawVelocityX.set(dx);
      rawVelocityY.set(dy);
      prevMouseX.current = clientX;
      prevMouseY.current = clientY;

      // Spawn ripple ring (throttled)
      const now = Date.now();
      if (now - lastSpawnRef.current > SPAWN_THROTTLE_MS) {
        lastSpawnRef.current = now;
        const id = rippleIdRef.current++;
        setRipples((prev) => {
          const next = [...prev, { id, x: clientX, y: clientY }];
          return next.length > MAX_RINGS ? next.slice(-MAX_RINGS) : next;
        });
      }
    },
    [mouseX, mouseY, rawVelocityX, rawVelocityY],
  );

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor="cta"], [data-cursor="drag"]',
      );

      if (interactive) {
        setIsHovering(true);
        cursorScale.set(1.6);

        if (
          interactive.hasAttribute('data-cursor') &&
          interactive.getAttribute('data-cursor') === 'drag'
        ) {
          setIsDraggable(true);
          dragLabelOpacity.set(1);
        } else {
          setIsDraggable(false);
          dragLabelOpacity.set(0);
        }
      }
    },
    [cursorScale, dragLabelOpacity],
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      const interactive = target.closest(
        'a, button, [data-cursor="cta"], [data-cursor="drag"]',
      );

      if (
        interactive &&
        (!related ||
          !related.closest(
            'a, button, [data-cursor="cta"], [data-cursor="drag"]',
          ))
      ) {
        setIsHovering(false);
        setIsDraggable(false);
        cursorScale.set(1);
        dragLabelOpacity.set(0);
      }
    },
    [cursorScale, dragLabelOpacity],
  );

  // ── Effects ─────────────────────────────────────────

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent) =>
      setIsTouchDevice(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);

    touchQuery.addEventListener('change', handleTouchChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      touchQuery.removeEventListener('change', handleTouchChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // ── Mouse event listeners ───────────────────────────

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const showTimer = setTimeout(() => setIsVisible(true), 100);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      clearTimeout(showTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, [isTouchDevice, prefersReducedMotion, handleMouseMove, handleMouseOver, handleMouseOut]);

  // ── Hydration guard & ripple ring cleanup ───────────

  useEffect(() => {
    // Mark as hydrated after first client render
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    cleanupRef.current = setInterval(() => {
      const cutoff = Date.now() - RING_LIFETIME_MS;
      setRipples((prev) => prev.filter((r) => r.id > cutoff));
    }, 300);

    return () => clearInterval(cleanupRef.current);
  }, []);

  // ── Render ──────────────────────────────────────────

  // On first SSR/hydration render, show nothing to avoid hydration mismatch
  // (the cursor:none style + DOM structure only appears after client hydration)
  if (!isHydrated) return null;

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      {/* Hide default cursor — injected only after hydration is confirmed */}
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* ── Ripple rings ──────────────────────────────── */}
      <AnimatePresence>
        {ripples.map((ring) => {
          const age = Date.now() - ring.id;
          const progress = Math.min(age / RING_LIFETIME_MS, 1);
          const scale = 0.3 + progress * 1.2;
          const opacity = Math.max(0, 0.5 - progress * 0.5);

          return (
            <motion.div
              key={ring.id}
              aria-hidden
              initial={{ opacity: 0.5, scale: 0.3 }}
              animate={{
                opacity,
                scale,
              }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: RING_MAX_SIZE,
                height: RING_MAX_SIZE,
                x: ring.x - RING_MAX_SIZE / 2,
                y: ring.y - RING_MAX_SIZE / 2,
                borderRadius: '50%',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                background:
                  'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
                zIndex: 9998,
                pointerEvents: 'none',
                willChange: 'transform, opacity',
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* ── Outer ring (water droplet) ────────────────── */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: OUTER_RING_SIZE,
          height: OUTER_RING_SIZE,
          x: useTransform(springX, (v) => v - HALF_OUTER),
          y: useTransform(springY, (v) => v - HALF_OUTER),
          scaleX: combinedScaleX,
          scaleY: combinedScaleY,
          rotate,
          opacity: isVisible ? 1 : 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(201, 168, 76, 0.6)',
          background:
            'radial-gradient(circle, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 60%, transparent 100%)',
          backdropFilter: 'blur(2px)',
          boxShadow: isHovering
            ? `0 0 20px ${GOLD} 0.2), 0 0 40px ${CYAN} 0.08)`
            : `0 0 12px ${GOLD} 0.1)`,
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease, box-shadow 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* ── Trailing glow dot (feather-touch tail) ────── */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: TRAIL_DOT_SIZE,
          height: TRAIL_DOT_SIZE,
          x: useTransform(trailX, (v) => v - HALF_TRAIL),
          y: useTransform(trailY, (v) => v - HALF_TRAIL),
          opacity: isVisible ? 0.5 : 0,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD} 0.4) 0%, transparent 70%)`,
          zIndex: 9998,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
          filter: 'blur(1px)',
        }}
      />

      {/* ── Inner dot ──────────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: INNER_DOT_SIZE,
          height: INNER_DOT_SIZE,
          x: useTransform(springX, (v) => v - INNER_DOT_SIZE / 2),
          y: useTransform(springY, (v) => v - INNER_DOT_SIZE / 2),
          opacity: isVisible ? 1 : 0,
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          boxShadow: `0 0 6px ${GOLD} 0.6)`,
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* ── "DRAG" label ───────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: useTransform(springX, (v) => (v as number) + 20),
          y: useTransform(springY, (v) => (v as number) - 10),
          opacity: springDragLabel,
          zIndex: 9999,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
        className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-gold"
      >
        Drag
      </motion.div>
    </>
  );
}
