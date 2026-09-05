"use client";

import { MessageSquare, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { TicketEntity } from "@/types/ticket";

export function TicketStats({ tickets }: { tickets: TicketEntity[] }) {
  const open = tickets.filter(t => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
  const urgent = tickets.filter(t => (t.priority === "URGENT" || t.priority === "HIGH") && t.status !== "RESOLVED" && t.status !== "CLOSED").length;
  const resolved = tickets.filter(t => t.status === "RESOLVED").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Open Tickets</p>
          <p className="text-2xl font-bold text-sky-600">{open}</p>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl text-sky-600"><MessageSquare className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">High / Urgent</p>
          <p className="text-2xl font-bold text-rose-600">{urgent}</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><AlertTriangle className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Recently Resolved</p>
          <p className="text-2xl font-bold text-emerald-600">{resolved}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Response</p>
          <p className="text-2xl font-bold text-slate-900">1.2<span className="text-sm text-slate-500 ml-1">hrs</span></p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Clock className="h-5 w-5" /></div>
      </div>
    </div>
  );
}