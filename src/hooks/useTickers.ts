import { useInfiniteQuery } from '@tanstack/react-query';
import { listTickers } from '../api/mockApi';

export const PAGE_SIZE = 10;

export function useTickers() {
  const q = useInfiniteQuery({
    queryKey: ['tickers', PAGE_SIZE],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      listTickers(pageParam, PAGE_SIZE),
    getNextPageParam: (last: { items: any[]; hasMore: boolean }, all) =>
      last.hasMore ? all.length + 1 : undefined,
    staleTime: 60_000,
  });

  const items = q.data?.pages.flatMap(p => p.items) ?? [];
  return {
    items,
    loading: q.isLoading || q.isFetching,
    hasMore: !!q.hasNextPage,
    loadMore: () => q.fetchNextPage(),
    PAGE_SIZE,
  };
}
