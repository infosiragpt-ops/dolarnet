import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  authSecret,
  googleClientId,
  googleClientSecret,
  roleForEmail,
  type UserRole,
} from "@/lib/auth-env";

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
