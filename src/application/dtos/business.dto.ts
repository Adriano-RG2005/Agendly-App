import { z } from "zod";

export const CreateBusinessDTO = z.object({
  userId: z.uuid(),
  name: z.string().min(2),
  slug: z.string().optional(),
  serviceName: z.string().min(2),
  durationMin: z.number().min(15).max(480).default(60),
  description: z.string().optional(),
});

export const UpdateBusinessDTO = z.object({
  name: z.string().min(2).optional(),
  serviceName: z.string().min(2).optional(),
  durationMin: z.number().min(15).max(480).optional(),
  description: z.string().optional(),
});

export type CreateBusinessDTO = z.infer<typeof CreateBusinessDTO>;
export type UpdateBusinessDTO = z.infer<typeof UpdateBusinessDTO>;
