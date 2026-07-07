import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { CreateBusinessDTO } from "@application/dtos/business.dto";
import { Business } from "@domain/entities/Business";
import { ConflictError } from "@/core/domain/errors";

export class CreateBusinessUseCase {
  constructor(private readonly businessRepository: IBusinessRepository) {}

  async execute(dto: CreateBusinessDTO): Promise<Business> {
    const existing = await this.businessRepository.findByUserId(dto.userId);

    if (existing) throw new ConflictError("User already has a business");

    const baseSlug = dto.slug ?? Business.generateSlug(dto.name);

    const slug = await this.resolveUniqueSlug(baseSlug);

    return this.businessRepository.create({
      userId: dto.userId,
      name: dto.name,
      slug,
      serviceName: dto.serviceName,
      durationMin: dto.durationMin,
      description: dto.description,
      imageUrl: dto.imageUrl,
    });
  }

  private async resolveUniqueSlug(base: string): Promise<string> {
    let slug = base;
    let attempt = 1;

    while (await this.businessRepository.isSlugTaken(slug)) {
      attempt++;
      slug = `${base}-${attempt}`;
    }

    return slug;
  }
}
