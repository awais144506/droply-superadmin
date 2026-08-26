"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  CreditCard,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateBranch } from "@/features/branches/api/use-branches";
import { CreateBranchInput } from "@/types/branch";

export default function CreateBranchPage() {
  const router = useRouter();
  const { mutate: createBranch, isPending, isError, error } = useCreateBranch();

  const [formData, setFormData] = useState<CreateBranchInput>({
    name: "",
    industry: "WATER",
    address: "",
    city: "",
    latitude: 33.6844,
    longitude: 73.0479,
    phone: "",
    email: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    maxUsersLimit: 15,
    subscriptionPlan: "TRIAL",
    monthlyFee: 8000,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBranch(formData, {
      onSuccess: () => {
        router.push("/branches");
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b pb-4">
        <Link
          href="/branches"
          className={buttonVariants({ variant: "outline", size: "icon-sm" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Provision Tenant Branch</h1>
          <p className="text-xs text-muted-foreground">
            Configure plant credentials, administrative ownership, GPS coordinates, and billing terms.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {isError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>
            {(error as any)?.response?.data?.message ||
              error?.message ||
              "Failed to provision branch. Please verify your inputs."}
          </span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plant & Facility Info */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Facility & Plant Details
              </CardTitle>
              <CardDescription className="text-xs">
                Physical branch entity configuration.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Branch Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Islamabad Pure Spring Plant"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                  >
                    <option value="WATER">Water Purification</option>
                    <option value="BEVERAGES">Beverages</option>
                    <option value="DAIRY">Dairy</option>
                    <option value="LOGISTICS">Logistics Hub</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Islamabad"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Facility Physical Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Plot #, Street, Industrial Area"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Office Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="051-1234567"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Office Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="plant@tenant.com"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plant Ownership */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Administrative Owner
              </CardTitle>
              <CardDescription className="text-xs">
                Owner receives primary tenant administration and invoice notices.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Owner Full Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Owner Email Address *
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  required
                  placeholder="owner@domain.com"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Owner WhatsApp / Phone *
                </label>
                <input
                  type="text"
                  name="ownerPhone"
                  required
                  placeholder="+92 300 1234567"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Staff Quota Limit (Seats)
                </label>
                <input
                  type="number"
                  name="maxUsersLimit"
                  min="1"
                  max="500"
                  value={formData.maxUsersLimit}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dispatch Geolocation */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                GPS Coordinates
              </CardTitle>
              <CardDescription className="text-xs">
                Base location coordinates for rider dispatch and radius calculation.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    required
                    value={formData.latitude}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    required
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription & Billing */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Subscription & Pricing Plan
              </CardTitle>
              <CardDescription className="text-xs">
                Defines automated invoice cycles and fee structure.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Plan Tier
                  </label>
                  <select
                    name="subscriptionPlan"
                    value={formData.subscriptionPlan}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none"
                  >
                    <option value="TRIAL">Trial (7 Days Free)</option>
                    <option value="MONTHLY">Monthly Billing</option>
                    <option value="YEARLY">Yearly Billing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Monthly Fee (PKR)
                  </label>
                  <input
                    type="number"
                    name="monthlyFee"
                    min="0"
                    step="500"
                    value={formData.monthlyFee}
                    onChange={handleChange}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono focus:ring-1 focus:ring-ring outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Link
            href="/branches"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            variant="create"
            size="sm"
            disabled={isPending}
            className="min-w-35"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                Provisioning...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 mr-1.5" />
                Provision Branch
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}