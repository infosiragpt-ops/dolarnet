import type { ReactNode } from "react";
import type { CountryCode } from "@/lib/corridors";

const FLAG_PATHS: Record<CountryCode, ReactNode> = {
  CL: (
    <>
      <rect width="40" height="40" fill="#D52B1E" />
      <rect width="40" height="20" fill="#fff" />
      <rect width="16" height="20" fill="#0039A6" />
      <path
        d="M8 6.2 8.9 8.8h2.8l-2.2 1.6.9 2.6L8 11.4l-2.4 1.6.9-2.6-2.2-1.6h2.8L8 6.2Z"
        fill="#fff"
      />
    </>
  ),
  CO: (
    <>
      <rect width="40" height="40" fill="#FCD116" />
      <rect y="20" width="40" height="10" fill="#003893" />
      <rect y="30" width="40" height="10" fill="#CE1126" />
    </>
  ),
  EC: (
    <>
      <rect width="40" height="40" fill="#FFD200" />
      <rect y="20" width="40" height="10" fill="#003399" />
      <rect y="30" width="40" height="10" fill="#DE2034" />
    </>
  ),
  MX: (
    <>
      <rect width="40" height="40" fill="#006847" />
      <rect x="13" width="14" height="40" fill="#fff" />
      <rect x="27" width="13" height="40" fill="#CE1126" />
      <circle cx="20" cy="20" r="3.2" fill="#9B6B1F" />
    </>
  ),
  PE: (
    <>
      <rect width="40" height="40" fill="#D91023" />
      <rect x="13" width="14" height="40" fill="#fff" />
    </>
  ),
};

type FlagProps = {
  code: CountryCode;
  size?: number;
  className?: string;
};

export function Flag({ code, size = 28, className = "" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={`rounded-full ring-1 ring-black/10 ${className}`}
      aria-hidden
    >
      {FLAG_PATHS[code]}
    </svg>
  );
}
