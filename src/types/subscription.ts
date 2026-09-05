export type SubscriptionStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED";
export type SubscriptionCycle = "TRIAL" | "MONTHLY" | "YEARLY";
export type SubscriptionTier = "SILVER" | "GOLD" | "PLATINUM";

export interface SubscriptionEntity {
  id: string;
  branchCode: string;
  branchName: string;
  city: string;
  ownerName: string;
  cycle: SubscriptionCycle;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  renewDate: string;
}