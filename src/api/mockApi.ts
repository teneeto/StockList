import { API1_SYMBOLS_DATASET, Ticker } from './api1.symbols.dataset';
import { API2_PRICES_DATASET, Price } from './api2.prices.dataset';

export async function listTickers(
  page: number,
  limit: number,
): Promise<{ items: Ticker[]; hasMore: boolean }> {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    items: API1_SYMBOLS_DATASET.slice(start, end),
    hasMore: end < API1_SYMBOLS_DATASET.length,
  };
}

export async function getPrice(symbol: string): Promise<Price | undefined> {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
  return API2_PRICES_DATASET.find(p => p.symbol === symbol);
}
