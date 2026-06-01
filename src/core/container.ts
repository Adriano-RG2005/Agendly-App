// ─── Repositories ────────────────────────────────────────────────
import { DrizzleUserRepository } from "@infrastructure/repositories/DrizzleUserRepository";
import { DrizzleBusinessRepository } from "@infrastructure/repositories/DrizzleBusinessRepository";
import { DrizzleAvailabilityRepository } from "@infrastructure/repositories/DrizzleAvailabilityRepository";
import { DrizzleAppointmentRepository } from "@infrastructure/repositories/DrizzleAppointmentRepository";

const userRepository = new DrizzleUserRepository();
const businessRepository = new DrizzleBusinessRepository();
const availabilityRepository = new DrizzleAvailabilityRepository();
const appointmentRepository = new DrizzleAppointmentRepository();

// ─── Services ────────────────────────────────────────────────────
import { SupabaseAuthService } from "@infrastructure/services/SupabaseAuthService";
import { ResendNotificationService } from "@infrastructure/services/ResendNotificationService";

const authService = new SupabaseAuthService();
const notificationService = new ResendNotificationService();

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

export const registerUseCase = new RegisterUseCase(authService, userRepository);
export const loginUseCase = new LoginUseCase(authService);
const createBusinessUseCase = new CreateBusinessUseCase(businessRepository);
const updateBusinessUseCase = new UpdateBusinessUseCase(businessRepository);
const upsertAvailabilityUseCase = new UpsertAvailabilityUseCase(
  availabilityRepository,
  businessRepository,
);
const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository,
  businessRepository,
  availabilityRepository,
  notificationService,
);
const cancelAppointmentUseCase = new CancelAppointmentUseCase(
  appointmentRepository,
  businessRepository,
  notificationService,
);
const completeAppointmentUseCase = new CompleteAppointmentUseCase(
  appointmentRepository,
  businessRepository,
);
const getBusinessAppointmentsUseCase = new GetBusinessAppointmentsUseCase(
  appointmentRepository,
  businessRepository,
);
const getPublicBusinessUseCase = new GetPublicBusinessUseCase(
  businessRepository,
  availabilityRepository,
  appointmentRepository,
);
const sendAppointmentRemindersUseCase = new SendAppointmentRemindersUseCase(
  appointmentRepository,
  businessRepository,
  notificationService,
);

// ─── Middleware ───────────────────────────────────────────────────
import { AuthMiddleware } from "@presentation/http/middlewares/authMiddleware";

const authMiddleware = new AuthMiddleware(authService);

// ─── Controllers ─────────────────────────────────────────────────
import { AuthController } from "@presentation/http/controllers/AuthController";
import { BusinessController } from "@presentation/http/controllers/BusinessController";
import { AvailabilityController } from "@presentation/http/controllers/AvailabilityController";
import { AppointmentController } from "@presentation/http/controllers/AppointmentController";

export const authController = new AuthController(registerUseCase, loginUseCase);

export const businessController = new BusinessController(
  createBusinessUseCase,
  updateBusinessUseCase,
  authMiddleware,
);

export const availabilityController = new AvailabilityController(
  upsertAvailabilityUseCase,
  authMiddleware,
);

export const appointmentController = new AppointmentController(
  createAppointmentUseCase,
  cancelAppointmentUseCase,
  completeAppointmentUseCase,
  getBusinessAppointmentsUseCase,
  getPublicBusinessUseCase,
  sendAppointmentRemindersUseCase,
  authMiddleware,
);
