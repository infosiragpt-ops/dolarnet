import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { missingRateMessage, rateFor, type RatesPayload } from "./rates.ts";

const payload: RatesPayload = {
  base: "PEN",
  updatedAt: "2026-08-29T00:00:00.000Z",
  updatedAtUnix: 1756425600,
  source: "open",
  commissionPen: 0,
  rates: {
    USD: { currency: "USD", rate: 0.27 },
    JPY: { currency: "JPY", rate: 40.12 },
    EUR: { currency: "EUR", rate: 0.25 },
  },
};

describe("rateFor", () => {
  it("looks up the live currency of the destination country", () => {
    assert.deepEqual(rateFor(payload, "US"), { currency: "USD", rate: 0.27 });
    assert.deepEqual(rateFor(payload, "JP"), { currency: "JPY", rate: 40.12 });
    assert.deepEqual(rateFor(payload, "ES"), { currency: "EUR", rate: 0.25 });
    assert.deepEqual(rateFor(payload, "EC"), { currency: "USD", rate: 0.27 });
  });

  it("returns null instead of inventing a rate", () => {
    assert.equal(rateFor(payload, "KP"), null);
    assert.equal(rateFor({ ...payload, rates: {} }, "US"), null);
  });
});

describe("missingRateMessage", () => {
  it("names the country and currency", () => {
    const message = missingRateMessage("KP");
    assert.match(message, /KPW/);
    assert.match(message, /Corea del Norte/);
    assert.match(message, /referencia de mercado/);
  });
});
