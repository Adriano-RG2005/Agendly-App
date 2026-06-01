import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { IAvailabilityRepository } from "@application/interfaces/IAvailabilityRepository";
import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { Business } from "@domain/entities/Business";
import { Availability } from "@domain/entities/Availability";
import { NotFoundError } from "@domain/errors";

export interface PublicBusinessResult {
  business: Business;
  availableSlots: Record<string, string[]>; // { "2025-04-22": ["09:00", "10:00"] }
}

export class GetPublicBusinessUseCase {
  constructor(
    private readonly businessRepository: IBusinessRepository,
    private readonly availabilityRepository: IAvailabilityRepository,
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(slug: string, fromDate: string): Promise<PublicBusinessResult> {
    const business = await this.businessRepository.findBySlug(slug);
    if (!business) throw new NotFoundError("Business");

    const activeAvailability =
      await this.availabilityRepository.findActiveByBusiness(business.id);

    // Generar slots para los próximos 14 días
    const availableSlots = await this.buildAvailableSlots(
      business.id,
      business.durationMin,
      activeAvailability,
      fromDate,
      14,
    );

    return { business, availableSlots };
  }

  private async buildAvailableSlots(
    businessId: string,
    durationMin: number,
    availability: Availability[],
    fromDate: string,
    days: number,
  ): Promise<Record<string, string[]>> {
    const result: Record<string, string[]> = {};

    for (let i = 0; i < days; i++) {
      const date = new Date(fromDate);
      date.setDate(date.getDate() + i);

      const dayOfWeek = (date.getDay() + 6) % 7; // ajuste: 0=Lunes
      const dateStr = date.toISOString().split("T")[0];
      const dayAvail = availability.find((a) => a.dayOfWeek === dayOfWeek);

      if (!dayAvail) continue;

      // Todos los slots posibles del día
      const allSlots = dayAvail.getSlots(durationMin);

      // Filtrar slots ya ocupados
      const freeSlots = await Promise.all(
        allSlots.map(async (slot) => {
          const taken = await this.appointmentRepository.isSlotTaken({
            businessId,
            date: dateStr,
            startTime: slot,
          });
          return taken ? null : slot;
        }),
      );

      const available = freeSlots.filter((s): s is string => s !== null);
      if (available.length > 0) result[dateStr] = available;
    }

    return result;
  }
}
