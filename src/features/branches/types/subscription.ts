export type SubscriptionCycle = "TRIAL" | "MONTHLY" | "YEARLY"
export type SubscriptionTier = "SILVER" | "GOLD" | "PLATINUM"
export type SubscriptionPaymentType = "BANK" | "JAZZ_CASH" | "EASY_PAISA" | "OTHER"
export type SubscriptionPaymentStatus = "PENDING" | "APPROVED" | "REJECTED"
export interface Subscription {
    id: string;
    cycle: SubscriptionCycle;
    tier: SubscriptionTier;
    renewDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubscriptionPayment {
    id: string;
    amountPaid: number;
    tier: SubscriptionTier;
    cycle: SubscriptionCycle;
    type: SubscriptionPayment;
    status: SubscriptionPaymentStatus;
    transactionId: string;
    imageUrl: string;
    remarks: string;
    isRenewal: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Branch {
    id: string;
    name: string;
}

export interface ApiResponse {
    branch: Branch;
    subscription: Subscription;
    payments: SubscriptionPayment[];
}