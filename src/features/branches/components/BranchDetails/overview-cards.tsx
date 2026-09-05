import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Users, Calendar, CreditCard } from "lucide-react";
import { BranchEntity } from "@/types/branch";
import { getPlanBadge } from "@/lib/utils/badges";

interface BranchOverViewCardProps {
  branch: BranchEntity;
}

export default function BranchOverViewCard({ branch }: BranchOverViewCardProps) {
  const sub = branch?.subscription;
  
  // Calculate days left using renewDate
  const renewDate = sub?.renewDate ? new Date(sub.renewDate) : null;
  const now = new Date();
  const daysLeft = renewDate
    ? Math.max(0, Math.ceil((renewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  // Active users count from relation count or array length
  const currentUsersCount = branch?._count?.users ?? branch?.users?.length ?? 0;
  const maxLimit = branch?.maxUsersLimit || 15;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Subscription Tier & Cycle (Using Shared Utility) */}
      <Card className="shadow-xs border-slate-200/80 bg-linear-to-br from-white to-slate-50/50">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Subscription Tier
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <div>{getPlanBadge(sub?.tier || "GOLD", sub?.cycle || "TRIAL")}</div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 2. Days Left */}
      <Card className="shadow-xs border-slate-200/80 bg-linear-to-br from-white to-emerald-50/30">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Days Left
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold font-mono text-emerald-600">
              {daysLeft !== null ? `${daysLeft} Days` : "N/A"}
            </span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 3. Staff Seats Utilization */}
      <Card className="shadow-xs border-slate-200/80 bg-linear-to-br from-white to-sky-50/30">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Staff Seats Used
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-extrabold text-slate-900">
              {currentUsersCount} <span className="text-xs font-medium text-slate-400">/ {maxLimit}</span>
            </span>
            <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
              <Users className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 4. Renewal Date */}
      <Card className="shadow-xs border-slate-200/80 bg-linear-to-br from-white to-indigo-50/30">
        <CardHeader className="pb-3">
          <CardDescription className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Renewal Date
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-slate-800 text-sm">
              {renewDate
                ? renewDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}