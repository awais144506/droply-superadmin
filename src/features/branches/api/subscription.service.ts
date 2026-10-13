import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "../types/subscription";

export const getAdminBranchHistory = async (branchId: string): Promise<ApiResponse> => {
    return await apiClient.get(`/subscription/admin/${branchId}`);
};
