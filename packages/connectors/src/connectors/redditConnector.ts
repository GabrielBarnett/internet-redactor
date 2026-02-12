import { fetchJson, type AuthSession, type DeletableItem } from '@internet-redactor/shared';

import type { SiteConnector } from '../types';

interface RedditListing {
  data: {
    children: Array<{
      data: {
        id: string;
        title?: string;
        body?: string;
        selftext?: string;
        created_utc: number;
        name: string;
      };
      kind: 't1' | 't3';
    }>;
  };
}

export class RedditConnector implements SiteConnector {
  readonly site = 'reddit' as const;
  readonly mode = 'official-api' as const;

  async previewContent(auth: AuthSession): Promise<DeletableItem[]> {
    const listing = await fetchJson<RedditListing>('https://oauth.reddit.com/user/me/submitted?limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.token.accessToken}`
      }
    });

    return listing.data.children.map((item) => ({
      id: item.data.name,
      title: item.data.title ?? '(untitled)',
      bodyPreview: (item.data.selftext ?? item.data.body ?? '').slice(0, 180),
      createdAt: new Date(item.data.created_utc * 1000).toISOString(),
      kind: item.kind === 't1' ? 'comment' : 'post',
      site: 'reddit'
    }));
  }

  async deleteContent(auth: AuthSession, ids: string[]): Promise<{ deleted: string[]; failed: string[] }> {
    const deleted: string[] = [];
    const failed: string[] = [];

    for (const id of ids) {
      try {
        await fetch('https://oauth.reddit.com/api/del', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token.accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ id })
        });
        deleted.push(id);
      } catch {
        failed.push(id);
      }
    }

    return { deleted, failed };
  }
}
