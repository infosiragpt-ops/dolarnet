import type { DestinationAccount, Transfer, User } from "@/lib/types";

export const DEMO_EMAIL = "ana.demo@dolarnett.com";
export const DEMO_PASSWORD = "demo1234";

export const DEMO_USER: User = {
  id: "user_demo_ana",
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
  name: "Ana Torres",
  country: "PE",
  phone: "+51 983 000 000",
  phoneVerified: true,
  profileComplete: true,
  documentType: "DNI",
  documentNumber: "00000000",
};

export const DEMO_ACCOUNTS: DestinationAccount[] = [
  {
    id: "acc_demo_ec",
    country: "EC",
    bank: "Banco Pichincha",
    holder: "Luis Torres",
    number: "2200-00-000001",
    type: "ahorros",
  },
  {
    id: "acc_demo_co",
    country: "CO",
    bank: "Bancolombia",
    holder: "María Torres",
    number: "000-DEMO-3344",
    type: "ahorros",
  },
];

export const DEMO_TRANSFERS: Transfer[] = [
  {
    id: "tx_demo_1",
    createdAt: "2026-08-12T15:20:00.000Z",
    destinationCountry: "EC",
    sendAmount: 1200,
    receiveAmount: 348,
    currency: "USD",
    commission: 4.9,
    total: 1204.9,
    rate: 0.29,
    accountId: "acc_demo_ec",
    beneficiary: "Luis Torres",
    status: "entregada",
    reference: "DN-84K2",
  },
  {
    id: "tx_demo_2",
    createdAt: "2026-08-21T18:05:00.000Z",
    destinationCountry: "CO",
    sendAmount: 800,
    receiveAmount: 747144,
    currency: "COP",
    commission: 4.9,
    total: 804.9,
    rate: 933.93,
    accountId: "acc_demo_co",
    beneficiary: "María Torres",
    status: "en_proceso",
    reference: "DN-92M1",
  },
  {
    id: "tx_demo_3",
    createdAt: "2026-08-26T11:40:00.000Z",
    destinationCountry: "CL",
    sendAmount: 500,
    receiveAmount: 137230,
    currency: "CLP",
    commission: 4.9,
    total: 504.9,
    rate: 274.46,
    beneficiary: "Cuenta por confirmar",
    status: "esperando_transferencia",
    reference: "DN-11C7",
  },
];

export const DOLARNETT_DEPOSIT_ACCOUNTS = [
  {
    bank: "BCP",
    currency: "PEN",
    holder: "Dolarnett (cuenta de ejemplo)",
    number: "193-0000000-0-00",
    cci: "00219300000000000000",
  },
  {
    bank: "Interbank",
    currency: "PEN",
    holder: "Dolarnett (cuenta de ejemplo)",
    number: "000-0000000000",
    cci: "00300000000000000000",
  },
];
