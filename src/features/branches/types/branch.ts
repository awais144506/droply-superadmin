// --- ENUMS / TYPES ---
export type BranchStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "ARCHIVED";
export type SubscriptionCycle = "TRIAL" | "MONTHLY" | "YEARLY";
export type SubscriptionTier = "SILVER" | "GOLD" | "PLATINUM";
export type ActivityLogStatus = "UNREAD" | "READ";
export type StaffStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

// --- MODELS ---
export interface BranchOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnic: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  cycle: SubscriptionCycle;
  tier: SubscriptionTier;
  renewDate: string;
}

export interface BranchStaffItem {
  id: string;
  name: string;
  role: string;
  phone: string;
  cnic: string;
  status: StaffStatus;
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

// --- BASE BRANCH DETAILS (Without nested relations) ---
export interface BranchDetails {
  ntn: string;
  strn: string;
  userLimit: number;
  id: string;
  branchCode: string;
  name: string;
  phone: string;
  address: string;
  lat: string;
  lng: string;
  status: BranchStatus;
  createdAt: string;
  updatedAt?: string;
}

// --- FULL BRANCH (Used in Table/List Views) ---
export interface Branch extends BranchDetails {
  owner: BranchOwner;
  subscription: Subscription;
}

// --- DASHBOARD LIST RESPONSE ---
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

// --- SINGLE BRANCH DETAILS RESPONSE ---
export interface BranchByIdResponse {
  branch: BranchDetails;
  owner: BranchOwner;
  subscription: Subscription;
  staff: BranchStaffItem[];
  customers: number;
}