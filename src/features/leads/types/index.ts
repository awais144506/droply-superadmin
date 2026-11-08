import { ActivityLog } from "@/types/ActivityLog"; // Adjust path if needed

// 1. Lead Status Enums
export type LeadStatus = "NEW" | "CONTACTED" | "MEETING" | "CONVERTED" | "REJECTED";

// 2. Base Lead Interface
export interface WebsiteLead {
  id: string;
  name: string;
  phone: string;
  city: string;
  status: LeadStatus;
  createdAt: string;
}

// 4. Hook Response Interface (Now includes logs!)
export interface UseLeadsResponse {
  leads: WebsiteLead[];
  logs: ActivityLog[];
}