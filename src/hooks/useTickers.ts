import { useInfiniteQuery } from '@tanstack/react-query';
import { listTickers } from '../api/mockApi';
import { Ticker } from '../types/stock';

export const PAGE_SIZE = 7;

export function useTickers() {
  const query = useInfiniteQuery({
    queryKey: ['tickers', PAGE_SIZE],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      listTickers(pageParam, PAGE_SIZE),
    getNextPageParam: (last: { items: Ticker[]; hasMore: boolean }, all) =>
      last.hasMore ? all.length + 1 : undefined,
    staleTime: 60_000,
  });

  const items = query.data?.pages.flatMap(p => p.items) ?? [];
  return {
    items,
    loading: query.isLoading || query.isFetching,
    hasMore: !!query.hasNextPage,
    loadMore: () => query.fetchNextPage(),
    PAGE_SIZE,
  };
}
