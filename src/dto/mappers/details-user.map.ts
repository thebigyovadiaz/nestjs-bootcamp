import { User } from "../../interfaces";
import { DetailsUserDto } from "../details-user.dto";

export const toDetailsUserDto = (user: User): DetailsUserDto => ({
  name: user.name,
  email: user.email,
  isActive: user.isActive,
  createdAt: user.createdAt
})
