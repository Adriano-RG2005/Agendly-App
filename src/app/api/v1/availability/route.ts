import { availabilityController } from "@/core/container";

export const PUT = (req: Request) => availabilityController.upsert(req);
