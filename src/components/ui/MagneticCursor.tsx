'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Custom magnetic cursor — replaces default pointer on desktop (≥1024px).
 *
 * - Spring-driven 60fps position tracking via Framer Motion `useMotionValue` + `useSpring`
 * - Expands over interactive elements (a, button, [data-cursor="cta"])
 * - Shows "DRAG" label over [data-cursor="drag"] elements (horizontal scroll sections)
 * - Hidden on touch devices via `pointer: coarse` media query
 * - Respects `prefers-reduced-motion` — falls back to default cursor
 */
export function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse position — spring-smoothed for 60fps butter
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 28, mass: 0.5 });

  // Cursor scale — expands on hover
  const cursorScale = useMotionValue(1);
  const springScale = useSpring(cursorScale, { stiffness: 400, damping: 20 });

  // "DRAG" text opacity — visible over draggable sections
  const dragLabelOpacity = useMotionValue(0);
  const springDragLabel = useSpring(dragLabelOpacity, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="cta"], [data-cursor="drag"]');

      if (interactive) {
        setIsHovering(true);
        cursorScale.set(1.6);

        if (interactive.hasAttribute('data-cursor') && interactive.getAttribute('data-cursor') === 'drag') {
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
      const interactive = target.closest('a, button, [data-cursor="cta"], [data-cursor="drag"]');

      if (interactive && (!related || !related.closest('a, button, [data-cursor="cta"], [data-cursor="drag"]'))) {
        setIsHovering(false);
        setIsDraggable(false);
        cursorScale.set(1);
        dragLabelOpacity.set(0);
      }
    },
    [cursorScale, dragLabelOpacity],
  );

  useEffect(() => {
    // Detect touch device
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchQuery.matches);

    // Detect reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    touchQuery.addEventListener('change', handleTouchChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      touchQuery.removeEventListener('change', handleTouchChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    // Small delay so cursor position is set before becoming visible (avoids flash at 0,0)
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

  // Don't render on touch devices or when reduced motion is preferred
  if (isTouchDevice || prefersReducedMotion) return null;

  const cursorSize = 32;
  const halfSize = cursorSize / 2;

  return (
    <>
      {/* Hide default cursor — applied via style tag to avoid CSS specificity issues */}
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Outer ring — follows mouse with spring physics */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorSize,
          height: cursorSize,
          x: useTransform(springX, (v) => v - halfSize),
          y: useTransform(springY, (v) => v - halfSize),
          scale: springScale,
          opacity: isVisible ? 1 : 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(201, 168, 76, 0.6)',
          backgroundColor: 'rgba(201, 168, 76, 0.08)',
          backdropFilter: 'blur(2px)',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          x: useTransform(springX, (v) => v - 3),
          y: useTransform(springY, (v) => v - 3),
          opacity: isVisible ? 1 : 0,
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* "DRAG" label — appears on draggable sections */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: useTransform(springX, (v) => v + 20),
          y: useTransform(springY, (v) => v - 10),
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
