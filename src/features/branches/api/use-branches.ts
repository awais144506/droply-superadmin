import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { BranchEntity, CreateBranchInput } from "@/types/branch";

export interface GetBranchesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "PAST_DUE" | "SUSPENDED";
  tier?: "SILVER" | "GOLD" | "PLATINUM";
}

export interface PaginatedBranches {
  data: BranchEntity[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface UpdateOwnerInput {
  branchId: string;
  data: {
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    ownerCnic: string;
  };
}

export interface UpdateBranchInput {
  branchId: string;
  data: {
    name: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export const branchKeys = {
  all: ["branches"] as const,
  lists: (filters?: GetBranchesParams) => [...branchKeys.all, "list", filters] as const,
  detail: (id: string) => [...branchKeys.all, "detail", id] as const,
  stats: () => [...branchKeys.all, "stats"] as const,
};

async function getBranches(params?: GetBranchesParams): Promise<PaginatedBranches> {
  const response: any = await apiClient.get("/branches", { params });
  return response;
}

async function getBranchById(id: string): Promise<BranchEntity> {
  const response: any = await apiClient.get(`/branches/${id}`);
  return response?.data || response;
}

async function createBranch(dto: CreateBranchInput): Promise<any> {
  return apiClient.post("/branches", {
    ...dto,
    latitude: dto.latitude ? Number(dto.latitude) : undefined,
    longitude: dto.longitude ? Number(dto.longitude) : undefined,
  });
}

async function getBranchStats() {
  const response: any = await apiClient.get("/branches/stats");
  return response?.data || response;
}

async function updateBranchStatus({ id, status }: { id: string; status: "ACTIVE" | "SUSPENDED" }): Promise<any> {
  return apiClient.patch(`/branches/${id}/status`, { status });
}

async function updateBranchOwner({ branchId, data }: UpdateOwnerInput): Promise<any> {
  return apiClient.patch(`/branches/${branchId}/owner`, data);
}

async function updateBranchDetails({ branchId, data }: UpdateBranchInput): Promise<any> {
  return apiClient.patch(`/branches/${branchId}`, data);
}

export function useBranches(filters?: GetBranchesParams) {
  return useQuery({
    queryKey: branchKeys.lists(filters),
    queryFn: () => getBranches(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}

export function useBranch(branchId: string) {
  return useQuery({
    queryKey: branchKeys.detail(branchId),
    queryFn: () => getBranchById(branchId),
    enabled: Boolean(branchId),
    staleTime: 1000 * 60 * 2,
  });
}

export function useBranchStats() {
  return useQuery({
    queryKey: branchKeys.stats(),
    queryFn: getBranchStats,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBranch,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: branchKeys.stats() });

      const newId = response?.data?.id || response?.id;
      if (newId) {
        queryClient.invalidateQueries({ queryKey: branchKeys.detail(newId) });
      }
    },
  });
}

export function useUpdateBranchStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBranchStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: branchKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: branchKeys.stats() });
    },
  });
}

export function useUpdateBranchDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBranchDetails,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: branchKeys.detail(variables.branchId) });
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
}
export function useUpdateBranchOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBranchOwner,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: branchKeys.detail(variables.branchId) });
      queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
    },
  });
}