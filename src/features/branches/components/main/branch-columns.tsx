import { User, Phone, Mail, CreditCard } from "lucide-react";
import { Branch } from "../../types/branch";
import { ColumnDef } from "@/lib/utils/components/TableCreateMachine";
import { formatPhoneNumber } from "react-phone-number-input";

export const getBranchColumns = (): ColumnDef<Branch>[] => [
    {
        header: "Branch Code",
        render: (branch) => (
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md">
                {branch.branchCode}
            </span>
        ),
    },
    {
        header: "Branch Details",
        render: (branch) => (
            <div>
                <div className="font-bold text-slate-900 text-sm">
                    {branch.name || branch.name}
                </div>
                <div className="text-xs text-slate-500 truncate max-w-xs mt-0.5">
                    {branch.address || branch.address}
                </div>
            </div>
        ),
    },
    {
        header: "Owner Details",
        render: (branch) => (
            <div>
                <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                    <User className="h-3 w-3 text-sky-600 shrink-0" />
                    <span>{branch.owner?.name || "N/A"}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                    {branch.owner?.phone && (
                        <span className="flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5 text-slate-400" />
                            {formatPhoneNumber(branch.owner.phone)}
                        </span>
                    )}
                    {branch.owner?.email && (
                        <span className="flex items-center gap-1">
                            <Mail className="h-2.5 w-2.5 text-slate-400" />
                            {branch.owner.email}
                        </span>
                    )}
                </div>
            </div>
        ),
    },
    {
        header: "Subscription",
        render: (branch) => {
            const sub = branch.subscription;
            return (
                <div className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    <div>
                        <span className="text-xs font-bold text-slate-900 uppercase">
                            {sub?.tier || "TRIAL"}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-1 uppercase font-medium">
                            ({sub?.cycle || "FREE"})
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Status",
        render: (branch) => (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold ${branch.status === 'ACTIVE'
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                    : branch.status === 'PAST_DUE'
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-rose-50 text-rose-600 border border-rose-100"
                }`}>
                {branch.status}
            </span>
        ),
    },
];