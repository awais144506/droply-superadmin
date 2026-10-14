import { useQuery } from "@tanstack/react-query";
import { subApi } from "./subscription.service";
import { subscriptionKeys } from "./subscription-keys";

export const useAdminBranchHistory = (branchId: string) => {
    return useQuery({
        queryKey: subscriptionKeys.adminHistory(branchId),
        queryFn: () => subApi.getAdminBranchHistory(branchId),
        enabled: !!branchId,
        staleTime: 1000 * 60 * 5,
    });
};