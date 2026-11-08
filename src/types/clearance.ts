export type ClearanceStatus = "PENDING" | "APPROVED" | "REJECTED";
export type PaymentMethod = "BANK_TRANSFER" | "EASYPAISA" | "JAZZCASH" | "CASH";

export interface ClearanceEntity {
  id: string;
  branchCode: string;
  branchName: string;
  amount: number;
  method: PaymentMethod;
  referenceNo: string;
  submittedAt: string;
  status: ClearanceStatus;
  proofImageUrl?: string; // Optional: For bank deposit slips
}