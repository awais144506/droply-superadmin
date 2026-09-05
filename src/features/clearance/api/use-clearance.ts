import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClearanceEntity, ClearanceStatus } from "@/types/clearance";

// Dummy data representing unverified bank deposits and cash handovers
export function useClearances() {
  return useQuery({
    queryKey: ["clearances", "list"],
    queryFn: async (): Promise<ClearanceEntity[]> => {
      return [
        { id: "clr_1", branchCode: "B-001", branchName: "Droply Main", amount: 120000, method: "BANK_TRANSFER", referenceNo: "TRX-9988221", submittedAt: "2026-09-04T10:30:00", status: "PENDING" },
        { id: "clr_2", branchCode: "B-004", branchName: "Blue Springs", amount: 15000, method: "JAZZCASH", referenceNo: "03001122334", submittedAt: "2026-09-03T14:15:00", status: "PENDING" },
        { id: "clr_3", branchCode: "B-002", branchName: "Aqua Pure", amount: 15000, method: "EASYPAISA", referenceNo: "EP-445566", submittedAt: "2026-09-02T09:00:00", status: "APPROVED" },
        { id: "clr_4", branchCode: "B-005", branchName: "Crystal Water", amount: 60000, method: "BANK_TRANSFER", referenceNo: "TRX-1122334", submittedAt: "2026-09-01T16:45:00", status: "REJECTED" },
      ];
    },
  });
}

export function useUpdateClearance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ClearanceStatus }) => {
      // apiClient.patch(`/clearances/${id}`, { status })
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clearances", "list"] });
    },
  });
}