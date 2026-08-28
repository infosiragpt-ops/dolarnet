"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readJson<StoreState>(STORAGE_KEY, emptyState));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeJson(STORAGE_KEY, state);
  }, [ready, state]);

  const persist = useCallback((updater: (prev: StoreState) => StoreState) => {
    setState((prev) => updater(prev));
  }, []);

  const login = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    if (normalized === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setState(seedDemo());
      return null;
    }
    const current = readJson<StoreState>(STORAGE_KEY, emptyState);
    if (
      current.user &&
      current.user.email === normalized &&
      current.user.password === password
    ) {
      setState(current);
      return null;
    }
    return "Correo o contraseña no coinciden. Puedes usar la cuenta de demostración.";
  }, []);

  const loginDemo = useCallback(() => {
    setState(seedDemo());
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
    setState({ user, accounts: [], transfers: [] });
    return null;
  }, []);

  const logout = useCallback(() => {
    setState(emptyState);
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    persist((prev) =>
      prev.user ? { ...prev, user: { ...prev.user, ...patch } } : prev,
    );
  }, [persist]);

  const addAccount = useCallback((account: Omit<DestinationAccount, "id">) => {
    const created: DestinationAccount = { ...account, id: uid("acc") };
    persist((prev) => ({ ...prev, accounts: [created, ...prev.accounts] }));
    return created;
  }, [persist]);

  const removeAccount = useCallback((id: string) => {
    persist((prev) => ({
      ...prev,
      accounts: prev.accounts.filter((account) => account.id !== id),
    }));
  }, [persist]);

  const addTransfer = useCallback(
    (transfer: Omit<Transfer, "id" | "createdAt" | "reference">) => {
      const created: Transfer = {
        ...transfer,
        id: uid("tx"),
        createdAt: new Date().toISOString(),
        reference: `DN-${uid("").slice(-4).toUpperCase()}`,
      };
      persist((prev) => ({ ...prev, transfers: [created, ...prev.transfers] }));
      return created;
    },
    [persist],
  );

  const updateTransferStatus = useCallback(
    (id: string, status: TransferStatus) => {
      persist((prev) => ({
        ...prev,
        transfers: prev.transfers.map((transfer) =>
          transfer.id === id ? { ...transfer, status } : transfer,
        ),
      }));
    },
    [persist],
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
