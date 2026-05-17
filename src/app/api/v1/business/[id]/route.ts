import { businessController } from "@/core/container";

export const PATCH = (req: Request, { params }: { params: { id: string } }) =>
  businessController.update(req, params.id);
