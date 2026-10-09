import { apiClient } from "@/lib/api-client";
import { FetchBranchesResponse } from "../types/branch";

export const branchService = {
    getAllBranches: async (): Promise<FetchBranchesResponse> => {
        return await apiClient.get('/branches')
    }
}