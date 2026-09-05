"use client";

import { Loader2 } from "lucide-react";
import { useBranches } from "@/features/branches/api/use-branches";
import { BranchTable } from "@/features/branches/components/branch-table";
import { BranchStats } from "@/features/branches/components/branch-stats";
import { toast } from "sonner";

export default function BranchesPage() {
  const { data: branches = [], isLoading, isError } = useBranches();

  const handleCreateBranch = () => {
    // In version 1.0, this can open a modal. For now, we trigger a toast.
    toast.info("Opening Branch Provisioning Form...");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Fetching global branch network...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-400">
        <p className="text-sm font-bold">Failed to load branches. Please check API connection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Branch Management</h1>
        <p className="text-sm text-slate-500 mt-1">
          Provision new tenants, monitor usage limits, and enforce billing suspensions.
        </p>
      </div>

      <BranchStats branches={branches} />
      <BranchTable branches={branches} onCreateClick={handleCreateBranch} />
    </div>
  );
}