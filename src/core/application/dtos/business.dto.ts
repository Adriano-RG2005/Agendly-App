import { z } from "zod";

export const CreateBusinessDTO = z.object({
  userId: z.string().uuid(),
  name: z.string().min(2),
  slug: z.string().optional(),
  serviceName: z.string().min(2),
  durationMin: z.number().min(15).max(480).default(60),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export const UpdateBusinessDTO = z.object({
  name: z.string().min(2).optional(),
  serviceName: z.string().min(2).optional(),
  durationMin: z.number().min(15).max(480).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type CreateBusinessDTO = z.infer<typeof CreateBusinessDTO>;
export type UpdateBusinessDTO = z.infer<typeof UpdateBusinessDTO>;
