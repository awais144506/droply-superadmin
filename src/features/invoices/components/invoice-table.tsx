"use client";

import { useState, useEffect } from "react";
import { Search, Download, CheckCircle2, Clock, AlertCircle, Ban, Send } from "lucide-react";
import { InvoiceEntity, InvoiceStatus } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function InvoiceTable({ invoices }: { invoices: InvoiceEntity[] }) {
  const [localInvoices, setLocalInvoices] = useState<InvoiceEntity[]>([]);
  useEffect(() => { setLocalInvoices(invoices); }, [invoices]);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | InvoiceStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

  const filtered = localInvoices.filter((inv) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchLower) ||
      inv.branchName.toLowerCase().includes(searchLower) ||
      inv.branchCode.toLowerCase().includes(searchLower);

    if (statusFilter !== "ALL") return matchesSearch && inv.status === statusFilter;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "PAID": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><CheckCircle2 className="h-3 w-3" /> Paid</span>;
      case "UNPAID": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100"><Clock className="h-3 w-3" /> Unpaid</span>;
      case "OVERDUE": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100"><AlertCircle className="h-3 w-3" /> Overdue</span>;
      case "VOID": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200"><Ban className="h-3 w-3" /> Void</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text" placeholder="Search invoice No or branch..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
            {(["ALL", "PAID", "UNPAID", "OVERDUE"] as const).map(status => (
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

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Invoice & Tenant</th>
              <th className="px-6 py-4 whitespace-nowrap">Amount & Type</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Issue / Due Date</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{inv.invoiceNo}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{inv.branchCode}</span>
                    <span className="text-[11px] font-medium text-slate-500">{inv.branchName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">Rs {inv.amount.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded w-max mt-1">{inv.type.replace("_", " ")}</p>
                </td>
                <td className="px-6 py-4">{getStatusBadge(inv.status)}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-700 text-[11px]">Issued: {new Date(inv.issueDate).toLocaleDateString()}</p>
                  <p className={`text-[11px] font-bold mt-0.5 ${inv.status === "OVERDUE" ? "text-rose-600" : "text-slate-400"}`}>Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {["UNPAID", "OVERDUE"].includes(inv.status) && (
                      <Button onClick={() => toast.success("Payment reminder sent to branch owner.")} variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-sky-600 hover:bg-sky-50 cursor-pointer shadow-none">
                        <Send className="h-3 w-3 mr-1" /> Remind
                      </Button>
                    )}
                    <Button
                      onClick={() => router.push(`/manage/invoices/${inv.id}`)}
                      variant="outline"
                      size="sm"
                      className="h-8 text-[10px] font-bold cursor-pointer"
                    >
                      <Download className="h-3 w-3 mr-1" /> PDF
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">No invoices found.</td></tr>
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