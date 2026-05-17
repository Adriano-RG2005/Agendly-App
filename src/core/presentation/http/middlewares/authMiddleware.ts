import { IAuthService } from "@application/interfaces/IAuthService";
import { AuthUser } from "@application/interfaces/IAuthService";

export class AuthMiddleware {
  constructor(private readonly authService: IAuthService) {}

  async authenticate(req: Request): Promise<AuthUser> {
    const header = req.headers.get("Authorization");
    if (!header?.startsWith("Bearer ")) {
      throw new Error("UNAUTHORIZED");
    }

    const token = header.replace("Bearer ", "");
    return this.authService.verifyToken(token);
  }
}
