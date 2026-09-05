import { useQuery } from "@tanstack/react-query";
import { SubscriptionEntity } from "@/types/subscription";

export function useSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions", "list"],
    queryFn: async (): Promise<SubscriptionEntity[]> => {
      return [
        { id: "sub_1", branchCode: "B-001", branchName: "Droply Main", city: "Sahiwal", ownerName: "Muhammad Awais", cycle: "YEARLY", tier: "PLATINUM", status: "ACTIVE", renewDate: "2027-01-15" },
        { id: "sub_2", branchCode: "B-002", branchName: "Aqua Pure", city: "Lahore", ownerName: "Ahmed Ali", cycle: "MONTHLY", tier: "GOLD", status: "ACTIVE", renewDate: "2026-10-01" },
        { id: "sub_3", branchCode: "B-003", branchName: "Clear Drops", city: "Multan", ownerName: "Zafar Iqbal", cycle: "TRIAL", tier: "SILVER", status: "ACTIVE", renewDate: "2026-09-20" },
        { id: "sub_4", branchCode: "B-004", branchName: "Blue Springs", city: "Faisalabad", ownerName: "Usman Raza", cycle: "MONTHLY", tier: "GOLD", status: "PAST_DUE", renewDate: "2026-09-01" },
        { id: "sub_5", branchCode: "B-005", branchName: "Crystal Water", city: "Islamabad", ownerName: "Bilal Khan", cycle: "YEARLY", tier: "SILVER", status: "SUSPENDED", renewDate: "2026-08-15" },
      ];
    },
  });
}