import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface BankDetailEntity {
  id: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban?: string;
  qrCodeUrl?: string;
  isActive: boolean;
}

export const bankKeys = {
  all: ["bank-details"] as const,
  lists: () => [...bankKeys.all, "list"] as const,
};

export function useBankDetails() {
  return useQuery({
    queryKey: bankKeys.lists(),
    queryFn: async (): Promise<BankDetailEntity[]> => {
      const response: any = await apiClient.get("/bank-details");
      return response?.data || response;
    },
  });
}

export function useCreateBankDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<BankDetailEntity>) => {
      return apiClient.post("/bank-details", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bankKeys.lists() });
    },
  });
}

export function useUpdateBankDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BankDetailEntity> }) => {
      return apiClient.patch(`/bank-details/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bankKeys.lists() });
    },
  });
}

export function useDeleteBankDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return apiClient.delete(`/bank-details/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bankKeys.lists() });
    },
  });
}