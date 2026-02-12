import type { AuthSession, DeletableItem, SupportedSite } from '@internet-redactor/shared';

export interface SiteConnector {
  readonly site: SupportedSite;
  readonly mode: 'official-api' | 'automation-fallback';
  previewContent(auth: AuthSession): Promise<DeletableItem[]>;
  deleteContent(auth: AuthSession, ids: string[]): Promise<{ deleted: string[]; failed: string[] }>;
}
