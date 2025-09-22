import React, { useEffect, useRef } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { fontSizes } from '../theme/fontSizes';
import type { Ticker } from '../api/api1.symbols.dataset copy';
import { usePrice } from '../hooks/usePrice';

type Props = {
  item: Ticker;
  visible: boolean;
};

function StockRow({ item, visible }: Props) {
  const price = usePrice(item.symbol, visible);

  const tx = useSharedValue(-24);
  const op = useSharedValue(0);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (visible && !hasPlayed.current) {
      hasPlayed.current = true;
      const cfg = { duration: 350, easing: Easing.out(Easing.cubic) };
      tx.value = withTiming(0, cfg);
      op.value = withTiming(1, cfg);
    }
  }, [visible]);

  const badgeAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
    opacity: op.value,
  }));

  const isUp = price ? price.isPositive : true;
  const priceText = price ? `$${price.price}` : '—';

  return (
    <View style={styles.row}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <View style={styles.info}>
        <Text style={styles.title}>
          {item.name} <Text style={styles.symbol}>{item.symbol}</Text>
        </Text>

        <View style={styles.subtitleWrapper}>
          <View style={styles.ribbon} />
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>

      <Animated.View
        style={[
          styles.badge,
          { backgroundColor: isUp ? colors.badgePosBg : colors.badgeNegBg },
          badgeAnim,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            { color: isUp ? colors.badgePos : colors.badgeNeg },
          ]}
        >
          {priceText}
        </Text>
      </Animated.View>
    </View>
  );
}

export default React.memo(StockRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 60,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.sm,
    backgroundColor: colors.card,
  },
  info: { flex: 1 },
  title: { color: colors.text, fontSize: fontSizes.md, fontWeight: '600' },
  symbol: { color: colors.muted, fontSize: fontSizes.md - 2 },
  subtitle: { color: colors.muted },
  subtitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  ribbon: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: colors.lightBlue,
    marginRight: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  badgeText: { fontWeight: '700' },
});
