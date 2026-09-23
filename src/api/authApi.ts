import axiosInstance from "./axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export const login = async (
    request: LoginRequest
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/login",
    request,
  );
  return response.data;
};

export const register = async (
  request: RegisterRequest
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/register",
    request,
  );
  return response.data;
};
