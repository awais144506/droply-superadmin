import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client"; // Adjust path to your apiClient file
import { BranchEntity, CreateBranchInput } from "@/types/branch";

export const branchKeys = {
  all: ["branches"] as const,
  lists: () => [...branchKeys.all, "list"] as const,
  detail: (id: string) => [...branchKeys.all, "detail", id] as const,
};

// GET /api/v1/super-admin/branches
async function getBranches(): Promise<BranchEntity[]> {
  return apiClient.get("/branches");
}

// POST /api/v1/super-admin/branches
async function createBranch(dto: CreateBranchInput): Promise<any> {
  return apiClient.post("/branches", {
    ...dto,
    latitude: Number(dto.latitude),
    longitude: Number(dto.longitude),
    monthlyFee: Number(dto.monthlyFee),
    maxUsersLimit: Number(dto.maxUsersLimit),
  });
}

// Hook: Fetch All Branches
export function useBranches() {
  return useQuery({
    queryKey: branchKeys.lists(),
    queryFn: getBranches,
    staleTime: 1000 * 60 * 2,
  });
}

// Hook: Provision Branch Mutation
export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
}