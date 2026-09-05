/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateBranchDetails } from "@/features/branches/api/use-branches";
import { editBranchSchema, EditBranchFormData } from "@/features/branches/schema/edit-branch-schema";
import { BranchEntity } from "@/types/branch";

interface EditBranchModalProps {
  branch: BranchEntity;
  isOpen: boolean;
  onClose: () => void;
}

export function EditBranchModal({ branch, isOpen, onClose }: EditBranchModalProps) {
  const { mutate: updateBranch, isPending } = useUpdateBranchDetails();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<EditBranchFormData>({
    resolver: yupResolver(editBranchSchema),
    mode: "onChange",
    defaultValues: {
      name: branch.name || "",
      phone: branch.phone || "",
      address: branch.address || "",
      latitude: Number(branch.latitude) || 0,
      longitude: Number(branch.longitude) || 0,
    },
  });

  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedAddress = watch("address");
  const watchedLat = watch("latitude");
  const watchedLng = watch("longitude");

  useEffect(() => {
    if (branch) {
      reset({
        name: branch.name || "",
        phone: branch.phone || "",
        address: branch.address || "",
        latitude: Number(branch.latitude) || 0,
        longitude: Number(branch.longitude) || 0,
      });
    }
  }, [branch, reset]);

  if (!isOpen) return null;

  const hasChanges =
    watchedName !== (branch.name || "") ||
    watchedPhone !== (branch.phone || "") ||
    watchedAddress !== (branch.address || "") ||
    Number(watchedLat) !== Number(branch.latitude || 0) ||
    Number(watchedLng) !== Number(branch.longitude || 0);

  const isSubmitDisabled = isPending || !isValid || !hasChanges;

  const onSubmit = (data: EditBranchFormData) => {
    updateBranch(
      { branchId: branch.id, data },
      {
        onSuccess: () => {
          toast.success("Branch details updated successfully!");
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Failed to update branch details.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Edit Branch Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Branch Name *</label>
            <input
              type="text"
              {...register("name")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Phone *</label>
            <input
              type="text"
              placeholder="+923001234567"
              {...register("phone")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.phone && <p className="text-[10px] text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Address *</label>
            <input
              type="text"
              {...register("address")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.address && <p className="text-[10px] text-destructive">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Latitude *</label>
              <input
                type="number"
                step="any"
                {...register("latitude", { valueAsNumber: true })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
              />
              {errors.latitude && <p className="text-[10px] text-destructive">{errors.latitude.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700">Longitude *</label>
              <input
                type="number"
                step="any"
                {...register("longitude", { valueAsNumber: true })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
              />
              {errors.longitude && <p className="text-[10px] text-destructive">{errors.longitude.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={onClose} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitDisabled} variant="create">
              {isPending ? <><Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Saving...</> : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}