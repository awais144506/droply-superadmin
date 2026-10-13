"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Settings2, Ban, CheckCircle2, Pen, Store, Loader2, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { BranchDetails } from "../../types/branch";
import { useUpdateBranchStatus } from "../../api/use-mutate-branch"; // Adjust path as needed
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

interface TopNavigationBranchProps {
    branch: BranchDetails;
}

export default function TopNavigationBranch({ branch }: TopNavigationBranchProps) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { mutate: updateStatus, isPending } = useUpdateBranchStatus();

    const isSuspended = branch.status === "SUSPENDED";
    const targetStatus = isSuspended ? "ACTIVE" : "SUSPENDED";

    const handleConfirm = () => {
        updateStatus(
            { id: branch.id, status: targetStatus },
            {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                }
            }
        );
    };

    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4 mb-6 -mx-6 -mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Left: Back Button & Branch Info */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/manage/branches"
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                        title="Back to Registry"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg items-center justify-center border border-indigo-100">
                            <Store className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                                    {branch.name}
                                </h1>
                                <Badge
                                    variant="outline"
                                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 border ${branch.status === "ACTIVE"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : branch.status === "PAST_DUE"
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : "bg-rose-50 text-rose-700 border-rose-200"
                                        }`}
                                >
                                    {branch.status}
                                </Badge>
                            </div>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">
                                Code: <span className="text-slate-700 uppercase">{branch.branchCode}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center flex-wrap gap-2 md:gap-3">
                    <Link
                        href={`/manage/branches/${branch.id}/subscription`}
                        className={buttonVariants({ variant: "default", })}
                    >
                        <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                        Subscription
                    </Link>
                    <Link
                        href={`/manage/branches/${branch.id}/edit`}
                        className={buttonVariants({ variant: "success", size: "sm", className: "h-9 text-xs" })}
                    >
                        <Pen className="h-3.5 w-3.5 mr-1.5" />
                        Edit Branch
                    </Link>

                    <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1"></div>

                    <Button
                        size="sm"
                        onClick={() => setIsConfirmOpen(true)}
                        className={`h-9 text-xs font-bold transition-all shadow-sm ${isSuspended
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                            }`}
                    >
                        {isSuspended ? (
                            <>
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Activate Branch
                            </>
                        ) : (
                            <>
                                <Ban className="h-3.5 w-3.5 mr-1.5" /> Suspend Branch
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* The Confirmation Modal */}
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">
                            {isSuspended ? "Activate Branch?" : "Suspend Branch Access?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            {isSuspended
                                ? `This will restore full system access for ${branch.name}. All active staff members will be able to log in immediately.`
                                : `Are you sure you want to suspend ${branch.name}? This will instantly block all staff members from accessing the platform.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel disabled={isPending} className="border-slate-200 font-medium hover:bg-slate-50 rounded-xl">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleConfirm();
                            }}
                            disabled={isPending}
                            className={`rounded-xl font-bold ${isSuspended
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                : "bg-rose-600 hover:bg-rose-700 text-white"
                                }`}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
                                </>
                            ) : isSuspended ? (
                                "Confirm Activation"
                            ) : (
                                "Confirm Suspension"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}