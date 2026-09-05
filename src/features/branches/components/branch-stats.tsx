"use client";

import { Building2, CheckCircle2, ShieldAlert, Ban } from "lucide-react";
import { BranchEntity } from "@/types/branch";

export function BranchStats({ branches }: { branches: BranchEntity[] }) {
  const activeCount = branches.filter(b => b.status === "ACTIVE").length;
  const pastDueCount = branches.filter(b => b.status === "PAST_DUE").length;
  const totalUsers = branches.reduce((acc, b) => acc + (b.currentUsers || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Branches</p>
          <p className="text-2xl font-bold text-slate-900">{branches.length}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Building2 className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Tenants</p>
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Past Due</p>
          <p className="text-2xl font-bold text-rose-600">{pastDueCount}</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><ShieldAlert className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Disabled</p>
          <p className="text-2xl font-bold text-rose-600">{totalUsers}</p>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl text-rose-600"><Ban className="h-5 w-5" /></div>
      </div>
    </div>
  );
}