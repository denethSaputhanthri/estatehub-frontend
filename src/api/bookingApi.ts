import type { Booking, CreateBookingRequest } from "../types/booking";
import axiosInstance from "./axios";

export const createBooking = async (request: CreateBookingRequest): Promise<Booking> => {
    const response = await axiosInstance.post<Booking>("/bookings", request);
    return response.data;
}

export const getAllBookings = async (): Promise<Booking[]> => {
    const response = await axiosInstance.get<Booking[]>("/bookings");
    return response.data;
}

export const getBookingById = async (id: number): Promise<Booking> => {
    const response = await axiosInstance.get<Booking>(`/bookings/${id}`);
    return response.data;
}

export const updateBooking = async (id: number, request: CreateBookingRequest): Promise<Booking> => {
    const response = await axiosInstance.put<Booking>(`/bookings/${id}`, request);
    return response.data;
}

export const deleteBooking = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/bookings/${id}`);
}