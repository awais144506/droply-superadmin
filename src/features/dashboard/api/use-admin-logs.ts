import { useQuery } from "@tanstack/react-query";
import { fetchAdminLogs, adminDashboardKeys } from "./logs-api";

export const useAdminLogs = () => {
    return useQuery({
        queryKey: adminDashboardKeys.logs(),
        queryFn: fetchAdminLogs,
        refetchInterval: 1000 * 60 * 3, 
    });
};