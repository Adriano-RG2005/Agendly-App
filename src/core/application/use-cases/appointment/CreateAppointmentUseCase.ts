import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { IAvailabilityRepository } from "@application/interfaces/IAvailabilityRepository";
import { INotificationService } from "@application/interfaces/INotificationService";
import { CreateAppointmentDTO } from "@application/dtos/appointment.dto";
import { Appointment } from "@domain/entities/Appointment";
import { addMinutes, format } from "date-fns";
import {
  BusinessNotFoundError,
  ValidationFailedError,
  TimeSlotUnavailableError,
} from "@/core/domain/errors";

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly businessRepository: IBusinessRepository,
    private readonly availabilityRepository: IAvailabilityRepository,
    private readonly notificationService: INotificationService,
  ) {}

  async execute(dto: CreateAppointmentDTO): Promise<Appointment> {
    const business = await this.businessRepository.findBySlug(dto.businessSlug);
    if (!business) throw new BusinessNotFoundError();

    const date = new Date(dto.date);
    const dayOfWeek = (date.getDay() + 6) % 7;
    const availability = await this.availabilityRepository.findActiveByBusiness(
      business.id,
    );
    const dayAvail = availability.find((a) => a.dayOfWeek === dayOfWeek);

    if (!dayAvail)
      throw new ValidationFailedError(
        "Business is not available on this day",
      );

    const slots = dayAvail.getSlots(business.durationMin);
    if (!slots.includes(dto.startTime)) {
      throw new ValidationFailedError("Invalid time slot");
    }

    const taken = await this.appointmentRepository.isSlotTaken({
      businessId: business.id,
      date: dto.date,
      startTime: dto.startTime,
    });
    if (taken) throw new TimeSlotUnavailableError();

    const [h, m] = dto.startTime.split(":").map(Number);
    const start = new Date(2000, 0, 1, h, m);
    const end = addMinutes(start, business.durationMin);
    const endTime = format(end, "HH:mm");

    const appointment = await this.appointmentRepository.create({
      businessId: business.id,
      clientName: dto.clientName,
      clientEmail: dto.clientEmail,
      clientWhatsapp: dto.clientWhatsapp,
      date: dto.date,
      startTime: dto.startTime,
      endTime,
    });

    await this.notificationService.sendConfirmation({ appointment, business });

    return appointment;
  }
}
