import { LoginResponse, SessionInfo, TokenInfo } from "@/models/accounts/types";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends SessionInfo {}

  interface User extends LoginResponse {}
}

declare module "next-auth/jwt" {
  interface JWT extends TokenInfo {}
}
