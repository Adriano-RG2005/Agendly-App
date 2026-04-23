import { eq, and } from "drizzle-orm";
import { db } from "@infrastructure/database/client";
import { availability } from "@infrastructure/database/schema";
import { Availability } from "@domain/entities/Availability";
import { IAvailabilityRepository } from "@application/interfaces/IAvailabilityRepository";

export class DrizzleAvailabilityRepository implements IAvailabilityRepository {
  async upsert(props: {
    businessId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
  }): Promise<Availability> {
    const [record] = await db
      .insert(availability)
      .values({
        businessId: props.businessId,
        dayOfWeek: props.dayOfWeek,
        startTime: props.startTime,
        endTime: props.endTime,
        isActive: props.isActive,
      })
      .onConflictDoUpdate({
        target: [availability.businessId, availability.dayOfWeek],
        set: {
          startTime: props.startTime,
          endTime: props.endTime,
          isActive: props.isActive,
        },
      })
      .returning();

    return this.toDomain(record);
  }

  async findByBusiness(businessId: string): Promise<Availability[]> {
    const records = await db
      .select()
      .from(availability)
      .where(eq(availability.businessId, businessId));

    return records.map(this.toDomain);
  }

  async findActiveByBusiness(businessId: string): Promise<Availability[]> {
    const records = await db
      .select()
      .from(availability)
      .where(
        and(
          eq(availability.businessId, businessId),
          eq(availability.isActive, true),
        ),
      );

    return records.map(this.toDomain);
  }

  private toDomain(record: typeof availability.$inferSelect): Availability {
    return Availability.create({
      id: record.id,
      businessId: record.businessId,
      dayOfWeek: record.dayOfWeek,
      startTime: record.startTime,
      endTime: record.endTime,
      isActive: record.isActive,
    });
  }
}
