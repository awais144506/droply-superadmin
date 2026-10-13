"use client";

import React, { useState } from "react";
import { Check, Clock, XCircle, Eye, MessageSquareText, CheckCircle2, ArrowUpCircle, RefreshCw } from "lucide-react";
import { SubscriptionPayment } from "@/features/branches/types/subscription";
import { ColumnDef } from "@/lib/utils/components/TableCreateMachine";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// The actions specifically needed by the Super Admin
interface AdminTableActions {
    onApprove: (id: string) => void;
    onReject: (id: string, remarks: string) => void;
}

const ActionCell = ({ 
    row, 
    actions 
}: { 
    row: SubscriptionPayment; 
    actions: AdminTableActions;
}) => {
    const [remarks, setRemarks] = useState("");
    const [isRejectOpen, setIsRejectOpen] = useState(false);

    const handleRejectSubmit = () => {
        if (!remarks.trim()) return;
        actions.onReject(row.id, remarks);
        setIsRejectOpen(false);
        setRemarks("");
    };

    return (
        <div className="flex items-center gap-1.5">
            
            {/* 1. View Receipt (Always Available) */}
            {row.imageUrl && (
                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-sky-600 hover:bg-sky-50" title="View Receipt">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
                        <DialogTitle className="sr-only">Payment Receipt</DialogTitle>
                        <div className="relative flex flex-col items-center justify-center bg-black/90 p-4 rounded-xl">
                            {row.imageUrl.endsWith(".pdf") ? (
                                <iframe src={row.imageUrl} className="w-full h-[600px] rounded-lg bg-white" />
                            ) : (
                                <img src={row.imageUrl} alt="Receipt" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* 2. Admin Actions (Only if PENDING) */}
            {row.status === "PENDING" && (
                <>
                    {/* Approve Button */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                            const actionText = row.isRenewal ? "extend their billing date" : "upgrade their current cycle";
                            if (window.confirm(`Approve this payment and ${actionText}?`)) {
                                actions.onApprove(row.id);
                            }
                        }}
                        className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                        title="Approve Payment"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                    </Button>

                    {/* Reject Button w/ Remarks Dialog */}
                    <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
                        <DialogTrigger>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50" title="Reject Payment">
                                <XCircle className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-rose-600">Reject Payment slip</DialogTitle>
                                <DialogDescription>
                                    Please provide a reason for rejecting this payment. The branch owner will see this message.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    placeholder="e.g., The receipt is blurry, or the amount doesn't match..."
                                    className="w-full h-24 p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
                                />
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
                                <Button 
                                    onClick={handleRejectSubmit} 
                                    disabled={!remarks.trim()} 
                                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
                                >
                                    Confirm Rejection
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {/* 3. View Remarks (Only if REJECTED) */}
            {row.status === "REJECTED" && row.remarks && (
                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500 hover:text-amber-700 hover:bg-amber-50" title="View Rejection Reason">
                            <MessageSquareText className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[420px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-rose-600">
                                <XCircle className="h-5 w-5" /> Rejection Remarks
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm font-medium text-rose-800 mt-2">
                            {row.remarks}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export const getAdminBillingColumns = (actions: AdminTableActions): ColumnDef<SubscriptionPayment>[] => [
    {
        header: "Billing Date",
        render: (row) => {
            const date = new Date(row.createdAt);
            return (
                <div>
                    <p className="font-bold text-slate-900">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase">{date.getFullYear()}</p>
                </div>
            );
        },
    },
    {
        header: "Tier / Cycle",
        render: (row) => (
            <div>
                <p className="text-xs font-bold text-slate-900 uppercase">{row.tier}</p>
                <p className="text-[10px] font-medium text-slate-500 uppercase">{row.cycle}</p>
            </div>
        ),
    },
    {
        header: "Amount",
        render: (row) => (
            <div>
                <p className="font-bold text-emerald-600">Rs {row.amountPaid.toLocaleString()}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{row.type}</p>
            </div>
        ),
    },
    {
        header: "Intent",
        render: (row) => {
            return row.isRenewal ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100">
                    <RefreshCw className="h-3 w-3" /> Renewal / Full
                </span>
            ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[10px] font-bold border border-sky-100">
                    <ArrowUpCircle className="h-3 w-3" /> Mid-Cycle Upgrade
                </span>
            );
        },
    },
    {
        header: "Status",
        render: (row) => {
            if (row.status === "REJECTED") {
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-100">
                        <XCircle className="h-3 w-3" /> Rejected
                    </span>
                );
            }
            if (row.status === "PENDING") {
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100">
                        <Clock className="h-3 w-3" /> Action Required
                    </span>
                );
            }
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                    <Check className="h-3 w-3" /> Approved
                </span>
            );
        },
    },
    {
        header: "TID / Ref",
        render: (row) => (
            row.transactionId ? (
                <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{row.transactionId}</span>
            ) : <span className="text-slate-300">—</span>
        ),
    },
    {
        header: "Actions",
        render: (row) => <ActionCell row={row} actions={actions} />,
    },
];