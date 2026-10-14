import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "../types/subscription";

export const subApi = {
    getAdminBranchHistory: async (branchId: string): Promise<ApiResponse> => {
        return await apiClient.get(`/subscription/admin/${branchId}`);
    },

    approvePayment: async (paymentId: string): Promise<{ success: boolean; message: string }> => {
        return await apiClient.post(`/subscription/admin/payments/${paymentId}/approve`);
    },

    rejectPayment: async (
        paymentId: string,
        remarks: string
    ): Promise<{ success: boolean; message: string }> => {
        return await apiClient.post(`/subscription/admin/payments/${paymentId}/reject`, { remarks });
    },
};