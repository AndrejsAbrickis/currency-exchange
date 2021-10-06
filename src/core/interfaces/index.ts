interface IBaseResponse {
  success: boolean;
}
export interface ILatestExchangeRatesResponse extends IBaseResponse {
  timestamp: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}
export interface ISymbolsResponse extends IBaseResponse {
  symbols: { [key: string]: string };
}
