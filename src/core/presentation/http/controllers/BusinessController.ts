import { CreateBusinessUseCase } from "@application/use-cases/business/CreateBusinessUseCase";
import { UpdateBusinessUseCase } from "@application/use-cases/business/UpdateBusinessUseCase";
import { CreateBusinessDTO } from "@application/dtos/business.dto";
import { UpdateBusinessDTO } from "@application/dtos/business.dto";
import { HttpResponse } from "@presentation/http/HttpResponse";
import { AuthMiddleware } from "@presentation/http/middlewares/authMiddleware";
import {
  DomainError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  ValidationError,
} from "@domain/errors";

export class BusinessController {
  constructor(
    private readonly createBusinessUseCase: CreateBusinessUseCase,
    private readonly updateBusinessUseCase: UpdateBusinessUseCase,
    private readonly authMiddleware: AuthMiddleware,
  ) {}

  async create(req: Request): Promise<Response> {
    try {
      const authUser = await this.authMiddleware.authenticate(req);

      const body = await req.json();
      const parsed = CreateBusinessDTO.safeParse({
        ...body,
        userId: authUser.id,
      });

      if (!parsed.success) {
        return HttpResponse.badRequest(parsed.error.message);
      }

      const business = await this.createBusinessUseCase.execute(parsed.data);
      return HttpResponse.created(business);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(req: Request, businessId: string): Promise<Response> {
    try {
      const authUser = await this.authMiddleware.authenticate(req);

      const body = await req.json();
      const parsed = UpdateBusinessDTO.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.badRequest(parsed.error.message);
      }

      const business = await this.updateBusinessUseCase.execute(
        businessId,
        authUser.id,
        parsed.data,
      );
      return HttpResponse.ok(business);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): Response {
    if (error instanceof UnauthorizedError) return HttpResponse.unauthorized();
    if (error instanceof NotFoundError)
      return HttpResponse.notFound(error.message);
    if (error instanceof ConflictError)
      return HttpResponse.conflict(error.message);
    if (error instanceof ValidationError)
      return HttpResponse.unprocessable(error.message);
    if (error instanceof DomainError)
      return HttpResponse.badRequest(error.message);
    return HttpResponse.internal();
  }
}
