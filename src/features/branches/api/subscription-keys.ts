export const subscriptionKeys = {
    all: ["subscription"] as const,
    adminHistory: (branchId: string) => [...subscriptionKeys.all, "admin-history", branchId] as const,
};