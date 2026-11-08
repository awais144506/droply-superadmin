/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, PhoneCall, Calendar, CheckCircle2, XCircle, FileText } from "lucide-react";

export function LeadStats({ stats }: { stats?: any }) {
    if (!stats) return null;

    const statCards = [
        { label: "Total Leads", value: stats.total, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "New", value: stats.new, icon: FileText, color: "text-sky-600", bg: "bg-sky-50" },
        { label: "Contacted", value: stats.contacted, icon: PhoneCall, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Meeting Set", value: stats.meeting, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Converted", value: stats.converted, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 h-full">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Lead Overview</h3>
            
            <div className="flex flex-col space-y-4">
                {statCards.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                {stat.label}
                            </span>
                        </div>
                        <span className="text-lg font-black text-slate-900">
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}