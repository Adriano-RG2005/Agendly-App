import { IAuthService } from "@application/interfaces/IAuthService";
import { LoginDTO } from "@application/dtos/auth.dto";

export interface LoginResult {
  token: string;
  userId: string;
  email: string;
}

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(dto: LoginDTO): Promise<LoginResult> {
    const { user, token } = await this.authService.signIn({
      email: dto.email,
      password: dto.password,
    });

    return {
      token,
      userId: user.id,
      email: user.email,
    };
  }
}
