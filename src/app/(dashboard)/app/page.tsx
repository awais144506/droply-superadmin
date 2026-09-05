"use client";

import { Loader2 } from "lucide-react";
import { useSuperDashboard } from "@/features/dashboard/api/use-super-dashboard";
import { GlobalStats } from "@/features/dashboard/components/global-stats";
import { RecentLeadsTable } from "@/features/dashboard/components/recent-leads-table";
import { SystemLogs } from "@/features/dashboard/components/system-logs";

export default function SuperAdminDashboard() {
  const { data, isLoading } = useSuperDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Loading platform metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Global metrics, incoming tenant leads, and critical system alerts.
        </p>
      </div>

      <GlobalStats stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-100">
        <div className="lg:col-span-2">
          <RecentLeadsTable leads={data.recentLeads} />
        </div>
        <div className="lg:col-span-1">
          <SystemLogs logs={data.systemLogs} />
        </div>
      </div>
    </div>
  );
}