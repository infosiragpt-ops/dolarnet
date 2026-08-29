import { getCountry, type CountryCode } from "./corridors";
import { currencyFractionDigits } from "./currencies";

export const RATE_DISCLAIMER =
  "Tipo de cambio de referencia de mercado. No es una liquidación bancaria ni una oferta vinculante.";

export const CACHE_SECONDS = 12 * 60;

export type CorridorRate = {
  currency: string;
  rate: number;
};

export type RatesPayload = {
  base: "PEN";
  updatedAt: string;
  updatedAtUnix: number;
  source: "open" | "keyed";
  commissionPen: number;
  rates: Record<string, CorridorRate>;
};

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
  rate: number,
  commissionPen: number,
): Quote {
  const country = getCountry(destination);
  const safeAmount = Number.isFinite(sendAmount) && sendAmount > 0 ? sendAmount : 0;
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 0;
  const commission = safeAmount > 0 ? commissionPen : 0;
  const decimals = currencyFractionDigits(country.currency);

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
): CorridorRate | null {
  const country = getCountry(destination);
  if (!country.currency) return null;
  const entry = payload.rates[country.currency];
  if (!entry || !(entry.rate > 0) || entry.currency !== country.currency) {
    return null;
  }
  return entry;
}

export function missingRateMessage(destination: CountryCode): string {
  const country = getCountry(destination);
  const currency = country.currency || "esta moneda";
  return `No hay tipo de cambio de referencia de mercado para ${currency} (${country.name}). El proveedor no publicó esta moneda en la última actualización.`;
}
