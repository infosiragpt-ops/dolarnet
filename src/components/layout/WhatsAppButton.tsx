import { WHATSAPP_URL } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
      aria-label="Abrir chat de WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.38-1.41a10 10 0 0 0 4.66 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.13c-.24.67-1.4 1.23-1.93 1.3-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.24-4.77-4.14-4.92-4.33-.14-.2-1.18-1.56-1.18-2.98 0-1.41.74-2.11 1-2.4.24-.27.64-.39 1.02-.39.12 0 .23 0 .33.01.3.01.44-.1.69.53.26.66.87 2.29.95 2.46.08.17.13.37.03.6-.1.24-.15.38-.3.58-.14.2-.3.44-.43.59-.14.17-.29.35-.12.66.16.3.73 1.2 1.57 1.94 1.08.96 1.97 1.26 2.28 1.4.3.13.48.11.66-.07.18-.17.77-.89.98-1.2.2-.3.41-.25.69-.15.28.1 1.79.84 2.1 1 .3.15.5.23.57.36.08.13.08.75-.16 1.42Z" />
      </svg>
    </a>
  );
}
