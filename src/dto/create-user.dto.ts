import { User } from "../interfaces";

export type CreateUserDto = Omit<User, "id" | "createdAt" | "isActive">
