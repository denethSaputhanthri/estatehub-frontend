export type UserRole =
  | 'CUSTOMER'
  | 'SELLER'
  | 'AGENT'
  | 'ADMIN'

export type UserStatus =
  | 'ACTIVE'
  | 'DISABLED'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone: string
  role: UserRole
}

export interface AuthResponse {
  token: string
  tokenType: string
  userId: number
  name: string
  email: string
  role: UserRole
}