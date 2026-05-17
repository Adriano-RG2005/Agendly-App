import { ValidationError } from "@/domain/errors"

export class Business {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly serviceName: string,
    public readonly durationMin: number,
    public readonly description: string | null,
    public readonly createdAt: Date
  ) {}

  static create(props: {
    id: string
    userId: string
    name: string
    slug: string
    serviceName: string
    durationMin: number
    description?: string | null
    createdAt: Date
  }): Business {
    if (!Business.isValidSlug(props.slug)) {
      throw new ValidationError('Slug must be lowercase letters, numbers and hyphens only')
    }

    if (props.durationMin < 15 || props.durationMin > 480) {
      throw new ValidationError('Duration must be between 15 and 480 minutes')
    }

    return new Business(
      props.id,
      props.userId,
      props.name.trim(),
      props.slug.toLowerCase().trim(),
      props.serviceName.trim(),
      props.durationMin,
      props.description?.trim() ?? null,
      props.createdAt
    )
  }

  static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // elimina acentos
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  private static isValidSlug(slug: string): boolean {
    return /^[a-z0-9-]+$/.test(slug)
  }
}