"use client";

import { useState } from "react";
import { useBranchStats, useBranches } from "@/features/branches/api/use-branches";
import { SubscriptionStats } from "@/features/subscriptions/components/subscription-stats";
import { SubscriptionTable } from "@/features/subscriptions/components/subscription-table";
import { BranchStatus } from "@/types/branch";
import { useRouter } from "next/navigation";

export default function SubscriptionsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Fetch stats for the top cards
  const { data: statsData, isLoading: isStatsLoading } = useBranchStats();

  const { data, isLoading, isError, error } = useBranches({
    page,
    limit: 20,
    search: search || undefined,
    status: statusFilter === "ALL" ? undefined : (statusFilter as BranchStatus),
  });

  const branches = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 20, totalPages: 1 };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };


  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Active Subscriptions</h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor recurring billing cycles, plan tiers, and tenant renewal statuses.
        </p>
      </div>

      <SubscriptionStats stats={statsData} isLoading={isStatsLoading} />

      {/* Pass the branch data array to your table, along with pagination states if needed */}
      <SubscriptionTable
        branches={branches}
        totalCount={meta.total}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setPage}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
        isError={isError}
        error={error?.message}
      />
    </div>
  );
}