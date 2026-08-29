import { currencyLabel } from "./currencies";

export type CountryCode = string;

export type Country = {
  code: CountryCode;
  name: string;
  adjective: string;
  currency: string;
  currencyName: string;
  currencyShort: string;
  aliases: string[];
};

type CountrySeed = {
  code: string;
  name: string;
  currency: string;
  adjective?: string;
  aliases?: string[];
};

/**
 * ISO 3166-1 alpha-2 destinations with the ISO 4217 currency used for a
 * remittance quote. Special cases are intentional:
 * - Eurozona y microestados / Montenegro / Kosovo → EUR
 * - Ecuador, El Salvador, Panamá y otros que usan dólar estadounidense → USD
 *   (Panamá también tiene el balboa PAB, 1:1 con USD; cotizamos USD)
 * - Perú como destino de envío sigue en USD (no es un giro interno en PEN)
 * - Territorios sin población permanente se omiten (AQ, BV, HM, GS, TF, UM)
 */
const SEEDS: CountrySeed[] = [
  { code: "AD", name: "Andorra", currency: "EUR" },
  { code: "AE", name: "Emiratos Árabes Unidos", currency: "AED", aliases: ["eau", "uae"] },
  { code: "AF", name: "Afganistán", currency: "AFN" },
  { code: "AG", name: "Antigua y Barbuda", currency: "XCD" },
  { code: "AI", name: "Anguila", currency: "XCD" },
  { code: "AL", name: "Albania", currency: "ALL" },
  { code: "AM", name: "Armenia", currency: "AMD" },
  { code: "AO", name: "Angola", currency: "AOA" },
  { code: "AR", name: "Argentina", currency: "ARS" },
  { code: "AS", name: "Samoa Americana", currency: "USD" },
  { code: "AT", name: "Austria", currency: "EUR" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "AW", name: "Aruba", currency: "AWG" },
  { code: "AX", name: "Islas Åland", currency: "EUR", aliases: ["aland"] },
  { code: "AZ", name: "Azerbaiyán", currency: "AZN" },
  { code: "BA", name: "Bosnia y Herzegovina", currency: "BAM" },
  { code: "BB", name: "Barbados", currency: "BBD" },
  { code: "BD", name: "Bangladés", currency: "BDT", aliases: ["bangladesh"] },
  { code: "BE", name: "Bélgica", currency: "EUR" },
  { code: "BF", name: "Burkina Faso", currency: "XOF" },
  { code: "BG", name: "Bulgaria", currency: "EUR" },
  { code: "BH", name: "Baréin", currency: "BHD", aliases: ["bahrain"] },
  { code: "BI", name: "Burundi", currency: "BIF" },
  { code: "BJ", name: "Benín", currency: "XOF" },
  { code: "BL", name: "San Bartolomé", currency: "EUR" },
  { code: "BM", name: "Bermudas", currency: "BMD" },
  { code: "BN", name: "Brunéi", currency: "BND" },
  { code: "BO", name: "Bolivia", currency: "BOB" },
  { code: "BQ", name: "Bonaire, San Eustaquio y Saba", currency: "USD", aliases: ["bonaire"] },
  { code: "BR", name: "Brasil", currency: "BRL" },
  { code: "BS", name: "Bahamas", currency: "BSD" },
  { code: "BT", name: "Bután", currency: "BTN" },
  { code: "BW", name: "Botsuana", currency: "BWP" },
  { code: "BY", name: "Bielorrusia", currency: "BYN" },
  { code: "BZ", name: "Belice", currency: "BZD" },
  { code: "CA", name: "Canadá", currency: "CAD" },
  { code: "CC", name: "Islas Cocos", currency: "AUD" },
  { code: "CD", name: "República Democrática del Congo", currency: "CDF", aliases: ["rdc", "congo kinshasa"] },
  { code: "CF", name: "República Centroafricana", currency: "XAF" },
  { code: "CG", name: "Congo", currency: "XAF", aliases: ["congo brazzaville"] },
  { code: "CH", name: "Suiza", currency: "CHF" },
  { code: "CI", name: "Costa de Marfil", currency: "XOF", aliases: ["côte d'ivoire", "ivory coast"] },
  { code: "CK", name: "Islas Cook", currency: "NZD" },
  { code: "CL", name: "Chile", currency: "CLP", adjective: "chileno" },
  { code: "CM", name: "Camerún", currency: "XAF" },
  { code: "CN", name: "China", currency: "CNY" },
  { code: "CO", name: "Colombia", currency: "COP", adjective: "colombiano" },
  { code: "CR", name: "Costa Rica", currency: "CRC" },
  { code: "CU", name: "Cuba", currency: "CUP" },
  { code: "CV", name: "Cabo Verde", currency: "CVE" },
  { code: "CW", name: "Curazao", currency: "ANG", aliases: ["curacao"] },
  { code: "CX", name: "Isla de Navidad", currency: "AUD" },
  { code: "CY", name: "Chipre", currency: "EUR" },
  { code: "CZ", name: "Chequia", currency: "CZK", aliases: ["republica checa", "czech"] },
  { code: "DE", name: "Alemania", currency: "EUR" },
  { code: "DJ", name: "Yibuti", currency: "DJF" },
  { code: "DK", name: "Dinamarca", currency: "DKK" },
  { code: "DM", name: "Dominica", currency: "XCD" },
  { code: "DO", name: "República Dominicana", currency: "DOP" },
  { code: "DZ", name: "Argelia", currency: "DZD" },
  { code: "EC", name: "Ecuador", currency: "USD", adjective: "ecuatoriano" },
  { code: "EE", name: "Estonia", currency: "EUR" },
  { code: "EG", name: "Egipto", currency: "EGP" },
  { code: "EH", name: "Sáhara Occidental", currency: "MAD" },
  { code: "ER", name: "Eritrea", currency: "ERN" },
  { code: "ES", name: "España", currency: "EUR", aliases: ["spain"] },
  { code: "ET", name: "Etiopía", currency: "ETB" },
  { code: "FI", name: "Finlandia", currency: "EUR" },
  { code: "FJ", name: "Fiyi", currency: "FJD" },
  { code: "FK", name: "Islas Malvinas", currency: "FKP" },
  { code: "FM", name: "Micronesia", currency: "USD" },
  { code: "FO", name: "Islas Feroe", currency: "DKK" },
  { code: "FR", name: "Francia", currency: "EUR" },
  { code: "GA", name: "Gabón", currency: "XAF" },
  {
    code: "GB",
    name: "Reino Unido",
    currency: "GBP",
    aliases: ["inglaterra", "uk", "gran bretana", "britain"],
  },
  { code: "GD", name: "Granada", currency: "XCD" },
  { code: "GE", name: "Georgia", currency: "GEL" },
  { code: "GF", name: "Guayana Francesa", currency: "EUR" },
  { code: "GG", name: "Guernsey", currency: "GBP" },
  { code: "GH", name: "Ghana", currency: "GHS" },
  { code: "GI", name: "Gibraltar", currency: "GIP" },
  { code: "GL", name: "Groenlandia", currency: "DKK" },
  { code: "GM", name: "Gambia", currency: "GMD" },
  { code: "GN", name: "Guinea", currency: "GNF" },
  { code: "GP", name: "Guadalupe", currency: "EUR" },
  { code: "GQ", name: "Guinea Ecuatorial", currency: "XAF" },
  { code: "GR", name: "Grecia", currency: "EUR" },
  { code: "GT", name: "Guatemala", currency: "GTQ" },
  { code: "GU", name: "Guam", currency: "USD" },
  { code: "GW", name: "Guinea-Bisáu", currency: "XOF" },
  { code: "GY", name: "Guyana", currency: "GYD" },
  { code: "HK", name: "Hong Kong", currency: "HKD" },
  { code: "HN", name: "Honduras", currency: "HNL" },
  { code: "HR", name: "Croacia", currency: "EUR" },
  { code: "HT", name: "Haití", currency: "HTG" },
  { code: "HU", name: "Hungría", currency: "HUF" },
  { code: "ID", name: "Indonesia", currency: "IDR" },
  { code: "IE", name: "Irlanda", currency: "EUR" },
  { code: "IL", name: "Israel", currency: "ILS" },
  { code: "IM", name: "Isla de Man", currency: "GBP" },
  { code: "IN", name: "India", currency: "INR" },
  { code: "IO", name: "Territorio Británico del Océano Índico", currency: "USD" },
  { code: "IQ", name: "Irak", currency: "IQD" },
  { code: "IR", name: "Irán", currency: "IRR" },
  { code: "IS", name: "Islandia", currency: "ISK" },
  { code: "IT", name: "Italia", currency: "EUR" },
  { code: "JE", name: "Jersey", currency: "GBP" },
  { code: "JM", name: "Jamaica", currency: "JMD" },
  { code: "JO", name: "Jordania", currency: "JOD" },
  { code: "JP", name: "Japón", currency: "JPY", aliases: ["japan"] },
  { code: "KE", name: "Kenia", currency: "KES" },
  { code: "KG", name: "Kirguistán", currency: "KGS" },
  { code: "KH", name: "Camboya", currency: "KHR" },
  { code: "KI", name: "Kiribati", currency: "AUD" },
  { code: "KM", name: "Comoras", currency: "KMF" },
  { code: "KN", name: "San Cristóbal y Nieves", currency: "XCD" },
  { code: "KP", name: "Corea del Norte", currency: "KPW" },
  { code: "KR", name: "Corea del Sur", currency: "KRW" },
  { code: "KW", name: "Kuwait", currency: "KWD" },
  { code: "KY", name: "Islas Caimán", currency: "KYD" },
  { code: "KZ", name: "Kazajistán", currency: "KZT" },
  { code: "LA", name: "Laos", currency: "LAK" },
  { code: "LB", name: "Líbano", currency: "LBP" },
  { code: "LC", name: "Santa Lucía", currency: "XCD" },
  { code: "LI", name: "Liechtenstein", currency: "CHF" },
  { code: "LK", name: "Sri Lanka", currency: "LKR" },
  { code: "LR", name: "Liberia", currency: "LRD" },
  { code: "LS", name: "Lesoto", currency: "LSL" },
  { code: "LT", name: "Lituania", currency: "EUR" },
  { code: "LU", name: "Luxemburgo", currency: "EUR" },
  { code: "LV", name: "Letonia", currency: "EUR" },
  { code: "LY", name: "Libia", currency: "LYD" },
  { code: "MA", name: "Marruecos", currency: "MAD" },
  { code: "MC", name: "Mónaco", currency: "EUR" },
  { code: "MD", name: "Moldavia", currency: "MDL" },
  { code: "ME", name: "Montenegro", currency: "EUR" },
  { code: "MF", name: "San Martín (Francia)", currency: "EUR" },
  { code: "MG", name: "Madagascar", currency: "MGA" },
  { code: "MH", name: "Islas Marshall", currency: "USD" },
  { code: "MK", name: "Macedonia del Norte", currency: "MKD" },
  { code: "ML", name: "Malí", currency: "XOF" },
  { code: "MM", name: "Myanmar", currency: "MMK", aliases: ["birmania"] },
  { code: "MN", name: "Mongolia", currency: "MNT" },
  { code: "MO", name: "Macao", currency: "MOP" },
  { code: "MP", name: "Islas Marianas del Norte", currency: "USD" },
  { code: "MQ", name: "Martinica", currency: "EUR" },
  { code: "MR", name: "Mauritania", currency: "MRU" },
  { code: "MS", name: "Montserrat", currency: "XCD" },
  { code: "MT", name: "Malta", currency: "EUR" },
  { code: "MU", name: "Mauricio", currency: "MUR" },
  { code: "MV", name: "Maldivas", currency: "MVR" },
  { code: "MW", name: "Malaui", currency: "MWK" },
  { code: "MX", name: "México", currency: "MXN", adjective: "mexicano", aliases: ["mexico"] },
  { code: "MY", name: "Malasia", currency: "MYR" },
  { code: "MZ", name: "Mozambique", currency: "MZN" },
  { code: "NA", name: "Namibia", currency: "NAD" },
  { code: "NC", name: "Nueva Caledonia", currency: "XPF" },
  { code: "NE", name: "Níger", currency: "XOF" },
  { code: "NF", name: "Isla Norfolk", currency: "AUD" },
  { code: "NG", name: "Nigeria", currency: "NGN" },
  { code: "NI", name: "Nicaragua", currency: "NIO" },
  { code: "NL", name: "Países Bajos", currency: "EUR", aliases: ["holanda", "netherlands"] },
  { code: "NO", name: "Noruega", currency: "NOK" },
  { code: "NP", name: "Nepal", currency: "NPR" },
  { code: "NR", name: "Nauru", currency: "AUD" },
  { code: "NU", name: "Niue", currency: "NZD" },
  { code: "NZ", name: "Nueva Zelanda", currency: "NZD" },
  { code: "OM", name: "Omán", currency: "OMR" },
  { code: "PA", name: "Panamá", currency: "USD", aliases: ["panama"] },
  { code: "PE", name: "Perú", currency: "USD", adjective: "peruano", aliases: ["peru"] },
  { code: "PF", name: "Polinesia Francesa", currency: "XPF" },
  { code: "PG", name: "Papúa Nueva Guinea", currency: "PGK" },
  { code: "PH", name: "Filipinas", currency: "PHP" },
  { code: "PK", name: "Pakistán", currency: "PKR" },
  { code: "PL", name: "Polonia", currency: "PLN" },
  { code: "PM", name: "San Pedro y Miquelón", currency: "EUR" },
  { code: "PN", name: "Islas Pitcairn", currency: "NZD" },
  { code: "PR", name: "Puerto Rico", currency: "USD" },
  { code: "PS", name: "Palestina", currency: "ILS" },
  { code: "PT", name: "Portugal", currency: "EUR" },
  { code: "PW", name: "Palaos", currency: "USD" },
  { code: "PY", name: "Paraguay", currency: "PYG" },
  { code: "QA", name: "Catar", currency: "QAR", aliases: ["qatar"] },
  { code: "RE", name: "Reunión", currency: "EUR" },
  { code: "RO", name: "Rumanía", currency: "RON" },
  { code: "RS", name: "Serbia", currency: "RSD" },
  { code: "RU", name: "Rusia", currency: "RUB" },
  { code: "RW", name: "Ruanda", currency: "RWF" },
  { code: "SA", name: "Arabia Saudita", currency: "SAR" },
  { code: "SB", name: "Islas Salomón", currency: "SBD" },
  { code: "SC", name: "Seychelles", currency: "SCR" },
  { code: "SD", name: "Sudán", currency: "SDG" },
  { code: "SE", name: "Suecia", currency: "SEK" },
  { code: "SG", name: "Singapur", currency: "SGD" },
  { code: "SH", name: "Santa Elena", currency: "SHP" },
  { code: "SI", name: "Eslovenia", currency: "EUR" },
  { code: "SJ", name: "Svalbard y Jan Mayen", currency: "NOK" },
  { code: "SK", name: "Eslovaquia", currency: "EUR" },
  { code: "SL", name: "Sierra Leona", currency: "SLE" },
  { code: "SM", name: "San Marino", currency: "EUR" },
  { code: "SN", name: "Senegal", currency: "XOF" },
  { code: "SO", name: "Somalia", currency: "SOS" },
  { code: "SR", name: "Surinam", currency: "SRD" },
  { code: "SS", name: "Sudán del Sur", currency: "SSP" },
  { code: "ST", name: "Santo Tomé y Príncipe", currency: "STN" },
  { code: "SV", name: "El Salvador", currency: "USD" },
  { code: "SX", name: "Sint Maarten", currency: "ANG" },
  { code: "SY", name: "Siria", currency: "SYP" },
  { code: "SZ", name: "Esuatini", currency: "SZL", aliases: ["suazilandia", "swaziland"] },
  { code: "TC", name: "Islas Turcas y Caicos", currency: "USD" },
  { code: "TD", name: "Chad", currency: "XAF" },
  { code: "TG", name: "Togo", currency: "XOF" },
  { code: "TH", name: "Tailandia", currency: "THB" },
  { code: "TJ", name: "Tayikistán", currency: "TJS" },
  { code: "TK", name: "Tokelau", currency: "NZD" },
  { code: "TL", name: "Timor-Leste", currency: "USD", aliases: ["timor oriental"] },
  { code: "TM", name: "Turkmenistán", currency: "TMT" },
  { code: "TN", name: "Túnez", currency: "TND" },
  { code: "TO", name: "Tonga", currency: "TOP" },
  { code: "TR", name: "Turquía", currency: "TRY" },
  { code: "TT", name: "Trinidad y Tobago", currency: "TTD" },
  { code: "TV", name: "Tuvalu", currency: "AUD" },
  { code: "TW", name: "Taiwán", currency: "TWD" },
  { code: "TZ", name: "Tanzania", currency: "TZS" },
  { code: "UA", name: "Ucrania", currency: "UAH" },
  { code: "UG", name: "Uganda", currency: "UGX" },
  {
    code: "US",
    name: "Estados Unidos",
    currency: "USD",
    aliases: ["usa", "eeuu", "ee.uu.", "america", "estados unidos de america"],
  },
  { code: "UY", name: "Uruguay", currency: "UYU" },
  { code: "UZ", name: "Uzbekistán", currency: "UZS" },
  { code: "VA", name: "Ciudad del Vaticano", currency: "EUR" },
  { code: "VC", name: "San Vicente y las Granadinas", currency: "XCD" },
  { code: "VE", name: "Venezuela", currency: "VES" },
  { code: "VG", name: "Islas Vírgenes Británicas", currency: "USD" },
  { code: "VI", name: "Islas Vírgenes de EE. UU.", currency: "USD" },
  { code: "VN", name: "Vietnam", currency: "VND" },
  { code: "VU", name: "Vanuatu", currency: "VUV" },
  { code: "WF", name: "Wallis y Futuna", currency: "XPF" },
  { code: "WS", name: "Samoa", currency: "WST" },
  { code: "XK", name: "Kosovo", currency: "EUR" },
  { code: "YE", name: "Yemen", currency: "YER" },
  { code: "YT", name: "Mayotte", currency: "EUR" },
  { code: "ZA", name: "Sudáfrica", currency: "ZAR" },
  { code: "ZM", name: "Zambia", currency: "ZMW" },
  { code: "ZW", name: "Zimbabue", currency: "ZWG", aliases: ["zimbabwe"] },
];

function expand(seed: CountrySeed): Country {
  const label = currencyLabel(seed.currency);
  return {
    code: seed.code,
    name: seed.name,
    adjective: seed.adjective ?? "",
    currency: seed.currency,
    currencyName: label.name,
    currencyShort: label.short,
    aliases: seed.aliases ?? [],
  };
}

export const COUNTRIES: Country[] = SEEDS.map(expand).sort((a, b) =>
  a.name.localeCompare(b.name, "es"),
);

export const COUNTRY_BY_CODE: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((country) => [country.code, country]),
);

export const DESTINATION_CODES: CountryCode[] = COUNTRIES.map((country) => country.code);

export const POPULAR_DESTINATION_CODES: CountryCode[] = [
  "EC",
  "CL",
  "CO",
  "MX",
  "PE",
  "US",
  "ES",
];

export function isCountryCode(value: string): value is CountryCode {
  return value in COUNTRY_BY_CODE;
}

export function getCountry(code: string): Country {
  return (
    COUNTRY_BY_CODE[code] ?? {
      code,
      name: code,
      adjective: "",
      currency: "",
      currencyName: "Moneda no identificada",
      currencyShort: "moneda",
      aliases: [],
    }
  );
}

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function haystack(country: Country): string[] {
  return [
    country.name,
    country.code,
    country.currency,
    country.currencyName,
    ...country.aliases,
  ].map(normalizeSearch);
}

function scoreCountry(country: Country, query: string): number {
  const code = normalizeSearch(country.code);
  const currency = normalizeSearch(country.currency);
  const name = normalizeSearch(country.name);
  const aliasHits = country.aliases.map(normalizeSearch);

  if (code === query) return 100;
  if (currency === query) return 90;
  if (name === query) return 88;
  if (aliasHits.includes(query)) return 86;
  if (code.startsWith(query)) return 84;
  if (name.startsWith(query)) return 80;
  if (aliasHits.some((alias) => alias.startsWith(query))) return 76;
  if (currency.startsWith(query)) return 70;
  if (name.includes(query)) return 50;
  if (aliasHits.some((alias) => alias.includes(query))) return 46;
  if (haystack(country).some((part) => part.includes(query))) return 30;
  return 0;
}

export function filterCountries(query: string, list: Country[] = COUNTRIES): Country[] {
  const q = normalizeSearch(query);
  if (!q) return list;
  return list
    .map((country) => ({ country, score: scoreCountry(country, q) }))
    .filter((row) => row.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.country.name.localeCompare(b.country.name, "es"),
    )
    .map((row) => row.country);
}
