import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  ViewToken,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePaginatedStocks, PAGE_SIZE } from '../hooks/usePaginatedStocks';
import StockRow from '../components/StockRow';
import Divider from '../components/Divider';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Stock } from '../types/stock';
import ListHeader from '../components/ListHeader';
import ListEmptyComponent from '../components/ListEmptyComponent';
import ListFooter from '../components/ListFooter';

export default function StockListScreen() {
  const { items, loading, hasMore, loadMore } = usePaginatedStocks();
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold: 60 }),
    [],
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const next = new Set<string>();
      viewableItems.forEach(visibleItem => {
        if (visibleItem.isViewable && visibleItem.item?.id)
          next.add(String(visibleItem.item.id));
      });
      setVisibleIds(next);
    },
  ).current;

  const renderListItem = useCallback(
    ({ item }: ListRenderItemInfo<Stock>) => (
      <StockRow item={item} visible={visibleIds.has(item.id)} />
    ),
    [visibleIds],
  );

  const headerEl = React.useMemo(() => <ListHeader />, []);
  const footerEl = React.useMemo(
    () => <ListFooter isLoading={loading} hasMore={hasMore} />,
    [loading, hasMore],
  );
  const emptyEl = React.useMemo(
    () => <ListEmptyComponent isLoading={loading} hasMore={false} />,
    [loading],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={items}
        keyExtractor={item => item.id}
        ListHeaderComponent={headerEl}
        renderItem={renderListItem}
        ItemSeparatorComponent={Divider}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        initialNumToRender={PAGE_SIZE}
        maxToRenderPerBatch={PAGE_SIZE}
        windowSize={5}
        removeClippedSubviews
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        ListFooterComponent={footerEl}
        ListEmptyComponent={emptyEl}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  list: { backgroundColor: colors.bg },
  content: { padding: spacing.md },
});
