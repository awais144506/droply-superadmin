import { apiClient } from "@/lib/api-client";
import { UseLeadsResponse, LeadStatus } from "../types";

export const leadsService = {
    getAllLeads: async (): Promise<UseLeadsResponse> => {
        return await apiClient.get('/leads')
    },
    updateLeadStatus: async ({ id, status }: { id: string; status: LeadStatus }): Promise<void> => {
        return await apiClient.patch(`/leads/${id}/status`, { status })
    }
}