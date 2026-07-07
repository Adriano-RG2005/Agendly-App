import { ValidationFailedError, ConflictError } from "@/core/domain/errors";

export enum AppointmentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export class Appointment {
  private constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly clientName: string,
    public readonly clientEmail: string,
    public readonly clientWhatsapp: string | null,
    public readonly date: string,
    public readonly startTime: string,
    public readonly endTime: string,
    public status: AppointmentStatus,
    public reminderSent: boolean,
    public readonly createdAt: Date,
  ) {}

  static create(props: {
    id: string;
    businessId: string;
    clientName: string;
    clientEmail: string;
    clientWhatsapp?: string | null;
    date: string;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    reminderSent: boolean;
    createdAt: Date;
  }): Appointment {
    if (props.clientName.trim().length < 2) {
      throw new ValidationFailedError(
        "Client name must be at least 2 characters",
      );
    }

    if (!Appointment.isValidDate(props.date)) {
      throw new ValidationFailedError(
        "Invalid date format. Use YYYY-MM-DD",
      );
    }

    return new Appointment(
      props.id,
      props.businessId,
      props.clientName.trim(),
      props.clientEmail.toLowerCase().trim(),
      props.clientWhatsapp ?? null,
      props.date,
      props.startTime,
      props.endTime,
      props.status,
      props.reminderSent,
      props.createdAt,
    );
  }

  cancel(): void {
    if (this.status === AppointmentStatus.CANCELLED) {
      throw new ConflictError("Appointment is already cancelled");
    }

    if (this.status === AppointmentStatus.COMPLETED) {
      throw new ConflictError("Cannot cancel a completed appointment");
    }

    this.status = AppointmentStatus.CANCELLED;
  }

  complete(): void {
    if (this.status !== AppointmentStatus.PENDING) {
      throw new ConflictError("Only pending appointments can be completed");
    }

    this.status = AppointmentStatus.COMPLETED;
  }

  markReminderSent(): void {
    this.reminderSent = true;
  }

  isUpcoming(): boolean {
    const today = new Date().toISOString().split("T")[0];
    return this.date >= today && this.status === AppointmentStatus.PENDING;
  }

  isTomorrow(): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    return this.date === tomorrowStr;
  }

  private static isValidDate(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date));
  }
}
