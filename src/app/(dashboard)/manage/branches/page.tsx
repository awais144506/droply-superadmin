"use client";

import { useState } from "react";
import { useBranches } from "@/features/branches/api/use-branches";
import { BranchTable } from "@/features/branches/components/branch-table";
import { BranchStats } from "@/features/branches/components/branch-stats";
import { BranchStatus } from "@/types/branch";
import { useRouter } from "next/navigation";
import { useBranchStats } from "@/features/branches/api/use-branches";

export default function BranchesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

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

  const handleCreateBranch = () => {
    router.push('/manage/branches/create-new')
  };

  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Branch Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Provision new branches, monitor usage limits, and enforce billing suspensions.
        </p>
      </div>

      <BranchStats stats={statsData} isLoading={isStatsLoading} />

      <BranchTable
        branches={branches}
        totalCount={meta.total}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={setPage}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        onCreateClick={handleCreateBranch}
        isLoading={isLoading}
        isError={isError}
        error={error?.message}
      />
    </div>
  );
}