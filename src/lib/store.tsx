"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useSession } from "next-auth/react";
import { RESIDENCE_COOKIE } from "@/lib/auth-env";
import type { CountryCode } from "@/lib/corridors";
import { RESIDENCE_CODES } from "@/lib/corridors";
import { readJson, uid, writeJson } from "@/lib/storage";
import type {
  DestinationAccount,
  Profile,
  StoreState,
  Transfer,
  TransferStatus,
} from "@/lib/types";

const emptyState: StoreState = {
  profile: null,
  accounts: [],
  transfers: [],
};

type StoreContextValue = StoreState & {
  ready: boolean;
  updateProfile: (patch: Partial<Profile>) => void;
  addAccount: (account: Omit<DestinationAccount, "id">) => DestinationAccount;
  removeAccount: (id: string) => void;
  addTransfer: (
    transfer: Omit<Transfer, "id" | "createdAt" | "reference">,
  ) => Transfer;
  updateTransferStatus: (id: string, status: TransferStatus) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function storageKey(email: string) {
  return `dolarnett.app.v2.${email.toLowerCase()}`;
}

let memory: StoreState = emptyState;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readResidenceCookie(): CountryCode | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${RESIDENCE_COOKIE}=`));
  const value = match?.split("=")[1];
  return RESIDENCE_CODES.includes(value as CountryCode)
    ? (value as CountryCode)
    : undefined;
}

function loadForEmail(email: string): StoreState {
  const stored = readJson<StoreState>(storageKey(email), emptyState);
  const country = stored.profile?.country ?? readResidenceCookie();
  return {
    profile: {
      email,
      name: stored.profile?.name,
      country,
      phone: stored.profile?.phone,
      phoneVerified: stored.profile?.phoneVerified ?? false,
      profileComplete: stored.profile?.profileComplete ?? false,
      documentType: stored.profile?.documentType,
      documentNumber: stored.profile?.documentNumber,
    },
    accounts: stored.accounts ?? [],
    transfers: stored.transfers ?? [],
  };
}

function persist(email: string, next: StoreState) {
  memory = next;
  writeJson(storageKey(email), next);
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return memory;
}

function getServerSnapshot() {
  return emptyState;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const email = session?.user?.email?.toLowerCase() ?? "";

  useEffect(() => {
    if (status === "authenticated" && email) {
      memory = loadForEmail(email);
      writeJson(storageKey(email), memory);
      emit();
      return;
    }
    if (status === "unauthenticated") {
      memory = emptyState;
      emit();
    }
  }, [status, email]);

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    const current = getSnapshot();
    if (!current.profile) return;
    persist(current.profile.email, {
      ...current,
      profile: { ...current.profile, ...patch },
    });
  }, []);

  const addAccount = useCallback((account: Omit<DestinationAccount, "id">) => {
    const created: DestinationAccount = { ...account, id: uid("acc") };
    const current = getSnapshot();
    if (!current.profile) return created;
    persist(current.profile.email, {
      ...current,
      accounts: [created, ...current.accounts],
    });
    return created;
  }, []);

  const removeAccount = useCallback((id: string) => {
    const current = getSnapshot();
    if (!current.profile) return;
    persist(current.profile.email, {
      ...current,
      accounts: current.accounts.filter((account) => account.id !== id),
    });
  }, []);

  const addTransfer = useCallback(
    (transfer: Omit<Transfer, "id" | "createdAt" | "reference">) => {
      const created: Transfer = {
        ...transfer,
        id: uid("tx"),
        createdAt: new Date().toISOString(),
        reference: `DN-${uid("").slice(-4).toUpperCase()}`,
      };
      const current = getSnapshot();
      if (current.profile) {
        persist(current.profile.email, {
          ...current,
          transfers: [created, ...current.transfers],
        });
      }
      return created;
    },
    [],
  );

  const updateTransferStatus = useCallback(
    (id: string, statusValue: TransferStatus) => {
      const current = getSnapshot();
      if (!current.profile) return;
      persist(current.profile.email, {
        ...current,
        transfers: current.transfers.map((transfer) =>
          transfer.id === id ? { ...transfer, status: statusValue } : transfer,
        ),
      });
    },
    [],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      ready: status !== "loading",
      updateProfile,
      addAccount,
      removeAccount,
      addTransfer,
      updateTransferStatus,
    }),
    [
      state,
      status,
      updateProfile,
      addAccount,
      removeAccount,
      addTransfer,
      updateTransferStatus,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
