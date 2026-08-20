import { AppError } from "./base.error"

export class RouteHandlerError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}
