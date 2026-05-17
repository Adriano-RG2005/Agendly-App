import { User } from '@domain/entities/User'

export interface IUserRepository {
  create(props: {
    id: string
    email: string
    name: string
    phone?: string | null
  }): Promise<User>

  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
