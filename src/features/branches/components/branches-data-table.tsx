"use client";

import { useState } from "react";
import { Building2, Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Branch, BranchStatus } from "../types";
import { BranchStatusBadge } from "./branch-status-badge";
import { BranchQuotaProgress } from "./branch-quota-progress";
import { BranchActionMenu } from "./branch-action-menu";

interface BranchesDataTableProps {
  initialData: Branch[];
}

export function BranchesDataTable({ initialData }: BranchesDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredBranches = initialData.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.ownerPhone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "ALL" || branch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="border shadow-none bg-card">
      {/* Search & Filter Bar */}
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by branch, owner, city or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-xs h-9"
          />
        </div>

        {/* Quick Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["ALL", "ACTIVE", "PAST_DUE", "SUSPENDED"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="text-xs h-8 capitalize font-medium"
            >
              {status.toLowerCase().replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs">Branch & Plant Info</TableHead>
              <TableHead className="text-xs">Owner Details</TableHead>
              <TableHead className="text-xs">Industry</TableHead>
              <TableHead className="text-xs">User Quota</TableHead>
              <TableHead className="text-xs">Subscription</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-xs text-muted-foreground">
                  No tenant branches found matching criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredBranches.map((branch) => (
                <TableRow key={branch.id} className="hover:bg-muted/40 transition-colors">
                  {/* Branch Name & Address */}
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm leading-tight text-foreground">
                          {branch.name}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>{branch.address}, {branch.city}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Owner Info */}
                  <TableCell>
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="font-medium text-foreground">{branch.ownerName}</span>
                      <span className="text-muted-foreground text-[11px] mt-0.5">{branch.ownerPhone}</span>
                      <span className="text-muted-foreground text-[10px]">{branch.ownerEmail}</span>
                    </div>
                  </TableCell>

                  {/* Industry */}
                  <TableCell className="text-xs font-mono">
                    <span className="bg-muted px-2 py-0.5 rounded text-[11px]">
                      {branch.primaryIndustry}
                    </span>
                  </TableCell>

                  {/* Quota Progress */}
                  <TableCell>
                    <BranchQuotaProgress
                      activeUsers={branch.activeUsers}
                      maxUsers={branch.maxUsersLimit}
                    />
                  </TableCell>

                  {/* Billing */}
                  <TableCell className="text-xs font-mono font-medium">
                    PKR {branch.monthlyFee.toLocaleString()}/mo
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <BranchStatusBadge status={branch.status} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <BranchActionMenu branch={branch} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}