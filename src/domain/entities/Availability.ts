import { ValidationError } from "@/domain/errors/DomainError";

export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export class Availability {
  private constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly dayOfWeek: DayOfWeek,
    public readonly startTime: string, // formato HH:mm
    public readonly endTime: string, // formato HH:mm
    public readonly isActive: boolean,
  ) {}

  static create(props: {
    id: string;
    businessId: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
    isActive: boolean;
  }): Availability {
    if (!Availability.isValidTime(props.startTime)) {
      throw new ValidationError("Invalid start time format. Use HH:mm");
    }

    if (!Availability.isValidTime(props.endTime)) {
      throw new ValidationError("Invalid end time format. Use HH:mm");
    }

    if (props.startTime >= props.endTime) {
      throw new ValidationError("Start time must be before end time");
    }

    return new Availability(
      props.id,
      props.businessId,
      props.dayOfWeek,
      props.startTime,
      props.endTime,
      props.isActive,
    );
  }

  getSlots(durationMin: number): string[] {
    const slots: string[] = [];
    let current = this.timeToMinutes(this.startTime);
    const end = this.timeToMinutes(this.endTime);

    while (current + durationMin <= end) {
      slots.push(this.minutesToTime(current));
      current += durationMin;
    }

    return slots;
  }

  private static isValidTime(time: string): boolean {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  }
}
