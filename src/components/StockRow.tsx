import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { fontSizes } from '../theme/fontSizes';
import { usePrice } from '../hooks/usePrice';
import type { Ticker } from '../types/stock';
import PreviewImage from './PreviewImage';

type Props = { item: Ticker; visible: boolean };

function StockRow({ item, visible }: Props) {
  const price = usePrice(item.symbol, visible);
  const tx = useSharedValue(-24);
  const op = useSharedValue(0);
  const ready = !!price && visible;

  useEffect(() => {
    const cfg = { duration: 350, easing: Easing.out(Easing.cubic) };
    if (ready) {
      tx.value = withTiming(0, cfg);
      op.value = withTiming(1, cfg);
    } else {
      tx.value = -24;
      op.value = 0;
    }
  }, [ready, tx, op]);

  const badgeAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
    opacity: op.value,
  }));

  return (
    <View style={styles.row}>
      <PreviewImage uri={item.logo} />
      <View style={styles.info}>
        <Text style={styles.title}>
          {item.name} <Text style={styles.symbol}>{item.symbol}</Text>
        </Text>

        <View style={styles.subtitleWrapper}>
          <View style={styles.ribbon} />
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>

      {price ? (
        <Animated.View
          style={[
            styles.badge,
            {
              backgroundColor: price.isPositive
                ? colors.badgePosBg
                : colors.badgeNegBg,
            },
            badgeAnim,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: price.isPositive ? colors.badgePos : colors.badgeNeg },
            ]}
          >
            ${price.price}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

export default React.memo(StockRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 60,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: colors.muted,
    borderWidth: 2,
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
