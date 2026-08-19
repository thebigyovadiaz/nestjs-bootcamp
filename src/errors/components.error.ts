import { AppError } from "./base.error"

export class ComponentAlreadyRegisteredError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}
