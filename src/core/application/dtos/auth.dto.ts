import { z } from "zod";

export const RegisterDTO = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  phone: z.string().optional(),
});

export const LoginDTO = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type RegisterDTO = z.infer<typeof RegisterDTO>;
export type LoginDTO = z.infer<typeof LoginDTO>;
