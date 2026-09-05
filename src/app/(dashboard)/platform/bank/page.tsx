"use client";

import { useState } from "react";
import { Plus, Loader2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBankDetails, useDeleteBankDetail, BankDetailEntity } from "@/features/bank-details/api/use-bank-details";
import { BankDetailCard } from "@/features/bank-details/components/bank-detail-card";
import { BankForm } from "@/features/bank-details/components/bank-form";
import { toast } from "sonner";

export default function PlatformBankAccountsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankDetailEntity | null>(null);

  const { data: accounts, isLoading } = useBankDetails();
  const { mutate: deleteBank, isPending: isDeleting } = useDeleteBankDetail();

  const handleEdit = (account: BankDetailEntity) => {
    setSelectedAccount(account);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (id: string) => {
    const account = accounts?.find((a) => a.id === id);
    if (account) {
      setSelectedAccount(account);
      setIsDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedAccount) {
      deleteBank(selectedAccount.id, {
        onSuccess: () => {
          toast.success("Bank account deleted successfully.");
          setIsDeleteOpen(false);
          setSelectedAccount(null);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to delete account.");
          setIsDeleteOpen(false);
        },
      });
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedAccount(null);
  };

  return (
    <div className="space-y-6 max-w-300 mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Bank Accounts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage deposit accounts and QR codes shown to tenants for subscription payments.
          </p>
        </div>
        <Button 
          onClick={() => { setSelectedAccount(null); setIsFormOpen(true); }}
          className="bg-sky-600 hover:bg-sky-700 text-white cursor-pointer shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Bank Account
        </Button>
      </div>

      {/* Grid Layout */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
          <p className="text-sm">Loading bank accounts...</p>
        </div>
      ) : accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <BankDetailCard 
              key={account.id} 
              account={account} 
              onEdit={handleEdit} 
              onDelete={handleDeletePrompt} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
          <Building className="h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No bank accounts found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Add your first bank account to receive tenant payments.</p>
          <Button variant="outline" size="sm" onClick={() => { setSelectedAccount(null); setIsFormOpen(true); }}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Account
          </Button>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Bank Account?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{selectedAccount?.bankName}</strong>? This account will no longer be visible to tenants for clearing payments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm} 
              disabled={isDeleting}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              {isDeleting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Deleting...</> : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">
                {selectedAccount ? "Edit Bank Account" : "Add Bank Account"}
              </h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <BankForm 
                initialData={selectedAccount} 
                onSuccessCallback={handleFormSuccess} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}