"use client";

import Link from "next/link";
import { ArrowLeft, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BranchEntity } from "@/types/branch";
import { EditBranchDialog } from "./EditBranch/edit-form";

interface TopNavigationBranchProps {
    branch: BranchEntity;
}

export default function TopNavigationBranch({ branch }: TopNavigationBranchProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
            {/* Left: Back Button & Branch Info */}
            <div className="flex items-center gap-3">
                <Link
                    href="/branches"
                    className={buttonVariants({ variant: "outline", size: "icon-sm" })}
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
                        <Badge variant="outline" className="font-mono text-[10px] uppercase">
                            {branch.industry}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <Link
                    href={`/subscriptions/${branch.id}`}
                    className={buttonVariants({ variant: "normal", size: "sm" })}
                >
                    <Settings2 className="h-3.5 w-3.5 mr-1" />
                    Subscription Settings
                </Link>

                {/* Edit Dialog Trigger & Form */}
                <EditBranchDialog branch={branch} />
            </div>
        </div>
    );
}