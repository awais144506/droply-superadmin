"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Settings2, Ban, CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { BranchEntity } from "@/types/branch";
import { useUpdateBranchStatus } from "@/features/branches/api/use-branches";
import { toast } from "sonner";
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
    branch: BranchEntity;
}

export default function TopNavigationBranch({ branch }: TopNavigationBranchProps) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const { mutate: updateStatus, isPending } = useUpdateBranchStatus();

    const isSuspended = branch.status === "SUSPENDED";
    const targetStatus = isSuspended ? "ACTIVE" : "SUSPENDED";

    const handleStatusChange = () => {
        updateStatus(
            { id: branch.id, status: targetStatus },
            {
                onSuccess: () => {
                    toast.success(`Branch successfully ${isSuspended ? "activated" : "suspended"}!`);
                    setIsConfirmOpen(false);
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Failed to update branch status.");
                    setIsConfirmOpen(false);
                },
            }
        );
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
            {/* Left: Back Button & Branch Info */}
            <div className="flex items-center gap-3">
                <Link
                    href="/manage/branches"
                    className={buttonVariants({ variant: "outline", size: "icon" })}
                    title="Back to Registry"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                <div>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {branch.name}
                        </h1>
                        <Badge
                            variant={
                                branch.status === "ACTIVE"
                                    ? "active"
                                    : branch.status === "PAST_DUE"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className="text-[12px]"
                        >
                            {branch.status}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <Link
                    href={`/app/subscriptions/${branch.id}`}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                    <Settings2 className="h-3.5 w-3.5 mr-1" />
                    Subscription Settings
                </Link>

                <Button
                    variant={isSuspended ? "create" : "destructive"}
                    size="sm"
                    onClick={() => setIsConfirmOpen(true)}
                    className="cursor-pointer text-xs"
                >
                    {isSuspended ? (
                        <>
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Activate Branch
                        </>
                    ) : (
                        <>
                            <Ban className="h-3.5 w-3.5 mr-1" /> Suspend Branch
                        </>
                    )}
                </Button>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {isSuspended ? "Activate Branch?" : "Suspend Branch Access?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {isSuspended
                                ? `This will restore full system access and platform permissions for ${branch.name}.`
                                : `Are you sure you want to suspend ${branch.name}? This will immediately block tenant user access.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending} className="cursor-pointer">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleStatusChange();
                            }}
                            disabled={isPending}
                            className={`cursor-pointer ${isSuspended ? "bg-emerald-600 hover:bg-emerald-700" : "bg-destructive text-white hover:bg-destructive/90"}`}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Processing...
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