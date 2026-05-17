import { appointmentController } from "@/core/container";

export const POST = (req: Request) => appointmentController.sendReminders(req);
