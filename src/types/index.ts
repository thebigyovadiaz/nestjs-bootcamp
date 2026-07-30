import { ServerResponse } from "http"
import { Product, Request, User } from "../interfaces"

export type Handler = (
  req: Request,
  res: ServerResponse
) => void

export type NextFunction = () => void

export type Middleware = (
  req: Request,
  res: ServerResponse,
  next: NextFunction
) => void

// Public Types
export type PublicUser = Pick<
  User,
  "id" | "name" | "email"
>

export type PublicProduct = Pick<
  Product,
  "id" | "name" | "price" | "stock"
>

// Readonly Types
export type ImmutableUser = Readonly<User>
