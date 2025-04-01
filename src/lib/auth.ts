/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt, { compare } from "bcryptjs";

// Hardcoded admin credentials (or store in DB)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password:
    process.env.ADMIN_PASSWORD_HASH ||
    "$2b$12$3t9gYqHB9baxjN.lz9jPtOrVlz/8S0JgZmMd6aAcYdP9EkmQYNuMy",
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === ADMIN_CREDENTIALS.username &&
          (await compare(
            await bcrypt.hash(credentials.password, 12),
            ADMIN_CREDENTIALS.password
          ))
        ) {
          return { id: "1", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
