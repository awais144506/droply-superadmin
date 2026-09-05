"use client";

import { Users, Shield, Headset, Activity } from "lucide-react";
import { TeamMember } from "@/types/team";

export function TeamStats({ team }: { team: TeamMember[] }) {
  const superAdmins = team.filter(t => t.role === "SUPER_ADMIN").length;
  const supportAgents = team.filter(t => t.role === "SUPPORT_ADMIN").length;
  const activeMembers = team.filter(t => t.status === "ACTIVE").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Team</p>
          <p className="text-2xl font-bold text-slate-900">{team.length}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl text-slate-600"><Users className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Accounts</p>
          <p className="text-2xl font-bold text-emerald-600">{activeMembers}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><Activity className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Super Admins</p>
          <p className="text-2xl font-bold text-indigo-600">{superAdmins}</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Shield className="h-5 w-5" /></div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Support Agents</p>
          <p className="text-2xl font-bold text-sky-600">{supportAgents}</p>
        </div>
        <div className="p-3 bg-sky-50 rounded-xl text-sky-600"><Headset className="h-5 w-5" /></div>
      </div>
    </div>
  );
}