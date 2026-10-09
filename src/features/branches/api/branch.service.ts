import { apiClient } from "@/lib/api-client";
import { FetchBranchesResponse } from "../types/branch";
import { CreateBranchFormData } from "../schema/create-branch.schema";

export const branchService = {
    getAllBranches: async (): Promise<FetchBranchesResponse> => {
        return await apiClient.get('/branches')
    },
    createBranch: async (data: CreateBranchFormData): Promise<FetchBranchesResponse> => {
        return await apiClient.post('branches', data);
    }
}