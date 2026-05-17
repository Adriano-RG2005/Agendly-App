import { appointmentController } from "@/core/container";

export const GET = (req: Request) => appointmentController.getByBusiness(req);
export const POST = (req: Request) => appointmentController.create(req);
