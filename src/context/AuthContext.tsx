import { createContext, useContext, useState, type ReactNode } from "react"
import type { AuthenticatedUser } from "../types/user"
import type { LoginRequest, RegisterRequest } from "../types/auth"
import {
    login as loginApi,
    register as registerApi
} from "../api/authApi"


interface AuthContextType {
    user: AuthenticatedUser | null
    token: string | null
    isAuthenticated: boolean
    login: (data: LoginRequest) => Promise<AuthenticatedUser>
    register: (data: RegisterRequest) => Promise<void>
    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<AuthenticatedUser | null>(
        () => {
            const savedUser = localStorage.getItem('user')
            return savedUser ? JSON.parse(savedUser) : null
        }
    )

    const [token, setToken] = useState<string | null>(
        () => { return localStorage.getItem('token') }
    )

    const login = async (data: LoginRequest): Promise<AuthenticatedUser> => {
        const response = await loginApi(data)

        const AuthenticatedUser: AuthenticatedUser = {
            id: response.userId,
            name: response.name,
            email: response.email,
            role: response.role
        }
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(AuthenticatedUser))
        setUser(AuthenticatedUser)
        setToken(response.token)
        // Handle the response, e.g., store the token in localStorage
        return AuthenticatedUser
    }

    const register = async (data: RegisterRequest): Promise<void> => {
        const response = await registerApi(data)

        const AuthenticatedUser: AuthenticatedUser = {
            id: response.userId,
            name: response.name,
            email: response.email,
            role: response.role
        }
        localStorage.setItem('user', JSON.stringify(AuthenticatedUser))
        localStorage.setItem('token', response.token)
        
        setUser(AuthenticatedUser)
        setToken(response.token)
    }

    const logout = (): void => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        setToken(null)
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth must be used inside an AuthProvider'
        )
    }

    return context
}