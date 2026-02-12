import { describe, expect, it } from 'vitest';

import { getConnector } from './registry';

describe('connector registry', () => {
  it('returns official API connector for reddit', () => {
    const connector = getConnector('reddit');
    expect(connector.mode).toBe('official-api');
  });

  it('returns fallback connector for legacy sites', () => {
    const connector = getConnector('legacy-forum');
    expect(connector.mode).toBe('automation-fallback');
  });
});
