import { appointmentController } from "@/core/container";

export const PATCH = (req: Request, { params }: { params: { id: string } }) =>
  appointmentController.complete(req, params.id);
