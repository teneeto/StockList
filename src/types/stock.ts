export type Ticker = {
  id: string;
  name: string;
  symbol: string;
  subtitle: string;
  logo: string;
};

export type Price = {
  symbol: string;
  price: number;
  isPositive: boolean;
};
