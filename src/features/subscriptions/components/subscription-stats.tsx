"use client";

import { CreditCard, AlertCircle, Ban, RefreshCw } from "lucide-react";
import { SubscriptionEntity } from "@/types/subscription";

export function SubscriptionStats({ subscriptions }: { subscriptions: SubscriptionEntity[] }) {
  const active = subscriptions.filter(s => s.status === "ACTIVE").length;
  const pastDue = subscriptions.filter(s => s.status === "PAST_DUE").length;
  const suspended = subscriptions.filter(s => s.status === "SUSPENDED").length;
  
  // Calculate upcoming renewals (within next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const renewingSoon = subscriptions.filter(s => {
    const renewDate = new Date(s.renewDate);
    return s.status === "ACTIVE" && renewDate >= today && renewDate <= thirtyDaysFromNow;
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Plans</p>
          <p className="text-2xl font-bold text-emerald-600">{active}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CreditCard className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Renewing Soon</p>
          <p className="text-2xl font-bold text-sky-600">{renewingSoon}</p>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl text-sky-600"><RefreshCw className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Past Due</p>
          <p className="text-2xl font-bold text-amber-600">{pastDue}</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl text-amber-600"><AlertCircle className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Suspended</p>
          <p className="text-2xl font-bold text-rose-600">{suspended}</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><Ban className="h-5 w-5" /></div>
      </div>
    </div>
  );
}