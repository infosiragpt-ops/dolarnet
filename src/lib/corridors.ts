import {
  COUNTRIES,
  COUNTRY_BY_CODE,
  DESTINATION_CODES,
  filterCountries,
  getCountry,
  isCountryCode,
  POPULAR_DESTINATION_CODES,
  type Country,
  type CountryCode,
} from "./countries";

export type { Country, CountryCode };
export type QuoteCurrency = string;

export {
  COUNTRIES,
  COUNTRY_BY_CODE,
  DESTINATION_CODES,
  filterCountries,
  getCountry,
  isCountryCode,
  POPULAR_DESTINATION_CODES,
};

export const RESIDENCE_CODES = ["CL", "CO", "EC", "MX", "PE"] as const;
export type ResidenceCode = (typeof RESIDENCE_CODES)[number];

export const FX_CURRENCY_BY_COUNTRY: Record<string, string> = Object.fromEntries(
  COUNTRIES.map((country) => [country.code, country.currency]),
);

export const BANKS_SHOWN = [
  "BCP",
  "BBVA",
  "Banco de la Nación",
  "Banco Pichincha",
  "Scotiabank",
  "Interbank",
] as const;

const BANKS_BY_COUNTRY: Record<string, string[]> = {
  CL: ["Banco de Chile", "BancoEstado", "Santander", "BCI", "Otro"],
  CO: ["Bancolombia", "Davivienda", "Nequi", "BBVA", "Otro"],
  EC: ["Banco Pichincha", "Banco Guayaquil", "Produbanco", "Otro"],
  ES: ["Santander", "BBVA", "CaixaBank", "Sabadell", "Otro"],
  MX: ["BBVA", "Banorte", "Santander", "Citibanamex", "Otro"],
  PE: [
    "BCP",
    "Interbank",
    "BBVA",
    "Scotiabank",
    "Banco de la Nación",
    "Otro",
  ],
  US: ["Chase", "Bank of America", "Wells Fargo", "Citibank", "Otro"],
};

export { BANKS_BY_COUNTRY };

export function banksForCountry(code: string): string[] {
  return BANKS_BY_COUNTRY[code] ?? ["Otro"];
}

export function isResidenceCode(value: string): value is ResidenceCode {
  return (RESIDENCE_CODES as readonly string[]).includes(value);
}
