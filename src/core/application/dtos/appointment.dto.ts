import { z } from "zod";

export const CreateAppointmentDTO = z.object({
  businessSlug: z.string(),
  clientName: z.string().min(2),
  clientEmail: z.email(),
  clientWhatsapp: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
});

export const GetBusinessAppointmentsDTO = z.object({
  businessId: z.string().uuid(),
});

export const AppointmentActionDTO = z.object({
  appointmentId: z.uuid(),
  businessId: z.uuid(), // para verificar ownership
});

export type CreateAppointmentDTO = z.infer<typeof CreateAppointmentDTO>;
export type GetBusinessAppointmentsDTO = z.infer<
  typeof GetBusinessAppointmentsDTO
>;
export type AppointmentActionDTO = z.infer<typeof AppointmentActionDTO>;
