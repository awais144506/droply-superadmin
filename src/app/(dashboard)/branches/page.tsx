
import { BranchesDataTable } from "@/features/branches/components/branches-data-table";
import { MOCK_BRANCHES } from "@/features/branches/data/mock-branches";

export default function BranchesPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header Banner */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Branch Management</h1>
          <p className="text-xs text-muted-foreground">
            Configure tenant workspaces, control seat limits, and manage client subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <CreateBranchDialog /> */}
        </div>
      </div>

      {/* Main Filterable Table */}
      <BranchesDataTable initialData={MOCK_BRANCHES} />
    </div>
  );
}