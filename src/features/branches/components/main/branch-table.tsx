"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Branch } from "../../types/branch";
import { usePagination } from "@/lib/utils/functions/pagination-calculation";
import DataTable from "@/lib/utils/components/TableCreateMachine";
import TablePagination from "@/lib/utils/components/TablePagination";
import { getBranchColumns } from "./branch-columns";

interface BranchTableProps {
  branches: Branch[];
}

export function BranchTable({ branches }: BranchTableProps) {
  const router = useRouter();
  const { currentPage, setCurrentPage, paginatedData, totalPages, totalItems, itemsPerPage } = usePagination(branches);
  const columns = useMemo(() => getBranchColumns(), []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <DataTable
        data={paginatedData}
        columns={columns}
        emptyMessage="No branches found."
        onRowClick={(branch) => {
          router.push(`/manage/branches/${branch.id}`);
        }}
      />

      {(totalItems || 0) > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}