import { AppError } from "./base.error";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message)
  }
}
