export type AdminRole = "SUPER_ADMIN" | "SUPPORT_ADMIN" | "BILLING_ADMIN";
export type AdminStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminStatus;
  department: string;
  lastActive: string;
}