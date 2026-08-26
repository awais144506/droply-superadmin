"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
  Users,
  ExternalLink,
  Clock,
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
import { useBranch } from "@/features/branches/api/use-branches";

// Dynamically load map component without SSR
const BranchMap = dynamic(
  () => import("@/features/branches/components/branch-map"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-80 w-full items-center justify-center rounded-xl border bg-muted/40">
        <p className="text-xs text-muted-foreground animate-pulse">
          Loading GPS Dispatch Map...
        </p>
      </div>
    ),
  }
);

export default function BranchDetailPage() {
  const params = useParams();
  const branchId = params.branchId as string;
  const { data: branch, isLoading, isError, error } = useBranch(branchId);

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground">Loading branch registry...</p>
        </div>
      </div>
    );
  }

  if (isError || !branch) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-destructive mb-2" />
          <h2 className="text-base font-semibold text-destructive">
            Branch Record Not Found
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {error?.message || "The requested tenant plant could not be resolved."}
          </p>
          <div className="mt-4">
            <Link href="/branches" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Back to Branch Registry
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const lat = Number(branch.latitude) || 33.6844;
  const lng = Number(branch.longitude) || 73.0479;
  const sub = branch.subscription;
  const billingAmt = sub?.monthlyFee ? Number(sub.monthlyFee) : 8000;

  return (
    <div className="space-y-6 p-6">
      {/* Top Breadcrumb & Status Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/branches"
            className={buttonVariants({ variant: "outline", size: "icon-sm" })}
            title="Back to Registry"
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
              <Badge variant="outline" className="font-mono text-[10px] uppercase">
                {branch.industry}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tenant ID: <span className="font-mono">{branch.id}</span> • Slug: <span className="font-mono">{branch.slug}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")}>
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Open Google Maps
          </Button>
          <Button variant="create" size="sm">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Edit Settings
          </Button>
        </div>
      </div>

      {/* 4 Stat Overview Badges */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Subscription Tier</CardDescription>
            <CardTitle className="text-xl font-bold capitalize flex items-center justify-between">
              <span>{sub?.plan || "TRIAL"}</span>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">
              Auto-Renew: <span className="font-semibold text-foreground">{sub?.autoRenew ? "Enabled" : "Manual"}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Billing Rate</CardDescription>
            <CardTitle className="text-xl font-bold font-mono text-emerald-600">
              PKR {billingAmt.toLocaleString()}
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
            <CardDescription className="text-xs font-medium">Staff & Fleet Quota</CardDescription>
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span>{branch.maxUsersLimit} Seats</span>
              <Users className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">Riders, managers & drivers</p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs font-medium">Current Period Ends</CardDescription>
            <CardTitle className="font-bold flex items-center justify-between text-base">
              <span>
                {sub?.currentPeriodEnd
                  ? new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
              <Clock className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground">Cycle renewal due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Info + Geolocation Map */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Plant and Owner Credentials (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Owner Details Card */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Plant Ownership & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground">Owner Full Name</span>
                <span className="font-semibold text-foreground">{branch.ownerName}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email
                </span>
                <span className="font-mono text-foreground">{branch.ownerEmail}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-dashed">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> WhatsApp/Phone
                </span>
                <span className="font-mono text-foreground">{branch.ownerPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Registered Date
                </span>
                <span className="text-foreground">
                  {new Date(branch.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Physical Address Card */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Physical Facility Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block mb-0.5">Facility Street Address</span>
                <p className="font-medium text-foreground bg-muted/40 p-2.5 rounded-md border">
                  {branch.address}, {branch.city}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                <div className="bg-muted/30 p-2 rounded border">
                  <span className="text-[10px] text-muted-foreground block">Latitude</span>
                  <span className="text-xs font-semibold">{lat}</span>
                </div>
                <div className="bg-muted/30 p-2 rounded border">
                  <span className="text-[10px] text-muted-foreground block">Longitude</span>
                  <span className="text-xs font-semibold">{lng}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live GPS Dispatch Map (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Live GPS Dispatch Hub
              </CardTitle>
              <CardDescription className="text-xs">
                Base location for automatic delivery radius calculation and rider geo-fencing.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex-1 min-h-95">
              <BranchMap
                latitude={lat}
                longitude={lng}
                branchName={branch.name}
                address={branch.address}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}