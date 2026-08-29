import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COUNTRIES,
  COUNTRY_BY_CODE,
  filterCountries,
  getCountry,
  POPULAR_DESTINATION_CODES,
} from "./countries.ts";

describe("country catalog", () => {
  it("covers ISO 3166-1 destinations with ISO 4217 currencies", () => {
    assert.ok(COUNTRIES.length >= 240, `expected >= 240 countries, got ${COUNTRIES.length}`);
    const codes = new Set(COUNTRIES.map((country) => country.code));
    assert.equal(codes.size, COUNTRIES.length);
    for (const country of COUNTRIES) {
      assert.match(country.code, /^[A-Z]{2}$/);
      assert.match(country.currency, /^[A-Z]{3}$/);
      assert.ok(country.name.length > 1);
    }
  });

  it("maps euro and dollar special cases honestly", () => {
    assert.equal(getCountry("ES").currency, "EUR");
    assert.equal(getCountry("DE").currency, "EUR");
    assert.equal(getCountry("ME").currency, "EUR");
    assert.equal(getCountry("XK").currency, "EUR");
    assert.equal(getCountry("EC").currency, "USD");
    assert.equal(getCountry("SV").currency, "USD");
    assert.equal(getCountry("PA").currency, "USD");
    assert.equal(getCountry("US").currency, "USD");
    assert.equal(getCountry("PE").currency, "USD");
    assert.equal(getCountry("JP").currency, "JPY");
  });

  it("keeps popular shortcuts", () => {
    for (const code of POPULAR_DESTINATION_CODES) {
      assert.ok(COUNTRY_BY_CODE[code], code);
    }
    assert.deepEqual(POPULAR_DESTINATION_CODES, [
      "EC",
      "CL",
      "CO",
      "MX",
      "PE",
      "US",
      "ES",
    ]);
  });
});

describe("filterCountries", () => {
  it("returns the full list when the query is empty", () => {
    assert.equal(filterCountries("").length, COUNTRIES.length);
    assert.equal(filterCountries("   ").length, COUNTRIES.length);
  });

  it('finds Japón / JPY from "jap"', () => {
    const hits = filterCountries("jap");
    assert.equal(hits[0]?.code, "JP");
    assert.equal(hits[0]?.name, "Japón");
    assert.equal(hits[0]?.currency, "JPY");
  });

  it('finds Estados Unidos / USD from "est"', () => {
    const hits = filterCountries("est");
    const usa = hits.find((country) => country.code === "US");
    assert.ok(usa);
    assert.equal(usa.name, "Estados Unidos");
    assert.equal(usa.currency, "USD");
    assert.ok(hits.some((country) => country.code === "EE"));
  });

  it("filters by ISO country code and currency code", () => {
    assert.equal(filterCountries("jp")[0]?.code, "JP");
    assert.ok(filterCountries("jpy").some((country) => country.code === "JP"));
    assert.ok(filterCountries("usd").some((country) => country.code === "US"));
  });
});
