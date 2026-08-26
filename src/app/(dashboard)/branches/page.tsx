"use client";

import { MapPin, AlertCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { CreateBranchDialog } from "@/features/branches/components/create-branch-dialog";
import { useBranches } from "@/features/branches/api/use-branches";

export default function BranchesPage() {
  const { data: branches = [], isLoading, isError, error, refetch, isFetching } = useBranches();

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
          <CreateBranchDialog />
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
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="text-base font-semibold">
            Registered Branches ({branches.length})
          </CardTitle>
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
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    Fetching tenant branches from Droply API...
                  </TableCell>
                </TableRow>
              ) : branches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No branches registered yet. Click &quot;Provision Branch&quot; to create the first tenant.
                  </TableCell>
                </TableRow>
              ) : (
                branches.map((branch) => (
                  <TableRow key={branch.id}>
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
                        <span className="text-muted-foreground truncate max-w-[200px]">
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