import { User } from "../interfaces";

export type DetailsUserDto = Pick<User, "name" | "email" | "isActive" | "createdAt">
