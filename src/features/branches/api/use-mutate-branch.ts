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
            queryClient.invalidateQueries({ queryKey: branchKeys.all });
            router.back();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    })
}