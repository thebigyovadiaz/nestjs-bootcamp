import { User } from "../interfaces"
import { CreateUserDto } from "../interfaces/dto"
import { usersRepository } from "../repositories/users.repository"

export const usersService = {
  findAll(): User[] {
    return usersRepository.findAll()
  },
  findById(id: number): User | undefined {
    const user = usersRepository.findById(id)
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    return user
  },
  findByEmail(email: string): User | undefined {
    const user = usersRepository.findByEmail(email)
    if (!user) {
      throw new Error(`User with id ${email} not found`)
    }

    return user
  },
  create(userData: CreateUserDto): User | undefined {
    const userId = usersRepository.create(userData)
    return usersRepository.findById(userId)
  },
  update(id: number, data: Partial<User>): User | undefined {
    const user = usersRepository.update(id, data)
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    return user
  },
  delete(id: number): User[] {
    return usersRepository.delete(id)
  }
}
