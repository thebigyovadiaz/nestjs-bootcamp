import { ServerResponse } from "http"
import { Request } from "../interfaces"
import { Handler, Middleware, NextFunction } from "../types"

// Middlewares config
const middlewares: Middleware[] = []

export const use = (middleware: Middleware) => {
    middlewares.push(middleware)
}

export const runMiddlewares = (request: Request, res: ServerResponse, handler: Handler) => {
  let index = 0
  const next: NextFunction = () => {
    const middleware: Middleware = middlewares[index++]
    if (!middleware) return handler(request, res)
    middleware(request, res, next)
  }

  next()
}
