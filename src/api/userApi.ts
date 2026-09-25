import axiosInstance from './axios'

import type { UpdateUserRequest, User } from '../types/user'

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/user')

  return response.data
}

export const getUserById = async (
  id: number
): Promise<User> => {
  const response = await axiosInstance.get<User>(
    `/user/${id}`
  )

  return response.data
}

export const updateUser = async (
  id: number,
  data: UpdateUserRequest
): Promise<User> => {
  const response = await axiosInstance.put<User>(
    `/user/${id}`,
    data
  )

  return response.data
}

export const deleteUser = async (
  id: number
): Promise<void> => {
  await axiosInstance.delete(`/user/${id}`)
}