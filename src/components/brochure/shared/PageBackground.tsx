// ═══════════════════════════════════════════════════
// PageBackground — Dark background with optional kinetic laser lines
// ═══════════════════════════════════════════════════

import { View, Svg, Line, Rect, Defs, LinearGradient, Stop } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';

interface PageBackgroundProps {
  variant?: 'dark' | 'light' | 'cover';
  showLaserLines?: boolean;
  children?: React.ReactNode;
  style?: Style;
}

export function PageBackground({
  variant = 'dark',
  showLaserLines = true,
  children,
  style,
}: PageBackgroundProps) {
  const bgColor = variant === 'dark' ? '#0A0A0A' : variant === 'cover' ? '#0A0A0A' : '#111111';

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: bgColor,
        ...(style as Record<string, unknown>),
      }}
    >
      {/* Gradient overlay for cover */}
      {variant === 'cover' && (
        <Svg
          viewBox="0 0 595 842"
          width="595"
          height="842"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient id="coverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#0A0A0A" stopOpacity={0.3} />
              <Stop offset="60%" stopColor="#0A0A0A" stopOpacity={0.7} />
              <Stop offset="100%" stopColor="#0A0A0A" stopOpacity={0.95} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="595" height="842" fill="url(#coverGrad)" />
        </Svg>
      )}

      {/* Kinetic laser lines — subtle background decoration */}
      {showLaserLines && (
        <Svg
          viewBox="0 0 595 842"
          width="595"
          height="842"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Cyan diagonal line */}
          <Line x1="0" y1="0" x2="595" y2="842" stroke="#00D4FF" strokeWidth={0.5} opacity={0.08} />
          {/* Violet diagonal line */}
          <Line x1="200" y1="0" x2="595" y2="500" stroke="#7C3AED" strokeWidth={0.5} opacity={0.06} />
          {/* Subtle horizontal lines */}
          <Line x1="0" y1="200" x2="595" y2="200" stroke="#00D4FF" strokeWidth={0.3} opacity={0.04} />
          <Line x1="0" y1="600" x2="595" y2="600" stroke="#7C3AED" strokeWidth={0.3} opacity={0.04} />
          {/* Corner accents */}
          <Line x1="40" y1="40" x2="100" y2="40" stroke="#C9A84C" strokeWidth={0.5} opacity={0.12} />
          <Line x1="40" y1="40" x2="40" y2="100" stroke="#C9A84C" strokeWidth={0.5} opacity={0.12} />
        </Svg>
      )}

      {children}
    </View>
  );
}
