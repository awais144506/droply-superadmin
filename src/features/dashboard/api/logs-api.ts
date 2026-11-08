import { apiClient } from "@/lib/api-client";
import { AdminLogsResponse } from "../types/logs";

// --- QUERY KEYS ---
export const adminDashboardKeys = {
    all: ["super-admin-dashboard"] as const,
    logs: () => [...adminDashboardKeys.all, "logs"] as const,
};

// --- API FETCH ---
export const fetchAdminLogs = async (): Promise<AdminLogsResponse> => {
    return await apiClient.get("/subscription/admin/logs");
};