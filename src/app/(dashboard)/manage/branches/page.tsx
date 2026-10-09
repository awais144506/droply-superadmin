"use client";

import { useAllBranches } from "@/features/branches/api/use-branch";
import { BranchStats } from "@/features/branches/components/main/branch-stats";
import MainPageHeader from "@/lib/utils/components/MainPageHeader";
import { DataTableFilterBar } from "@/components/ui/data-table-filter-bar";
import ActivityLogsCard from "@/lib/utils/components/ActivityLogsMainPage";
import { BranchTable } from "@/features/branches/components/main/branch-table";

export default function BranchesPage() {
  // Destructure data with a fallback empty object to avoid undefined errors during loading
  const { data = { stats: null, branches: [], logs: [] }, isLoading, isError } = useAllBranches();
  const { stats, branches, logs } = data;

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load branches. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-6 min-w-6xl mx-auto p-6">

      <MainPageHeader
        heading="Manage Branches"
        btnText="New Branch"
        href="/manage/branches/create-new"
        description="Manage and create your branches."
      />

      {isLoading || !stats ? (
        <div className="h-32 bg-gray-100 animate-pulse rounded-md border" />
      ) : (
        <BranchStats
          total={stats.total}
          active={stats.active}
          pastDue={stats.pastDue}
          suspended={stats.suspended}
        />
      )}

      <DataTableFilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityLogsCard
            logs={logs}
            isLoading={isLoading}
          />
        </div>
      </div>

    </div>
  );
}