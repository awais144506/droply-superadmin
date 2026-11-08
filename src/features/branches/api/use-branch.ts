/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { branchService } from './branch.service';
import { branchKeys } from './branch-keys';

export function useAllBranches(searchFilter?: string, statusFilter?: string) {
    const selectFilteredBranches = useCallback(
        (data: Awaited<ReturnType<typeof branchService.getAllBranches>>) => {
            const allBranches = data.branches ?? [];
            const normalizedSearch = searchFilter?.trim().toLowerCase();

            const filteredBranches = allBranches.filter((branch) => {
                const matchesSearch = normalizedSearch
                    ? branch.branchCode?.toLowerCase().includes(normalizedSearch) ||
                    branch.name?.toLowerCase().includes(normalizedSearch)
                    : true;

                const matchesStatus =
                    statusFilter && statusFilter !== 'all'
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
        [searchFilter, statusFilter],
    );

    return useQuery({
        queryKey: branchKeys.lists(),
        queryFn: () => branchService.getAllBranches(),
        select: selectFilteredBranches,
    });
}

export function useBranchById(id: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: branchKeys.detail(id),
        queryFn: () => branchService.getBranchById(id),
        enabled: Boolean(id),
        placeholderData: () => {
            const listData = queryClient.getQueryData<any>(branchKeys.lists());
            return listData?.branches?.find((branch: any) => branch.id === id);
        },
    });
}