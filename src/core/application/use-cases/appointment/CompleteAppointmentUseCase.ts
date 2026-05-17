import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { AppointmentActionDTO } from "@application/dtos/appointment.dto";
import { NotFoundError, UnauthorizedError } from "@/domain/errors";

export class CompleteAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly businessRepository: IBusinessRepository,
  ) {}

  async execute(dto: AppointmentActionDTO): Promise<void> {
    const appointment = await this.appointmentRepository.findById(
      dto.appointmentId,
    );
    if (!appointment) throw new NotFoundError("Appointment");

    const business = await this.businessRepository.findById(dto.businessId);
    if (!business) throw new NotFoundError("Business");

    if (appointment.businessId !== business.id) throw new UnauthorizedError();

    appointment.complete();
    await this.appointmentRepository.save(appointment);
  }
}
