"use client";

import {
    MapPin,
    Phone,
    Store,
    Globe
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BranchDetails as BranchType } from "../../types/branch";
import { formatPhoneNumber } from "react-phone-number-input";

interface BranchDetailsProps {
    branch: BranchType;
}

export default function BranchDetails({ branch }: BranchDetailsProps) {

    return (
        <Card className="shadow-sm border-slate-200/80 rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-5">
                <CardTitle className="text-sm font-bold flex items-center gap-2.5 text-slate-800">
                    <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                        <Store className="h-4 w-4" />
                    </div>
                    Location & Contact Info
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-5 flex flex-col gap-3.5 text-sm">

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Store className="h-4 w-4 text-slate-400" /> Branch Name
                    </span>
                    <span className="text-slate-900 font-bold">{branch.name}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium shrink-0">
                        <MapPin className="h-4 w-4 text-slate-400" /> Address
                    </span>
                    <span className="text-slate-900 font-bold text-right" title={branch.address}>
                        {branch.address || "N/A"}
                    </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Phone className="h-4 w-4 text-slate-400" /> Phone
                    </span>
                    <span className="text-slate-900 font-bold">{formatPhoneNumber(branch.phone )|| "N/A"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Globe className="h-4 w-4 text-slate-400" /> Latitude
                    </span>
                    <span className="text-slate-900 font-bold font-mono text-[13px]">{branch.latitude}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Globe className="h-4 w-4 text-slate-400" /> Longitude
                    </span>
                    <span className="text-slate-900 font-bold font-mono text-[13px]">{branch.longitude}</span>
                </div>

            </CardContent>
        </Card>
    );
}