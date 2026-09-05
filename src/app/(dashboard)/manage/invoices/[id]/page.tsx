"use client";

import { useParams } from "next/navigation";
import { InvoicePreview } from "@/features/invoices/components/invoice-preview";

export default function InvoicePrintPage() {
  const params = useParams();
  const invoiceId = params.id as string;

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Pass the ID to the preview component so it knows which data to fetch */}
      <InvoicePreview invoiceId={invoiceId} />
    </div>
  );
}