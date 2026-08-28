import {
  COUNTRY_BY_CODE,
  FX_CURRENCY_BY_COUNTRY,
  type CountryCode,
  type QuoteCurrency,
} from "@/lib/corridors";

export const RATE_DISCLAIMER =
  "Tipo de cambio de referencia de mercado. No es una liquidación bancaria ni una oferta vinculante.";

export const CACHE_SECONDS = 12 * 60;

export type CorridorRate = {
  currency: QuoteCurrency;
  rate: number;
};

export type RatesPayload = {
  base: "PEN";
  updatedAt: string;
  updatedAtUnix: number;
  source: "open" | "keyed";
  commissionPen: number;
  rates: Record<CountryCode, CorridorRate>;
};

export type Quote = {
  sendAmount: number;
  destination: CountryCode;
  rate: number;
  receiveAmount: number;
  commission: number;
  totalToTransfer: number;
  currency: QuoteCurrency;
  currencyName: string;
};

export function quoteFromSoles(
  sendAmount: number,
  destination: CountryCode,
  rate: number,
  commissionPen: number,
): Quote {
  const country = COUNTRY_BY_CODE[destination];
  const safeAmount = Number.isFinite(sendAmount) && sendAmount > 0 ? sendAmount : 0;
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 0;
  const commission = safeAmount > 0 ? commissionPen : 0;
  const decimals =
    country.currency === "COP" || country.currency === "CLP" ? 0 : 2;

  return {
    sendAmount: safeAmount,
    destination,
    rate: safeRate,
    receiveAmount: Number((safeAmount * safeRate).toFixed(decimals)),
    commission,
    totalToTransfer: Number((safeAmount + commission).toFixed(2)),
    currency: country.currency,
    currencyName: country.currencyName,
  };
}

export function rateFor(
  payload: RatesPayload,
  destination: CountryCode,
): CorridorRate {
  return payload.rates[destination] ?? {
    currency: FX_CURRENCY_BY_COUNTRY[destination],
    rate: 0,
  };
}
