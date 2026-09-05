/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Search, Settings2, ShieldAlert, Ban, Check } from "lucide-react";
import { SubscriptionEntity, SubscriptionStatus, SubscriptionTier } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SubscriptionTable({ subscriptions }: { subscriptions: SubscriptionEntity[] }) {
    const [localSubs, setLocalSubs] = useState<SubscriptionEntity[]>([]);
    useEffect(() => { setLocalSubs(subscriptions); }, [subscriptions]);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | SubscriptionStatus>("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

    const filteredSubs = localSubs.filter((sub) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            sub.branchCode.toLowerCase().includes(searchLower) ||
            sub.branchName.toLowerCase().includes(searchLower) ||
            sub.ownerName.toLowerCase().includes(searchLower);

        if (statusFilter !== "ALL") return matchesSearch && sub.status === statusFilter;
        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredSubs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSubs = filteredSubs.slice(startIndex, startIndex + itemsPerPage);

    const getStatusBadge = (status: SubscriptionStatus) => {
        switch (status) {
            case "ACTIVE": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><Check className="h-3 w-3" /> Active</span>;
            case "PAST_DUE": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100"><ShieldAlert className="h-3 w-3" /> Past Due</span>;
            case "SUSPENDED": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100"><Ban className="h-3 w-3" /> Suspended</span>;
        }
    };

    const getTierBadge = (tier: SubscriptionTier) => {
        switch (tier) {
            case "SILVER": return <span className="text-[10px] font-bold text-slate-500">Silver</span>;
            case "GOLD": return <span className="text-[10px] font-bold text-amber-600">Gold</span>;
            case "PLATINUM": return <span className="text-[10px] font-bold text-indigo-600">Platinum</span>;
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text" placeholder="Search code, branch, or owner..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
                        {(["ALL", "ACTIVE", "PAST_DUE", "SUSPENDED"] as const).map(status => (
                            <button
                                key={status} onClick={() => setStatusFilter(status)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${statusFilter === status ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                {status.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto min-h-100">
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
                        {paginatedSubs.map((sub) => (
                            <tr key={sub.id} className={`transition-colors group ${sub.status === "SUSPENDED" ? "bg-slate-50/50 opacity-75" : "hover:bg-slate-50/50"}`}>
                                <td className="px-6 py-4">
                                    <span className=" font-bold text-slate-600 px-1.5 py-0.5 rounded">{sub.branchCode}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 mb-0.5">

                                        <p className="font-bold text-slate-900">{sub.branchName}</p>
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-1">{sub.city} • <span className="font-semibold text-slate-700">{sub.ownerName}</span></p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 items-start">
                                        {getTierBadge(sub.tier)}
                                        <span className="text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded">{sub.cycle}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-slate-700">{new Date(sub.renewDate).toLocaleDateString()}</p>
                                    <p className="text-[11px] text-slate-500 mt-1">Days Left: <span className="text-[10px] font-black text-rose-600">20</span></p>
                                </td>
                            </tr>
                        ))}
                        {filteredSubs.length === 0 && (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">No subscriptions match your search criteria.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
                    <p className="text-[11px] font-medium text-slate-500">
                        Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, filteredSubs.length)}</span> of {filteredSubs.length}
                    </p>
                    <div className="flex items-center gap-1.5">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 rounded-lg text-xs bg-white cursor-pointer">Prev</Button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${currentPage === i + 1 ? "bg-sky-600 text-white shadow-sm" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"}`}>
                                {i + 1}
                            </button>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 rounded-lg text-xs bg-white cursor-pointer">Next</Button>
                    </div>
                </div>
            )}
        </div>
    );
}