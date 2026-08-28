import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  authSecret,
  googleClientId,
  googleClientSecret,
  roleForEmail,
  type UserRole,
} from "@/lib/auth-env";

/**
 * Auth.js env names (see .env.example):
 * AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_URL
 *
 * AUTH_URL is read by Auth.js from the environment. Placeholders keep the
 * Google provider registered so /api/auth/callback/google exists at build
 * time even when the secret is absent.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authSecret(),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: googleClientId() || "not-configured.apps.googleusercontent.com",
      clientSecret: googleClientSecret() || "not-configured",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token }) {
      if (token.email) {
        token.email = token.email.toLowerCase();
        token.role = roleForEmail(token.email);
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        const email = (token.email as string | undefined) ?? "";
        session.user.id = token.sub ?? "";
        session.user.email = email;
        session.user.role =
          (token.role as UserRole | undefined) ?? roleForEmail(email);
      }
      return session;
    },
  },
});
