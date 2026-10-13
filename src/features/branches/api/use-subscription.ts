import { useQuery } from "@tanstack/react-query";
import { getAdminBranchHistory } from "./subscription.service";
import { subscriptionKeys } from "./subscription-keys";

export const useAdminBranchHistory = (branchId: string) => {
    return useQuery({
        queryKey: subscriptionKeys.adminHistory(branchId),
        queryFn: () => getAdminBranchHistory(branchId),
        enabled: !!branchId,
        staleTime: 1000 * 60 * 5,
    });
};