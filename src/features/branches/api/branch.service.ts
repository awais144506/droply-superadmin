import { apiClient } from "@/lib/api-client";
import { FetchBranchesResponse, BranchByIdResponse } from "../types/branch";
import { CreateBranchFormData } from "../schema/create-branch.schema";

export const branchService = {
    getAllBranches: async (): Promise<FetchBranchesResponse> => {
        return await apiClient.get('/branches/admin')
    },
    createBranch: async (data: CreateBranchFormData): Promise<FetchBranchesResponse> => {
        return await apiClient.post('/branches/admin', data);
    },
    getBranchById: async (id: string): Promise<BranchByIdResponse> => {
        return await apiClient.get(`branches/admin/${id}`)
    },
    updateBranch: async (id: string, updateBranch: Partial<CreateBranchFormData>) => {
        return await apiClient.patch(`/branches/admin/${id}`, updateBranch);
    },
    updateBranchStatus: async ({ id, status }: { id: string; status: "ACTIVE" | "SUSPENDED" }) => {
        return apiClient.patch(`/branches/admin/${id}/status`, { status });
    }
}