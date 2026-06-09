import { Appointment } from "@domain/entities/Appointment";

export interface IAppointmentRepository {
  create(props: {
    businessId: string;
    clientName: string;
    clientEmail: string;
    clientWhatsapp?: string | null;
    date: string;
    startTime: string;
    endTime: string;
  }): Promise<Appointment>;

  findById(id: string): Promise<Appointment | null>;
  findByBusiness(businessId: string): Promise<Appointment[]>;
  findByBusinessAndDateRange(
    businessId: string,
    startDate: string,
    endDate: string,
  ): Promise<Appointment[]>;
  findUpcomingByBusiness(
    businessId: string,
    limit: number,
  ): Promise<Appointment[]>;

  isSlotTaken(props: {
    businessId: string;
    date: string;
    startTime: string;
  }): Promise<boolean>;

  findPendingForTomorrow(): Promise<Appointment[]>;

  save(appointment: Appointment): Promise<void>;
}
