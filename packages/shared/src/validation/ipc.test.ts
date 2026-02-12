import { describe, expect, it } from 'vitest';

import { DeleteRequestSchema, assertAllowedOrigin } from './ipc';

describe('ipc validation', () => {
  it('accepts allowed origins', () => {
    expect(() => assertAllowedOrigin('app://local')).not.toThrow();
  });

  it('rejects disallowed origins', () => {
    expect(() => assertAllowedOrigin('https://evil.example')).toThrowError(/Blocked IPC origin/);
  });

  it('rejects empty delete requests', () => {
    expect(() => DeleteRequestSchema.parse({ site: 'reddit', ids: [] })).toThrow();
  });
});
