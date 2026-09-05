// --- Shared Core Enums ---
export type IndustryVertical =
  | "WATER"
  | "LPG"
  | "DAIRY"
  | "COMMERCIAL_DISTRIBUTION";

export type BranchStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED";
export type SubscriptionCycle = "TRIAL" | "MONTHLY" | "YEARLY";
export type SubscriptionTier = "TRIAL" | "MONTHLY" | "YEARLY";
export type BranchUserRole = "OWNER" | "MANAGER" | "RIDER";
export type PaymentMethod = "BANK_TRANSFER" | "JAZZCASH" | "EASYPAISA" | "CASH";
export type InvoiceStatus = "PAID" | "PENDING" | "OVERDUE";
// --- Sub-Entities ---
export interface BranchUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: BranchUserRole;
  isActive: boolean;
  createdAt: string;
}

export interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  billingPeriod: string;
  paidAt: string;
  paymentMethod: PaymentMethod;
  status: InvoiceStatus;
  receiptUrl?: string;
}

export interface BranchSubscription {
  id: string;
  plan: SubscriptionCycle;
  monthlyFee: number | string; // For backend entity compatibility
  billingAmount?: number;      // For UI billing calculations
  currentPeriodStart: string;
  currentPeriodEnd: string;
  gracePeriodDays?: number;
  autoRenew?: boolean;
}

// --- Form & Creation DTO ---
export interface CreateBranchInput {
  name: string;
  industry: IndustryVertical;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  maxUsersLimit?: number;
  subscriptionPlan?: SubscriptionCycle;
  billingAmount?: number;
}

// --- Base Backend Branch Entity (Used in List Views & Queries) ---
export interface BranchEntity {
  id: string;
  status: BranchStatus;
  branchCode: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  maxUsersLimit: number;
  phone:string;
  email:string;
  owner: {
    phone: string;
    name: string;
    email: string;
    cnic:string;
  }
  subscription: {
    tier: SubscriptionTier
    cycle: SubscriptionCycle
    renewDate: Date
  }
  createdAt:Date
  updatedAt:Date
}

// --- Extended Branch Detail (Used in Single Branch Overview / Dashboard) ---
export interface BranchDetail extends BranchEntity {
  // Direct UI accessors (fallback if flat structure is accessed)
  subscriptionPlan?: SubscriptionCycle;
  billingAmount?: number;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  daysRemaining?: number;

  users?: BranchUser[];
  invoices?: PaymentInvoice[];

  metrics?: {
    totalCustomers: number;
    totalOrdersDelivered: number;
    activeAssetsInCirculation: number;
  };
}