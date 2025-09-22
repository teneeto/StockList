import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { fontSizes } from '../theme/fontSizes';

export default function ListHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Markets</Text>
      <Text style={styles.headerSubTitle}>Market watchlist</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingBottom: spacing.lg, paddingTop: spacing.sm },
  headerTitle: {
    color: colors.text,
    fontSize: fontSizes.xl,
    fontWeight: '700',
  },
  headerSubTitle: {
    color: colors.muted,
    marginTop: spacing.sm,
    fontSize: fontSizes.sm,
  },
});
