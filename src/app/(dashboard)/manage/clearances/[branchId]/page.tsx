"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Banknote, 
  Image as ImageIcon,
  Download,
  AlertCircle,
  User,
  Phone
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

// --- DUMMY DATA MATCHING YOUR IMAGE ---
const DUMMY_CLEARANCE = {
  id: "CLR-2026-0904",
  status: "PENDING", // PENDING, APPROVED, REJECTED
  submittedAt: "2026-09-04T10:30:00.000Z",
  payment: {
    amount: 120000,
    currency: "Rs",
    method: "BANK TRANSFER",
    referenceNo: "TRX-9988221",
    bankName: "Meezan Bank Limited",
  },
  branch: {
    id: "B-001",
    name: "Droply Main",
    owner: "Ali Khan",
    phone: "0300-1234567",
  },
  proofUrl: "https://placehold.co/600x800/f8fafc/94a3b8?text=Bank+Transfer+Receipt",
};
// ------------------------------------

export default function ClearanceDetailsPage() {
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [status, setStatus] = useState(DUMMY_CLEARANCE.status);

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto p-6">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/manage/clearances"
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Clearance Review
              </h1>
              <Badge 
                variant="outline" 
                className={`
                  ${status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                  ${status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                  ${status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}
                `}
              >
                {status === 'PENDING' ? 'Awaiting Review' : status}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">Ref: {DUMMY_CLEARANCE.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Payment Info Card */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
              <CardTitle className="text-base flex items-center gap-2">
                <Banknote className="h-4 w-4 text-primary" />
                Transaction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-dashed border-slate-200">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Reported Amount</p>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                    {DUMMY_CLEARANCE.payment.currency} {DUMMY_CLEARANCE.payment.amount.toLocaleString()}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-500 mb-1">Date Submitted</p>
                  <p className="text-lg font-bold text-slate-700">
                    {new Date(DUMMY_CLEARANCE.submittedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(DUMMY_CLEARANCE.submittedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Payment Method</span>
                  <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{DUMMY_CLEARANCE.payment.method}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Reference No.</span>
                  <span className="text-sm font-mono font-bold text-slate-900">{DUMMY_CLEARANCE.payment.referenceNo}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Bank / Provider</span>
                  <span className="text-sm font-medium text-slate-900">{DUMMY_CLEARANCE.payment.bankName}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branch & Tenant Info Card */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Branch Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Branch Name</p>
                  <p className="font-bold text-slate-900">{DUMMY_CLEARANCE.branch.name}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{DUMMY_CLEARANCE.branch.id}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Owner Contact</p>
                  <p className="font-bold text-slate-900">{DUMMY_CLEARANCE.branch.owner}</p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {DUMMY_CLEARANCE.branch.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Proof & Actions (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Action Panel (Only show if pending) */}
          {status === 'PENDING' && (
            <Card className="shadow-sm border-amber-200 bg-amber-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Action Required
                </CardTitle>
                <CardDescription className="text-xs text-amber-700/80">
                  Verify the transaction proof and amount before approving. This action will update the tenant&apos;s billing cycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm"
                  onClick={() => setIsApproveOpen(true)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" /> Approve Clearance
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 cursor-pointer"
                  onClick={() => setIsRejectOpen(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" /> Reject
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Attached Proof Card */}
          <Card className="shadow-sm border-slate-200 overflow-hidden flex flex-col h-full max-h-[600px]">
            <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between shrink-0">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-slate-500" />
                Payment Proof
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary">
                <Download className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 bg-slate-50 flex-1 relative min-h-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={DUMMY_CLEARANCE.proofUrl} 
                alt="Payment Receipt" 
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approval Dialog */}
      <AlertDialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the payment of <strong>{DUMMY_CLEARANCE.payment.currency} {DUMMY_CLEARANCE.payment.amount.toLocaleString()}</strong> as verified. The system will automatically extend the billing cycle for {DUMMY_CLEARANCE.branch.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => setStatus('APPROVED')}
            >
              Confirm Approval
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Dialog */}
      <AlertDialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Payment?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this clearance? The tenant will be notified that their transaction proof was invalid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={() => setStatus('REJECTED')}
            >
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}