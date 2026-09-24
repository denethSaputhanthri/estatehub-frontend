export type BookingStatus = 
 |"SCHEDULED" 
 | "COMPLETED" 
 | "CANCELLED";

export interface CreateBookingRequest {
    inquiryId: number;
    visitDate: string;
}

export interface Booking {
  id: number;
  inquiryId: number;
  propertyId: number;
  customerId: number;
  agentId: number | null;
  visitDate: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}
