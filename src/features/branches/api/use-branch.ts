import { useQuery } from '@tanstack/react-query';
import { branchService } from './branch.service';
import { branchKeys } from './branch-keys';

export function useAllBranches() {
    return useQuery({
        queryKey: branchKeys.lists(),
        queryFn: () => branchService.getAllBranches(),
        select: (data) => ({
            stats: data.stats ?? { total: 0, active: 0, pastDue: 0, suspended: 0 },
            branches: data.branches ?? [],
            logs: data.logs ?? [],
        }),
    });
}