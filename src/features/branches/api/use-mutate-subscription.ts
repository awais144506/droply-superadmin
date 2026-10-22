/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { subApi } from "./subscription.service";
import { subscriptionKeys } from "./subscription-keys";
import { branchKeys } from "./branch-keys";

export function useApprovePayment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (paymentId: string) => subApi.approvePayment(paymentId),
        onSuccess: () => {
            toast.success("Payment approved. Subscription updated.");
            // Invalidates adminHistory(branchId) AND adminLogs()
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
            // Invalidates BOTH branchKeys.lists() AND branchKeys.detail(id) (status, userLimit, logs)
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to approve payment.");
        },
    });
}

export function useRejectPayment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ paymentId, remarks }: { paymentId: string; remarks: string }) =>
            subApi.rejectPayment(paymentId, remarks),
        onSuccess: () => {
            toast.success("Payment rejected with remarks.");
            // Invalidates adminHistory(branchId) AND adminLogs()
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
            // Invalidates branchKeys.all so the new rejection ActivityLog shows up on the branch page
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to reject payment.");
        },
    });
}