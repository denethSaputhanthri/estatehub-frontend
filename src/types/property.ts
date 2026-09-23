export type PropertyType = 
 |" HOUSE" 
 | " APARTMENT" 
 | "LAND" 
 | "COMMERCIAL";

export type PropertyStatus = 
 |"AVAILABLE" 
 | "PENDING" 
 | "SOLD" 
 | "RENTED";

export interface Property {
  id: number;
  title: string;
  description: string | null;
  type: PropertyType;
  price: number;
  size: number | null;
  location: string ;
  status: PropertyStatus;
  ownerId: number;
  agentId: number | null;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}
