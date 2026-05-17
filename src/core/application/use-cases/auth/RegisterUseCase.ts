import { IAuthService } from "@application/interfaces/IAuthService";
import { IUserRepository } from "@application/interfaces/IUserRepository";
import { RegisterDTO } from "@application/dtos/auth.dto";
import { User } from "@domain/entities/User";
import { DomainError } from "@/domain/errors";

export class RegisterUseCase {
  constructor(
    private readonly authService: IAuthService,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: RegisterDTO): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);

    if (existing) throw new DomainError("EMAIL_ALREADY_EXISTS");

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
      // Compensación: si falla la creación del perfil,
      // eliminamos el usuario de Auth para evitar inconsistencias
      await this.authService.deleteUser(authUser.id);
      throw new DomainError("REGISTRATION_FAILED");
    }
  }
}
