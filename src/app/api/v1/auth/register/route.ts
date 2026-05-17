import { authController } from "@/core/container";

export const POST = (req: Request) => authController.register(req);
