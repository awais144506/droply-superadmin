import { useQuery } from '@tanstack/react-query';
import { branchService } from './branch.service';
import { branchKeys } from './branch-keys';

export function useAllBranches(searchFilter?: string, statusFilter?: string) {
    return useQuery({
        queryKey: branchKeys.lists(),
        queryFn: () => branchService.getAllBranches(),
        select: (data) => {
            const allBranches = data.branches ?? [];

            const filteredBranches = allBranches.filter((branch) => {
                const matchesSearch = searchFilter
                    ? branch.branchCode?.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    branch.name?.toLowerCase().includes(searchFilter.toLowerCase())
                    : true;
                const matchesStatus =
                    statusFilter && statusFilter !== "all"
                        ? branch.status === statusFilter
                        : true;
                return matchesSearch && matchesStatus;
            });

            return {
                stats: data.stats ?? { total: 0, active: 0, pastDue: 0, suspended: 0 },
                branches: filteredBranches,
                logs: data.logs ?? [],
            };
        },
    });
}

export function useBranchById(id: string) {
    return useQuery({
        queryKey: branchKeys.detail(id),
        queryFn: () => branchService.getBranchById(id),
        enabled: Boolean(id),
    });
}