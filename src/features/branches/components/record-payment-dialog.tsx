"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RecordPaymentDialogProps {
  branchId: string;
  branchName: string;
  defaultAmount: number;
}

export function RecordPaymentDialog({ branchName, defaultAmount }: RecordPaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      amount: defaultAmount,
      referenceNumber: "",
      paymentMethod: "BANK_TRANSFER",
      monthsExtended: 1,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call to update invoice and subscription end date
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success(`Payment of PKR ${data.amount} recorded for ${branchName}. Subscription extended by ${data.monthsExtended} month(s).`);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 text-xs font-semibold h-9">
          <CreditCard className="h-4 w-4" />
          Update / Log Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Subscription Payment</DialogTitle>
          <DialogDescription className="text-xs">
            Record bank transfer or cash collection for <strong>{branchName}</strong>. This automatically updates the billing cycle and active status.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Amount Received (PKR)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="monthsExtended"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Extend Cycle (Months)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={12} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Payment Method</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank / JazzCash / Cash" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="referenceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Bank Ref / Transaction ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. PK-MEZN-892183912" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                Confirm & Extend
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}