import {
  COUNTRY_BY_CODE,
  type CountryCode,
} from "@/lib/corridors";

/**
 * Example rates used only for quotes in this demo.
 * They follow the figures shown on the current WordPress calculator
 * (PEN → destination) and must never be presented as live market data.
 */
export const EXAMPLE_RATES_FROM_PEN: Record<CountryCode, number> = {
  CL: 274.46,
  CO: 933.93,
  EC: 0.29,
  MX: 5.05,
  PE: 1,
};

export const EXAMPLE_COMMISSION_PEN = 4.9;

export const RATE_DISCLAIMER =
  "Tipo de cambio y comisión de ejemplo. No son cotizaciones en vivo ni una oferta vinculante.";

export type Quote = {
  sendAmount: number;
  destination: CountryCode;
  rate: number;
  receiveAmount: number;
  commission: number;
  totalToTransfer: number;
  currency: string;
  currencyName: string;
};

export function quoteFromSoles(
  sendAmount: number,
  destination: CountryCode,
): Quote {
  const country = COUNTRY_BY_CODE[destination];
  const rate = EXAMPLE_RATES_FROM_PEN[destination];
  const safeAmount = Number.isFinite(sendAmount) && sendAmount > 0 ? sendAmount : 0;
  const commission = safeAmount > 0 ? EXAMPLE_COMMISSION_PEN : 0;

  return {
    sendAmount: safeAmount,
    destination,
    rate,
    receiveAmount: Number((safeAmount * rate).toFixed(2)),
    commission,
    totalToTransfer: Number((safeAmount + commission).toFixed(2)),
    currency: country.currency,
    currencyName: country.currencyName,
  };
}
