import { pgTable, uuid, smallint, time, boolean } from "drizzle-orm/pg-core";
import { businesses } from "./businesses.schema";

export const availability = pgTable("availability", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id),
  dayOfWeek: smallint("day_of_week").notNull(), // 0=Lunes, 6=Domingo
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export type AvailabilityRecord = typeof availability.$inferSelect;
export type NewAvailabilityRecord = typeof availability.$inferInsert;
