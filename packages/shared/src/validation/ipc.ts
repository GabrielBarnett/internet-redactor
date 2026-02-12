import { z } from 'zod';

export const AllowedOrigins = new Set(['app://local', 'http://localhost:5173']);

export function assertAllowedOrigin(origin: string): void {
  if (!AllowedOrigins.has(origin)) {
    throw new Error(`Blocked IPC origin: ${origin}`);
  }
}

export const PreviewRequestSchema = z.object({
  site: z.enum(['reddit', 'youtube', 'facebook', 'legacy-forum'])
});

export const DeleteRequestSchema = z.object({
  site: z.enum(['reddit', 'youtube', 'facebook', 'legacy-forum']),
  ids: z.array(z.string().min(1)).min(1)
});
