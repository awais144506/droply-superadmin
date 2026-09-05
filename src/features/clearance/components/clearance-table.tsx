/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, CheckCircle2, Ban, Clock } from "lucide-react";
import { ClearanceEntity, ClearanceStatus } from "@/types/clearance";
import { Button } from "@/components/ui/button";

export function ClearanceTable({ clearances }: { clearances: ClearanceEntity[] }) {
  const router = useRouter();
  const [localClearances, setLocalClearances] = useState<ClearanceEntity[]>([]);
  
  useEffect(() => { setLocalClearances(clearances); }, [clearances]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ClearanceStatus>("PENDING");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

  const filtered = localClearances.filter((c) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      c.branchCode.toLowerCase().includes(searchLower) ||
      c.branchName.toLowerCase().includes(searchLower) || 
      c.referenceNo.toLowerCase().includes(searchLower);
      
    if (statusFilter !== "ALL") return matchesSearch && c.status === statusFilter;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: ClearanceStatus) => {
    switch(status) {
      case "PENDING": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100"><Clock className="h-3 w-3" /> Awaiting Review</span>;
      case "APPROVED": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><CheckCircle2 className="h-3 w-3" /> Cleared</span>;
      case "REJECTED": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100"><Ban className="h-3 w-3" /> Rejected</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text" placeholder="Search branch or reference No..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map(status => (
              <button 
                key={status} onClick={() => setStatusFilter(status)} 
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${statusFilter === status ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto min-h-100">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Branch</th>
              <th className="px-6 py-4 whitespace-nowrap">Payment Info</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Date Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((c) => (
              <tr 
                key={c.id} 
                onClick={() => router.push(`/manage/clearances/${c.id}`)}
                className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{c.branchCode}</span>
                  </div>
                  <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{c.branchName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">Rs {c.amount.toLocaleString()}</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">{c.method.replace("_", " ")} • Ref: {c.referenceNo}</p>
                </td>
                <td className="px-6 py-4">{getStatusBadge(c.status)}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-700">{new Date(c.submittedAt).toLocaleDateString()}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{new Date(c.submittedAt).toLocaleTimeString()}</p>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">No payment records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
          <p className="text-[11px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, filtered.length)}</span> of {filtered.length}
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