import type { Inquiry, InquiryRequest, UpdateInquiryRequest } from "../types/inquiry";
import axiosInstance from "./axios";

export const createInquiry = async(request: InquiryRequest):Promise<Inquiry> => {
    const reponse = await axiosInstance.post<Inquiry>("/inquiries",request);
    return reponse.data;
};

export const getAllInquiries = async (): Promise<Inquiry[]> => {
    const response = await axiosInstance.get<Inquiry[]>("/inquiries");
    return response.data;
}

export const getInquiryById = async (id: number): Promise<Inquiry> => {
    const response = await axiosInstance.get<Inquiry>(`/inquiries/${id}`);
    return response.data;
}

export const updateInquiry = async (id: number, request: UpdateInquiryRequest): Promise<Inquiry> => {
    const response = await axiosInstance.put<Inquiry>(`/inquiries/${id}`, request);
    return response.data;
}

export const deleteInquiry = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/inquiries/${id}`);
}