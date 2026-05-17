import { z } from "zod";

export const UpsertAvailabilityDTO = z.object({
  businessId: z.string().uuid(),
  slots: z
    .array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
        endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
        isActive: z.boolean(),
      }),
    )
    .min(1),
});

export type UpsertAvailabilityDTO = z.infer<typeof UpsertAvailabilityDTO>;
