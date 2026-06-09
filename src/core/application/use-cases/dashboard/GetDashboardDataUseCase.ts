import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";
import { Appointment } from "@domain/entities/Appointment";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { NotFoundError } from "@domain/errors";

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
    if (!business) throw new NotFoundError("Business");

    const today = new Date();
    const todayStr = format(today, "yyyy-MM-dd");
    const weekStart = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
    const weekEnd = format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");

    // 1. Citas de hoy
    const todayAppointments = await this.appointmentRepository.findByBusinessAndDateRange(
      business.id,
      todayStr,
      todayStr,
    );

    // 2. Citas de la semana
    const weekAppointments = await this.appointmentRepository.findByBusinessAndDateRange(
      business.id,
      weekStart,
      weekEnd,
    );

    // 3. Próximas citas (para la lista y para el stat de próxima cita)
    const upcoming = await this.appointmentRepository.findUpcomingByBusiness(
      business.id,
      5,
    );

    // 4. Clientes únicos (de todas las citas)
    const allAppointments = await this.appointmentRepository.findByBusiness(
      business.id,
    );
    const uniqueClients = new Set(allAppointments.map((a) => a.clientEmail)).size;

    // Calcular próxima cita
    const nextApt = upcoming.find(
      (a) =>
        a.status === "pending" &&
        (a.date > todayStr || (a.date === todayStr && a.startTime > format(today, "HH:mm"))),
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
