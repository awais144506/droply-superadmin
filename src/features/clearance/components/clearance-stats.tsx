"use client";

import { Clock, CheckCircle2, ShieldAlert, Wallet } from "lucide-react";
import { ClearanceEntity } from "@/types/clearance";

export function ClearanceStats({ clearances }: { clearances: ClearanceEntity[] }) {
  const pending = clearances.filter(c => c.status === "PENDING");
  const approved = clearances.filter(c => c.status === "APPROVED");
  const rejected = clearances.filter(c => c.status === "REJECTED");
  
  const pendingAmount = pending.reduce((sum, c) => sum + c.amount, 0);
  const formatCurrency = (val: number) => `Rs ${val.toLocaleString("en-PK")}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Awaiting Review</p>
          <p className="text-2xl font-bold text-amber-600">{pending.length}</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><Clock className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Value</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(pendingAmount)}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Wallet className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Cleared Recently</p>
          <p className="text-2xl font-bold text-emerald-600">{approved.length}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Rejected</p>
          <p className="text-2xl font-bold text-rose-600">{rejected.length}</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><ShieldAlert className="h-5 w-5" /></div>
      </div>
    </div>
  );
}