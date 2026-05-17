import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Usamos max: 1 para evitar
// problemas con conexiones en funciones serverless
const client = postgres(process.env.DATABASE_URL!, {
  max: 1,
  ssl: "require",
});

export const db = drizzle({ client, schema });
export type Database = typeof db;
