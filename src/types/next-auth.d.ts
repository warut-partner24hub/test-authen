import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }
}
