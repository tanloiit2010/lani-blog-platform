import { toSession, toToken } from "@/models/accounts";
import { LoginResponse } from "@/models/accounts/types";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const signIn = async (params: { email: string; password: string }) => {
  const { email, password } = params;
  const response = await axios.post<{
    data: LoginResponse;
  }>(`${process.env.API_URL}/api/session`, {
    user: {
      email: email,
      password: password,
    },
  });

  return response.data?.data;
};

const refreshToken = async (params: { token: string }) => {
  const { token } = params;
  const response = await axios.post<{
    data: LoginResponse;
  }>(
    `${process.env.API_URL}/api/session/renew`,
    {},
    { headers: { Authorization: token } }
  );

  return response.data?.data;
};

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials?.username || !credentials?.password) {
          return null;
        }

        return signIn({
          email: credentials?.username,
          password: credentials?.password,
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        return toToken(user);
      }

      if (new Date() < new Date(token.expiredAt)) {
        return token;
      }

      try {
        const response = await refreshToken({
          token: token.refreshToken,
        });

        return toToken(response);
      } catch (error) {
        return {
          ...token,
          error: "RefreshAccessTokenError" as const,
        };
      }
    },
    async session({ session, token }) {
      return toSession(token, session);
    },
  },
});

export { handler as GET, handler as POST };
