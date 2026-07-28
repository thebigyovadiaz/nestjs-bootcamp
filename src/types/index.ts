import { IncomingMessage, ServerResponse } from "http"

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse
) => void

export type Next = () => void

export type Middleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: Next
) => void
