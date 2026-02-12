import type { AuthSession, DeletableItem } from '@internet-redactor/shared';

import type { SiteConnector } from '../types';

/**
 * Fallback connector for sites without robust APIs.
 * Real deletion uses Playwright flows from an isolated worker.
 */
export class LegacyForumConnector implements SiteConnector {
  readonly site = 'legacy-forum' as const;
  readonly mode = 'automation-fallback' as const;

  async previewContent(_auth: AuthSession): Promise<DeletableItem[]> {
    return [];
  }

  async deleteContent(_auth: AuthSession, ids: string[]): Promise<{ deleted: string[]; failed: string[] }> {
    return { deleted: [], failed: ids };
  }
}
