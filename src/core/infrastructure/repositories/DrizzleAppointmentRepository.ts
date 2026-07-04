import { eq, and, gte, lte, asc } from "drizzle-orm";
import { db } from "@infrastructure/database/client";
import { appointments } from "@infrastructure/database/schema";
import { Appointment, AppointmentStatus } from "@domain/entities/Appointment";
import { IAppointmentRepository } from "@application/interfaces/IAppointmentRepository";

export class DrizzleAppointmentRepository implements IAppointmentRepository {
  async create(props: {
    businessId: string;
    clientName: string;
    clientEmail: string;
    clientWhatsapp?: string | null;
    date: string;
    startTime: string;
    endTime: string;
  }): Promise<Appointment> {
    const [record] = await db
      .insert(appointments)
      .values({
        businessId: props.businessId,
        clientName: props.clientName,
        clientEmail: props.clientEmail,
        clientWhatsapp: props.clientWhatsapp ?? null,
        date: props.date,
        startTime: props.startTime,
        endTime: props.endTime,
        status: "pending",
        reminderSent: false,
      })
      .returning();

    return this.toDomain(record);
  }

  async findById(id: string): Promise<Appointment | null> {
    const [record] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    return record ? this.toDomain(record) : null;
  }

  async findByBusiness(businessId: string): Promise<Appointment[]> {
    const records = await db
      .select()
      .from(appointments)
      .where(eq(appointments.businessId, businessId));

    return records.map(this.toDomain);
  }

  async findByBusinessAndDateRange(
    businessId: string,
    startDate: string,
    endDate: string,
  ): Promise<Appointment[]> {
    const records = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.businessId, businessId),
          gte(appointments.date, startDate),
          lte(appointments.date, endDate),
        ),
      );

    return records.map(this.toDomain);
  }

  async findUpcomingByBusiness(
    businessId: string,
    limit: number,
  ): Promise<Appointment[]> {
    const today = new Date().toISOString().split("T")[0];

    const records = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.businessId, businessId),
          gte(appointments.date, today),
        ),
      )
      .orderBy(asc(appointments.date), asc(appointments.startTime))
      .limit(limit);

    return records.map(this.toDomain);
  }

  async isSlotTaken(props: {
    businessId: string;
    date: string;
    startTime: string;
  }): Promise<boolean> {
    const [record] = await db
      .select({ id: appointments.id })
      .from(appointments)
      .where(
        and(
          eq(appointments.businessId, props.businessId),
          eq(appointments.date, props.date),
          eq(appointments.startTime, props.startTime),
          eq(appointments.status, "pending"),
        ),
      )
      .limit(1);

    return !!record;
  }

  async findPendingForTomorrow(): Promise<Appointment[]> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const records = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.date, tomorrowStr),
          eq(appointments.status, "pending"),
          eq(appointments.reminderSent, false),
        ),
      );

    return records.map(this.toDomain);
  }

  async save(appointment: Appointment): Promise<void> {
    await db
      .update(appointments)
      .set({
        status: appointment.status,
        reminderSent: appointment.reminderSent,
      })
      .where(eq(appointments.id, appointment.id));
  }

  private toDomain(record: typeof appointments.$inferSelect): Appointment {
    return Appointment.create({
      id: record.id,
      businessId: record.businessId,
      clientName: record.clientName,
      clientEmail: record.clientEmail,
      clientWhatsapp: record.clientWhatsapp,
      date: record.date,
      startTime: record.startTime,
      endTime: record.endTime,
      status: record.status as AppointmentStatus,
      reminderSent: record.reminderSent,
      createdAt: record.createdAt,
    });
  }
}
