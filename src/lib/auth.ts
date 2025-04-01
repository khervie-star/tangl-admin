// lib/auth.ts
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const ADMIN_PASSWORD_HASH =
  "$2b$12$sF7pGkczgCBt7cNa7EZ1YudbDh4Y99zZxt8xXuEFAvRSPwTTmBfwS";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        // Check if username matches the admin username
        if (credentials.username === process.env.ADMIN_USERNAME) {
          const isValidPassword = await compare(
            credentials.password,
            ADMIN_PASSWORD_HASH
          );
          if (isValidPassword) {
            return {
              id: "1",
              name: "Admin",
              email: "info@tangl.com",
            };
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      // Fix: Add token parameter to session callback
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
