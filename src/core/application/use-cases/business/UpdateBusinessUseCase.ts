import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { UpdateBusinessDTO } from "@application/dtos/business.dto";
import { Business } from "@domain/entities/Business";
import { BusinessNotFoundError, UnauthorizedError } from "@/core/domain/errors";

export class UpdateBusinessUseCase {
  constructor(private readonly businessRepository: IBusinessRepository) {}

  async execute(
    businessId: string,
    userId: string,
    dto: UpdateBusinessDTO,
  ): Promise<Business> {
    const business = await this.businessRepository.findById(businessId);

    if (!business) throw new BusinessNotFoundError();

    if (business.userId !== userId) throw new UnauthorizedError();

    return this.businessRepository.update(businessId, dto);
  }
}
