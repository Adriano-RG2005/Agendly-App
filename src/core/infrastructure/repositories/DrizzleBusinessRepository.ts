import { eq } from "drizzle-orm";
import { db } from "@infrastructure/database/client";
import { businesses } from "@infrastructure/database/schema";
import { Business } from "@domain/entities/Business";
import { IBusinessRepository } from "@application/interfaces/IBusinessRepository";

export class DrizzleBusinessRepository implements IBusinessRepository {
  async create(props: {
    userId: string;
    name: string;
    slug: string;
    serviceName: string;
    durationMin: number;
    description?: string | null;
  }): Promise<Business> {
    const [record] = await db
      .insert(businesses)
      .values({
        userId: props.userId,
        name: props.name,
        slug: props.slug,
        serviceName: props.serviceName,
        durationMin: props.durationMin,
        description: props.description ?? null,
      })
      .returning();

    return this.toDomain(record);
  }

  async findById(id: string): Promise<Business | null> {
    const [record] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, id))
      .limit(1);

    return record ? this.toDomain(record) : null;
  }

  async findBySlug(slug: string): Promise<Business | null> {
    const [record] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.slug, slug))
      .limit(1);

    return record ? this.toDomain(record) : null;
  }

  async findByUserId(userId: string): Promise<Business | null> {
    const [record] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.userId, userId))
      .limit(1);

    return record ? this.toDomain(record) : null;
  }

  async isSlugTaken(slug: string): Promise<boolean> {
    const [record] = await db
      .select({ id: businesses.id })
      .from(businesses)
      .where(eq(businesses.slug, slug))
      .limit(1);

    return !!record;
  }

  async update(
    id: string,
    props: Partial<{
      name: string;
      description: string;
      serviceName: string;
      durationMin: number;
    }>,
  ): Promise<Business> {
    const [record] = await db
      .update(businesses)
      .set(props)
      .where(eq(businesses.id, id))
      .returning();

    return this.toDomain(record);
  }

  private toDomain(record: typeof businesses.$inferSelect): Business {
    return Business.create({
      id: record.id,
      userId: record.userId,
      name: record.name,
      slug: record.slug,
      serviceName: record.serviceName,
      durationMin: record.durationMin,
      description: record.description,
      createdAt: record.createdAt,
    });
  }
}
