"use client";

import { Loader2 } from "lucide-react";
import { useInvoices } from "@/features/invoices/api/use-invoices";
import { InvoiceStats } from "@/features/invoices/components/invoice-stats";
import { InvoiceTable } from "@/features/invoices/components/invoice-table";

export default function InvoicesPage() {
  const { data: invoices = [], isLoading, isError } = useInvoices();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Generating invoice ledger...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-400">
        <p className="text-sm font-bold">Failed to load invoices.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Billing & Invoices</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track issued invoices, monitor overdue accounts, and send automated payment reminders.
        </p>
      </div>

      <InvoiceStats invoices={invoices} />
      <InvoiceTable invoices={invoices} />
    </div>
  );
}