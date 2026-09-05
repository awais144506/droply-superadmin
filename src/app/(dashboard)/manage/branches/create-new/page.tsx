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
  Zap,
  ShieldCheck,
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
import {
  createBranchSchema,
  CreateBranchFormData,
} from "@/features/branches/schema/create-branch.schema";

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
      phone: "",
      address: "",
      latitude: 31.5204,
      longitude: 74.3587,
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      ownerCnic: "",
    },
  });

  const onSubmit = (data: CreateBranchFormData) => {
    createBranch(data as any, {
      onSuccess: () => {
        toast.success("Branch provisioned with 7-Day Gold Trial!");
        router.push("/manage/branches");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/manage/branches"
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New Branch</h1>
            <p className="text-xs text-slate-500 mt-0.5">Create an isolated tenant instance with automated Clerk credentials.</p>
          </div>
        </div>

        {/* Trial Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
          <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-amber-700">Includes 7-Day Gold Trial</span>
        </div>
      </div>

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Branch Owner Card */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Branch Owner Credentials
              </CardTitle>
              <CardDescription className="text-xs">
                Used to generate the owner&apos;s primary Clerk profile and identity.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Muhammad Awais"
                  {...register("ownerName")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.ownerName ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                />
                {errors.ownerName && <p className="text-[10px] text-destructive">{errors.ownerName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email Address *</label>
                <input
                  type="email"
                  placeholder="owner@droply.com"
                  {...register("ownerEmail")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.ownerEmail ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                />
                {errors.ownerEmail && <p className="text-[10px] text-destructive">{errors.ownerEmail.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Phone Number *</label>
                <input
                  type="text"
                  placeholder="+923001234567"
                  {...register("ownerPhone")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.ownerPhone ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                />
                {errors.ownerPhone && <p className="text-[10px] text-destructive">{errors.ownerPhone.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Owner CNIC (13-15 digits) *
                </label>
                <input
                  type="text"
                  placeholder="3520212345671"
                  {...register("ownerCnic")}
                  className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.ownerCnic ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                />
                {errors.ownerCnic && <p className="text-[10px] text-destructive">{errors.ownerCnic.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Facility & Location Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Branch Details
                </CardTitle>
                <CardDescription className="text-xs">
                  Branch operational information.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Branch Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Droply Main Branch"
                    {...register("name")}
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.name ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                  />
                  {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Phone *</label>
                  <input
                    type="text"
                    placeholder="+923009876543"
                    {...register("phone")}
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs font-mono outline-none focus:ring-1 ${errors.phone ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                  />
                   {errors.phone && <p className="text-[10px] text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Address *</label>
                  <input
                    type="text"
                    placeholder="Main Boulevard, Gulberg III, Lahore"
                    {...register("address")}
                    className={`w-full h-9 rounded-md border bg-background px-3 text-xs outline-none focus:ring-1 ${errors.address ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"}`}
                  />
                  {errors.address && <p className="text-[10px] text-destructive">{errors.address.message}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Geographic Coordinates *
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    {...register("latitude", { valueAsNumber: true })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
                  />
                  {errors.latitude && <p className="text-[10px] text-destructive">{errors.latitude.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    {...register("longitude", { valueAsNumber: true })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
                  />
                  {errors.longitude && <p className="text-[10px] text-destructive">{errors.longitude.message}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Link href="/manage/branches" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Cancel
          </Link>
          <Button type="submit" size="sm" disabled={isPending || !isValid} variant="create">
            {isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Creating...</>
            ) : (
              <><Plus className="h-4 w-4 mr-1.5" /> Create Branch</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}