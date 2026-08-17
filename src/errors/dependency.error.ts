import { AppError } from "./base.error";

export class DependencyAlreadyRegisteredError extends AppError {
  constructor(message: string) {
    super(500, message)
  }
}

export class DependencyNotRegisteredError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}
