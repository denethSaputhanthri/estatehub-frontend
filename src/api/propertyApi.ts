import axiosInstance from "./axios";
import type { 
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