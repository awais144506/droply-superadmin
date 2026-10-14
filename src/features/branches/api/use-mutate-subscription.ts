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
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
        },
        onError: (error: any) => {
            toast.error(error.message)
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
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
        },
        onError: (error: any) => {
            toast.error(error.message)
        },
    });
}