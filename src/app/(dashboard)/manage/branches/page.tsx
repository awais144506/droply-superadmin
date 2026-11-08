"use client";

import { useAllBranches } from "@/features/branches/api/use-branch";
import { BranchStats } from "@/features/branches/components/main/branch-stats";
import MainPageHeader from "@/lib/utils/components/MainPageHeader";
import { DataTableFilterBar } from "@/components/ui/data-table-filter-bar";
import ActivityLogsCard from "@/lib/utils/components/ActivityLogsMainPage";
import { BranchTable } from "@/features/branches/components/main/branch-table";
import { useSearchParams } from "next/navigation";
import ErrorBoundary from "@/app/error";
import Loading from "@/app/loading";

export default function BranchesPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;

  const { data = { stats: null, branches: [], logs: [] }, isLoading, isError, error, refetch, isRefetching } = useAllBranches(search, status);
  const { stats, branches, logs } = data;

  if (isError) return <ErrorBoundary error={error.message} />
  if (isLoading) return <Loading text="Loading Branches..." />

  return (
    <div className="space-y-6 p-6">

      <MainPageHeader
        heading="Manage Branches"
        btnText="New Branch"
        href="/manage/branches/create-new"
        description="Manage and create your branches."
        onRefresh={refetch}
        isRefreshing={isRefetching}
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

      <DataTableFilterBar
        searchParamName="search"
        searchPlaceholder="Search by code / name..."
        tabParamName="status"
        tabs={[
          { label: "All", value: "" },
          { label: "Active", value: "ACTIVE" },
          { label: "Past Due", value: "PAST_DUE" },
          { label: "Suspend", value: "SUSPENDED" }
        ]}
      />
      <BranchTable
        branches={branches}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityLogsCard
            title="Branch Management Logs"
            logs={logs}
          />
        </div>
      </div>

    </div>
  );
}