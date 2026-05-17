import { CreateAppointmentUseCase } from "@application/use-cases/appointment/CreateAppointmentUseCase";
import { CancelAppointmentUseCase } from "@application/use-cases/appointment/CancelAppointmentUseCase";
import { CompleteAppointmentUseCase } from "@application/use-cases/appointment/CompleteAppointmentUseCase";
import { GetBusinessAppointmentsUseCase } from "@application/use-cases/appointment/GetBusinessAppointmentsUseCase";
import { GetPublicBusinessUseCase } from "@application/use-cases/appointment/GetPublicBusinessUseCase";
import { SendAppointmentRemindersUseCase } from "@application/use-cases/appointment/SendAppointmentRemindersUseCase";
import { CreateAppointmentDTO } from "@application/dtos/appointment.dto";
import { AppointmentActionDTO } from "@application/dtos/appointment.dto";
import { HttpResponse } from "@presentation/http/HttpResponse";
import { AuthMiddleware } from "@presentation/http/middlewares/authMiddleware";
import {
  DomainError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  ValidationError,
} from "@domain/errors";

export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly cancelAppointmentUseCase: CancelAppointmentUseCase,
    private readonly completeAppointmentUseCase: CompleteAppointmentUseCase,
    private readonly getBusinessAppointmentsUseCase: GetBusinessAppointmentsUseCase,
    private readonly getPublicBusinessUseCase: GetPublicBusinessUseCase,
    private readonly sendAppointmentRemindersUseCase: SendAppointmentRemindersUseCase,
    private readonly authMiddleware: AuthMiddleware,
  ) {}

  // GET /api/v1/public/[slug] — sin auth
  async getPublicBusiness(req: Request, slug: string): Promise<Response> {
    try {
      const { searchParams } = new URL(req.url);
      const fromDate =
        searchParams.get("from") ?? new Date().toISOString().split("T")[0];

      const result = await this.getPublicBusinessUseCase.execute(
        slug,
        fromDate,
      );
      return HttpResponse.ok(result);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST /api/v1/appointments — sin auth (cliente final agenda)
  async create(req: Request): Promise<Response> {
    try {
      const body = await req.json();
      const parsed = CreateAppointmentDTO.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.badRequest(parsed.error.message);
      }

      const appointment = await this.createAppointmentUseCase.execute(
        parsed.data,
      );
      return HttpResponse.created(appointment);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // GET /api/v1/appointments?businessId=xxx — con auth
  async getByBusiness(req: Request): Promise<Response> {
    try {
      const authUser = await this.authMiddleware.authenticate(req);
      const { searchParams } = new URL(req.url);
      const businessId = searchParams.get("businessId");

      if (!businessId) return HttpResponse.badRequest("businessId is required");

      const appointments = await this.getBusinessAppointmentsUseCase.execute(
        authUser.id,
        businessId,
      );
      return HttpResponse.ok(appointments);
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PATCH /api/v1/appointments/[id]/cancel — con auth
  async cancel(req: Request, appointmentId: string): Promise<Response> {
    try {
      const authUser = await this.authMiddleware.authenticate(req);
      const body = await req.json();

      const parsed = AppointmentActionDTO.safeParse({
        appointmentId,
        businessId: body.businessId,
      });

      if (!parsed.success) return HttpResponse.badRequest(parsed.error.message);

      await this.cancelAppointmentUseCase.execute(parsed.data);
      return HttpResponse.noContent();
    } catch (error) {
      return this.handleError(error);
    }
  }

  // PATCH /api/v1/appointments/[id]/complete — con auth
  async complete(req: Request, appointmentId: string): Promise<Response> {
    try {
      const authUser = await this.authMiddleware.authenticate(req);
      const body = await req.json();

      const parsed = AppointmentActionDTO.safeParse({
        appointmentId,
        businessId: body.businessId,
      });

      if (!parsed.success) return HttpResponse.badRequest(parsed.error.message);

      await this.completeAppointmentUseCase.execute(parsed.data);
      return HttpResponse.noContent();
    } catch (error) {
      return this.handleError(error);
    }
  }

  // POST /api/v1/cron/reminders — llamado por Vercel Cron
  async sendReminders(req: Request): Promise<Response> {
    try {
      // Verificar que viene de Vercel Cron
      const cronSecret = req.headers.get("x-cron-secret");
      if (cronSecret !== process.env.CRON_SECRET) {
        return HttpResponse.unauthorized();
      }

      const result = await this.sendAppointmentRemindersUseCase.execute();
      return HttpResponse.ok(result);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): Response {
    if (error instanceof UnauthorizedError) return HttpResponse.unauthorized();
    if (error instanceof NotFoundError)
      return HttpResponse.notFound(error.message);
    if (error instanceof ConflictError)
      return HttpResponse.conflict(error.message);
    if (error instanceof ValidationError)
      return HttpResponse.unprocessable(error.message);
    if (error instanceof DomainError)
      return HttpResponse.badRequest(error.message);
    return HttpResponse.internal();
  }
}
