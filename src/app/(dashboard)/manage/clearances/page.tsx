"use client";

import { Loader2 } from "lucide-react";
import { useClearances } from "@/features/clearance/api/use-clearance";
import { ClearanceStats } from "@/features/clearance/components/clearance-stats";
import { ClearanceTable } from "@/features/clearance/components/clearance-table";

export default function PaymentClearancePage() {
  const { data: clearances = [], isLoading, isError } = useClearances();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Loading payment queue...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-400">
        <p className="text-sm font-bold">Failed to load clearance data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Clearance</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and approve manual bank transfers and subscription deposits to maintain cash flow tracking.
        </p>
      </div>

      <ClearanceStats clearances={clearances} />
      <ClearanceTable clearances={clearances} />
    </div>
  );
}