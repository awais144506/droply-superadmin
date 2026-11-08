"use client";

import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BranchDetails, BranchStaffItem } from "../../types/branch";

interface BranchStaffDetailsProps {
    branch: BranchDetails;
    staff: BranchStaffItem[];
    maxUsersLimit?: number;
}

export default function BranchStaffDetails({
    branch,
    staff,
}: BranchStaffDetailsProps) {

    // Helper to generate a 2-letter avatar from the user's name
    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    };

    return (
        <Card className="shadow-sm border-slate-200/80 rounded-2xl overflow-hidden h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <CardTitle className="text-sm font-bold flex items-center gap-2.5 text-slate-800">
                        <div className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
                            <Users className="h-4 w-4" />
                        </div>
                        {branch.name} Staff
                        <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full ml-1 shadow-sm">
                            {staff.length} / {branch.userLimit}
                        </span>
                    </CardTitle>
                    <CardDescription className="text-xs mt-2 text-slate-500 font-medium">
                        Manage operational access for active managers, plant operators, and fleet drivers.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-50/30">
                        <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="pl-6 h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Staff Member</TableHead>
                            <TableHead className="h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</TableHead>
                            <TableHead className="h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phone</TableHead>
                            <TableHead className="pr-6 h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staff.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-slate-500">
                                    <p className="text-sm font-medium">No staff members found.</p>
                                    <p className="text-xs mt-1">Tenant has not added any operational staff yet.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            staff.map((member) => {
                                const isSuspended = member.status === "SUSPENDED";

                                return (
                                    <TableRow key={member.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">

                                        {/* Avatar & Name */}
                                        <TableCell className="pl-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex items-center justify-center h-9 w-9 shrink-0 rounded-full text-xs font-bold shadow-sm border ${isSuspended
                                                        ? "bg-slate-100 text-slate-400 border-slate-200"
                                                        : "bg-linear-to-br from-sky-100 to-indigo-100 text-indigo-700 border-indigo-200/50"
                                                    }`}>
                                                    {getInitials(member.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-bold text-sm ${isSuspended ? "text-slate-400 line-through" : "text-slate-900"}`}>
                                                        {member.name}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-slate-500">
                                                        CNIC: {member.cnic || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Role Badge */}
                                        <TableCell>
                                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md uppercase tracking-wider">
                                                {member.role?.replace("_", " ") || "STAFF"}
                                            </span>
                                        </TableCell>

                                        {/* Phone */}
                                        <TableCell className="text-xs font-mono font-medium text-slate-600">
                                            {member.phone || "N/A"}
                                        </TableCell>

                                        {/* Status Badge */}
                                        <TableCell className="pr-6 text-right align-middle">
                                            <Badge
                                                variant="outline"
                                                className={`text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 border ${member.status === "ACTIVE"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : isSuspended
                                                            ? "bg-rose-50 text-rose-700 border-rose-200"
                                                            : "bg-slate-50 text-slate-600 border-slate-200"
                                                    }`}
                                            >
                                                {member.status}
                                            </Badge>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}