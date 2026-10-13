"use client";

import React from "react";
import { useAdminLogs } from "../api/use-admin-logs";
import { formatDistanceToNow } from "date-fns";
import { 
    Bell, 
    CreditCard, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    AlertTriangle, 
    Clock, 
    Loader2
} from "lucide-react";
import { SubscriptionLogType } from "../types/logs";

const LOG_CONFIG: Record<SubscriptionLogType, { icon: React.ElementType, color: string, bg: string }> = {
    PAYMENT_SUBMITTED: { icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-100" },
    UPGRADE_REQUEST: { icon: ArrowUpCircle, color: "text-sky-600", bg: "bg-sky-100" },
    DOWNGRADE_SCHEDULED: { icon: ArrowDownCircle, color: "text-amber-600", bg: "bg-amber-100" },
    CANCELLATION_REQUEST: { icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-100" },
    RENEWAL_REMINDER: { icon: Clock, color: "text-indigo-600", bg: "bg-indigo-100" },
};

export default function AdminLogsFeed() {
    const { data: logData, isLoading, isError } = useAdminLogs();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-2" />
                <p className="text-xs text-slate-500 font-medium">Loading activity logs...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
                <p className="text-sm text-rose-500 font-medium">Failed to load logs.</p>
            </div>
        );
    }

    const responsePayload = logData?.data || logData;
    const unreadCount = responsePayload?.unreadCount || 0;
    const allLogs = responsePayload?.allLogs || [];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col max-h-[600px] overflow-hidden sticky top-6">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-slate-700" />
                    <h3 className="text-sm font-bold text-slate-900">Subscription Activity</h3>
                </div>
                {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                        {unreadCount} New
                    </span>
                )}
            </div>

            {/* Feed List */}
            <div className="overflow-y-auto flex-1 p-2">
                {allLogs.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm font-medium">
                        No recent subscription activity.
                    </div>
                ) : (
                    <div className="space-y-1">
                        {allLogs.map((log: any) => {
                            const config = LOG_CONFIG[log.type as SubscriptionLogType] || LOG_CONFIG.PAYMENT_SUBMITTED;
                            const Icon = config.icon;

                            return (
                                <div 
                                    key={log.id} 
                                    className={`p-3 rounded-xl flex items-start gap-3 transition-colors ${log.isRead ? "hover:bg-slate-50" : "bg-indigo-50/50 border border-indigo-100/50"}`}
                                >
                                    <div className={`mt-0.5 p-2 rounded-full shrink-0 ${config.bg}`}>
                                        <Icon className={`w-4 h-4 ${config.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm leading-tight ${log.isRead ? "text-slate-600 font-medium" : "text-slate-900 font-bold"}`}>
                                            {log.message}
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wide">
                                            {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            {allLogs.length > 0 && (
                <div className="p-3 border-t border-slate-100 text-center bg-slate-50/50">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        Mark all as read
                    </button>
                </div>
            )}
        </div>
    );
}