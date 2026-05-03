// ═══════════════════════════════════════════════════
// GoldDivider — Gold accent line for section headers
// ═══════════════════════════════════════════════════

import { View } from '@react-pdf/renderer';
import { styles } from './styles';

interface GoldDividerProps {
  width?: number | string;
  thickness?: number;
  marginTop?: number;
  marginBottom?: number;
}

export function GoldDivider({
  width = 60,
  thickness = 3,
  marginTop = 0,
  marginBottom = 10,
}: GoldDividerProps) {
  return (
    <View
      style={{
        width,
        height: thickness,
        backgroundColor: '#C9A84C',
        marginTop,
        marginBottom,
      }}
      fixed
    />
  );
}
