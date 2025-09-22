import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = {
  isLoading: boolean;
  hasMore: boolean;
};

function ListEmptyComponent({ isLoading }: Props) {
  return (
    <View style={styles.emptyWrap}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.emptyText}>No data</Text>
      )}
    </View>
  );
}

export default React.memo(ListEmptyComponent);

const styles = StyleSheet.create({
  emptyWrap: { paddingVertical: spacing.lg, alignItems: 'center' },
  emptyText: { color: colors.muted },
});
