import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { INotificationService } from "@application/interfaces/INotificationService";
import { AppointmentActionDTO } from "@application/dtos/appointment.dto";
import {
  AppointmentNotFoundError,
  BusinessNotFoundError,
  UnauthorizedError,
} from "@/core/domain/errors";

export class CancelAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly businessRepository: IBusinessRepository,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(dto: AppointmentActionDTO): Promise<void> {
    const appointment = await this.appointmentRepository.findById(
      dto.appointmentId,
    );
    if (!appointment) throw new AppointmentNotFoundError();

    const business = await this.businessRepository.findById(dto.businessId);
    if (!business) throw new BusinessNotFoundError();

    if (appointment.businessId !== business.id) throw new UnauthorizedError();

    appointment.cancel();
    await this.appointmentRepository.save(appointment);
    await this.notificationService.sendCancellation({ appointment, business });
  }
}
