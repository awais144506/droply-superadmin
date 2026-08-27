/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import {
    Users,
    CheckCircle2,
    Ban
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { BranchEntity } from "@/types/branch";

interface BranchDetailsProps {
    branch: BranchEntity;
}

const INITIAL_STAFF = [
    {
        id: "stf-001",
        name: "Hamza Farooq",
        email: "hamza.operations@plant.pk",
        phone: "+92 321 4455667",
        role: "BRANCH MANAGER",
        status: "ACTIVE",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    },
    {
        id: "stf-002",
        name: "Bilal Ahmed",
        email: "bilal.fleet@plant.pk",
        phone: "+92 300 9876543",
        role: "FLEET DRIVER",
        status: "ACTIVE",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    },
];

const BranchStaffDetails = (props: BranchDetailsProps) => {
    const [staffList, setStaffList] = useState(INITIAL_STAFF);

    const toggleSuspendStatus = (staffId: string) => {
        setStaffList((prev: any[]) =>
            prev.map((member) => {
                if (member.id === staffId) {
                    const newStatus = member.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
                    return { ...member, status: newStatus };
                }
                return member;
            })
        );
    };
    return (
        <div>  <Card>
            <CardHeader className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {props.branch.name} Branch Staff ({staffList.length} / {props.branch.maxUsersLimit || 15} Allocated)
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Manage operational access for active managers, plant operators, and fleet drivers.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="pl-6">Staff Member</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="pr-6 text-right">Access Control</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staffList.map((member: any) => {
                            const isSuspended = member.status === "SUSPENDED";

                            return (
                                <TableRow key={member.id} className="hover:bg-muted/40 transition-colors">
                                    {/* Avatar, Name & Email */}
                                    <TableCell className="pl-6 py-3 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border bg-muted">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className={`h-full w-full object-cover transition-opacity ${isSuspended ? "opacity-40 grayscale" : "opacity-100"
                                                        }`}
                                                />
                                            </div>
                                            <div className="flex flex-col leading-tight">
                                                <span className={`font-semibold text-xs text-foreground ${isSuspended ? "line-through text-muted-foreground" : ""}`}>
                                                    {member.name}
                                                </span>
                                                <span className="text-[11px] text-muted-foreground font-mono">
                                                    {member.email}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Role Badge */}
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono text-[10px] tracking-wider uppercase">
                                            {member.role}
                                        </Badge>
                                    </TableCell>

                                    {/* Phone */}
                                    <TableCell className="text-xs font-mono text-muted-foreground">
                                        {member.phone}
                                    </TableCell>

                                    {/* Status Badge */}
                                    <TableCell>
                                        <Badge
                                            variant={isSuspended ? "destructive" : "active"}
                                            className="text-[10px]"
                                        >
                                            {member.status}
                                        </Badge>
                                    </TableCell>

                                    {/* Suspend / Reactivate CTA */}
                                    <TableCell className="pr-6 text-right">
                                        <Button
                                            variant={isSuspended ? "outline" : "destructive"}
                                            size="sm"
                                            onClick={() => toggleSuspendStatus(member.id)}
                                            className="h-7 text-xs px-2.5"
                                        >
                                            {isSuspended ? (
                                                <>
                                                    <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600" />
                                                    Reactivate
                                                </>
                                            ) : (
                                                <>
                                                    <Ban className="h-3 w-3 mr-1" />
                                                    Suspend
                                                </>
                                            )}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card></div>
    )
}

export default BranchStaffDetails