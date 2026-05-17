import { businessController } from '@/core/container'

export const POST = (req: Request) => businessController.create(req)