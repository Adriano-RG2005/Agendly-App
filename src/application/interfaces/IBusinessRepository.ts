import { Business } from "@domain/entities/Business";

export interface IBusinessRepository {
  create(props: {
    userId: string;
    name: string;
    slug: string;
    serviceName: string;
    durationMin: number;
    description?: string | null;
  }): Promise<Business>;

  findById(id: string): Promise<Business | null>;
  findBySlug(slug: string): Promise<Business | null>;
  findByUserId(userId: string): Promise<Business | null>;
  isSlugTaken(slug: string): Promise<boolean>;
  update(
    id: string,
    props: Partial<{
      name: string;
      description: string;
      serviceName: string;
      durationMin: number;
    }>,
  ): Promise<Business>;
}
