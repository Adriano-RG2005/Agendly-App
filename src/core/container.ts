// ─── Repositories ────────────────────────────────────────────────
import { DrizzleUserRepository } from "@infrastructure/repositories/DrizzleUserRepository";
import { DrizzleBusinessRepository } from "@infrastructure/repositories/DrizzleBusinessRepository";
import { DrizzleAvailabilityRepository } from "@infrastructure/repositories/DrizzleAvailabilityRepository";
import { DrizzleAppointmentRepository } from "@infrastructure/repositories/DrizzleAppointmentRepository";

export const userRepository = new DrizzleUserRepository();
export const businessRepository = new DrizzleBusinessRepository();
export const availabilityRepository = new DrizzleAvailabilityRepository();
export const appointmentRepository = new DrizzleAppointmentRepository();

// ─── Services ────────────────────────────────────────────────────
import { SupabaseAuthService } from "@infrastructure/services/SupabaseAuthService";
import { ResendNotificationService } from "@infrastructure/services/ResendNotificationService";
import { SupabaseStorageService } from "@infrastructure/services/SupabaseStorageService";

const authService = new SupabaseAuthService();
const notificationService = new ResendNotificationService();
export const storageService = new SupabaseStorageService();

// ─── Use Cases ───────────────────────────────────────────────────
import { RegisterUseCase } from "@application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "@application/use-cases/auth/LoginUseCase";
import { CreateBusinessUseCase } from "@application/use-cases/business/CreateBusinessUseCase";
import { UpdateBusinessUseCase } from "@application/use-cases/business/UpdateBusinessUseCase";
import { UpsertAvailabilityUseCase } from "@application/use-cases/availability/UpsertAvailabilityUseCase";
import { CreateAppointmentUseCase } from "@application/use-cases/appointment/CreateAppointmentUseCase";
import { CancelAppointmentUseCase } from "@application/use-cases/appointment/CancelAppointmentUseCase";
import { CompleteAppointmentUseCase } from "@application/use-cases/appointment/CompleteAppointmentUseCase";
import { GetBusinessAppointmentsUseCase } from "@application/use-cases/appointment/GetBusinessAppointmentsUseCase";
import { GetPublicBusinessUseCase } from "@application/use-cases/appointment/GetPublicBusinessUseCase";
import { SendAppointmentRemindersUseCase } from "@application/use-cases/appointment/SendAppointmentRemindersUseCase";
import { GetDashboardDataUseCase } from "@application/use-cases/dashboard/GetDashboardDataUseCase";

export const registerUseCase = new RegisterUseCase(authService, userRepository);
export const loginUseCase = new LoginUseCase(authService);
export const getDashboardDataUseCase = new GetDashboardDataUseCase(
  appointmentRepository,
  businessRepository,
);
export const createBusinessUseCase = new CreateBusinessUseCase(
  businessRepository,
);
export const updateBusinessUseCase = new UpdateBusinessUseCase(
  businessRepository,
);
export const upsertAvailabilityUseCase = new UpsertAvailabilityUseCase(
  availabilityRepository,
  businessRepository,
);
export const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository,
  businessRepository,
  availabilityRepository,
  notificationService,
);
export const cancelAppointmentUseCase = new CancelAppointmentUseCase(
  appointmentRepository,
  businessRepository,
  notificationService,
);
export const completeAppointmentUseCase = new CompleteAppointmentUseCase(
  appointmentRepository,
  businessRepository,
);
export const getBusinessAppointmentsUseCase =
  new GetBusinessAppointmentsUseCase(appointmentRepository, businessRepository);
export const getPublicBusinessUseCase = new GetPublicBusinessUseCase(
  businessRepository,
  availabilityRepository,
  appointmentRepository,
);
export const sendAppointmentRemindersUseCase =
  new SendAppointmentRemindersUseCase(
    appointmentRepository,
    businessRepository,
    notificationService,
  );
