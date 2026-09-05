import { useQuery } from "@tanstack/react-query";

export type LeadStatus = "NEW" | "CONTACTED" | "MEETING" | "DONE" | "REJECTED";

export interface SuperAdminStats {
    totalBranches: number;
    activeBranches: number;
    disabledBranches: number;
    pastDueBranches: number;
    pendingClearances: number;
    openTickets: number;
    repliedTickets: number;
    resolvedTickets: number;
    totalLeads: number;
    contactedLeads: number;
}

export interface WebsiteLead {
    id: string;
    contactName: string;
    businessName: string;
    phone: string;
    status: LeadStatus;
    date: string;
}



export interface SystemLog {
    id: string;
    type: "PAYMENT" | "ALERT" | "TICKET" | "SYSTEM";
    message: string;
    timestamp: string;
    branchName?: string;
    isRead: boolean;
}

export interface SuperDashboardData {
    stats: SuperAdminStats; // (Assume previous stats interface)
    recentLeads: WebsiteLead[];
    systemLogs: SystemLog[]; // (Assume previous logs interface)
}

export function useSuperDashboard() {
    return useQuery({
        queryKey: ["super-admin-dashboard"],
        queryFn: async (): Promise<SuperDashboardData> => {
            return {
                stats: {
                    totalBranches: 18, activeBranches: 14, disabledBranches: 2, pastDueBranches: 2,
                    pendingClearances: 3, openTickets: 5, repliedTickets: 3, resolvedTickets: 42,
                    totalLeads: 24, contactedLeads: 18,
                },
                recentLeads: [
                    { id: "L-101", contactName: "Ahmed Ali", businessName: "Pure Aqua Lahore", phone: "+92 300 1112223", status: "NEW", date: "2026-09-04" },
                    { id: "L-102", contactName: "Zafar Iqbal", businessName: "Zafar Distributors", phone: "+92 321 4445556", status: "CONTACTED", date: "2026-09-03" },
                    { id: "L-103", contactName: "Usman Raza", businessName: "Raza Water Tech", phone: "+92 333 7778889", status: "MEETING", date: "2026-09-02" },
                    { id: "L-104", contactName: "Bilal Khan", businessName: "Khan Springs", phone: "+92 304 9990001", status: "DONE", date: "2026-09-01" },
                ],
                systemLogs: [
                    { id: "log_1", type: "PAYMENT", message: "Subscription renewed via Bank Transfer", timestamp: "2026-09-05T10:15:00", branchName: "Droply Sahiwal", isRead: false },
                    { id: "log_2", type: "TICKET", message: "New High Priority ticket opened", timestamp: "2026-09-05T09:30:00", branchName: "Aqua Pure Multan", isRead: false },
                    { id: "log_3", type: "ALERT", message: "Payment clearance pending > 48 hours", timestamp: "2026-09-04T16:45:00", branchName: "Lahore East Dist.", isRead: true },
                    { id: "log_4", type: "SYSTEM", message: "Database backup completed successfully", timestamp: "2026-09-04T03:00:00", isRead: true },
                    { id: "log_5", type: "PAYMENT", message: "Payment cleared by accounting", timestamp: "2026-09-03T14:20:00", branchName: "Faisalabad Central", isRead: true },
                ]
            };
        },
    });
}