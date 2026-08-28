"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  DEMO_ACCOUNTS,
  DEMO_EMAIL,
  DEMO_PASSWORD,
  DEMO_TRANSFERS,
  DEMO_USER,
} from "@/lib/demo-data";
import { readJson, uid, writeJson } from "@/lib/storage";
import type {
  DestinationAccount,
  StoreState,
  Transfer,
  TransferStatus,
  User,
} from "@/lib/types";
import type { CountryCode } from "@/lib/corridors";

const STORAGE_KEY = "dolarnett.demo.v1";

const emptyState: StoreState = {
  user: null,
  accounts: [],
  transfers: [],
};

type RegisterInput = {
  country: CountryCode;
  name: string;
  email: string;
  password: string;
};

type StoreContextValue = StoreState & {
  ready: boolean;
  login: (email: string, password: string) => string | null;
  loginDemo: () => void;
  register: (input: RegisterInput) => string | null;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  addAccount: (account: Omit<DestinationAccount, "id">) => DestinationAccount;
  removeAccount: (id: string) => void;
  addTransfer: (
    transfer: Omit<Transfer, "id" | "createdAt" | "reference">,
  ) => Transfer;
  updateTransferStatus: (id: string, status: TransferStatus) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function seedDemo(): StoreState {
  return {
    user: DEMO_USER,
    accounts: DEMO_ACCOUNTS,
    transfers: DEMO_TRANSFERS,
  };
}

let memory: StoreState = emptyState;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  memory = readJson<StoreState>(STORAGE_KEY, emptyState);
  hydrated = true;
}

function setMemory(next: StoreState) {
  memory = next;
  writeJson(STORAGE_KEY, next);
  emit();
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return memory;
}

function getServerSnapshot() {
  return emptyState;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const login = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (normalized === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setMemory(seedDemo());
      return null;
    }
    const current = readJson<StoreState>(STORAGE_KEY, emptyState);
    if (
      current.user &&
      current.user.email === normalized &&
      current.user.password === password
    ) {
      setMemory(current);
      return null;
    }
    return "Correo o contraseña no coinciden. Puedes usar la cuenta de demostración.";
  }, []);

  const loginDemo = useCallback(() => {
    setMemory(seedDemo());
  }, []);

  const register = useCallback((input: RegisterInput) => {
    const email = input.email.trim().toLowerCase();
    if (!email.includes("@")) return "Ingresa un correo válido.";
    if (input.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    const user: User = {
      id: uid("user"),
      email,
      password: input.password,
      name: input.name.trim(),
      country: input.country,
      phoneVerified: false,
      profileComplete: false,
    };
    setMemory({ user, accounts: [], transfers: [] });
    return null;
  }, []);

  const logout = useCallback(() => {
    setMemory(emptyState);
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    const current = getSnapshot();
    if (!current.user) return;
    setMemory({ ...current, user: { ...current.user, ...patch } });
  }, []);

  const addAccount = useCallback((account: Omit<DestinationAccount, "id">) => {
    const created: DestinationAccount = { ...account, id: uid("acc") };
    const current = getSnapshot();
    setMemory({ ...current, accounts: [created, ...current.accounts] });
    return created;
  }, []);

  const removeAccount = useCallback((id: string) => {
    const current = getSnapshot();
    setMemory({
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
      setMemory({ ...current, transfers: [created, ...current.transfers] });
      return created;
    },
    [],
  );

  const updateTransferStatus = useCallback(
    (id: string, status: TransferStatus) => {
      const current = getSnapshot();
      setMemory({
        ...current,
        transfers: current.transfers.map((transfer) =>
          transfer.id === id ? { ...transfer, status } : transfer,
        ),
      });
    },
    [],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      ready,
      login,
      loginDemo,
      register,
      logout,
      updateUser,
      addAccount,
      removeAccount,
      addTransfer,
      updateTransferStatus,
    }),
    [
      state,
      ready,
      login,
      loginDemo,
      register,
      logout,
      updateUser,
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
