
// --- ENUMS / TYPES ---
export type BranchStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "ARCHIVED";
export type SubscriptionCycle = "TRIAL" | "MONTHLY" | "YEARLY";
export type SubscriptionTier = "SILVER" | "GOLD" | "PLATINUM";
export type ActivityLogStatus = "UNREAD" | "READ";

// --- MODELS ---
export interface BranchOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  cycle: SubscriptionCycle;
  tier: SubscriptionTier;
  renewDate: string;
}

export interface ActivityLog {
  id: string;
  branchId: string;
  status: ActivityLogStatus;
  userName: string;
  action: string;
  type: string;
  description: string;
  createdAt: string;
}

// --- MAIN BRANCH OBJECT ---
export interface Branch {
  id: string;
  branchCode: string;
  name: string;
  phone: string;
  address: string;
  status: BranchStatus;
  createdAt: string;
  owner: BranchOwner;
  subscription: Subscription;
}


export interface BranchDashboardStats {
  total: number;
  active: number;
  pastDue: number;
  suspended: number;
}

export interface FetchBranchesResponse {
  stats: BranchDashboardStats;
  branches: Branch[];
  logs: ActivityLog[];
}