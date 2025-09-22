import React, { useEffect, useRef } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Stock } from '../types/stock';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { fontSizes } from '../theme/fontSizes';

type Props = {
  item: Stock;
  visible: boolean;
};

export default function StockRow({ item, visible }: Props) {
  const tx = useSharedValue(-24);
  const op = useSharedValue(0);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (visible && !hasPlayed.current) {
      hasPlayed.current = true;
      tx.value = withTiming(0, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
      op.value = withTiming(1, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [visible]);

  const badgeAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
    opacity: op.value,
  }));

  return (
    <View style={styles.row}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.title}>
          {item.name} <Text style={styles.symbol}>{item.symbol}</Text>
        </Text>
        <Text style={styles.subtitle}>• {item.subtitle}</Text>
      </View>
      <Animated.View
        style={[
          styles.badge,
          {
            backgroundColor: item.isPositive
              ? colors.badgePosBg
              : colors.badgeNegBg,
          },
          badgeAnim,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            { color: item.isPositive ? colors.badgePos : colors.badgeNeg },
          ]}
        >
          ${item.price}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: spacing.sm,
    backgroundColor: '#111',
  },
  info: { flex: 1 },
  title: { color: colors.text, fontSize: fontSizes.md, fontWeight: '600' },
  symbol: { color: colors.muted, fontSize: fontSizes.md - 2 },
  subtitle: { color: colors.muted, marginTop: 4 },
  badge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  badgeText: { fontWeight: '700' },
});
