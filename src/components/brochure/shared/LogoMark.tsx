// ═══════════════════════════════════════════════════
// LogoMark — Gold W-mark SVG for PDF brochure
// ═══════════════════════════════════════════════════

import { Svg, Path, G } from '@react-pdf/renderer';

interface LogoMarkProps {
  size?: number;
  showWordmark?: boolean;
}

export function LogoMark({ size = 40, showWordmark = false }: LogoMarkProps) {
  const scale = size / 40;

  return (
    <Svg
      viewBox="0 0 200 60"
      width={showWordmark ? 200 * scale : 50 * scale}
      height={60 * scale}
    >
      {/* W-mark — the folded garage icon */}
      <G>
        {/* Left fold */}
        <Path
          d="M 8 52 L 15 10 L 25 30 L 25 52 L 18 52 L 18 28 L 12 48 L 5 48 L 8 52 Z"
          fill="#C9A84C"
        />
        {/* Center peak */}
        <Path
          d="M 22 10 L 28 22 L 34 10 L 42 10 L 33 30 L 33 52 L 27 52 L 27 30 L 18 10 L 22 10 Z"
          fill="#D4B85A"
        />
        {/* Right fold */}
        <Path
          d="M 38 10 L 45 48 L 48 28 L 48 52 L 42 52 L 42 30 L 35 10 L 38 10 Z"
          fill="#C9A84C"
        />
        {/* Gold accent dots */}
        <Path d="M 25 6 Q 25 4 26 4 Q 27 4 27 6 Q 27 8 26 8 Q 25 8 25 6 Z" fill="#C9A84C" />
        <Path d="M 33 6 Q 33 4 34 4 Q 35 4 35 6 Q 35 8 34 8 Q 33 8 33 6 Z" fill="#C9A84C" />
      </G>

      {/* Wordmark */}
      {showWordmark && (
        <G>
          {/* WASLEEN */}
          {[
            { char: 'W', x: 60, y: 40 },
            { char: 'A', x: 78, y: 40 },
            { char: 'S', x: 94, y: 40 },
            { char: 'L', x: 108, y: 40 },
            { char: 'E', x: 122, y: 40 },
            { char: 'E', x: 136, y: 40 },
            { char: 'N', x: 150, y: 40 },
          ].map(({ char, x, y }) => (
            <Path
              key={char}
              d={getCharPath(char, x, y)}
              fill="#FFFFFF"
            />
          ))}
        </G>
      )}
    </Svg>
  );
}

/**
 * Simple path approximations for wordmark characters.
 * For a production PDF, this would use a proper font rendering approach.
 * Instead of SVG text (which may not render in all PDF viewers),
 * we use the logo SVG as an image.
 */
function getCharPath(char: string, x: number, y: number): string {
  // Simple block letter paths — these are stylized placeholders
  // The actual logo component is imported as an image where precise rendering is needed
  const paths: Record<string, string> = {
    W: `M${x},${y - 20} L${x + 3},${y} L${x + 7},${y - 10} L${x + 11},${y} L${x + 14},${y - 20} L${x + 11},${y - 20} L${x + 8},${y - 8} L${x + 5},${y - 20} Z`,
    A: `M${x + 2},${y} L${x + 5},${y - 20} L${x + 11},${y - 20} L${x + 14},${y} L${x + 11},${y} L${x + 10},${y - 5} L${x + 6},${y - 5} L${x + 5},${y} Z M${x + 6.5},${y - 8} L${x + 9.5},${y - 8} L${x + 8},${y - 16} Z`,
    S: `M${x + 10},${y - 18} L${x + 2},${y - 18} L${x + 2},${y - 14} L${x + 8},${y - 14} L${x + 10},${y - 10} L${x + 2},${y - 8} L${x + 2},${y - 3} L${x + 10},${y - 3} L${x + 10},${y - 7} L${x + 4},${y - 7} L${x + 4},${y - 11} L${x + 10},${y - 14} Z`,
    L: `M${x + 2},${y - 20} L${x + 2},${y} L${x + 10},${y} L${x + 10},${y - 4} L${x + 6},${y - 4} L${x + 6},${y - 20} Z`,
    E: `M${x + 10},${y - 20} L${x + 2},${y - 20} L${x + 2},${y} L${x + 10},${y} L${x + 10},${y - 4} L${x + 6},${y - 4} L${x + 6},${y - 16} L${x + 10},${y - 16} Z`,
    N: `M${x + 2},${y} L${x + 2},${y - 20} L${x + 6},${y - 20} L${x + 10},${y - 5} L${x + 10},${y - 20} L${x + 14},${y - 20} L${x + 14},${y} L${x + 10},${y} L${x + 6},${y - 15} L${x + 6},${y} Z`,
  };
  return paths[char] || `M${x},${y - 5} L${x + 10},${y - 5} L${x + 10},${y} L${x},${y} Z`;
}
