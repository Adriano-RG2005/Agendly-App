import { eq } from "drizzle-orm";
import { db } from "@infrastructure/database/client";
import { users } from "@infrastructure/database/schema";
import { User } from "@domain/entities/User";
import { IUserRepository } from "@application/interfaces/IUserRepository";

export class DrizzleUserRepository implements IUserRepository {
  async create(props: {
    id: string;
    email: string;
    name: string;
    phone?: string | null;
  }): Promise<User> {
    const [record] = await db
      .insert(users)
      .values({
        id: props.id,
        email: props.email,
        name: props.name,
        phone: props.phone ?? null,
      })
      .returning();

    return this.toDomain(record);
  }

  async findById(id: string): Promise<User | null> {
    const [record] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return record ? this.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [record] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    return record ? this.toDomain(record) : null;
  }

  private toDomain(record: typeof users.$inferSelect): User {
    return User.create({
      id: record.id,
      email: record.email,
      name: record.name,
      phone: record.phone,
      createdAt: record.createdAt,
    });
  }
}
