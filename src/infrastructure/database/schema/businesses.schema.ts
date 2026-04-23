import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const businesses = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  serviceName: text("service_name").notNull(),
  durationMin: integer("duration_min").notNull().default(60),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type BusinessRecord = typeof businesses.$inferSelect;
export type NewBusinessRecord = typeof businesses.$inferInsert;
