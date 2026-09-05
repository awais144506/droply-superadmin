/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, ArrowRight, Activity, ShieldAlert, Ban, Clock, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { BranchDetail, BranchStatus, SubscriptionPlan } from "@/types/branch";
import { Button } from "@/components/ui/button";

type FilterStatus = "ALL" | BranchStatus;

export function BranchTable({ branches, onCreateClick }: { branches: BranchDetail[], onCreateClick: () => void }) {
  const router = useRouter();
  const [localBranches, setLocalBranches] = useState<BranchDetail[]>([]);
  useEffect(() => { setLocalBranches(branches); }, [branches]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

  const filteredBranches = localBranches.filter((b) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(searchLower) ||
      b.city.toLowerCase().includes(searchLower) ||
      b.ownerName.toLowerCase().includes(searchLower) ||
      b.ownerPhone.includes(searchLower);

    if (statusFilter !== "ALL") return matchesSearch && b.status === statusFilter;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBranches = filteredBranches.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: BranchStatus) => {
    switch (status) {
      case "ACTIVE": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><Activity className="h-3 w-3" /> Active</span>;
      case "PAST_DUE": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100"><ShieldAlert className="h-3 w-3" /> Past Due</span>;
      case "SUSPENDED": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200"><Ban className="h-3 w-3" /> Disabled</span>;
    }
  };

  const getPlanBadge = (plan: SubscriptionPlan) => {
    switch (plan) {
      case "TRIAL": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100"><Clock className="h-3 w-3" /> Trial</span>;
      case "MONTHLY": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">Monthly</span>;
      case "YEARLY": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">Yearly</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text" placeholder="Search branch, owner, or phone..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
            {(["ALL", "ACTIVE", "PAST_DUE", "DISABLED"] as const).map(status => (
              <button
                key={status} onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${statusFilter === status ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={onCreateClick} className="bg-sky-600 hover:bg-sky-700 text-white h-10 px-4 rounded-xl text-xs font-bold cursor-pointer shrink-0">
          <Plus className="h-4 w-4 mr-1.5" /> Provision Branch
        </Button>
      </div>

      <div className="overflow-x-auto min-h-100">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Branch & City</th>
              <th className="px-6 py-4 whitespace-nowrap">Owner Details</th>
              <th className="px-6 py-4 whitespace-nowrap">Subscription</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedBranches.map((branch) => (
              <tr key={branch.id} className={`transition-colors group ${branch.status === "SUSPENDED" ? "bg-slate-50/50 opacity-75" : "hover:bg-slate-50/50"}`}>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{branch.name}</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">{branch.city}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{branch.ownerName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{branch.ownerPhone} • {branch.ownerEmail}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 items-start">
                    {getPlanBadge(branch.subscription)}
                    <span className="text-[10px] font-medium text-slate-400 mt-1">{branch.daysRemaining} Days Left</span>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(branch.status)}</td>
              </tr>
            ))}
            {filteredBranches.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">No branches match your search criteria.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
          <p className="text-[11px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, filteredBranches.length)}</span> of {filteredBranches.length}
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