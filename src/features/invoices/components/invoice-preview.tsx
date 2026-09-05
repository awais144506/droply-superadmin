"use client";

import { useState, useEffect } from "react";
import { Download, ArrowLeft, Loader2, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDFDocument } from "./invoice-pdf-document";

// In Version 2.0, you will swap this dummy object with a React Query fetch using the invoiceId prop
export function InvoicePreview({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dummyInvoice = {
    invoiceNo: `INV-${invoiceId.toUpperCase()}`,
    issueDate: "2026-09-01",
    dueDate: "2026-09-05",
    tenant: { branchCode: "B-004", name: "Blue Springs", owner: "Usman Raza", address: "123 Industrial Estate", phone: "+92 300 1122334" },
    items: [
      { description: "Droply ERP - Monthly Subscription", qty: 1, rate: 15000, amount: 15000 },
    ],
    subtotal: 15000, tax: 0, total: 15000,
  };

  return (
    <div className="min-h-[60vh] bg-white p-8 flex flex-col items-center justify-center rounded-2xl border border-slate-200 shadow-sm">
      
      <div className="h-16 w-16 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-6">
        <FileText className="h-8 w-8" />
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Invoice Ready</h2>
        <p className="text-slate-500 text-sm">Document for <span className="font-bold text-slate-700">{dummyInvoice.tenant.name}</span> is ready for download.</p>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => router.back()} variant="outline" className="bg-white shadow-sm cursor-pointer h-12 px-6 font-bold">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Ledger
        </Button>

        {isClient ? (
          <PDFDownloadLink 
            document={<InvoicePDFDocument invoice={dummyInvoice} />} 
            fileName={`${dummyInvoice.invoiceNo}.pdf`}
          >
            {({ loading }) => (
              <Button disabled={loading} className="bg-sky-600 hover:bg-sky-700 text-white shadow-md cursor-pointer h-12 px-6 font-bold">
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                {loading ? "Rendering..." : "Download Actual PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        ) : (
          <Button disabled className="bg-sky-600/50 text-white h-12 px-6 font-bold">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Preparing engine...
          </Button>
        )}
      </div>
    </div>
  );
}