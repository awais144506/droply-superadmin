"use client";

import { useState, useEffect } from "react";
import { Search, Reply, AlertCircle, Clock, CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { TicketEntity, TicketStatus, TicketPriority } from "@/types/ticket";
import { Button } from "@/components/ui/button";

export function TicketTable({ tickets }: { tickets: TicketEntity[] }) {
  const router = useRouter();
  const [localTickets, setLocalTickets] = useState<TicketEntity[]>([]);
  useEffect(() => { setLocalTickets(tickets); }, [tickets]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTION_NEEDED" | "RESOLVED">("ACTION_NEEDED");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

  const filtered = localTickets.filter((t) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      t.ticketNo.toLowerCase().includes(searchLower) ||
      t.subject.toLowerCase().includes(searchLower) ||
      t.branchName.toLowerCase().includes(searchLower);
      
    if (statusFilter === "ACTION_NEEDED") return matchesSearch && ["OPEN", "IN_PROGRESS"].includes(t.status);
    if (statusFilter === "RESOLVED") return matchesSearch && ["RESOLVED", "CLOSED"].includes(t.status);
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getPriorityBadge = (priority: TicketPriority) => {
    switch(priority) {
      case "LOW": return <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Low</span>;
      case "MEDIUM": return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Medium</span>;
      case "HIGH": return <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1"><AlertCircle className="h-3 w-3" /> High</span>;
      case "URGENT": return <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse"><AlertCircle className="h-3 w-3" /> Urgent</span>;
    }
  };

  const getStatusIcon = (status: TicketStatus) => {
    switch(status) {
      case "OPEN": return <Circle className="h-4 w-4 text-sky-500" fill="currentColor" />;
      case "IN_PROGRESS": return <Clock className="h-4 w-4 text-amber-500" />;
      case "RESOLVED": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "CLOSED": return <CheckCircle2 className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text" placeholder="Search subject or ticket No..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
            {(["ALL", "ACTION_NEEDED", "RESOLVED"] as const).map(status => (
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

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Ticket & Tenant</th>
              <th className="px-6 py-4 whitespace-nowrap">Subject</th>
              <th className="px-6 py-4 whitespace-nowrap">Priority</th>
              <th className="px-6 py-4 whitespace-nowrap">Last Updated</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(t.status)}
                    <span className="font-bold text-slate-900">{t.ticketNo}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 ml-6">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{t.branchCode}</span>
                    <span className="text-[11px] font-medium text-slate-500">{t.branchName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[250px]">
                  <p className="font-medium text-slate-800 truncate" title={t.subject}>{t.subject}</p>
                </td>
                <td className="px-6 py-4">{getPriorityBadge(t.priority)}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-700 text-[11px]">{new Date(t.lastUpdated).toLocaleDateString()}</p>
                  <p className="text-[10px] text-slate-400">{new Date(t.lastUpdated).toLocaleTimeString()}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    onClick={() => router.push(`/manage/tickets/${t.id}`)}
                    className="bg-slate-900 hover:bg-slate-800 text-white h-8 px-3 rounded-lg text-[10px] font-bold shadow-sm cursor-pointer transition-all active:scale-95"
                  >
                    {t.status === "OPEN" || t.status === "IN_PROGRESS" ? (
                      <><Reply className="h-3 w-3 mr-1" /> Respond</>
                    ) : (
                      "View Thread"
                    )}
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">No support tickets found.</td></tr>
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