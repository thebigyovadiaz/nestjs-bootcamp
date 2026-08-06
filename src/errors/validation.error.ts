import { AppError } from "./base.error"

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}
