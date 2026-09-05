"use client";

import { useState, useEffect } from "react";
import { Activity, ShieldAlert, CreditCard, MessageSquare, Server, Check, CheckIcon } from "lucide-react";
import { SystemLog } from "../api/use-super-dashboard";
import { Button } from "@/components/ui/button";

export function SystemLogs({ logs }: { logs: SystemLog[] }) {
    const [localLogs, setLocalLogs] = useState<SystemLog[]>([]);
    useEffect(() => { setLocalLogs(logs); }, [logs]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const unreadCount = localLogs.filter(log => !log.isRead).length;
    const totalPages = Math.ceil(localLogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedLogs = localLogs.slice(startIndex, startIndex + itemsPerPage);

    const markAsRead = (id: string) => {
        setLocalLogs(prev => prev.map(log => log.id === id ? { ...log, isRead: true } : log));
    };

    const markAllAsRead = () => {
        setLocalLogs(prev => prev.map(log => ({ ...log, isRead: true })));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "ALERT": return <ShieldAlert className="h-4 w-4 text-rose-500" />;
            case "PAYMENT": return <CreditCard className="h-4 w-4 text-emerald-500" />;
            case "TICKET": return <MessageSquare className="h-4 w-4 text-amber-500" />;
            default: return <Server className="h-4 w-4 text-slate-500" />;
        }
    };

    const formatDate = (isoString: string) => {
        const dateObj = new Date(isoString);
        return {
            date: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            time: dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
        };
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-sky-600" /> Platform Logs
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">System activity stream.</span>
                        {unreadCount > 0 && (
                            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                                {unreadCount} Unread
                            </span>
                        )}
                    </div>
                </div>
                {unreadCount > 0 && (
                    <Button onClick={markAllAsRead} variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-slate-500 hover:text-sky-600 cursor-pointer">
                        <CheckIcon className="h-3.5 w-3.5 mr-1" /> Mark All
                    </Button>
                )}
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {paginatedLogs.map(log => {
                    const { date, time } = formatDate(log.timestamp);
                    return (
                        <div key={log.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${!log.isRead ? "bg-sky-50/30 border-sky-100" : "bg-white border-slate-100 hover:border-slate-200"}`}>
                            <div className={`mt-0.5 shadow-sm p-1.5 rounded-lg border shrink-0 ${!log.isRead ? "bg-white border-sky-100" : "bg-slate-50 border-slate-100"}`}>
                                {getIcon(log.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-xs ${!log.isRead ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                                    {log.message}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{date}</span>
                                    <span className="text-[10px] font-medium text-slate-400">{time}</span>
                                    {log.branchName && (
                                        <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                                            {log.branchName}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {!log.isRead && (
                                <Button
                                    onClick={() => markAsRead(log.id)}
                                    variant="ghost"
                                    size="icon-sm"
                                    className="h-6 w-6 shrink-0 text-sky-600 hover:bg-sky-100 rounded-md cursor-pointer"
                                    title="Mark as read"
                                >
                                    <Check className="h-3 w-3" />
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                    <p className="text-[10px] font-medium text-slate-500">Page {currentPage} of {totalPages}</p>
                    <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-6 px-2 text-[10px] bg-white cursor-pointer">Prev</Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-6 px-2 text-[10px] bg-white cursor-pointer">Next</Button>
                    </div>
                </div>
            )}
        </div>
    );
}