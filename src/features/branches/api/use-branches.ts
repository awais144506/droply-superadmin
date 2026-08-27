import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { BranchEntity, CreateBranchInput } from "@/types/branch";

export const branchKeys = {
  all: ["branches"] as const,
  lists: () => [...branchKeys.all, "list"] as const,
  detail: (id: string) => [...branchKeys.all, "detail", id] as const,
};

// GET /branches
async function getBranches(): Promise<BranchEntity[]> {
  const data: any = await apiClient.get("/branches");
  return Array.isArray(data) ? data : data?.branches || data?.data || [];
}

// GET /branches/:id
async function getBranchById(id: string): Promise<BranchEntity> {
  const data: any = await apiClient.get(`/branches/${id}`);
  return data?.branch || data;
}

// POST /branches
async function createBranch(dto: CreateBranchInput): Promise<any> {
  return apiClient.post("/branches", {
    ...dto,
    latitude: Number(dto.latitude),
    longitude: Number(dto.longitude),
    monthlyFee: Number(dto.monthlyFee),
    maxUsersLimit: Number(dto.maxUsersLimit),
  });
}

// Hook: Fetch all branches
export function useBranches() {
  return useQuery({
    queryKey: branchKeys.lists(),
    queryFn: getBranches,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Hook: Fetch single branch by ID
export function useBranch(branchId: string) {
  return useQuery({
    queryKey: branchKeys.detail(branchId),
    queryFn: () => getBranchById(branchId),
    enabled: Boolean(branchId),
    staleTime: 1000 * 60 * 2,
  });
}

// Hook: Provision new branch
export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBranch,
    onSuccess: (data) => {
      // Invalidate the list cache to trigger an immediate background refresh
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });

      // If created branch ID is returned, pre-populate or invalidate its detail query
      const newId = data?.branch?.id || data?.id;
      if (newId) {
        queryClient.invalidateQueries({ queryKey: branchKeys.detail(newId) });
      }
    },
  });


}
// Hook: Update Branch Details Mutation
export function useUpdateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateBranchInput> }) => {
      return apiClient.patch(`/branches/${id}`, data);
    },
    onSuccess: (_, variables) => {
      // Refresh single branch detail and branches list cache
      queryClient.invalidateQueries({ queryKey: branchKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
}