import { unstable_cache } from "next/cache";
import { CACHE_SECONDS, type RatesPayload } from "@/lib/rates";

type UpstreamBody = {
  result?: string;
  "error-type"?: string;
  base_code?: string;
  time_last_update_unix?: number;
  time_last_update_utc?: string;
  rates?: Record<string, number>;
  conversion_rates?: Record<string, number>;
};

function commissionPen() {
  const raw = process.env.COMMISSION_PEN;
  if (!raw) return 0;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function feedUrl() {
  const key = process.env.EXCHANGE_RATE_API_KEY?.trim();
  if (key) {
    return {
      url: `https://v6.exchangerate-api.com/v6/${key}/latest/PEN`,
      source: "keyed" as const,
    };
  }
  return {
    url: "https://open.er-api.com/v6/latest/PEN",
    source: "open" as const,
  };
}

function asPositiveRate(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : null;
}

async function fetchLiveRates(): Promise<Omit<RatesPayload, "commissionPen">> {
  const { url, source } = feedUrl();
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`El proveedor de FX respondió ${response.status}.`);
  }

  const body = (await response.json()) as UpstreamBody;
  if (body.result && body.result !== "success") {
    throw new Error(body["error-type"] || "El proveedor de FX no devolvió success.");
  }

  const table = body.rates ?? body.conversion_rates;
  if (!table) {
    throw new Error("El proveedor de FX no envió una tabla de tipos de cambio.");
  }

  const rates: RatesPayload["rates"] = {};
  for (const [code, value] of Object.entries(table)) {
    if (!/^[A-Z]{3}$/.test(code)) continue;
    const rate = asPositiveRate(value);
    if (!rate) continue;
    rates[code] = { currency: code, rate };
  }

  if (Object.keys(rates).length === 0) {
    throw new Error("El proveedor de FX no envió monedas utilizables.");
  }

  const updatedAtUnix = body.time_last_update_unix;
  if (!updatedAtUnix) {
    throw new Error("El proveedor de FX no envió marca de tiempo.");
  }

  return {
    base: "PEN",
    updatedAt: new Date(updatedAtUnix * 1000).toISOString(),
    updatedAtUnix,
    source,
    rates,
  };
}

const getCachedRates = unstable_cache(fetchLiveRates, ["pen-latest-rates"], {
  revalidate: CACHE_SECONDS,
  tags: ["fx-rates"],
});

let memory: { expires: number; data: Omit<RatesPayload, "commissionPen"> } | null =
  null;

export async function getLatestRates(): Promise<RatesPayload> {
  if (memory && memory.expires > Date.now()) {
    return { ...memory.data, commissionPen: commissionPen() };
  }

  const data = await getCachedRates();
  memory = { data, expires: Date.now() + CACHE_SECONDS * 1000 };
  return { ...data, commissionPen: commissionPen() };
}
