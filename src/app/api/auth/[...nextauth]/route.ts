import NextAuth from "next-auth";

// const ADMIN_PASSWORD_HASH =
//   "$2b$12$sF7pGkczgCBt7cNa7EZ1YudbDh4Y99zZxt8xXuEFAvRSPwTTmBfwS";

// Define proper session user type
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
  }
  interface Session {
    user: User & {
      role?: string;
    };
  }
}

import { authOptions } from "@/lib/auth";

// Create and export the route handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
