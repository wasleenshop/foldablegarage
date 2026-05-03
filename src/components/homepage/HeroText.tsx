'use client';

import { motion } from 'framer-motion';

interface HeroTextProps {
  text: string;
  className?: string;
}

/**
 * Staggered word reveal animation for hero headlines.
 * Each word fades up with a 100ms delay between words.
 */
export function HeroText({ text, className }: HeroTextProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.h1
      className={`font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-text-primary ${className ?? ''}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
        >
          {word === 'Motion.' || word === 'Protection.' ? (
            <span className="gold-gradient">{word} </span>
          ) : (
            `${word} `
          )}
        </motion.span>
      ))}
    </motion.h1>
  );
}
