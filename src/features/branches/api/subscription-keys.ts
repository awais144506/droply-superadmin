export const subscriptionKeys = {
    all: ["subscription"] as const,
    adminLogs: () => [...subscriptionKeys.all, "admin-logs"] as const,
    adminHistoryAll: () => [...subscriptionKeys.all, "admin-history"] as const,
    adminHistory: (branchId: string) =>
        [...subscriptionKeys.adminHistoryAll(), branchId] as const,
};