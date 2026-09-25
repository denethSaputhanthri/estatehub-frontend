import type {UserRole, UserStatus} from "./auth"

export interface AuthenticatedUser {
  id: number
  name: string
  email: string
  role: UserRole
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}
export interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
  phone?: string
  role?: UserRole
  status?: UserStatus
}