import { useMutation, useQueryClient } from "@tanstack/react-query";
import { branchService } from "./branch.service";
import { useRouter } from "next/navigation";
import { CreateBranchFormData } from "../schema/create-branch.schema";
import { toast } from "sonner";
import { branchKeys } from "./branch-keys";

export function useCreateBranch() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (data: CreateBranchFormData) => branchService.createBranch(data),
        onSuccess: () => {
            toast.success("Branch created successfully");
            queryClient.invalidateQueries({ queryKey: branchKeys.lists() });
            router.back();
        },
        onError: (err) => {
            toast.error(err?.message || "Failed to create branch.");
        },
    });
}

export function useUpdateBranch() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<CreateBranchFormData> }) =>
            branchService.updateBranch(id, data),
        onSuccess: (updatedBranch, variables) => {
            toast.success("Branch updated successfully!");
            if (updatedBranch) {
                queryClient.setQueryData(branchKeys.detail(variables.id), updatedBranch);
            }
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
            router.push(`/manage/branches/${variables.id}`);
        },
        onError: (error) => {
            toast.error(
                error?.message || "Failed to update branch. Please try again."
            );
        },
    });
}

export function useUpdateBranchStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: branchService.updateBranchStatus,
        onSuccess: (_, variables) => {
            const action = variables.status === "ACTIVE" ? "activated" : "suspended";
            toast.success(`Branch successfully ${action}!`);
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
        },
        onError: (error) => {
            toast.error(
                error?.message || "Failed to update branch status."
            );
        },
    });
}