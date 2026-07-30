import { Product, User } from ".";

export type CreateUserDto = Omit<User, "id">
export type UpdateUserDto = Partial<CreateUserDto>
