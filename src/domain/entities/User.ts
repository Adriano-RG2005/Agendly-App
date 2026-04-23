export class User {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly phone: string | null,
    public readonly createdAt: Date
  ) {}

  static create(props: {
    id: string
    email: string
    name: string
    phone?: string | null
    createdAt: Date
  }): User {
    return new User(
      props.id,
      props.email.toLowerCase().trim(),
      props.name.trim(),
      props.phone ?? null,
      props.createdAt
    )
  }
}