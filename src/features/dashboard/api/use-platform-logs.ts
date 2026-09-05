import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface PlatformLogEntity {
  id: string;
  description: string;
  status: "UNREAD" | "READ";
  timestamp: string;
}

export const logKeys = {
  all: ["platform-logs"] as const,
  paginated: (take: number, skip: number) => [...logKeys.all, { take, skip }] as const,
};

export function usePlatformLogs(take: number, skip: number) {
  return useQuery({
    queryKey: logKeys.paginated(take, skip),
    queryFn: async (): Promise<PlatformLogEntity[]> => {
      const response: any = await apiClient.get(`/platform-logs?take=${take}&skip=${skip}`);
      return response?.data || response;
    },
  });
}

export function useMarkLogAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return apiClient.patch(`/platform-logs/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logKeys.all });
    },
  });
}

export function useMarkAllLogsAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return apiClient.patch(`/platform-logs/read-all`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: logKeys.all });
    },
  });
}