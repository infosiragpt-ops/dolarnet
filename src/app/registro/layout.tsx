import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regístrate",
  description:
    "Crea una cuenta Dolarnett. Primero elige tu país de residencia: Chile, Colombia, Ecuador, México o Perú.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
