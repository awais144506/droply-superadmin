"use client";
import { useParams } from "next/navigation";
import { CreditCard } from "lucide-react";
import { useAdminBranchHistory } from "@/features/branches/api/use-subscription";
import AdminBillingTable from "@/features/branches/components/BranchDetails/subscription/admin-billing-table";
import Loading from "@/app/loading";
import ErrorBoundary from "@/app/error";
import MainPageHeader from "@/lib/utils/components/MainPageHeader";

export default function SubscriptionPage() {
    const params = useParams();
    const branchId = params.branchId as string;

    const { data, isLoading, isError, error, refetch, isRefetching } = useAdminBranchHistory(branchId);

    const branch = data?.branch;
    const subscription = data?.subscription;
    const payments = data?.payments
    if (isLoading) return <Loading text="Loading Subscription..." />
    if (isError) return <ErrorBoundary error={error.message} />

    return (
        <div className="p-4 sm:p-6 space-y-6 min-h-screen">
            <MainPageHeader
                heading={`${branch?.name}` || "Unknow"}
                description="Manage active subscription and review payment ledger."
                onRefresh={refetch}
                isRefreshing={isRefetching}
                breadcrumbs={[
                    { label: "Branches", href: "/manage/branches" },
                    { label: branch?.name || "Branch Details", href: `/manage/branches/${branchId}` },
                    { label: "Subscription & Ledger", href: `/manage/branches/${branchId}/subscription` },
                ]}
            />
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
                    <p className="text-lg text-amber-400 mt-2 font-semibold">
                        Pending verification: {payments?.filter((p) => p.status === 'PENDING').length || 0}
                    </p>
                </div>
            </div>

            {/* --- BOTTOM ROW: THE LEDGER TABLE --- */}
            <div className="mt-8">
                <AdminBillingTable ledger={payments || []} branchId={branchId} />
            </div>

        </div>
    );
}