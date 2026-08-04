import { User } from "../interfaces"
import { CreateUserDto } from "../dto/create-user.dto"
import { usersRepository } from "../repositories/users.repository"
import { ValidationError } from "../errors/validation.error"
import { NotFound } from "../errors/not-found.error"
import { ConflictError } from "../errors/conflict.error"
import { DetailsUserDto } from "../dto/details-user.dto"

const USER_RULES = {
  MIN_NAME_LENGTH: 5,
  MIN_PASSWORD_LENGTH: 6,
  MIN_EMAIL_LENGTH: 6
}

export const usersService = {
  findAll(): User[] {
    return usersRepository.findAll()
  },
  findById(id: number): User {
    const user = usersRepository.findById(id)
    if (!user) {
      throw new NotFound(`User with id ${id} not found`)
    }

    return user
  },
  findByEmail(email: string): User {
    const user = usersRepository.findByEmail(email)
    if (!user) {
      throw new NotFound(`User with email ${email} not found`)
    }

    return user
  },
  create(userData: CreateUserDto): DetailsUserDto {
    if (!userData.name || userData.name.length <= USER_RULES.MIN_NAME_LENGTH) {
      throw new ValidationError("Invalid Name")
    }

    if (
      !userData.email ||
      userData.email.length <= USER_RULES.MIN_EMAIL_LENGTH ||
      !userData.email.includes("@")
    ) {
      throw new ValidationError("Invalid Email")
    }

    if (
      !userData.password ||
      userData.password.length <= USER_RULES.MIN_PASSWORD_LENGTH
    ) {
      throw new ValidationError("Invalid Password")
    }

    const userExists = usersRepository.findByEmail(userData.email)
    if (userExists) {
      throw new ConflictError(`User with email ${userData.email} already exists`)
    }

    const userDetails: User = {
      id: usersRepository.generateId(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: Date.now().toString(),
      isActive: true
    }

    const result = usersRepository.create(userDetails)
    if (!result) {
      throw new ConflictError("Failed to create user")
    }

    const res: DetailsUserDto = userDetails as DetailsUserDto
    return res
  },
  update(id: number, data: Partial<User>): User {
    const user = usersRepository.update(id, data)
    if (!user) {
      throw new NotFound(`User with id ${id} not found`)
    }

    return user
  },
  delete(id: number): User[] {
    return usersRepository.delete(id)
  }
}
