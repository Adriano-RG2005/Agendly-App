import { appointmentController } from "@/core/container";

export const GET = (req: Request, { params }: { params: { slug: string } }) =>
  appointmentController.getPublicBusiness(req, params.slug);
