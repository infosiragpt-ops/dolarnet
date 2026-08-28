"use client";

import { useCallback, useEffect, useState } from "react";
import type { RatesPayload } from "@/lib/rates";

type RatesState =
  | { status: "loading" }
  | { status: "ready"; data: RatesPayload }
  | { status: "error"; message: string };

async function requestRates(): Promise<RatesPayload> {
  const response = await fetch("/api/rates", { cache: "no-store" });
  const body = (await response.json()) as RatesPayload & { error?: string };
  if (!response.ok || !body.rates) {
    throw new Error(body.error || "No se pudo cargar el tipo de cambio.");
  }
  return body;
}

export function useRates() {
  const [state, setState] = useState<RatesState>({ status: "loading" });

  const reload = useCallback(() => {
    return requestRates()
      .then((data) => setState({ status: "ready", data }))
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "No se pudo cargar el tipo de cambio.",
        });
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void reload();
    }, 0);
    return () => clearTimeout(timer);
  }, [reload]);

  function retry() {
    setState({ status: "loading" });
    void reload();
  }

  return { ...state, reload: retry };
}
