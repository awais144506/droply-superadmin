import { useQuery } from "@tanstack/react-query";
import { InvoiceEntity } from "@/types/invoice";

export function useInvoices() {
  return useQuery({
    queryKey: ["invoices", "list"],
    queryFn: async (): Promise<InvoiceEntity[]> => {
      return [
        { id: "inv_1", invoiceNo: "INV-2026-0901", branchCode: "B-001", branchName: "Droply Main", amount: 120000, type: "SUBSCRIPTION", status: "PAID", issueDate: "2026-09-01", dueDate: "2026-09-05" },
        { id: "inv_2", invoiceNo: "INV-2026-0902", branchCode: "B-004", branchName: "Blue Springs", amount: 15000, type: "SUBSCRIPTION", status: "OVERDUE", issueDate: "2026-08-25", dueDate: "2026-09-01" },
        { id: "inv_3", invoiceNo: "INV-2026-0903", branchCode: "B-002", branchName: "Aqua Pure", amount: 25000, type: "SETUP_FEE", status: "UNPAID", issueDate: "2026-09-03", dueDate: "2026-09-10" },
        { id: "inv_4", invoiceNo: "INV-2026-0904", branchCode: "B-005", branchName: "Crystal Water", amount: 60000, type: "SUBSCRIPTION", status: "OVERDUE", issueDate: "2026-08-15", dueDate: "2026-08-22" },
        { id: "inv_5", invoiceNo: "INV-2026-0905", branchCode: "B-006", branchName: "Pure Flow", amount: 15000, type: "SUBSCRIPTION", status: "PAID", issueDate: "2026-09-04", dueDate: "2026-09-11" },
      ];
    },
  });
}