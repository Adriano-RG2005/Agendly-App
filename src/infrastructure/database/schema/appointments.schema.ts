import {
  pgTable,
  uuid,
  text,
  date,
  time,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { businesses } from "./businesses.schema";

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "completed",
  "cancelled",
]);

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientWhatsapp: text("client_whatsapp"),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  status: appointmentStatusEnum("status").notNull().default("pending"),
  reminderSent: boolean("reminder_sent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type AppointmentRecord = typeof appointments.$inferSelect;
export type NewAppointmentRecord = typeof appointments.$inferInsert;
