import { useEffect, useRef, useState } from 'react';
import { mockApi } from '../api/mockApi';
import { Stock } from '../types/stock';

const PAGE_SIZE = 10;

export function usePaginatedStocks() {
  const [items, setItems] = useState<Stock[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const loadPage = async (p: number) => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    const { items: next, hasMore: more } = await mockApi.listStocks(
      p,
      PAGE_SIZE,
    );
    setItems(prev => [...prev, ...next]);
    setHasMore(more);
    setLoading(false);
    loadingRef.current = false;
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
