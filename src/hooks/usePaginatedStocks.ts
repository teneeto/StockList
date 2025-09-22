import { useEffect, useRef, useState } from 'react';
import { mockApi } from '../api/mockApi';
import { Stock } from '../types/stock';

export const PAGE_SIZE = 10;

export function usePaginatedStocks() {
  const [items, setItems] = useState<Stock[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const loadPage = async (pageNumber: number) => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const { items: next, hasMore: more } = await mockApi.listStocks(
        pageNumber,
        PAGE_SIZE,
      );
      setItems(prev => {
        const map = new Map(prev.map(p => [p.id, p]));
        next.forEach(n => map.set(n.id, n));
        return Array.from(map.values());
      });
      setHasMore(more);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    loadPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const next = page + 1;
      setPage(next);
      loadPage(next);
    }
  };

  return { items, loading, hasMore, loadMore, page, PAGE_SIZE };
}
