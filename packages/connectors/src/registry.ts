import type { SupportedSite } from '@internet-redactor/shared';

import { LegacyForumConnector } from './connectors/legacyForumConnector';
import { RedditConnector } from './connectors/redditConnector';
import type { SiteConnector } from './types';

const connectors: SiteConnector[] = [new RedditConnector(), new LegacyForumConnector()];

export function getConnector(site: SupportedSite): SiteConnector {
  const connector = connectors.find((entry) => entry.site === site);
  if (!connector) {
    throw new Error(`No connector configured for ${site}`);
  }

  return connector;
}
