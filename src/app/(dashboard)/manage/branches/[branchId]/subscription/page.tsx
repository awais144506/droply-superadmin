"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
    ArrowLeft, 
    CreditCard, 
    Calendar, 
    CheckCircle2, 
    Download, 
    AlertCircle,
    Zap,
    Users,
    FileText,
    History
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getPlanBadge } from "@/lib/badges"; 
import { useBranchById } from "@/features/branches/api/use-branch"; // Adjust path
import { Loader2 } from "lucide-react";

export default function SubscriptionPage() {
    const params = useParams();
    const branchId = params.branchId as string;
    
    // Fetch real data
    const { data, isLoading, isError, error } = useBranchById(branchId);
    
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-slate-500 font-medium">Loading subscription details...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-rose-600 font-medium">
                Failed to load data: {error?.message || "Unknown error"}
            </div>
        );
    }

    const { branch, subscription, staff, customers } = data;

    // Derived Usage Stats
    const staffUsed = staff?.length || 0;
    const staffLimit = branch?.userLimit || 4; // Using userLimit from your Prisma schema
    const customersTotal = customers || 0;

    // --- DUMMY DATA FOR INVOICES & LOGS ---
    const dummyInvoices = [
        { id: "INV-2026-001", date: "Oct 10, 2026", amount: "Rs. 120,000", status: "PAID", method: "Bank Transfer" },
        { id: "INV-2025-089", date: "Oct 10, 2025", amount: "Rs. 100,000", status: "PAID", method: "Credit Card" },
        { id: "INV-2024-412", date: "Oct 10, 2024", amount: "Rs. 100,000", status: "PAID", method: "Credit Card" },
    ];

    const dummyLogs = [
        { id: 1, action: "Branch activated", date: "Oct 10, 2026, 10:30 AM", user: "Admin" },
        { id: 2, action: "Subscription renewed (Yearly)", date: "Oct 10, 2026, 10:05 AM", user: "System" },
        { id: 3, action: "Branch suspended (Past Due)", date: "Oct 08, 2026, 11:59 PM", user: "System" },
        { id: 4, action: "Staff member added", date: "Sep 15, 2026, 02:15 PM", user: "Owner" },
    ];

    return (
        <div className="min-w-7xl mx-auto space-y-6 p-6">
            
            {/* Page Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <Link
                    href={`/manage/branches/${branch.id}`}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        Subscription & Billing
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                        Manage billing, view usage, and download invoices for {branch.name}.
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* LEFT COLUMN: Current Plan & Invoices (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Subscription Details Card */}
                    <Card className="shadow-sm border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white rounded-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <Zap className="w-48 h-48 text-indigo-900 transform rotate-12" />
                        </div>
                        
                        <CardHeader className="p-6 pb-4 border-b border-indigo-100/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardDescription className="text-indigo-600/80 font-bold tracking-wider uppercase text-[10px] mb-1">
                                        Current Plan
                                    </CardDescription>
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-2xl font-black text-slate-900">
                                            {subscription?.tier || "GOLD"} Plan
                                        </CardTitle>
                                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold text-[10px] uppercase tracking-wider">
                                            ACTIVE
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-indigo-700">Rs. 120,000</div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        per {subscription?.cycle?.toLowerCase() || "yearly"}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="p-6 flex flex-col sm:flex-row gap-6 sm:gap-12">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" /> Billing Cycle
                                </span>
                                <p className="text-sm font-bold text-slate-800 capitalize">
                                    Billed {subscription?.cycle?.toLowerCase() || "Yearly"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Next Renewal
                                </span>
                                <p className="text-sm font-bold text-slate-800">
                                    {subscription?.renewDate 
                                        ? new Date(subscription.renewDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) 
                                        : "N/A"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <CreditCard className="h-3.5 w-3.5" /> Payment Method
                                </span>
                                <p className="text-sm font-bold text-slate-800">
                                    Bank Transfer
                                </p>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0 flex gap-3">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm">
                                Change Plan
                            </Button>
                            <Button variant="outline" className="font-bold text-slate-600 border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm">
                                Cancel Subscription
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Billing History Table */}
                    <Card className="shadow-sm border-slate-200/80 rounded-2xl">
                        <CardHeader className="p-5 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                                <FileText className="h-4 w-4 text-slate-400" />
                                Billing History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="pl-6 h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Invoice</TableHead>
                                        <TableHead className="h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</TableHead>
                                        <TableHead className="h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Amount</TableHead>
                                        <TableHead className="h-10 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                                        <TableHead className="pr-6 h-10 text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dummyInvoices.map((inv) => (
                                        <TableRow key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="pl-6 font-mono text-xs font-bold text-slate-700 py-4">
                                                {inv.id}
                                            </TableCell>
                                            <TableCell className="text-xs font-medium text-slate-600">
                                                {inv.date}
                                            </TableCell>
                                            <TableCell className="text-xs font-bold text-slate-900">
                                                {inv.amount}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-bold uppercase tracking-wider">
                                                    {inv.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="pr-6 text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: Usage Stats & History Logs (1/3 width) */}
                <div className="space-y-6">
                    
                    {/* Usage Limits Card */}
                    <Card className="shadow-sm border-slate-200/80 rounded-2xl">
                        <CardHeader className="p-5 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                                <Users className="h-4 w-4 text-slate-400" />
                                Plan Usage
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-6">
                            {/* Staff Usage Progress */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-bold text-slate-600">Staff Seats</span>
                                    <span className="text-xs font-bold text-slate-900">{staffUsed} <span className="text-slate-400">/ {staffLimit}</span></span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${staffUsed / staffLimit > 0.8 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                                        style={{ width: `${Math.min((staffUsed / staffLimit) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                {staffUsed / staffLimit > 0.8 && (
                                    <p className="text-[10px] font-semibold text-amber-600 mt-2 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" /> Nearing capacity
                                    </p>
                                )}
                            </div>

                            <div className="pt-4 border-t border-dashed border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-600">Total Customers</span>
                                    <span className="text-sm font-black text-indigo-600">{customersTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">Unlimited customers on Gold tier</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* History Logs Card */}
                    <Card className="shadow-sm border-slate-200/80 rounded-2xl">
                        <CardHeader className="p-5 border-b border-slate-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
                                <History className="h-4 w-4 text-slate-400" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {dummyLogs.map((log, index) => (
                                    <div key={log.id} className="relative flex items-start gap-4">
                                        {/* Timeline Dot */}
                                        <div className="absolute left-0 mt-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white z-10"></div>
                                        
                                        <div className="pl-6 w-full">
                                            <p className="text-xs font-bold text-slate-800">{log.action}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-[10px] font-medium text-slate-500">{log.date}</span>
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{log.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}