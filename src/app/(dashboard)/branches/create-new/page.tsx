"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Loader2,
  Plus,
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
import { createBranchSchema, CreateBranchFormData } from "@/features/branches/components/BranchDetails/CreateBranch/create-branch.schema";

export default function CreateBranchPage() {
  const router = useRouter();
  const { mutate: createBranch, isPending, isError, error } = useCreateBranch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateBranchFormData>({
    resolver: yupResolver(createBranchSchema),
    mode: "onChange",
    defaultValues: {
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
    },
  });

  const onSubmit = (data: CreateBranchFormData) => {
    createBranch(data, {
      onSuccess: () => {
        toast.success("Branch created successfully!");
        router.push("/branches");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to provision branch. Please verify input fields."
        );
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
          <h1 className="text-2xl font-bold tracking-tight">Create New Branch</h1>
        </div>
      </div>

      {/* Error Alert Banner */}
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plant Ownership */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Branch Owner
              </CardTitle>
              <CardDescription className="text-xs">
                Enter the branch owner details.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Owner Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tariq Mehmood"
                  {...register("ownerName")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.ownerName
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-ring"
                    }`}
                />
                {errors.ownerName && (
                  <p className="text-[10px] text-destructive">{errors.ownerName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Owner Email Address (Permanent ID) *
                </label>
                <input
                  type="email"
                  placeholder="owner@domain.com"
                  {...register("ownerEmail")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.ownerEmail
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-ring"
                    }`}
                />
                {errors.ownerEmail && (
                  <p className="text-[10px] text-destructive">{errors.ownerEmail.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Owner WhatsApp / Phone *
                </label>
                <input
                  type="text"
                  placeholder="+92 300 1234567"
                  {...register("ownerPhone")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.ownerPhone
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-ring"
                    }`}
                />
                {errors.ownerPhone && (
                  <p className="text-[10px] text-destructive">{errors.ownerPhone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Staff Quota Limit (Max 20 Seats)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  {...register("maxUsersLimit", { valueAsNumber: true })}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.maxUsersLimit
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-ring"
                    }`}
                />
                {errors.maxUsersLimit && (
                  <p className="text-[10px] text-destructive">{errors.maxUsersLimit.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Facility & Plant Details */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Branch Details
              </CardTitle>
              <CardDescription className="text-xs">
                Enter branch details.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Branch Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Islamabad Pure Spring Plant"
                  {...register("name")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.name
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-ring"
                    }`}
                />
                {errors.name && (
                  <p className="text-[10px] text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Industry
                  </label>
                  <select
                    {...register("industry")}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:ring-1 focus:ring-ring outline-none cursor-pointer"
                  >
                    <option value="WATER">Water Purification</option>
                    <option value="BEVERAGES">Beverages</option>
                    <option value="DAIRY">Dairy</option>
                    <option value="LOGISTICS">Logistics Hub</option>
                  </select>
                  {errors.industry && (
                    <p className="text-[10px] text-destructive">{errors.industry.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Islamabad"
                    {...register("city")}
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.city
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-ring"
                      }`}
                  />
                  {errors.city && (
                    <p className="text-[10px] text-destructive">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Address *
                </label>
                <input
                  type="text"
                  placeholder="Plot #, Street, Industrial Area"
                  {...register("address")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.address
                    ? "border-destructive focus:ring-destructive"
                    : "border-input focus:ring-ring"
                    }`}
                />
                {errors.address && (
                  <p className="text-[10px] text-destructive">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Branch Phone
                  </label>
                  <input
                    type="text"
                    placeholder="051-1234567"
                    {...register("phone")}
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.phone
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-ring"
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Branch Email
                  </label>
                  <input
                    type="email"
                    placeholder="plant@tenant.com"
                    {...register("email")}
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.email
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-ring"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
            {/* Dispatch Geolocation */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Brnach Location Coordinates
                </CardTitle>
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
                      {...register("latitude", { valueAsNumber: true })}
                      className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.latitude
                        ? "border-destructive focus:ring-destructive"
                        : "border-input focus:ring-ring"
                        }`}
                    />
                    {errors.latitude && (
                      <p className="text-[10px] text-destructive">{errors.latitude.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      Longitude *
                    </label>
                    <input
                      type="number"
                      step="any"
                      {...register("longitude", { valueAsNumber: true })}
                      className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.longitude
                        ? "border-destructive focus:ring-destructive"
                        : "border-input focus:ring-ring"
                        }`}
                    />
                    {errors.longitude && (
                      <p className="text-[10px] text-destructive">{errors.longitude.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Card>




        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Link
            href="/branches"
            className={buttonVariants({ variant: "normal", size: "sm" })}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            variant="create"
            size="sm"
            disabled={isPending || !isValid}
            className="min-w-36"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1.5" />
                Create Branch
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}