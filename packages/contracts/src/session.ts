import { z } from "zod";

export const sessionDataSchema = z.object({
  activeTenantId: z.string().optional(),
  email: z.string().optional(),
  role: z.string().nullable().optional(),
  tenantIds: z.array(z.string()).optional(),
  uid: z.string().optional(),
});

export type SessionData = z.infer<typeof sessionDataSchema>;

export const sealedSessionSchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  data: sessionDataSchema,
});
