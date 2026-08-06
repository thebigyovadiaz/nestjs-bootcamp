import { User } from "../interfaces"
import { CreateUserDto } from "../dto/create-user.dto"
import { ValidationError } from "../errors/validation.error"
import { NotFound } from "../errors/not-found.error"
import { ConflictError } from "../errors/conflict.error"
import { DetailsUserDto } from "../dto/details-user.dto"
import { toDetailsUserDto } from "../dto/mappers/details-user.map"
import { USER_REPOSITORY } from "../container/tokens"
import { IUserRepository } from "../repositories/contracts/user.repository"
import { container } from "../container/container"

const USER_RULES = {
  MIN_NAME_LENGTH: 5,
  MIN_PASSWORD_LENGTH: 6,
  MIN_EMAIL_LENGTH: 6
}

// const repository = container.resolve<IUserRepository>(USER_REPOSITORY)

export class UsersService {
  constructor(
    private readonly repository: IUserRepository
  ) {}

  findAll(): DetailsUserDto[] {
    return this.repository.findAll().map(toDetailsUserDto)
  }

  findById(id: number): DetailsUserDto {
    const user = this.repository.findById(id)
    if (!user) {
      throw new NotFound(`User with id ${id} not found`)
    }

    return user
  }

  findByEmail(email: string): DetailsUserDto {
    const user = this.repository.findByEmail(email)
    if (!user) {
      throw new NotFound(`User with email ${email} not found`)
    }

    return toDetailsUserDto(user)
  }

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

    const userExists = this.repository.findByEmail(userData.email)
    if (userExists) {
      throw new ConflictError(`User with email ${userData.email} already exists`)
    }

    const userDetails: User = {
      id: this.repository.generateId(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: Date.now().toString(),
      isActive: true
    }

    const result = this.repository.create(userDetails)
    if (!result) {
      throw new ConflictError("Failed to create user")
    }

    return toDetailsUserDto(userDetails)
  }

  update(id: number, data: Partial<User>): User {
    const user = this.repository.update(id, data)
    if (!user) {
      throw new NotFound(`User with id ${id} not found`)
    }

    return user
  }

  delete(id: number): User[] {
    return this.repository.delete(id)
  }
}

// export const usersService = {
//   findAll(): DetailsUserDto[] {
//     return repository.findAll().map(toDetailsUserDto)
//   },
//   findById(id: number): DetailsUserDto {
//     const user = repository.findById(id)
//     if (!user) {
//       throw new NotFound(`User with id ${id} not found`)
//     }

//     return user
//   },
//   findByEmail(email: string): DetailsUserDto {
//     const user = repository.findByEmail(email)
//     if (!user) {
//       throw new NotFound(`User with email ${email} not found`)
//     }

//     return toDetailsUserDto(user)
//   },
//   create(userData: CreateUserDto): DetailsUserDto {
//     if (!userData.name || userData.name.length <= USER_RULES.MIN_NAME_LENGTH) {
//       throw new ValidationError("Invalid Name")
//     }

//     if (
//       !userData.email ||
//       userData.email.length <= USER_RULES.MIN_EMAIL_LENGTH ||
//       !userData.email.includes("@")
//     ) {
//       throw new ValidationError("Invalid Email")
//     }

//     if (
//       !userData.password ||
//       userData.password.length <= USER_RULES.MIN_PASSWORD_LENGTH
//     ) {
//       throw new ValidationError("Invalid Password")
//     }

//     const userExists = repository.findByEmail(userData.email)
//     if (userExists) {
//       throw new ConflictError(`User with email ${userData.email} already exists`)
//     }

//     const userDetails: User = {
//       id: repository.generateId(),
//       name: userData.name,
//       email: userData.email,
//       password: userData.password,
//       createdAt: Date.now().toString(),
//       isActive: true
//     }

//     const result = repository.create(userDetails)
//     if (!result) {
//       throw new ConflictError("Failed to create user")
//     }

//     return toDetailsUserDto(userDetails)
//   },
//   update(id: number, data: Partial<User>): User {
//     const user = repository.update(id, data)
//     if (!user) {
//       throw new NotFound(`User with id ${id} not found`)
//     }

//     return user
//   },
//   delete(id: number): User[] {
//     return repository.delete(id)
//   }
// }
