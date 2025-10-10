import React, { useState, useRef, useEffect } from 'react';
import { Modal, Pressable, Image, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = {
  uri: string;
  thumbSize?: number;
  borderRadius?: number;
};

const { width: SW } = Dimensions.get('window');

const DURATION_IN = 300;
const DURATION_BACKDROP_IN = 200;
const DURATION_OUT = 160;

export default function PreviewImage({
  uri,
  thumbSize = 45,
  borderRadius = 22.5,
}: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const backdrop = useSharedValue(0);
  const scale = useSharedValue(0.85);
  const translateY = useSharedValue(20);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const startOpen = () => {
    if (open) return;
    setOpen(true);
    requestAnimationFrame(() => {
      backdrop.value = withTiming(1, {
        duration: DURATION_BACKDROP_IN,
        easing: Easing.out(Easing.quad),
      });
      scale.value = withTiming(1, {
        duration: DURATION_IN,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(0, {
        duration: DURATION_IN,
        easing: Easing.out(Easing.cubic),
      });
    });
  };

  const startClose = () => {
    backdrop.value = withTiming(0, {
      duration: DURATION_OUT,
      easing: Easing.in(Easing.quad),
    });
    scale.value = withTiming(0.85, {
      duration: DURATION_OUT,
      easing: Easing.in(Easing.cubic),
    });
    translateY.value = withTiming(20, {
      duration: DURATION_OUT,
      easing: Easing.in(Easing.cubic),
    });

    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), DURATION_OUT + 10);
  };

  const backdropStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${0.6 * backdrop.value})`,
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <>
      <Pressable onPress={startOpen} disabled={open}>
        <Image
          source={{ uri }}
          style={[
            styles.logo,
            { width: thumbSize, height: thumbSize, borderRadius },
          ]}
          resizeMode="cover"
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={startClose}
      >
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable onPress={startClose} style={styles.close} />
          <Animated.Image
            source={{ uri }}
            style={[styles.preview, imageStyle]}
            resizeMode="contain"
          />
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    borderColor: colors.muted,
    borderWidth: 2,
    marginRight: spacing.sm,
    backgroundColor: colors.card,
  },
  backdrop: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  preview: {
    width: SW * 0.92,
    height: SW * 0.92,
    borderRadius: 16,
    backgroundColor: colors.dark,
  },
  close: { position: 'absolute', inset: 0 },
});
