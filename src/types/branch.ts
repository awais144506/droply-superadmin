export type IndustryVertical = "WATER" | "LPG" | "DAIRY" | "COMMERCIAL_DISTRIBUTION";
export type BranchStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "ARCHIVED";
export type SubscriptionPlan = "TRIAL" | "MONTHLY" | "YEARLY";

export interface CreateBranchInput {
  name: string;
  industry: IndustryVertical;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  subscriptionPlan: SubscriptionPlan;
  monthlyFee: number;
  maxUsersLimit: number;
}

export interface BranchEntity {
  id: string;
  slug: string;
  name: string;
  industry: IndustryVertical;
  status: BranchStatus;
  address: string;
  city: string;
  latitude: string | number;
  longitude: string | number;
  phone: string;
  email: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  maxUsersLimit: number;
  createdAt: string;
  subscription?: {
    id: string;
    plan: SubscriptionPlan;
    monthlyFee: string | number;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    gracePeriodDays: number;
    autoRenew: boolean;
  };
  _count?: {
    invoices: number;
  };
}