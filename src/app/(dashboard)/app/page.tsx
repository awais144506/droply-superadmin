
import { OverviewStats } from "@/features/dashboard/components/overview-stats";
import { RecentBranchesCard } from "@/features/dashboard/components/recent-branches-card";
import { ActivityFeedCard } from "@/features/dashboard/components/activity-feed-card";

export default function SuperAdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner & Quick Action */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">SuperAdmin Command Center</h1>
          <p className="text-xs text-muted-foreground">
            Platform governance, branch quotas, and system health status.
          </p>
        </div>
    
      </div>

      {/* 4 Clean Metric Cards */}
      <OverviewStats />

      {/* Main Grid: Branches Table (2/3 width) + Live Logs (1/3 width) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentBranchesCard />
        </div>
        <div>
          <ActivityFeedCard />
        </div>
      </div>
    </div>
  );
}