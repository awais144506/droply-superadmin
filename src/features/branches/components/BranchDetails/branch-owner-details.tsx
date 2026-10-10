import {
    Building2,
    Calendar,
    Mail,
    Phone,
    User,
    ShieldCheck
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { BranchDetails, BranchOwner } from "../../types/branch";
import { formatPhoneNumber } from "react-phone-number-input";

interface BranchOwnerDetailsProps {
    branch: BranchDetails;
    owner: BranchOwner;
}

export default function BranchOwnerDetails({ branch, owner }: BranchOwnerDetailsProps) {

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Card className="shadow-sm border-slate-200/80 rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-5">
                <CardTitle className="text-sm font-bold flex items-center gap-2.5 text-slate-800">
                    <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                        <Building2 className="h-4 w-4" />
                    </div>
                    Branch & Owner Profile
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-5 flex flex-col gap-3.5 text-sm">

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <User className="h-4 w-4 text-slate-400" /> Owner Name
                    </span>
                    <span className="text-slate-900 font-bold">{owner?.name || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Mail className="h-4 w-4 text-slate-400" /> Email Address
                    </span>
                    <span className="text-slate-900 font-bold">{owner?.email || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Phone className="h-4 w-4 text-slate-400" /> WhatsApp / Phone
                    </span>
                    <span className="text-slate-900 font-bold">{formatPhoneNumber(owner?.phone) || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" /> CNIC
                    </span>
                    <span className="text-slate-900 font-bold">{owner?.cnic || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Calendar className="h-4 w-4 text-slate-400" /> Registered Date
                    </span>
                    <span className="text-slate-700 font-semibold">{formatDate(branch.createdAt)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2 font-medium">
                        <Calendar className="h-4 w-4 text-slate-400" /> Last Updated
                    </span>
                    <span className="text-slate-700 font-semibold">{formatDate(branch.updatedAt)}</span>
                </div>

            </CardContent>
        </Card>
    );
}