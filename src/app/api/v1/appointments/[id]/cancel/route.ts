import { appointmentController } from "@/core/container";

export const PATCH = (req: Request, { params }: { params: { id: string } }) =>
  appointmentController.cancel(req, params.id);
