"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateBranchOwner } from "@/features/branches/api/use-branches";
import { editOwnerSchema, EditOwnerFormData } from "@/features/branches/schema/edit-owner.schema";

interface EditOwnerModalProps {
  branchId: string;
  owner?: { name: string; email: string; phone: string; cnic?: string };
  isOpen: boolean;
  onClose: () => void;
}

export function EditOwnerModal({ branchId, owner, isOpen, onClose }: EditOwnerModalProps) {
  const { mutate: updateOwner, isPending } = useUpdateBranchOwner();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<EditOwnerFormData>({
    resolver: yupResolver(editOwnerSchema),
    mode: "onChange",
    defaultValues: {
      ownerName: owner?.name || "",
      ownerEmail: owner?.email || "",
      ownerPhone: owner?.phone || "",
      ownerCnic: owner?.cnic || "",
    },
  });

  // Watch current form inputs to compare against initial values
  const watchedName = watch("ownerName");
  const watchedEmail = watch("ownerEmail");
  const watchedPhone = watch("ownerPhone");
  const watchedCnic = watch("ownerCnic");

  useEffect(() => {
    if (owner) {
      reset({
        ownerName: owner.name,
        ownerEmail: owner.email,
        ownerPhone: owner.phone,
        ownerCnic: owner.cnic || "",
      });
    }
  }, [owner, reset]);

  if (!isOpen) return null;

  // Determine if any field has been modified from the original props
  const hasChanges =
    watchedName !== (owner?.name || "") ||
    watchedEmail !== (owner?.email || "") ||
    watchedPhone !== (owner?.phone || "") ||
    watchedCnic !== (owner?.cnic || "");

  const isSubmitDisabled = isPending || !isValid || !hasChanges;

  const onSubmit = (data: EditOwnerFormData) => {
    updateOwner(
      { branchId, data },
      {
        onSuccess: () => {
          toast.success("Branch owner details updated successfully!");
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Failed to update owner details.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Edit Branch Owner Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Owner Full Name *</label>
            <input
              type="text"
              {...register("ownerName")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.ownerName && <p className="text-[10px] text-destructive">{errors.ownerName.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">Email Address *</label>
            <input
              type="email"
              {...register("ownerEmail")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.ownerEmail && <p className="text-[10px] text-destructive">{errors.ownerEmail.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">WhatsApp / Phone *</label>
            <input
              type="text"
              placeholder="+923001234567"
              {...register("ownerPhone")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.ownerPhone && <p className="text-[10px] text-destructive">{errors.ownerPhone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">CNIC (13-15 digits) *</label>
            <input
              type="text"
              placeholder="3520212345671"
              {...register("ownerCnic")}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.ownerCnic && <p className="text-[10px] text-destructive">{errors.ownerCnic.message}</p>}
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