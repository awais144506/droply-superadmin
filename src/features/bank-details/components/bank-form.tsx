/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadthing";
import { bankSchema, BankFormData } from "../schema/bank-schema";
import { useAppForm } from "@/hooks/use-app-form";
import { FormInput } from "@/components/ui/form-input";
import { FormProvider } from "react-hook-form";
import { useCreateBankDetail, useUpdateBankDetail } from "../api/use-bank-details";
import { PlatFormBankAccount } from "../types/bank";

interface BankFormProps {
  initialData?: PlatFormBankAccount | null;
  onSuccessCallback: () => void;
}

export function BankForm({ initialData, onSuccessCallback }: BankFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: createBank } = useCreateBankDetail();
  const { mutateAsync: updateBank } = useUpdateBankDetail();

  const methods = useAppForm(bankSchema,
    {
      bankName: initialData?.bankName || "",
      accountTitle: initialData?.accountTitle || "",
      accountNumber: initialData?.accountNumber || "",
      iban: initialData?.iban || "",
    },
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: BankFormData) => {
    setIsUploading(true);
    let qrCodeUrl = initialData?.qrCodeUrl || "";

    try {
      if (file) {
        const uploadResponse = await uploadFiles("bankQrUploader", { files: [file] });
        if (uploadResponse?.[0]?.ufsUrl) {
          qrCodeUrl = uploadResponse[0].ufsUrl;
        }
      }
      const payload = { ...data, qrCodeUrl };
      if (initialData) {
        await updateBank({ id: initialData.id, data: payload });
      } else {
        await createBank(payload);
      }

      onSuccessCallback();
    } catch (error: any) {
      console.error(error.message || "Operation failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <FormInput
            label="Bank Name"
            required
            name="bankName"
          />
        </div>
        <div className="space-y-1.5">
          <FormInput
            label="Account Title"
            required
            name="accountTitle"
          />
        </div>
        <div className="space-y-1.5">
          <FormInput
            label="Account Number"
            required
            name="accountNumber"
          />
        </div>
        <div className="space-y-1.5">
          <FormInput
            label="IBAN"
            name="iban"
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
            {(isSubmitting || isUploading) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Account"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}