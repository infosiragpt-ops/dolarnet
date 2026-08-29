"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Flag } from "@/components/brand/Flag";
import {
  COUNTRIES,
  filterCountries,
  getCountry,
  POPULAR_DESTINATION_CODES,
  type Country,
  type CountryCode,
} from "@/lib/corridors";

type DestinationComboboxProps = {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  id?: string;
  placeholder?: string;
  showShortcuts?: boolean;
};

export function DestinationCombobox({
  value,
  onChange,
  id,
  placeholder = "Busca país, código o moneda",
  showShortcuts = true,
}: DestinationComboboxProps) {
  const listId = useId();
  const inputId = id ?? `${listId}-input`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = getCountry(value);
  const results = useMemo(() => filterCountries(query), [query]);
  const active = results[activeIndex] ?? null;

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const code = results[activeIndex]?.code;
    if (!code) return;
    itemRefs.current.get(code)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, results]);

  function openList(nextQuery = "") {
    setQuery(nextQuery);
    setActiveIndex(0);
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function selectCountry(country: Country) {
    onChange(country.code);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        openList(query);
        return;
      }
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index + 1) % results.length,
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openList(query);
        return;
      }
      setActiveIndex((index) =>
        results.length === 0
          ? 0
          : (index - 1 + results.length) % results.length,
      );
      return;
    }
    if (event.key === "Enter") {
      if (open && active) {
        event.preventDefault();
        selectCountry(active);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={rootRef} className="relative">
      {showShortcuts ? (
        <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
          {POPULAR_DESTINATION_CODES.map((code) => {
            const country = getCountry(code);
            const selectedChip = code === value;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onChange(code);
                  setQuery("");
                  setOpen(false);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[13px] font-semibold transition ${
                  selectedChip
                    ? "border-ink bg-ink text-white"
                    : "border-ink/10 bg-paper-2 text-ink hover:border-ink/25"
                }`}
              >
                <Flag code={code} size={18} />
                {country.name}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => openList("")}
            className="flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-2 text-[13px] font-semibold text-ink hover:border-ink/25"
          >
            Ver todos
          </button>
        </div>
      ) : null}

      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white px-3 py-2.5 transition ${
          open
            ? "border-ink/40 ring-4 ring-yellow/40"
            : "border-ink/12 focus-within:border-ink/40 focus-within:ring-4 focus-within:ring-yellow/40"
        }`}
      >
        <Flag code={selected.code} size={28} />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && active ? `${listId}-${active.code}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={open ? query : selected.name}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => openList("")}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-ink outline-none"
        />
        <span className="shrink-0 rounded-full bg-paper-2 px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-ink/70">
          {selected.currency}
        </span>
        <svg
          viewBox="0 0 12 8"
          className={`h-3 w-3 shrink-0 text-ink/50 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-ink/10 bg-white p-1 shadow-[0_18px_50px_rgba(16,24,32,0.16)]"
        >
          {results.length === 0 ? (
            <li className="px-3 py-4 text-[13px] text-muted">
              Ningún país coincide con “{query}”.
            </li>
          ) : (
            results.map((country, index) => {
              const isActive = index === activeIndex;
              const isSelected = country.code === value;
              return (
                <li key={country.code} role="presentation">
                  <button
                    ref={(node) => {
                      if (node) itemRefs.current.set(country.code, node);
                      else itemRefs.current.delete(country.code);
                    }}
                    type="button"
                    role="option"
                    id={`${listId}-${country.code}`}
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectCountry(country)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left ${
                      isActive ? "bg-yellow/50" : "hover:bg-paper-2"
                    }`}
                  >
                    <Flag code={country.code} size={22} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold">
                        {country.name}
                      </span>
                      <span className="block text-[12px] text-muted">
                        {country.code} · {country.currencyName}
                      </span>
                    </span>
                    <span className="text-[12px] font-bold tracking-[0.08em] text-ink/60">
                      {country.currency}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}

      <p className="mt-2 text-[12px] text-muted">
        {COUNTRIES.length} destinos. Escribe para filtrar por nombre, ISO o moneda.
      </p>
    </div>
  );
}
