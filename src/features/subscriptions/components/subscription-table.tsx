/* eslint-disable react-hooks/purity */
"use client";

import { Search, ShieldAlert, Ban, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BranchEntity, BranchStatus } from "@/types/branch";
import { useRouter } from "next/navigation";
interface SubscriptionTableProps {
    branches: BranchEntity[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    searchQuery: string;
    onSearchChange: (search: string) => void;
    statusFilter: "ALL" | BranchStatus;
    onStatusChange: (status: "ALL" | BranchStatus) => void;
    isLoading: boolean;
    isError: boolean;
    error?: string;
}

export function SubscriptionTable({
    branches,
    totalCount,
    currentPage,
    totalPages,
    onPageChange,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
    isLoading,
    isError,
    error,
}: SubscriptionTableProps) {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const router = useRouter();

    const getStatusBadge = (status: BranchStatus) => {
        switch (status) {
            case "ACTIVE":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <Check className="h-3 w-3" /> Active
                    </span>
                );
            case "PAST_DUE":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        <ShieldAlert className="h-3 w-3" /> Past Due
                    </span>
                );
            case "SUSPENDED":
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        <Ban className="h-3 w-3" /> Suspended
                    </span>
                );
            default:
                return null;
        }
    };

    const getTierBadge = (tier?: string) => {
        switch (tier) {
            case "SILVER":
                return <span className="text-[10px] font-bold text-slate-500">Silver</span>;
            case "GOLD":
                return <span className="text-[10px] font-bold text-amber-600">Gold</span>;
            case "PLATINUM":
                return <span className="text-[10px] font-bold text-indigo-600">Platinum</span>;
            default:
                return <span className="text-[10px] font-bold text-slate-500">{tier || "TRIAL"}</span>;
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {/* Filters & Search */}
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search branch or owner..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
                        {(["ALL", "ACTIVE", "PAST_DUE", "SUSPENDED"] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => onStatusChange(status as "ALL" | BranchStatus)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${statusFilter === status
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {status.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-100 relative">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Branch Code</th>
                            <th className="px-6 py-4 whitespace-nowrap">Tenant Identity</th>
                            <th className="px-6 py-4 whitespace-nowrap">Plan & Cycle</th>
                            <th className="px-6 py-4 whitespace-nowrap">Status</th>
                            <th className="px-6 py-4 whitespace-nowrap">Renew Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                        <Loader2 className="h-6 w-6 animate-spin mb-2" />
                                        <p className="text-sm">Loading subscriptions...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-destructive text-sm">
                                    {error || "Failed to load subscriptions."}
                                </td>
                            </tr>
                        ) : branches.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                                    No subscriptions match your search criteria.
                                </td>
                            </tr>
                        ) : (
                            branches.map((branch) => {
                                const sub = branch.subscription;
                                const renewDate = sub?.renewDate ? new Date(sub.renewDate) : null;
                                const daysLeft = renewDate
                                    ? Math.max(0, Math.ceil((renewDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                                    : null;

                                return (
                                    <tr
                                        key={branch.id}
                                        onClick={() => router.push(`/manage/subscriptions/${branch.id}`)}
                                        className={`transition-colors group cursor-pointer ${branch.status === "SUSPENDED" ? "bg-slate-50/50" : "hover:bg-slate-50/50"
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-600 px-1.5 py-0.5 rounded uppercase">
                                                {branch.branchCode}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className="font-bold text-slate-900">{branch.name}</p>
                                            </div>
                                            <p className="text-[11px] text-slate-500 mt-1 truncate max-w-50" title={branch.address}>
                                                {branch.address.split(",")[0]} • <span className="font-semibold text-slate-700">{branch.owner?.name || "N/A"}</span>
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 items-start">
                                                {getTierBadge(sub?.tier)}
                                                <span className="text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded">
                                                    {sub?.cycle || "TRIAL"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getStatusBadge(branch.status)}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-700">
                                                {renewDate ? renewDate.toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }) : "N/A"}
                                            </p>
                                            {daysLeft !== null && (
                                                <p className="text-[11px] text-slate-500 mt-1">
                                                    Days Left:{" "}
                                                    <span className={`text-sm font-black ${daysLeft < 7 ? "text-rose-600" : "text-emerald-600"}`}>
                                                        {daysLeft}
                                                    </span>
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Server-Side Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
                    <p className="text-[11px] font-medium text-slate-500">
                        Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to{" "}
                        <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, totalCount)}</span> of{" "}
                        {totalCount}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="h-8 rounded-lg text-xs bg-white cursor-pointer"
                        >
                            Prev
                        </Button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => onPageChange(i + 1)}
                                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${currentPage === i + 1
                                    ? "bg-sky-600 text-white shadow-sm"
                                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 rounded-lg text-xs bg-white cursor-pointer"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}