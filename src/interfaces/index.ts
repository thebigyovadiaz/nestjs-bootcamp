import { IncomingMessage } from 'http';
import { ComponentType, Handler, HttpMethod } from '../types/index';
export interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: string
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
  data?: T
  timestamp?: string
}

export interface RouteDetails {
  method: string
  path: string
  handler: Handler
}

export interface Request extends IncomingMessage {
  params: Record<string, string>
  query: Record<string, string>
  body: object
}

export interface ParseRequest {
  method: string,
  pathname: string,
  partsUrl: string[],
  query: Record<string, string>
}

export interface ControllerDefinition {
  target: Function
  token: symbol
}

export interface DependencyDefinition<T = unknown> {
  token: symbol;
  factory: () => T;
  instance?: T;
}

export interface ComponentDefinition {
  target: Function
  token: symbol
  type: ComponentType
}

export interface RouteDefinition {
  method: HttpMethod;
  path: string;
  propertyKey: string | symbol;
  descriptor?: string;
}
