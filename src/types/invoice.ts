export type InvoiceStatus = "PAID" | "UNPAID" | "OVERDUE" | "VOID";
export type InvoiceType = "SUBSCRIPTION" | "SETUP_FEE" | "CUSTOM";

export interface InvoiceEntity {
  id: string;
  invoiceNo: string;
  branchCode: string;
  branchName: string;
  amount: number;
  type: InvoiceType;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}