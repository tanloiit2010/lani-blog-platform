import { JWT } from "next-auth/jwt";
import { LoginResponse, TokenInfo } from "./types";
import { Session } from "next-auth/core/types";

export const toToken = (loginResponse: LoginResponse): JWT => {
  return {
    accessToken: loginResponse.access_token,
    expiredAt: loginResponse.expired_at,
    refreshToken: loginResponse.renewal_token,
    user: loginResponse.user,
  };
};

export const toSession = (
  token: TokenInfo,
  defaultSession?: Session
): Session => {
  return {
    ...(defaultSession || {}),
    error: token.error,
    user: {
      ...(defaultSession?.user || {}),
      ...token.user,
    },
    accessToken: token.accessToken,
    expires: defaultSession?.expires || "",
  };
};
