"use client";

import { Building2, CheckCircle2, ShieldAlert, Ban } from "lucide-react";
import { Loader2 } from "lucide-react";

interface BranchStatsProps {
  stats?: {
    total: number;
    active: number;
    pastDue: number;
    suspended: number;
  };
  isLoading?: boolean;
}

export function SubscriptionStats({ stats, isLoading }: BranchStatsProps) {
  const data = stats || { total: 0, active: 0, pastDue: 0, suspended: 0 };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
 

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active</p>
          <p className="text-2xl font-bold text-emerald-600">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-400" /> : data.active}
          </p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Past Due</p>
          <p className="text-2xl font-bold text-orange-600">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-400" /> : data.pastDue}
          </p>
        </div>
        <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><ShieldAlert className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Suspended</p>
          <p className="text-2xl font-bold text-rose-600">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-400" /> : data.suspended}
          </p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><Ban className="h-5 w-5" /></div>
      </div>
    </div>
  );
}