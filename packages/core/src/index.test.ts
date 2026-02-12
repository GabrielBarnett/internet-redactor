import { describe, expect, it, vi } from 'vitest';

import { DeletionJobSystem } from './index';

describe('DeletionJobSystem', () => {
  it('enforces non-empty deletion selection', async () => {
    const jobSystem = new DeletionJobSystem({
      preview: vi.fn(),
      remove: vi.fn()
    });

    await expect(jobSystem.execute('reddit', [])).rejects.toThrow(/At least one item id/);
  });
});
