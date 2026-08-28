import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Entra a Dolarnett con tu cuenta de Google.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
