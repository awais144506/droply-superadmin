import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export type LeadStatus = "NEW" | "CONTACTED" | "MEETING" | "DONE" | "REJECTED";

export interface WebsiteLead {
  id: string;
  businessName: string;
  contactName: string;
  phone: string;
  status: LeadStatus;
  createdAt: string;
}

export const leadKeys = {
  all: ["website-leads"] as const,
  lists: () => [...leadKeys.all, "list"] as const,
};

export function useWebsiteLeads() {
  return useQuery({
    queryKey: leadKeys.lists(),
    queryFn: async (): Promise<WebsiteLead[]> => {
      const response: any = await apiClient.get("/leads");
      // Map createdAt to date to match your component interface
      return (response?.data || response).map((lead: any) => ({
        ...lead,
        date: lead.createdAt,
      }));
    },
  });
}

export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      return apiClient.patch(`/leads/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
    },
  });
}