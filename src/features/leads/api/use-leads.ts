import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leadKeys } from "./leads-keys";
import { leadsService } from "./leads.service";
import { LeadStatus } from "../types";


// 3. Main Hook to Fetch and Compute Lead Stats
export function useAllLeads() {
  return useQuery({
    queryKey: leadKeys.leads,
    queryFn: () => leadsService.getAllLeads(),
    select: (data) => {
      const allLeads = data.leads ?? [];
      const logs = data.logs;
      const stats = {
        total: allLeads.length,
        new: allLeads.filter((l) => l.status === "NEW").length,
        contacted: allLeads.filter((l) => l.status === "CONTACTED").length,
        meeting: allLeads.filter((l) => l.status === "MEETING").length,
        converted: allLeads.filter((l) => l.status === "CONVERTED").length,
        rejected: allLeads.filter((l) => l.status === "REJECTED").length,
      };

      return {
        stats,
        leads: allLeads,
        logs
      };
    },
  });
}

// 4. Mutation Hook to Update Lead Status
export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      leadsService.updateLeadStatus({ id, status }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: leadKeys.leads });
    },
  });
}