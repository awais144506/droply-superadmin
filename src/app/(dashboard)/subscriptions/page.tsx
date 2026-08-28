"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  RefreshCw,
  Search,
  CreditCard,
  TrendingUp,
  Clock,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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

export default function SubscriptionsPage() {
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
  const [planFilter, setPlanFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Aggregate Metrics Calculations
  const stats = useMemo(() => {
    let mrr = 0;
    let activeCount = 0;
    let trialCount = 0;
    let pastDueCount = 0;

    branches.forEach((b) => {
      const plan = b.subscription?.plan || "TRIAL";
      const amount = Number(b.subscription?.billingAmount || b.subscription?.billingAmount || 0);

      if (b.status === "ACTIVE" && plan !== "TRIAL") {
        mrr += amount;
        activeCount += 1;
      }
      if (plan === "TRIAL") {
        trialCount += 1;
      }
      if (b.status === "PAST_DUE" || b.status === "SUSPENDED") {
        pastDueCount += 1;
      }
    });

    return { mrr, activeCount, trialCount, pastDueCount };
  }, [branches]);

  // Filtered List
  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        branch.name?.toLowerCase().includes(query) ||
        branch.ownerName?.toLowerCase().includes(query) ||
        branch.ownerEmail?.toLowerCase().includes(query) ||
        branch.slug?.toLowerCase().includes(query);

      const branchPlan = branch.subscription?.plan || "TRIAL";
      const matchesPlan = planFilter === "ALL" || branchPlan === planFilter;
      const matchesStatus =
        statusFilter === "ALL" || branch.status === statusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [branches, searchQuery, planFilter, statusFilter]);

  return (
    <div className="space-y-6 p-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subscription & Billing</h1>
          <p className="text-sm text-muted-foreground">
            Monitor tenant recurring revenue, grace period deadlines, and renewal lifecycles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refresh Ledger"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Top 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Estimated Monthly Recurring Revenue (MRR)
            </CardDescription>
            <CardTitle className="text-2xl font-bold font-mono text-emerald-600 flex items-center justify-between">
              <span>PKR {stats.mrr.toLocaleString()}</span>
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              From active commercial subscriptions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Paid Subscriptions
            </CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{stats.activeCount} Plants</span>
              <CreditCard className="h-5 w-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Active billed tenant contracts
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Active 7-Day Trials
            </CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between text-blue-600">
              <span>{stats.trialCount} Plants</span>
              <Sparkles className="h-5 w-5 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Pipeline conversion prospects
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">
              Overdue / At Risk Accounts
            </CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between text-destructive">
              <span>{stats.pastDueCount}</span>
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Past due or in grace period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert */}
      {isError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error?.message || "Failed to load subscription data"}</span>
        </div>
      )}

      {/* Main Billing Table Card */}
      <Card>
        <CardHeader className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold">
              Tenant Subscription Roster ({filteredBranches.length})
            </CardTitle>
            <CardDescription className="text-xs">
              Click any record to inspect individual billing history and invoice details.
            </CardDescription>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search plant, owner, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-60 rounded-md border border-input bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              aria-label="Filter by Plan Tier"
              className="h-9 rounded-md border border-input bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <option value="ALL">All Plans</option>
              <option value="TRIAL">Trial Tier</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
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
                <TableHead className="pl-6">Tenant Plant</TableHead>
                <TableHead>Subscription Plan</TableHead>
                <TableHead>Billing Rate</TableHead>
                <TableHead>Current Cycle Ends</TableHead>
                <TableHead>Account Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    Aggregating subscription lifecycles from Droply API...
                  </TableCell>
                </TableRow>
              ) : branches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No active subscriptions registered yet.
                  </TableCell>
                </TableRow>
              ) : filteredBranches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">
                    No subscriptions match your search or filter parameters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredBranches.map((branch) => {
                  const sub = branch.subscription;
                  const plan = sub?.plan || "TRIAL";
                  const billingAmt = Number(sub?.billingAmount || sub?.billingAmount || 8000);
                  const periodEnd = sub?.currentPeriodEnd
                    ? new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Trial Setup";

                  return (
                    <TableRow
                      key={branch.id}
                      onClick={() => router.push(`/subscriptions/${branch.id}`)}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      {/* Tenant Plant & Owner */}
                      <TableCell className="pl-6 font-medium">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">
                            {branch.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {branch.ownerName} • {branch.ownerEmail}
                          </span>
                        </div>
                      </TableCell>

                      {/* Subscription Plan Badge */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              plan === "YEARLY"
                                ? "default"
                                : plan === "MONTHLY"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-[11px] font-mono capitalize"
                          >
                            {plan}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {sub?.autoRenew ? "Auto" : "Manual"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Billing Rate */}
                      <TableCell>
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {plan === "TRIAL" ? "PKR 0 (Free)" : `PKR ${billingAmt.toLocaleString()} / mo`}
                        </span>
                      </TableCell>

                      {/* Period End Date */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                          <span className="font-medium text-foreground">{periodEnd}</span>
                        </div>
                      </TableCell>

                      {/* Account Status */}
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
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}