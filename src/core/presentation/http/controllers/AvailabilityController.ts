import { UpsertAvailabilityUseCase } from "@application/use-cases/availability/UpsertAvailabilityUseCase";
import { UpsertAvailabilityDTO } from "@application/dtos/availability.dto";
import { HttpResponse } from "@presentation/http/HttpResponse";
import { AuthMiddleware } from "@presentation/http/middlewares/authMiddleware";
import {
  DomainError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@domain/errors";

export class AvailabilityController {
  constructor(
    private readonly upsertAvailabilityUseCase: UpsertAvailabilityUseCase,
    private readonly authMiddleware: AuthMiddleware,
  ) {}

  async upsert(req: Request): Promise<Response> {
    try {
      const authUser = await this.authMiddleware.authenticate(req);

      const body = await req.json();
      const parsed = UpsertAvailabilityDTO.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.badRequest(parsed.error.message);
      }

      const availability = await this.upsertAvailabilityUseCase.execute(
        authUser.id,
        parsed.data,
      );
      return HttpResponse.ok(availability);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): Response {
    if (error instanceof UnauthorizedError) return HttpResponse.unauthorized();
    if (error instanceof NotFoundError)
      return HttpResponse.notFound(error.message);
    if (error instanceof ValidationError)
      return HttpResponse.unprocessable(error.message);
    if (error instanceof DomainError)
      return HttpResponse.badRequest(error.message);
    return HttpResponse.internal();
  }
}
