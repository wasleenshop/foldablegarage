// ═══════════════════════════════════════════════════
// PageFooter — Consistent footer across all brochure pages
// ═══════════════════════════════════════════════════

import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';

interface PageFooterProps {
  pageNumber: number;
}

export function PageFooter({ pageNumber }: PageFooterProps) {
  return (
    <View style={styles.footer} fixed={true}>
      <Text style={styles.footerText}>foldablegarage.wasleen.com</Text>
      <Text style={styles.footerText}>Wasleen Foldable Premium Garage</Text>
      <Text style={styles.footerPageNum}>{pageNumber}</Text>
    </View>
  );
}
