export type SupportedSite = 'reddit' | 'youtube' | 'facebook' | 'legacy-forum';

export interface DeletableItem {
  id: string;
  title: string;
  bodyPreview: string;
  createdAt: string;
  kind: 'post' | 'comment';
  site: SupportedSite;
  deleteEndpoint?: string;
}

export interface OAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAtEpochMs?: number;
  scope: string[];
  tokenType: 'Bearer';
}

export interface AuthSession {
  site: SupportedSite;
  userId: string;
  token: OAuthToken;
}
