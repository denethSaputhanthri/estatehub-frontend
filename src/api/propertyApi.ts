import axiosInstance from "./axios";
import type { 
    CreatePropertyRequest,
    Property, 
    PropertyStatus, 
    PropertyType 
} from "../types/property";

interface PropertySearchParams {
    location?: string;
    type?: PropertyType; 
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
}

export const createProperty = async (request: CreatePropertyRequest): Promise<Property> => {
    const response = await axiosInstance.post<Property>("/properties", request);
    return response.data;
}

export const updateProperty = async (id: number, request: CreatePropertyRequest): Promise<Property> => {
    const response = await axiosInstance.put<Property>(`/properties/${id}`, request);
    return response.data;
}

export const getAllProperties = async (): Promise<Property[]> => {
    const response = await axiosInstance.get<Property[]>("/properties");
    return response.data;
};

export const getPropertyById = async (id: number): Promise<Property> => {
    const response = await axiosInstance.get<Property>(`/properties/${id}`);
    return response.data;
}

export const searchProperties = async (params: PropertySearchParams): Promise<Property[]> => {
    const response = await axiosInstance.get<Property[]>("/properties/search", { params });
    return response.data;
}

export const deleteProperty = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/properties/${id}`);
}