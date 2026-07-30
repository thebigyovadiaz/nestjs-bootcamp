import { IncomingMessage } from 'http';
import { Handler } from '../types/index';
export interface User {
  name: string
  id: string
  email: string
  createdAt: string
  updatedAt?: string
  isActive: boolean
}

export interface Product {
  name: string
  id: string
  price: string
  createdAt: string
  updatedAt?: string
  stock: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export interface RouteDetails {
  method: string
  path: string
  handler: Handler
}

export interface Request extends IncomingMessage {
  params: Record<string, string>
}
