import { RegisterUseCase } from "@application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "@application/use-cases/auth/LoginUseCase";
import { RegisterDTO } from "@application/dtos/auth.dto";
import { LoginDTO } from "@application/dtos/auth.dto";
import { HttpResponse } from "@presentation/http/HttpResponse";
import { DomainError, ConflictError, ValidationError } from "@domain/errors";

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}


  /**
   * @deprecated Use the registerAction function from the actions module instead.
   */
  async register(req: Request): Promise<Response> {
    try {
      const body = await req.json();
      const parsed = RegisterDTO.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.badRequest(parsed.error.message);
      }

      const user = await this.registerUseCase.execute(parsed.data);
      return HttpResponse.created(user);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async login(req: Request): Promise<Response> {
    try {
      const body = await req.json();
      const parsed = LoginDTO.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.badRequest(parsed.error.message);
      }

      const result = await this.loginUseCase.execute(parsed.data);
      return HttpResponse.ok(result);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): Response {
    if (error instanceof ConflictError)
      return HttpResponse.conflict(error.message);
    if (error instanceof ValidationError)
      return HttpResponse.unprocessable(error.message);
    if (error instanceof DomainError)
      return HttpResponse.badRequest(error.message);
    return HttpResponse.internal();
  }
}
