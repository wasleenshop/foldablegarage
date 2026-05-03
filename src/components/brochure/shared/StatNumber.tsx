// ═══════════════════════════════════════════════════
// StatNumber — Large gold stat display for PDF
// ═══════════════════════════════════════════════════

import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';

interface StatNumberProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatNumber({ value, label, prefix, suffix }: StatNumberProps) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        {prefix && <Text style={styles.statPrefix}>{prefix}</Text>}
        <Text style={styles.statNumber}>{value}</Text>
        {suffix && <Text style={styles.statNumber}>{suffix}</Text>}
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}
