import { apiClient } from "@/lib/api-client";
import { PlatFormBankAccount } from "../types/bank";
import { BankFormData } from "../schema/bank-schema";

export const bankService = {
    createBankAccount: async (payload: BankFormData): Promise<PlatFormBankAccount> => {
        return await apiClient.post(`/bank/admin`, payload)
    },
    getBankAccounts: async (): Promise<PlatFormBankAccount[]> => {
        return await apiClient.get(`/bank`)
    },
    updateBankAccount: async (id: string, payload: Partial<PlatFormBankAccount>): Promise<PlatFormBankAccount> => {
        return await apiClient.patch(`/bank/admin/${id}`, payload)
    },
    deleteBankAccount: async (id: string): Promise<true> => {
        return await apiClient.delete(`/bank/admin/${id}`)
    },
    updateStatus: async (id: string, status: boolean): Promise<true> => {
        return await apiClient.patch(`/bank/admin/${id}`, { isActive: status })
    }
}