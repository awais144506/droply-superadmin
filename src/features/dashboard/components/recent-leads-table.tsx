"use client";

import { useState } from "react";
import { Megaphone, Phone, Calendar, CheckCircle2, Ban, Loader2 } from "lucide-react";
import { useWebsiteLeads, useUpdateLeadStatus, LeadStatus, WebsiteLead } from "@/features/dashboard/api/use-leads";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RecentLeadsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 1. Fetch data directly from your backend via TanStack Query
  const { data: leads = [], isLoading } = useWebsiteLeads();
  const { mutate: updateStatus, isPending } = useUpdateLeadStatus();

  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLeads = leads.slice(startIndex, startIndex + itemsPerPage);

  const handleUpdateStatus = (id: string, newStatus: LeadStatus) => {
    updateStatus(
      { id, status: newStatus },
      {
        onSuccess: () => toast.success(`Lead status updated to ${newStatus}`),
        onError: (err: any) => toast.error(err?.response?.data?.message || "Failed to update lead status"),
      }
    );
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "NEW": return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">New Request</span>;
      case "CONTACTED": return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">Contacted</span>;
      case "MEETING": return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">Meeting Set</span>;
      case "DONE": return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Converted</span>;
      case "REJECTED": return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">Rejected</span>;
    }
  };

  const getActionButton = (lead: WebsiteLead) => {
    switch (lead.status) {
      case "NEW":
        return (
          <Button disabled={isPending} onClick={() => handleUpdateStatus(lead.id, "CONTACTED")} size="sm" className="h-7 text-[10px] font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 shadow-none cursor-pointer">
            <Phone className="h-3 w-3 mr-1" /> Contact
          </Button>
        );
      case "CONTACTED":
        return (
          <Button disabled={isPending} onClick={() => handleUpdateStatus(lead.id, "MEETING")} size="sm" className="h-7 text-[10px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 shadow-none cursor-pointer">
            <Calendar className="h-3 w-3 mr-1" /> Meeting
          </Button>
        );
      case "MEETING":
        return (
          <Button disabled={isPending} onClick={() => handleUpdateStatus(lead.id, "DONE")} size="sm" className="h-7 text-[10px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-none cursor-pointer">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Done
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-sky-600" /> Lead Pipeline
        </h3>
        <p className="text-xs text-slate-500 mt-1">Manage public website inquiries directly.</p>
      </div>

      <div className="overflow-x-auto flex-1 min-h-62.5">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 whitespace-nowrap">Business</th>
              <th className="px-6 py-3 whitespace-nowrap">Contact</th>
              <th className="px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Loader2 className="h-6 w-6 animate-spin mb-2" />
                    <p className="text-sm">Loading leads...</p>
                  </div>
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm">
                  No leads in the pipeline.
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr key={lead.id} className={`transition-colors ${lead.status === "REJECTED" ? "bg-slate-50/50 opacity-60" : "hover:bg-slate-50/50"}`}>
                  <td className="px-6 py-3">
                    <p className={`font-bold ${lead.status === "REJECTED" ? "text-slate-500 line-through" : "text-slate-900"}`}>{lead.businessName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{new Date(lead.date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-3">
                    <p className="font-medium text-slate-700">{lead.contactName}</p>
                    <p className="text-[10px] text-slate-400">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-3">{getStatusBadge(lead.status)}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {getActionButton(lead)}
                      
                      {/* Only show reject option if the lead is actively in the pipeline */}
                      {["NEW", "CONTACTED", "MEETING"].includes(lead.status) && (
                        <Button 
                          onClick={() => handleUpdateStatus(lead.id, "REJECTED")} 
                          variant="ghost" 
                          size="icon-sm" 
                          disabled={isPending}
                          className="h-7 w-7 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Ban className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] font-medium text-slate-500">Page {currentPage} of {totalPages}</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-7 px-2 text-[10px] bg-white cursor-pointer">Prev</Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-7 px-2 text-[10px] bg-white cursor-pointer">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}