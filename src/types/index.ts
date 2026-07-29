import { IncomingMessage, ServerResponse } from "http"

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => void

export type NextFunction = () => void

export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => void
