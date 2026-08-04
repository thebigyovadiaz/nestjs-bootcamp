import { User } from "../interfaces";

export type DetailsUserDto = Omit<User, "id" | "password">
