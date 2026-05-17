import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { INotificationService } from "@application/interfaces/INotificationService";

export class SendAppointmentRemindersUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly businessRepository: IBusinessRepository,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(): Promise<{ sent: number }> {
    const appointments =
      await this.appointmentRepository.findPendingForTomorrow();

    let sent = 0;

    await Promise.all(
      appointments.map(async (appointment) => {
        const business = await this.businessRepository.findById(
          appointment.businessId,
        );

        if (!business) return;

        await this.notificationService.sendReminder({ appointment, business });

        appointment.markReminderSent();
        await this.appointmentRepository.save(appointment);

        sent++;
      }),
    );

    return { sent };
  }
}
