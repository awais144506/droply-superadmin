"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Loader2, AlertCircle, Building2, CreditCard } from "lucide-react";
import { useAdminBranchHistory } from "@/features/branches/api/use-subscription";
import AdminBillingTable from "@/features/branches/components/BranchDetails/subscription/admin-billing-table";

export default function SubscriptionPage() {
    const params = useParams();
    const branchId = params.branchId as string;

    const { data, isLoading, isError } = useAdminBranchHistory(branchId);

    const branch = data?.branch;
    const subscription = data?.subscription;
    const payments = data?.payments
    // --- LOADING STATE ---
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
                <p className="text-sm font-medium text-slate-500">Loading branch details...</p>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-2xl border border-slate-200">
                <AlertCircle className="w-10 h-10 text-rose-500 mb-4" />
                <p className="text-base font-bold text-slate-900">Failed to load data</p>
                <p className="text-sm font-medium text-slate-500 mt-1">Could not fetch subscription history.</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-6 bg-slate-50 min-h-screen">

            {/* --- PAGE HEADER --- */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                        {branch?.name || "Unknown Branch"}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        Manage active subscription and review payment ledger.
                    </p>
                </div>
            </div>

            {/* --- TOP ROW: CURRENT PLAN DETAILS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Active Subscription Card (Placeholder for now) */}
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Current Plan</h3>

                    {subscription ? (
                        <div>
                            <p className="text-2xl font-black text-slate-900 uppercase">
                                {subscription.tier}
                            </p>
                            <p className="text-sm font-bold text-slate-500 uppercase mt-0.5">
                                {subscription.cycle}
                            </p>

                            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Renews On</span>
                                    <span className="font-bold text-slate-900">
                                        {new Date(subscription.renewDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center text-slate-400 text-sm">
                            No active subscription found.
                        </div>
                    )}
                </div>

                {/* Quick Stats or Actions (Spans remaining columns) */}
                <div className="lg:col-span-2 bg-linear-to-br from-indigo-900 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm text-white flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold">Total Payments</h3>
                    </div>
                    <p className="text-4xl font-black">
                        {payments?.length || 0}
                    </p>
                    <p className="text-sm text-slate-400 mt-2 font-medium">
                        Pending verification: {payments?.filter((p: any) => p.status === 'PENDING').length || 0}
                    </p>
                </div>
            </div>

            {/* --- BOTTOM ROW: THE LEDGER TABLE --- */}
            <div className="mt-8">
                <AdminBillingTable ledger={payments || []} branchId={branchId} />
                <div className="bg-white border border-slate-200 rounded-2xl h-64 flex items-center justify-center text-slate-400 border-dashed">
                    Billing Table goes here
                </div>
            </div>

        </div>
    );
}