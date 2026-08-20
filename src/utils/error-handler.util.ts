import { ServerResponse } from "http";
import { AppError } from "../errors/base.error";
import { resJSON } from "./response.util";

export const handleError = (error: unknown, res: ServerResponse): void => {
  if (error instanceof AppError) {
    return resJSON(res, error.statusCode, {
      success: false,
      message: error.message
    })
  }
}
