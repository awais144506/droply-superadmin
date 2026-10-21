import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bankService } from "./bank.service";
import { bankKeys } from "./bank-keys";
import { BankFormData } from "../schema/bank-schema";
import { toast } from "sonner"
import { PlatFormBankAccount } from "../types/bank";

export function useBankDetails() {
  return useQuery({
    queryKey: bankKeys.lists(),
    queryFn: () => bankService.getBankAccounts(),
  });
}

export function useCreateBankDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BankFormData) => bankService.createBankAccount(payload),
    onSuccess: () => {
      toast.success("Bank created successfully")
      queryClient.invalidateQueries({ queryKey: bankKeys.all })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });
}

export function useUpdateBankDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PlatFormBankAccount> }) => bankService.updateBankAccount(id, data),
    onSuccess: () => {
      toast.success("Bank updated successfully")
      queryClient.invalidateQueries({ queryKey: bankKeys.lists() });
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });
}

export function useDeleteBankDetail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bankService.deleteBankAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bankKeys.lists() });
    },
  });
}