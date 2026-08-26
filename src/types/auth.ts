export type PlatformRole = "SUPER_ADMIN" | "SUPPORT_ADMIN" | "FINANCE_ADMIN";

export interface PlatformUserSession {
  userId: string;
  email: string;
  fullName: string;
  role: PlatformRole;
}