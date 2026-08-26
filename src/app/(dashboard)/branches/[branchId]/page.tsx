import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Clock,
  ExternalLink,
  MapPin,
  Users,
  Receipt,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BranchStatusBadge } from "@/features/branches/components/branch-status-badge";
import { RecordPaymentDialog } from "@/features/branches/components/record-payment-dialog";
import { BranchDetail } from "@/features/branches/types";

// Mock data generator for deep detail view
const MOCK_BRANCH_DETAIL: BranchDetail = {
  id: "br_01",
  name: "Blue Mist Pure Water",
  slug: "blue-mist",
  city: "Islamabad",
  address: "Plot 12-B, Industrial Area I-9",
  industry: "WATER",
  status: "ACTIVE",
  ownerName: "Qamar Abbas",
  ownerPhone: "+92 300 1234567",
  ownerEmail: "qamar@bluemist.com",
  subscriptionPlan: "MONTHLY",
  monthlyFee: 8000,
  currentPeriodStart: "10 Aug 2026",
  currentPeriodEnd: "10 Sep 2026",
  daysRemaining: 16,
  maxUsersLimit: 15,
  metrics: {
    totalCustomers: 340,
    totalOrdersDelivered: 4210,
    activeAssetsInCirculation: 1250,
  },
  users: [
    { id: "u_1", name: "Qamar Abbas", email: "qamar@bluemist.com", phone: "+923001234567", role: "OWNER", isActive: true, createdAt: "10 Aug 2026" },
    { id: "u_2", name: "Shahzad Manager", email: "shahzad@bluemist.com", phone: "+923019998877", role: "MANAGER", isActive: true, createdAt: "11 Aug 2026" },
    { id: "u_3", name: "Aslam Rider", email: "aslam@droply.local", phone: "+923215551122", role: "RIDER", isActive: true, createdAt: "12 Aug 2026" },
    { id: "u_4", name: "Rashid Rider", email: "rashid@droply.local", phone: "+923454443322", role: "RIDER", isActive: true, createdAt: "12 Aug 2026" },
    { id: "u_5", name: "Tariq Rider", email: "tariq@droply.local", phone: "+923337776655", role: "RIDER", isActive: true, createdAt: "15 Aug 2026" },
  ],
  invoices: [
    { id: "inv_1", invoiceNumber: "INV-2026-08-001", amount: 8000, billingPeriod: "10 Aug 2026 - 10 Sep 2026", paidAt: "10 Aug 2026", paymentMethod: "BANK_TRANSFER", status: "PAID" },
    { id: "inv_0", invoiceNumber: "INV-2026-07-001", amount: 8000, billingPeriod: "10 Jul 2026 - 10 Aug 2026", paidAt: "10 Jul 2026", paymentMethod: "BANK_TRANSFER", status: "PAID" },
  ],
};

interface BranchDetailPageProps {
  params: Promise<{ branchId: string }>;
}

export default async function BranchDetailPage({ params }: BranchDetailPageProps) {
  const resolvedParams = await params;
  const branch = MOCK_BRANCH_DETAIL;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
            <Link href="/branches">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight">{branch.name}</h1>
              <BranchStatusBadge status={branch.status} />
              <Badge variant="outline" className="text-[10px] font-mono uppercase">{branch.industry}</Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" /> {branch.address}, {branch.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Changed from onClick to a standard asChild Link */}
          <Button variant="outline" size="sm" className="text-xs h-9 gap-1.5" asChild>
            <a
              href={`https://${branch.slug}.droplyhq.com`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Launch Portal
            </a>
          </Button>
          <RecordPaymentDialog
            branchId={branch.id}
            branchName={branch.name}
            defaultAmount={branch.monthlyFee}
          />
        </div>
      </div>

      {/* Subscription Banner & Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Days Left Card */}
        <Card className="border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Billing Status</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">
                {branch.daysRemaining} Days
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Renews on {branch.currentPeriodEnd}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* User Seats Allocation */}
        <Card className="border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Staff Quota</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">
                {branch.users.length} / {branch.maxUsersLimit}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {branch.maxUsersLimit - branch.users.length} available seats
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Total Deliveries Metric */}
        <Card className="border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Drops</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">
                {branch.metrics.totalOrdersDelivered.toLocaleString()}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Completed orders</p>
            </div>
            <div className="p-2.5 rounded-lg bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Returnable Assets Circulating */}
        <Card className="border shadow-none bg-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Assets in Market</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">
                {branch.metrics.activeAssetsInCirculation.toLocaleString()}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Bottles / Cylinders held</p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              <Building2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Staff Management + Invoices History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Managers & Riders List */}
        <Card className="border shadow-none bg-card lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Assigned Staff & Riders</CardTitle>
                <CardDescription className="text-xs">
                  Active Clerk authentication accounts tied to this tenant branch ({branch.users.length}/{branch.maxUsersLimit}).
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Staff Member</TableHead>
                  <TableHead className="text-xs">Contact</TableHead>
                  <TableHead className="text-xs">Role</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branch.users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono">{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right 1 Col: Billing, Invoices & Owner Info Card */}
        <div className="flex flex-col gap-6">
          {/* Owner Quick Contact */}
          <Card className="border shadow-none bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Owner Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">{branch.ownerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-mono text-foreground">{branch.ownerPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{branch.ownerEmail}</span>
              </div>
            </CardContent>
          </Card>

          {/* Past Payments / Invoice History */}
          <Card className="border shadow-none bg-card flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                Subscription Invoices
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs">Invoice</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {branch.invoices.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-muted/30">
                      <TableCell className="text-xs">
                        <div className="flex flex-col font-mono text-[11px]">
                          <span className="font-medium text-foreground">{inv.invoiceNumber}</span>
                          <span className="text-[10px] text-muted-foreground">{inv.paidAt}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono font-medium">
                        PKR {inv.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950 border-emerald-200">
                          {inv.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}