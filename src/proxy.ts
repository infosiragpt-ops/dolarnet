import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PROTECTED = [
  "/dashboard",
  "/transferencia",
  "/cuentas-destinos",
  "/historial",
  "/verificar-cuenta",
];

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const signedIn = Boolean(request.auth?.user?.email);
  const needsAuth = PROTECTED.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (needsAuth && !signedIn) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if ((pathname === "/login" || pathname === "/registro") && signedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/transferencia",
    "/transferencia/:path*",
    "/cuentas-destinos",
    "/cuentas-destinos/:path*",
    "/historial",
    "/historial/:path*",
    "/verificar-cuenta",
    "/verificar-cuenta/:path*",
    "/login",
    "/registro",
  ],
};
