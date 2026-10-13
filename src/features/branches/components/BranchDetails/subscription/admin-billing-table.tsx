"use client";

import React, { useMemo } from "react";
import { usePagination } from "@/lib/utils/functions/pagination-calculation";
import DataTable from "@/lib/utils/components/TableCreateMachine";
import TablePagination from "@/lib/utils/components/TablePagination";
import { SubscriptionPayment } from "@/features/branches/types/subscription";
import { getAdminBillingColumns } from "./admin-billing-columns";
import { toast } from "sonner"; // Or react-hot-toast

type Props = {
    ledger: SubscriptionPayment[];
    branchId: string;
};

export default function AdminBillingTable({ ledger, branchId }: Props) {
    const {
        currentPage,
        totalPages,
        paginatedData,
        setCurrentPage,
        totalItems,
        itemsPerPage,
    } = usePagination(ledger);

    // --- MUTATION PLACEHOLDERS ---
    // We will hook these up to React Query next
    const handleApprove = async (paymentId: string) => {
        console.log("Approving payment:", paymentId, "for branch:", branchId);
        toast.success("Payment approved. Subscription updated.");
    };

    const handleReject = async (paymentId: string, remarks: string) => {
        console.log("Rejecting payment:", paymentId, "Remarks:", remarks);
        toast.error("Payment rejected with remarks.");
    };

    const columns = useMemo(() => getAdminBillingColumns({
        onApprove: handleApprove,
        onReject: handleReject
    }), [branchId]);

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Verification Ledger</h3>
                <p className="text-sm text-slate-500 mt-1">Review branch payments, approve activations, or reject invalid receipts.</p>
            </div>

            <div className="w-full overflow-x-auto">
                <DataTable columns={columns} data={paginatedData} />
            </div>

            {ledger.length === 0 && (
                <div className="p-12 text-center flex flex-col items-center justify-center">
                    <p className="text-sm font-medium text-slate-500">No payment history found for this branch.</p>
                </div>
            )}

            {ledger.length > 0 && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            )}
        </div>
    );
}