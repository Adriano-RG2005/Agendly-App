import { IAuthService } from "@application/interfaces/IAuthService";
import { IUserRepository } from "@application/interfaces/IUserRepository";
import { RegisterDTO } from "@application/dtos/auth.dto";
import { User } from "@domain/entities/User";
import { EmailAlreadyExistsError, RegistrationFailedError } from "@/core/domain/errors";

export class RegisterUseCase {
  constructor(
    private readonly authService: IAuthService,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: RegisterDTO): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);

    if (existing) throw new EmailAlreadyExistsError();

    const authUser = await this.authService.signUp({
      email: dto.email,
      password: dto.password,
      name: dto.name,
    });

    try {
      const user = await this.userRepository.create({
        id: authUser.id,
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
      });

      return user;
    } catch (error) {
      console.error("Failed to create user profile:", error);
      await this.authService.deleteUser(authUser.id);
      throw new RegistrationFailedError();
    }
  }
}
