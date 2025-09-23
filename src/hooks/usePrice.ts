import { useQuery } from '@tanstack/react-query';
import { getPrice } from '../api/mockApi';

export function usePrice(symbol: string, visible: boolean) {
  const query = useQuery({
    queryKey: ['price', symbol],
    queryFn: () => getPrice(symbol),
    enabled: visible,
    refetchInterval: visible ? 1500 : false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: true,
    staleTime: 500,
    gcTime: 5 * 60_000,
  });

  return query.data;
}
