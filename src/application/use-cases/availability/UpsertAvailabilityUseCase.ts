import { IAvailabilityRepository } from "@application/interfaces/IAvailabilityRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { UpsertAvailabilityDTO } from "@application/dtos/availability.dto";
import { Availability } from "@domain/entities/Availability";
import { NotFoundError, UnauthorizedError } from "@/domain/errors/DomainError";

export class UpsertAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: IAvailabilityRepository,
    private readonly businessRepository: IBusinessRepository,
  ) {}

  async execute(
    userId: string,
    dto: UpsertAvailabilityDTO,
  ): Promise<Availability[]> {
    const business = await this.businessRepository.findById(dto.businessId);
    if (!business) throw new NotFoundError("Business");
    if (business.userId !== userId) throw new UnauthorizedError();

    const results = await Promise.all(
      dto.slots.map((slot) =>
        this.availabilityRepository.upsert({
          businessId: dto.businessId,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isActive: slot.isActive,
        }),
      ),
    );

    return results;
  }
}
