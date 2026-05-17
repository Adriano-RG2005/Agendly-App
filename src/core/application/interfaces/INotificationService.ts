import { Appointment } from "@domain/entities/Appointment";
import { Business } from "@domain/entities/Business";

export interface INotificationService {
  sendConfirmation(props: {
    appointment: Appointment;
    business: Business;
  }): Promise<void>;

  sendReminder(props: {
    appointment: Appointment;
    business: Business;
  }): Promise<void>;

  sendCancellation(props: {
    appointment: Appointment;
    business: Business;
  }): Promise<void>;
}
