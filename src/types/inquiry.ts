export type InquiryStatus = 
 | "NEW" 
 | "RESPONDED" 
 | "CLOSED";

export interface InquiryRequest {
    propertyId: number;
    customerId ?: number;
    agentId?: number | null;
    message: string;
}

export interface UpdateInquiryRequest {
  message: string
  status: InquiryStatus
  agentId?: number | null
}

export interface Inquiry {
  id: number;
  propertyId: number;
  customerId: number;
  agentId: number;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}
