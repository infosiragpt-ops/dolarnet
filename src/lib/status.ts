import type { TransferStatus } from "@/lib/types";

export const STATUS_LABEL: Record<TransferStatus, string> = {
  cotizada: "Cotizada",
  esperando_transferencia: "Esperando tu transferencia",
  en_proceso: "En proceso",
  entregada: "Entregada",
  cancelada: "Cancelada",
};

export function statusLabel(status: TransferStatus) {
  return STATUS_LABEL[status];
}
