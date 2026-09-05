"use client";

import { useState } from "react";
import {
    MapPin,
    Phone,
    Building2,
    Globe,
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
import { EditBranchModal } from "./EditBranchDetails/edit-branch-modal";

interface BranchDetailsProps {
    branch: BranchEntity;
}

export default function BranchDetails({ branch }: BranchDetailsProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        Branch Details
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditOpen(true)}
                        className="h-7 text-xs gap-1.5 cursor-pointer"
                    >
                        <Pencil className="h-3 w-3" /> Edit Details
                    </Button>
                </CardHeader>
                <CardContent className="pt-4 space-y-3.5 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" /> Branch Name
                        </span>
                        <span className="font-semibold text-foreground">{branch.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" /> Address
                        </span>
                        <span className="font-mono text-foreground text-right max-w-[200px] truncate" title={branch.address}>
                            {branch.address || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" /> Phone
                        </span>
                        <span className="font-mono text-foreground">{branch.phone || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5" /> Latitude
                        </span>
                        <span className="font-mono text-foreground">{branch.latitude ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5" /> Longitude
                        </span>
                        <span className="font-mono text-foreground">{branch.longitude ?? "N/A"}</span>
                    </div>
                </CardContent>
            </Card>

            <EditBranchModal
                branch={branch}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />
        </>
    );
}