import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { Appointment } from "@domain/entities/Appointment";
import { BusinessNotFoundError, UnauthorizedError } from "@/core/domain/errors";

export class GetBusinessAppointmentsUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly businessRepository: IBusinessRepository,
  ) {}

  async execute(userId: string, businessId: string): Promise<Appointment[]> {
    const business = await this.businessRepository.findById(businessId);
    if (!business) throw new BusinessNotFoundError();
    if (business.userId !== userId) throw new UnauthorizedError();

    return this.appointmentRepository.findByBusiness(businessId);
  }
}
