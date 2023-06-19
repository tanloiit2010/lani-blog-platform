export interface LoginResponse {
  id: string;
  access_token: string;
  expired_at: string;
  renewal_token: string;
  user: {
    email: string;
  };
}

export interface TokenInfo {
  expiredAt: string;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
  };
  error?: string;
}

export interface SessionInfo {
  accessToken: string;
  user: {
    email: string;
  };
  error?: string;
}
