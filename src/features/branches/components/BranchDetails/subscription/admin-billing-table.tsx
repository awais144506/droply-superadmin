"use client";

import React, { useMemo, useCallback } from "react";
import { usePagination } from "@/lib/utils/functions/pagination-calculation";
import DataTable from "@/lib/utils/components/TableCreateMachine";
import TablePagination from "@/lib/utils/components/TablePagination";
import { SubscriptionPayment } from "@/features/branches/types/subscription";
import { getAdminBillingColumns } from "./admin-billing-columns";
import { useApprovePayment, useRejectPayment } from "@/features/branches/api/use-mutate-subscription";
import Loading from "@/app/loading";

type Props = {
    ledger: SubscriptionPayment[];
    branchId: string;
};

export default function AdminBillingTable({ ledger }: Props) {
    const { mutate: approvePayment, isPending: isApproving } = useApprovePayment();
    const { mutate: rejectPayment, isPending: isRejecting } = useRejectPayment();

    const {
        currentPage,
        totalPages,
        paginatedData,
        setCurrentPage,
        totalItems,
        itemsPerPage,
    } = usePagination(ledger);

    // Wrapped in useCallback for stable reference in useMemo
    const handleApprove = useCallback((paymentId: string) => {
        approvePayment(paymentId);
    }, [approvePayment]);

    const handleReject = useCallback((paymentId: string, remarks: string) => {
        rejectPayment({ paymentId, remarks });
    }, [rejectPayment]);

    const columns = useMemo(() => getAdminBillingColumns({
        onApprove: handleApprove,
        onReject: handleReject,
    }), [handleApprove, handleReject]);

    if (isApproving || isRejecting) {
        return <Loading text={isApproving ? "Approving payment & syncing access..." : "Rejecting payment..."} />;
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">

            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Verification Ledger</h3>
                <p className="text-sm text-slate-500 mt-1">Review branch payments, approve activations, or reject invalid receipts.</p>
            </div>

            <div className="w-full overflow-x-auto">
                <DataTable columns={columns} data={paginatedData} />
            </div>

            {(totalItems || 0) > 0 && (
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