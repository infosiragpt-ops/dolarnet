import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Entra a tu cuenta Dolarnett (sesión de demostración local).",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
