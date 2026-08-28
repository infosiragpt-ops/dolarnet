import type { CountryCode } from "@/lib/corridors";

export type DocumentType = "DNI" | "CE";

export type AccountType = "ahorros" | "corriente";

export type TransferStatus =
  | "cotizada"
  | "esperando_transferencia"
  | "en_proceso"
  | "entregada"
  | "cancelada";

export type Profile = {
  email: string;
  name?: string;
  country?: CountryCode;
  phone?: string;
  phoneVerified: boolean;
  profileComplete: boolean;
  documentType?: DocumentType;
  documentNumber?: string;
};

export type DestinationAccount = {
  id: string;
  country: CountryCode;
  bank: string;
  holder: string;
  number: string;
  type: AccountType;
};

export type Transfer = {
  id: string;
  createdAt: string;
  destinationCountry: CountryCode;
  sendAmount: number;
  receiveAmount: number;
  currency: string;
  commission: number;
  total: number;
  rate: number;
  accountId?: string;
  beneficiary?: string;
  status: TransferStatus;
  reference: string;
};

export type StoreState = {
  profile: Profile | null;
  accounts: DestinationAccount[];
  transfers: Transfer[];
};
