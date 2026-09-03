"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, AlertCircle, RefreshCw, Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBranches } from "@/features/branches/api/use-branches";

export default function BranchesPage() {
  const router = useRouter();
  const {
    data: branches = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useBranches();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        branch.name?.toLowerCase().includes(query) ||
        branch.city?.toLowerCase().includes(query) ||
        branch.address?.toLowerCase().includes(query) ||
        branch.ownerName?.toLowerCase().includes(query) ||
        branch.ownerEmail?.toLowerCase().includes(query) ||
        branch.industry?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || branch.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [branches, searchQuery, statusFilter]);

  return (
    <div className="space-y-6 p-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Branches</h1>
          <p className="text-sm text-muted-foreground">
            Manage registered distribution hubs, billing lifecycles, and staff limits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refresh Branches"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </Button>

          <Link
            href="/manage/branches/create-new"
            className={buttonVariants({ variant: "create", size: "sm" })}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Create New Branch
          </Link>
        </div>
      </div>

      {/* Error Banner */}
      {isError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error?.message || "Failed to load branch data"}</span>
        </div>
      )}

      {/* Main Data Table Card */}
      <Card>
        <CardHeader className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-base font-semibold">
            Registered Branches ({filteredBranches.length})
          </CardTitle>

          {/* Search and Status Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search branches, owners, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-60 rounded-md border border-input bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter branches by status"
              className="h-9 rounded-md border border-input bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PAST_DUE">Past Due</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Branch</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    Fetching tenant branches from Droply API...
                  </TableCell>
                </TableRow>
              ) : branches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    No branches registered yet. Click &quot;Provision Branch&quot; to create the first tenant.
                  </TableCell>
                </TableRow>
              ) : filteredBranches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    No branches match your search or filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBranches.map((branch) => (
                  <TableRow
                    key={branch.id}
                    onClick={() => router.push(`/branches/${branch.id}`)}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    {/* Branch Info */}
                    <TableCell className="pl-6 font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                          {branch.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>{branch.industry}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      <div className="flex flex-col text-xs space-y-0.5">
                        <span className="font-medium text-foreground">
                          {branch.city}
                        </span>
                        <span className="text-muted-foreground truncate max-w-50">
                          {branch.address}
                        </span>
                        <span className="font-mono text-[10px] text-primary/80 flex items-center gap-1">
                          <MapPin className="h-2.5 w-2.5" />
                          {Number(branch.latitude).toFixed(4)}, {Number(branch.longitude).toFixed(4)}
                        </span>
                      </div>
                    </TableCell>

                    {/* Owner */}
                    <TableCell>
                      <div className="flex flex-col text-xs space-y-0.5">
                        <span className="font-medium">{branch.ownerName}</span>
                        <span className="text-muted-foreground">{branch.ownerEmail}</span>
                        <span className="text-muted-foreground">{branch.ownerPhone}</span>
                      </div>
                    </TableCell>

                    {/* Subscription */}
                    <TableCell>
                      <div className="flex flex-col text-xs space-y-1">
                        <Badge
                          variant={
                            branch.subscription?.plan === "TRIAL"
                              ? "outline"
                              : "default"
                          }
                          className="w-fit text-[10px]"
                        >
                          {branch.subscription?.plan || "TRIAL"}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={
                          branch.status === "ACTIVE"
                            ? "active"
                            : branch.status === "PAST_DUE"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-[11px]"
                      >
                        {branch.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}