"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Calendar,
  Clock,
  Receipt,
  ShieldCheck,
  AlertCircle,
  Download,
  Building2,
  User,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useBranch } from "@/features/branches/api/use-branches";

export default function SubscriptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = params.branchId as string;

  const { data: branch, isLoading, isError, error } = useBranch(branchId);

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground">Loading subscription lifecycle...</p>
        </div>
      </div>
    );
  }

  if (isError || !branch) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-2" />
          <h2 className="text-base font-semibold text-destructive">
            Subscription Record Unavailable
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {error?.message || "Could not resolve billing parameters for this plant."}
          </p>
          <div className="mt-4">
            <Link
              href="/subscriptions"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Back to Subscriptions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sub = branch.subscription;
  const plan = sub?.plan || "TRIAL";
  const billingAmount = Number(sub?.billingAmount || sub?.billingAmount || 8000);
  const invoices = (branch as any).invoices ?? [];

  // Calculate cycle period days & progress
  const startDate = sub?.currentPeriodStart ? new Date(sub.currentPeriodStart) : new Date(branch.createdAt);
  const endDate = sub?.currentPeriodEnd ? new Date(sub.currentPeriodEnd) : new Date();
  const now = new Date();
  const totalCycleDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const progressPercent = Math.min(100, Math.max(0, Math.round(((totalCycleDays - daysRemaining) / totalCycleDays) * 100)));

  return (
    <div className="space-y-6 p-6">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/subscriptions"
            className={buttonVariants({ variant: "outline", size: "icon-sm" })}
            title="Back to Subscriptions"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                {branch.name}
              </h1>
              <Badge
                variant={
                  plan === "YEARLY"
                    ? "default"
                    : plan === "MONTHLY"
                      ? "secondary"
                      : "outline"
                }
                className="font-mono text-[10px] uppercase"
              >
                {plan} TIER
              </Badge>
              <Badge
                variant={
                  branch.status === "ACTIVE"
                    ? "default"
                    : branch.status === "PAST_DUE"
                      ? "secondary"
                      : "destructive"
                }
                className="text-[11px]"
              >
                {branch.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Subscription ID: <span className="font-mono">{sub?.id || "N/A"}</span> • Plant Slug: <span className="font-mono">{branch.slug}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/branches/${branch.id}`)}
          >
            <Building2 className="h-3.5 w-3.5 mr-1" />
            Inspect Plant
          </Button>
          <Button variant="create" size="sm">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Modify Plan
          </Button>
        </div>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Contracted Rate</CardDescription>
            <CardTitle className="text-2xl font-bold font-mono text-emerald-600 flex items-center justify-between">
              <span>{plan === "TRIAL" ? "FREE TRIAL" : `PKR ${billingAmount.toLocaleString()}`}</span>
              <CreditCard className="h-4 w-4 text-emerald-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Billing Interval: <span className="font-semibold text-foreground">{plan === "YEARLY" ? "Annual" : "Monthly"}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Cycle Renewal In</CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{daysRemaining} Days</span>
              <Clock className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Due Date: <span className="font-semibold text-foreground">{endDate.toLocaleDateString()}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Payment Protocol</CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{sub?.autoRenew ? "Auto-Debit" : "Manual Invoice"}</span>
              <ShieldCheck className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Grace Period: <span className="font-semibold text-foreground">{sub?.gracePeriodDays ?? 3} Days</span>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Included Staff Quota</CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{branch.maxUsersLimit} Seats</span>
              <User className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Riders, plant operators & staff
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cycle Progress Bar Card */}
      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Current Billing Cycle Progress
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Period spanning {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
              </CardDescription>
            </div>
            <span className="font-mono text-xs font-semibold text-foreground">{progressPercent}% elapsed</span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${progressPercent > 85 ? "bg-amber-500" : "bg-emerald-600"
                }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-2">
            <span>Cycle Start: {startDate.toLocaleDateString()}</span>
            <span>{daysRemaining} Days remaining until renewal</span>
            <span>Cycle Renewal: {endDate.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Billing Details & Invoices History */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Account & Billing Profile (4 Cols) */}
        <div className="space-y-6 lg:col-span-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Billing Entity Info
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground">Billing Contact</span>
                <span className="font-semibold text-foreground">{branch.ownerName}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground">Invoice Email</span>
                <span className="font-mono text-foreground">{branch.ownerEmail}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground">WhatsApp Alerts</span>
                <span className="font-mono text-foreground">{branch.ownerPhone}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground">Billing City</span>
                <span className="font-semibold text-foreground">{branch.city}</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="text-muted-foreground">Physical Facility Address</span>
                <span className="font-medium text-foreground bg-muted/40 p-2 rounded border">
                  {branch.address}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Invoice History Ledger (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary" />
                  Generated Invoices & Ledger Records
                </CardTitle>
                <CardDescription className="text-xs">
                  Official tax receipts and recurring payment lifecycle history.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Receipt className="h-3.5 w-3.5 mr-1" />
                Issue Manual Invoice
              </Button>
            </CardHeader>

            <CardContent className="p-0 flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Invoice Number</TableHead>
                    <TableHead>Billing Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-40 text-center text-xs text-muted-foreground">
                        No invoices generated for this subscription cycle yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    invoices.map((inv: any) => (
                      <TableRow key={inv.id}>
                        <TableCell className="pl-6 font-mono text-xs font-medium text-foreground">
                          {inv.invoiceNumber}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {inv.billingPeriod || "Standard Cycle"}
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-foreground">
                          PKR {Number(inv.amount).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              inv.status === "PAID"
                                ? "default"
                                : inv.status === "PENDING"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-[10px]"
                          >
                            {inv.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6 text-right">
                          <Button variant="ghost" size="icon-sm" title="Download Receipt">
                            <Download className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}