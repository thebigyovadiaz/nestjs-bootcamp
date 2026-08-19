import { AppError } from "./base.error";

export class NotFound extends AppError {
  constructor(message: string) {
    super(404, message)
  }
}
