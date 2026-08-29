import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { AuthSessionProvider } from "@/components/auth/AuthSessionProvider";
import { StoreProvider } from "@/lib/store";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Envía dinero desde soles peruanos a cualquier país del mundo. Cotizador con tipo de cambio de referencia de mercado en vivo.",
  applicationName: SITE_NAME,
  metadataBase: new URL("https://dolarnett.com"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <AuthSessionProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
