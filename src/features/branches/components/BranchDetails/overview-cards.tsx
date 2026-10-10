import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Clock, Users, CreditCard, UserCheck } from "lucide-react";
import { Subscription } from "../../types/branch";
import { getPlanBadge } from "@/lib/badges";

interface BranchOverViewCardProps {
  subscription?: Subscription;
  staffCount?: number;
  customersCount?: number;
  userLimit: number;
}

export default function BranchOverViewCard({
  subscription,
  staffCount,
  customersCount,
  userLimit
}: BranchOverViewCardProps) {

  // Calculate days left using renewDate
  const renewDate = subscription?.renewDate ? new Date(subscription.renewDate) : null;
  const now = new Date();
  const daysLeft = renewDate
    ? Math.max(0, Math.ceil((renewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  // Format the date safely for React to render
  const formattedRenewDate = renewDate 
    ? renewDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "No date set";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Subscription Tier & Cycle */}
      <Card className="shadow-sm border-slate-200/80 bg-linear-to-br from-white to-slate-50/50 rounded-2xl">
        <CardHeader className="p-4 md:p-5">
          <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Subscription Plan
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <div>{getPlanBadge(subscription?.tier || "GOLD", subscription?.cycle || "TRIAL")}</div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 2. Days Left & Renew Date */}
      <Card className="shadow-sm border-slate-200/80 bg-linear-to-br from-white to-emerald-50/30 rounded-2xl">
        <CardHeader className="p-4 md:p-5">
          <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Subscription Time Left
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-xl font-black font-mono text-emerald-600 leading-none">
                {daysLeft !== null ? `${daysLeft} Days` : "N/A"}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wide">
                Renews: {formattedRenewDate}
              </span>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 3. Staff Seats Utilization */}
      <Card className="shadow-sm border-slate-200/80 bg-linear-to-br from-white to-sky-50/30 rounded-2xl">
        <CardHeader className="p-4 md:p-5">
          <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Staff Seats Used
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-black text-slate-900">
              {staffCount || 0} <span className="text-xs font-bold text-slate-400">/ {userLimit}</span>
            </span>
            <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
              <Users className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 4. Total Customers */}
      <Card className="shadow-sm border-slate-200/80 bg-linear-to-br from-white to-indigo-50/30 rounded-2xl">
        <CardHeader className="p-4 md:p-5">
          <CardDescription className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total Customers
          </CardDescription>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-black text-indigo-700">
              {customersCount?.toLocaleString() || 0}
            </span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}