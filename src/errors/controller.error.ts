import { AppError } from "./base.error"

export class ControllerMissingMetadataError extends AppError {
  constructor(message: string) {
    super(400, message)
  }
}
