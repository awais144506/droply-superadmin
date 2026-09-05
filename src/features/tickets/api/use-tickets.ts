import { useQuery } from "@tanstack/react-query";
import { TicketEntity } from "@/types/ticket";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets", "list"],
    queryFn: async (): Promise<TicketEntity[]> => {
      return [
        { id: "tkt_1", ticketNo: "TK-9001", branchCode: "B-004", branchName: "Blue Springs", subject: "Thermal printer not connecting", status: "OPEN", priority: "HIGH", createdAt: "2026-09-05T08:30:00", lastUpdated: "2026-09-05T08:30:00" },
        { id: "tkt_2", ticketNo: "TK-9002", branchCode: "B-002", branchName: "Aqua Pure", subject: "How to void a historical sale?", status: "IN_PROGRESS", priority: "LOW", createdAt: "2026-09-04T14:15:00", lastUpdated: "2026-09-05T09:10:00" },
        { id: "tkt_3", ticketNo: "TK-9003", branchCode: "B-001", branchName: "Droply Main", subject: "System offline error on dashboard", status: "OPEN", priority: "URGENT", createdAt: "2026-09-05T10:05:00", lastUpdated: "2026-09-05T10:05:00" },
        { id: "tkt_4", ticketNo: "TK-9004", branchCode: "B-005", branchName: "Crystal Water", subject: "Billing amount incorrect for September", status: "RESOLVED", priority: "MEDIUM", createdAt: "2026-09-02T11:20:00", lastUpdated: "2026-09-03T16:45:00" },
        { id: "tkt_5", ticketNo: "TK-9005", branchCode: "B-006", branchName: "Pure Flow", subject: "Need help setting up rider accounts", status: "CLOSED", priority: "MEDIUM", createdAt: "2026-08-28T09:00:00", lastUpdated: "2026-08-29T10:30:00" },
      ];
    },
  });
}