import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { Appointment } from "@domain/entities/Appointment";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { BusinessNotFoundError } from "@/core/domain/errors";

export interface DashboardData {
  stats: {
    todayAppointments: number;
    weekAppointments: number;
    uniqueClients: number;
    nextAppointmentTime: string | null;
  };
  upcomingAppointments: Appointment[];
}

export class GetDashboardDataUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly businessRepository: IBusinessRepository,
  ) {}

  async execute(userId: string): Promise<DashboardData> {
    const business = await this.businessRepository.findByUserId(userId);
    if (!business) throw new BusinessNotFoundError();

    const today = new Date();
    const todayStr = format(today, "yyyy-MM-dd");
    const weekStart = format(
      startOfWeek(today, { weekStartsOn: 1 }),
      "yyyy-MM-dd",
    );
    const weekEnd = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");

    const todayAppointments =
      await this.appointmentRepository.findByBusinessAndDateRange(
        business.id,
        todayStr,
        todayStr,
      );

    const weekAppointments =
      await this.appointmentRepository.findByBusinessAndDateRange(
        business.id,
        weekStart,
        weekEnd,
      );

    const upcoming = await this.appointmentRepository.findUpcomingByBusiness(
      business.id,
      5,
    );

    const allAppointments = await this.appointmentRepository.findByBusiness(
      business.id,
    );
    const uniqueClients = new Set(allAppointments.map((a) => a.clientEmail))
      .size;

    const nextApt = upcoming.find(
      (a) =>
        a.status === "pending" &&
        (a.date > todayStr ||
          (a.date === todayStr && a.startTime > format(today, "HH:mm"))),
    );

    return {
      stats: {
        todayAppointments: todayAppointments.length,
        weekAppointments: weekAppointments.length,
        uniqueClients,
        nextAppointmentTime: nextApt ? nextApt.startTime : null,
      },
      upcomingAppointments: upcoming,
    };
  }
}
