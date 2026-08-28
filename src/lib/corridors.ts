export type CountryCode = "CL" | "CO" | "EC" | "MX" | "PE";

export type QuoteCurrency = "CLP" | "COP" | "MXN" | "USD";

export type Country = {
  code: CountryCode;
  name: string;
  adjective: string;
  currency: QuoteCurrency;
  currencyName: string;
  currencyShort: string;
};

export const COUNTRIES: Country[] = [
  {
    code: "CL",
    name: "Chile",
    adjective: "chileno",
    currency: "CLP",
    currencyName: "Pesos chilenos",
    currencyShort: "pesos",
  },
  {
    code: "CO",
    name: "Colombia",
    adjective: "colombiano",
    currency: "COP",
    currencyName: "Pesos colombianos",
    currencyShort: "pesos",
  },
  {
    code: "EC",
    name: "Ecuador",
    adjective: "ecuatoriano",
    currency: "USD",
    currencyName: "Dólares",
    currencyShort: "dólares",
  },
  {
    code: "MX",
    name: "México",
    adjective: "mexicano",
    currency: "MXN",
    currencyName: "Pesos mexicanos",
    currencyShort: "pesos",
  },
  {
    code: "PE",
    name: "Perú",
    adjective: "peruano",
    currency: "USD",
    currencyName: "Dólares",
    currencyShort: "dólares",
  },
];

export const COUNTRY_BY_CODE = Object.fromEntries(
  COUNTRIES.map((country) => [country.code, country]),
) as Record<CountryCode, Country>;

export const DESTINATION_CODES: CountryCode[] = ["CO", "EC", "MX", "PE", "CL"];

export const RESIDENCE_CODES: CountryCode[] = ["CL", "CO", "EC", "MX", "PE"];

export const FX_CURRENCY_BY_COUNTRY: Record<CountryCode, QuoteCurrency> = {
  CL: "CLP",
  CO: "COP",
  EC: "USD",
  MX: "MXN",
  PE: "USD",
};

export const BANKS_SHOWN = [
  "BCP",
  "BBVA",
  "Banco de la Nación",
  "Banco Pichincha",
  "Scotiabank",
  "Interbank",
] as const;

export const BANKS_BY_COUNTRY: Record<CountryCode, string[]> = {
  CL: ["Banco de Chile", "BancoEstado", "Santander", "BCI", "Otro"],
  CO: ["Bancolombia", "Davivienda", "Nequi", "BBVA", "Otro"],
  EC: ["Banco Pichincha", "Banco Guayaquil", "Produbanco", "Otro"],
  MX: ["BBVA", "Banorte", "Santander", "Citibanamex", "Otro"],
  PE: [
    "BCP",
    "Interbank",
    "BBVA",
    "Scotiabank",
    "Banco de la Nación",
    "Otro",
  ],
};

export function getCountry(code: CountryCode): Country {
  return COUNTRY_BY_CODE[code];
}
