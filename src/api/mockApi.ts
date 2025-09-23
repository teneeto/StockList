import { API1_SYMBOLS_DATASET } from './api1.symbols.dataset';
import { API2_PRICES_DATASET } from './api2.prices.dataset';
import type { Ticker } from '../types/stock';
import type { Price } from '../types/stock';

const SIMULATED_NETWORK_DELAY_MS = 1000;
export async function listTickers(
  page: number,
  limit: number,
): Promise<{ items: Ticker[]; hasMore: boolean }> {
  await new Promise<void>(resolve =>
    setTimeout(() => resolve(), SIMULATED_NETWORK_DELAY_MS),
  );
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    items: API1_SYMBOLS_DATASET.slice(start, end),
    hasMore: end < API1_SYMBOLS_DATASET.length,
  };
}

export async function getPrice(symbol: string): Promise<Price | undefined> {
  await new Promise<void>(resolve =>
    setTimeout(() => resolve(), SIMULATED_NETWORK_DELAY_MS),
  );
  return API2_PRICES_DATASET.find(p => p.symbol === symbol);
}
