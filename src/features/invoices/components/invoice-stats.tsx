"use client";

import { Receipt, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { InvoiceEntity } from "@/types/invoice";

export function InvoiceStats({ invoices }: { invoices: InvoiceEntity[] }) {
  const unpaid = invoices.filter(i => i.status === "UNPAID");
  const overdue = invoices.filter(i => i.status === "OVERDUE");
  const paidThisMonth = invoices.filter(i => i.status === "PAID");

  const unpaidAmount = unpaid.reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = overdue.reduce((sum, i) => sum + i.amount, 0);
  const collectedAmount = paidThisMonth.reduce((sum, i) => sum + i.amount, 0);
  
  const formatCurrency = (val: number) => `Rs ${val.toLocaleString("en-PK")}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Collected (Month)</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(collectedAmount)}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Outstanding</p>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(unpaidAmount)}</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Clock className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Overdue Amount</p>
          <p className="text-2xl font-bold text-rose-600">{formatCurrency(overdueAmount)}</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><AlertCircle className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-slate-900">{invoices.length}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Receipt className="h-5 w-5" /></div>
      </div>
    </div>
  );
}