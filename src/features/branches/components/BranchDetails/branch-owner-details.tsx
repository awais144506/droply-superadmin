"use client";

import { useState } from "react";
import {
    Building2,
    Calendar,
    Mail,
    Phone,
    User,
    ShieldCheck,
    Pencil,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BranchEntity } from "@/types/branch";
import { EditOwnerModal } from "./EditBranchDetails/edit-owner-modal";

interface BranchOwnerDetailsProps {
    branch: BranchEntity & { owner?: { cnic?: string; name: string; email: string; phone: string } };
}

export default function BranchOwnerDetails({ branch }: BranchOwnerDetailsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const owner = branch.owner;

    return (
        <>
            <Card>
                <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        Branch Owner Details
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditOpen(true)}
                        className="h-7 text-xs gap-1.5 cursor-pointer"
                    >
                        <Pencil className="h-3 w-3" /> Edit Owner
                    </Button>
                </CardHeader>
                <CardContent className="pt-4 space-y-3.5 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" /> Owner Name
                        </span>
                        <span className="text-foreground font-medium">{owner?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" /> Email
                        </span>
                        <span className="font-medium text-foreground">{owner?.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" /> WhatsApp/Phone
                        </span>
                        <span className="font-medium text-foreground">{owner?.phone || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> CNIC
                        </span>
                        <span className="font-medium text-foreground">{owner?.cnic || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> Registered Date
                        </span>
                        <span className="text-foreground font-medium">
                            {new Date(branch.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> Last Updated
                        </span>
                        <span className="text-foreground font-medium">
                            {branch.updatedAt
                                ? new Date(branch.updatedAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "N/A"}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <EditOwnerModal
                branchId={branch.id}
                owner={owner}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />
        </>
    );
}