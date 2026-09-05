"use client";

import { Building2, CreditCard, MessageSquare, Megaphone, AlertCircle, CheckCircle2, Reply } from "lucide-react";
import { SuperAdminStats } from "../api/use-super-dashboard";

export function GlobalStats({ stats }: { stats: SuperAdminStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Branches Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Branches</p>
            <div className="p-2 bg-sky-50 rounded-lg text-sky-600"><Building2 className="h-4 w-4" /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.totalBranches}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 text-[10px] font-bold">
          <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">{stats.activeBranches} Active</span>
          <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">{stats.disabledBranches} Disabled</span>
          {stats.pastDueBranches > 0 && (
            <span className="flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-1 rounded border border-rose-100">
              <AlertCircle className="h-3 w-3" /> {stats.pastDueBranches} Past Due
            </span>
          )}
        </div>
      </div>

      {/* Clearances Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Clearances</p>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><CreditCard className="h-4 w-4" /></div>
          </div>
          <p className="text-3xl font-bold text-amber-600">{stats.pendingClearances}</p>
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-4">Awaiting manual bank verification</p>
      </div>

      {/* Support Tickets Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Support Tickets</p>
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600"><MessageSquare className="h-4 w-4" /></div>
          </div>
          <p className="text-3xl font-bold text-rose-600">{stats.openTickets} <span className="text-sm font-medium text-slate-400">Open</span></p>
        </div>
        <div className="flex items-center gap-3 mt-4 text-[11px] font-bold">
          <span className="flex items-center gap-1 text-amber-600"><Reply className="h-3 w-3" /> {stats.repliedTickets} Replied</span>
          <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3 w-3" /> {stats.resolvedTickets} Resolved</span>
        </div>
      </div>

      {/* Website Leads Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Website Leads</p>
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Megaphone className="h-4 w-4" /></div>
          </div>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalLeads} <span className="text-sm font-medium text-slate-400">Total</span></p>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${(stats.contactedLeads / stats.totalLeads) * 100}%` }}></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500">
            <span className="text-slate-900">{stats.contactedLeads}</span> Contacted & Followed Up
          </p>
        </div>
      </div>

    </div>
  );
}