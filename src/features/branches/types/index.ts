export type BranchStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED";
export type IndustryType = "WATER" | "GAS" | "OTHER";
export type SubscriptionPlan = "TRIAL" | "MONTHLY" | "YEARLY";

export interface BranchUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "OWNER" | "MANAGER" | "RIDER";
  isActive: boolean;
  createdAt: string;
}

export interface PaymentInvoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  billingPeriod: string;
  paidAt: string;
  paymentMethod: "BANK_TRANSFER" | "JAZZCASH" | "EASYPAISA" | "CASH";
  status: "PAID" | "PENDING" | "OVERDUE";
  receiptUrl?: string;
}

export interface BranchDetail {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  industry: IndustryType;
  status: BranchStatus;
  
  // Owner Details
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;

  // Subscription Info
  subscriptionPlan: SubscriptionPlan;
  monthlyFee: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  daysRemaining: number;
  maxUsersLimit: number;

  // Nested Collections
  users: BranchUser[];
  invoices: PaymentInvoice[];
  
  // High-level operational stats
  metrics: {
    totalCustomers: number;
    totalOrdersDelivered: number;
    activeAssetsInCirculation: number;
  };
}