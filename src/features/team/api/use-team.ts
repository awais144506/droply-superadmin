import { useQuery } from "@tanstack/react-query";
import { TeamMember } from "@/types/team";

export function useTeam() {
  return useQuery({
    queryKey: ["team", "list"],
    queryFn: async (): Promise<TeamMember[]> => {
      return [
        { id: "adm_1", name: "Muhammad Awais", email: "awais@droply.com", role: "SUPER_ADMIN", status: "ACTIVE", department: "Engineering & Core", lastActive: "2026-09-05T01:45:00" },
        { id: "adm_2", name: "Sarah Ahmed", email: "sarah@droply.com", role: "SUPPORT_ADMIN", status: "ACTIVE", department: "Customer Success", lastActive: "2026-09-05T01:30:00" },
        { id: "adm_3", name: "Ali Raza", email: "ali@droply.com", role: "BILLING_ADMIN", status: "ACTIVE", department: "Finance", lastActive: "2026-09-04T18:20:00" },
        { id: "adm_4", name: "Hassan Khan", email: "hassan@droply.com", role: "SUPPORT_ADMIN", status: "INACTIVE", department: "Customer Success", lastActive: "2026-08-20T10:00:00" },
      ];
    },
  });
}