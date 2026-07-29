export interface User {
  name: string
  id: string
  email: string
}

export interface Product {
  name: string
  id: string
  price: string
}

export interface EmptyR {}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}
