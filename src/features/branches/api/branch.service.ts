import { apiClient } from "@/lib/api-client";
import { FetchBranchesResponse, BranchByIdResponse } from "../types/branch";
import { CreateBranchFormData } from "../schema/create-branch.schema";

export const branchService = {
    getAllBranches: async (): Promise<FetchBranchesResponse> => {
        return await apiClient.get('/branches')
    },
    createBranch: async (data: CreateBranchFormData): Promise<FetchBranchesResponse> => {
        return await apiClient.post('branches', data);
    },
    getBranchById: async (id: string): Promise<BranchByIdResponse> => {
        return await apiClient.get(`branches/${id}`)
    },
    updateBranch: async (id: string, updateBranch: Partial<CreateBranchFormData>) => {
        return await apiClient.patch(`/branches/${id}`, updateBranch);
    },
    updateBranchStatus: async ({ id, status }: { id: string; status: "ACTIVE" | "SUSPENDED" }) => {
        return apiClient.patch(`/branches/${id}/status`, { status });
    }
}