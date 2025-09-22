import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = {
  isLoading: boolean;
  hasMore: boolean;
};

function ListFooter({ isLoading, hasMore }: Props) {
  return (
    <View style={styles.footer}>
      {isLoading && <ActivityIndicator />}
      {!hasMore && !isLoading && <Text style={styles.end}>End of list</Text>}
    </View>
  );
}

export default React.memo(ListFooter);

const styles = StyleSheet.create({
  footer: { paddingVertical: spacing.lg },
  end: { color: colors.endText, textAlign: 'center' },
});
