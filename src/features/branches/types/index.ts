export type BranchStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED";

export interface Branch {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  city: string;
  activeUsers: number;
  maxUsersLimit: number;
  monthlyFee: number;
  status: BranchStatus;
  primaryIndustry: "WATER" | "LPG" | "DAIRY" | "OTHER";
  createdAt: string;
}