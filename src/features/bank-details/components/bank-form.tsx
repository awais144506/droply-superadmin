"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadthing";
import { useCreateBankDetail, useUpdateBankDetail, BankDetailEntity } from "../api/use-bank-details";

const bankSchema = yup.object({
  bankName: yup.string().required("Bank name is required"),
  accountTitle: yup.string().required("Account title is required"),
  accountNumber: yup.string().required("Account number is required"),
  iban: yup.string().optional(),
}).required();

type BankFormData = yup.InferType<typeof bankSchema>;

interface BankFormProps {
  initialData?: BankDetailEntity | null;
  onSuccessCallback: () => void;
}

export function BankForm({ initialData, onSuccessCallback }: BankFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { mutateAsync: createBank } = useCreateBankDetail();
  const { mutateAsync: updateBank } = useUpdateBankDetail();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BankFormData>({
    resolver: yupResolver(bankSchema),
    defaultValues: {
      bankName: initialData?.bankName || "",
      accountTitle: initialData?.accountTitle || "",
      accountNumber: initialData?.accountNumber || "",
      iban: initialData?.iban || "",
    },
  });

  const onSubmit = async (data: BankFormData) => {
    setIsUploading(true);
    let qrCodeUrl = initialData?.qrCodeUrl || "";

    try {
      if (file) {
        const uploadResponse = await uploadFiles("bankQrUploader", { files: [file] });
        if (uploadResponse?.[0]?.url) {
          qrCodeUrl = uploadResponse[0].url;
        }
      }

      const payload = { ...data, qrCodeUrl };

      if (initialData) {
        await updateBank({ id: initialData.id, data: payload });
        toast.success("Bank account updated!");
      } else {
        await createBank(payload);
        toast.success("Bank account created!");
      }
      
      onSuccessCallback();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Operation failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">Bank Name *</label>
        <input
          {...register("bankName")}
          className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-ring"
          placeholder="e.g. Meezan Bank"
        />
        {errors.bankName && <p className="text-[10px] text-destructive">{errors.bankName.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">Account Title *</label>
        <input
          {...register("accountTitle")}
          className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.accountTitle && <p className="text-[10px] text-destructive">{errors.accountTitle.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">Account Number *</label>
        <input
          {...register("accountNumber")}
          className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
        />
        {errors.accountNumber && <p className="text-[10px] text-destructive">{errors.accountNumber.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">IBAN (Optional)</label>
        <input
          {...register("iban")}
          className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-mono outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-700">QR Code Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" size="sm" disabled={isSubmitting || isUploading}>
          {(isSubmitting || isUploading) ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Account"}
        </Button>
      </div>
    </form>
  );
}