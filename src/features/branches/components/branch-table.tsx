import { useRouter } from "next/navigation";
import { getStatusBadge, getPlanBadge } from "@/lib/utils/badges";
import { BranchEntity } from "@/types/branch";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import Error from "@/app/error";

interface BranchTableProps {
  branches: BranchEntity[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onCreateClick: () => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

export function BranchTable({
  branches,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onCreateClick,
  isLoading,
  isError,
  error,
}: BranchTableProps) {

  const router = useRouter();
  if (isLoading) return <Loading />
  if (isError) return <Error error={error} />
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Controls Header: Search & Status Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search branch code, branch name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0 overflow-x-auto">
            {(["ALL", "ACTIVE", "PAST_DUE", "SUSPENDED"] as const).map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${statusFilter === status
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <Button
          onClick={onCreateClick}
          variant="create"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Create Branch
        </Button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto min-h-100">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">Branch Code</th>
              <th className="px-6 py-4 whitespace-nowrap">Branch & Address</th>
              <th className="px-6 py-4 whitespace-nowrap">Owner Details</th>
              <th className="px-6 py-4 whitespace-nowrap">Tier & Cycle</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {branches.map((branch) => (
              <tr
                key={branch.id}
                onClick={() => router.push(`/manage/branches/${branch.id}`)}
                className={`transition-colors group cursor-pointer ${branch.status === "SUSPENDED" ? "bg-slate-50/50" : "hover:bg-slate-50/50"
                  }`}
              >
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-bold text-slate-700">
                  {branch.branchCode}
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{branch.name}</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">{branch.address || "N/A"}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{branch.owner?.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {branch.owner?.phone} • {branch.owner?.email}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {getPlanBadge(branch.subscription?.tier, branch.subscription?.cycle)}
                </td>
                <td className="px-6 py-4">{getStatusBadge(branch.status)}</td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                  No branches match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
          <p className="text-[11px] font-medium text-slate-500">
            Page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
            <span className="font-bold text-slate-900">{totalPages}</span> (Total: {totalCount} branches)
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 rounded-lg text-xs bg-white cursor-pointer"
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${currentPage === i + 1
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 rounded-lg text-xs bg-white cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}