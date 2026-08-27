"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    PenIcon,
    Lock,
    Loader2,
    User,
    Building2,
    Check,
    MapPin,
} from "lucide-react";
import { useUpdateBranch } from "@/features/branches/api/use-branches";
import { BranchEntity } from "@/types/branch";

// Yup Validation Schema
const editBranchSchema = yup.object().shape({
    name: yup.string().trim().required("Branch name is required"),
    ownerName: yup.string().trim().required("Owner full name is required"),
    ownerPhone: yup.string().trim().required("Owner phone/WhatsApp is required"),
    city: yup.string().trim().required("City is required"),
    address: yup.string().trim().required("Physical address is required"),
    phone: yup.string().optional().default(""),
    email: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .email("Enter a valid email address")
        .optional(),
    maxUsersLimit: yup
        .number()
        .typeError("Seat limit must be a number")
        .min(1, "Minimum 1 seat required")
        .max(500, "Maximum 500 seats allowed")
        .required("Staff seat limit is required"),
    latitude: yup
        .number()
        .typeError("Latitude must be a valid number")
        .min(-90, "Latitude must be >= -90")
        .max(90, "Latitude must be <= 90")
        .required("Latitude is required"),
    longitude: yup
        .number()
        .typeError("Longitude must be a valid number")
        .min(-180, "Longitude must be >= -180")
        .max(180, "Longitude must be <= 180")
        .required("Longitude is required"),
});

type EditBranchFormData = yup.InferType<typeof editBranchSchema>;

interface EditBranchDialogProps {
    branch: BranchEntity;
}

export function EditBranchDialog({ branch }: EditBranchDialogProps) {
    const [open, setOpen] = useState(false);
    const { mutate: updateBranch, isPending } = useUpdateBranch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm<EditBranchFormData>({
        resolver: yupResolver(editBranchSchema),
        mode: "onChange", // Validates on every keystroke
        defaultValues: {
            name: branch.name || "",
            ownerName: branch.ownerName || "",
            ownerPhone: branch.ownerPhone || "",
            phone: branch.phone || "",
            email: branch.email || "",
            address: branch.address || "",
            city: branch.city || "",
            maxUsersLimit: branch.maxUsersLimit || 15,
            latitude: Number(branch.latitude) || 33.6844,
            longitude: Number(branch.longitude) || 73.0479,
        },
    });

    // Reset to latest branch values whenever modal opens
    useEffect(() => {
        if (open) {
            reset({
                name: branch.name || "",
                ownerName: branch.ownerName || "",
                ownerPhone: branch.ownerPhone || "",
                phone: branch.phone || "",
                email: branch.email || "",
                address: branch.address || "",
                city: branch.city || "",
                maxUsersLimit: branch.maxUsersLimit || 15,
                latitude: Number(branch.latitude) || 33.6844,
                longitude: Number(branch.longitude) || 73.0479,
            });
        }
    }, [open, branch, reset]);

    const onSubmit = (data: EditBranchFormData) => {
        updateBranch(
            { id: branch.id, data },
            {
                onSuccess: () => {
                    toast.success("Branch details updated successfully.");
                    setOpen(false);
                },
                onError: (err: any) => {
                    toast.error(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Failed to update branch details."
                    );
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant="create" size="sm">
                    <PenIcon className="h-3.5 w-3.5 mr-1" />
                    Edit Branch
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle className="text-base font-semibold flex items-center gap-2">
                            <PenIcon className="h-4 w-4 text-primary" />
                            Edit Branch Details
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4 text-xs">
                        {/* Owner Section */}
                        <div className="rounded-lg border bg-muted/20 p-3.5 space-y-3">
                            <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                                <User className="h-3.5 w-3.5 text-primary" />
                                Owner Details
                            </span>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        Owner Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("ownerName")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs outline-none focus:ring-1 ${errors.ownerName
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.ownerName && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.ownerName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        WhatsApp / Phone *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("ownerPhone")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs font-mono outline-none focus:ring-1 ${errors.ownerPhone
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.ownerPhone && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.ownerPhone.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Immutable Owner Email */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label className="font-medium text-muted-foreground flex items-center gap-1">
                                        Email
                                    </label>
                                    <span className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                        <Lock className="h-2.5 w-2.5" /> Fixed
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    disabled
                                    value={branch.ownerEmail}
                                    className="w-full h-8 rounded-md border border-input bg-muted/60 px-2.5 text-xs font-mono text-muted-foreground cursor-not-allowed select-none"
                                />
                            </div>
                        </div>

                        {/* Plant Details Section */}
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-medium text-foreground">
                                    Branch Details
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs outline-none focus:ring-1 ${errors.name
                                        ? "border-destructive focus:ring-destructive"
                                        : "border-input focus:ring-ring"
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-[10px] text-destructive">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">City</label>
                                    <input
                                        type="text"
                                        {...register("city")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs outline-none focus:ring-1 ${errors.city
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.city && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.city.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        Staff Seat Limit
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        {...register("maxUsersLimit", { valueAsNumber: true })}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs font-mono outline-none focus:ring-1 ${errors.maxUsersLimit
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.maxUsersLimit && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.maxUsersLimit.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-medium text-foreground"> Address
                                </label>
                                <input
                                    type="text"
                                    {...register("address")}
                                    className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs outline-none focus:ring-1 ${errors.address
                                        ? "border-destructive focus:ring-destructive"
                                        : "border-input focus:ring-ring"
                                        }`}
                                />
                                {errors.address && (
                                    <p className="text-[10px] text-destructive">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        Facility Phone
                                    </label>
                                    <input
                                        type="text"
                                        {...register("phone")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs font-mono outline-none focus:ring-1 ${errors.phone
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        Facility Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs outline-none focus:ring-1 ${errors.email
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Geolocation Section */}
                        <div className="rounded-lg border bg-muted/20 p-3.5 space-y-3">
                            <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                                Dispatch GPS Coordinates
                            </span>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        Latitude *
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        {...register("latitude")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs font-mono outline-none focus:ring-1 ${errors.latitude
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.latitude && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.latitude.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="font-medium text-foreground">
                                        Longitude *
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        {...register("longitude")}
                                        className={`w-full h-8 rounded-md border bg-background px-2.5 text-xs font-mono outline-none focus:ring-1 ${errors.longitude
                                            ? "border-destructive focus:ring-destructive"
                                            : "border-input focus:ring-ring"
                                            }`}
                                    />
                                    {errors.longitude && (
                                        <p className="text-[10px] text-destructive">
                                            {errors.longitude.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="create"
                            size="sm"
                            disabled={isPending || !isValid || !isDirty}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Check className="h-3.5 w-3.5 mr-1" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}