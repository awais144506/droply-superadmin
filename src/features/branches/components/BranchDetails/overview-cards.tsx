import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Clock, Users, Calendar } from "lucide-react";
import { BranchEntity } from "@/types/branch";

interface BranchOverViewCardProps {
  branch: BranchEntity ;
}

export default function BranchOverViewCard({ branch }: BranchOverViewCardProps) {
  const sub = branch?.subscription;
  const endDate = sub?.currentPeriodEnd ? new Date(sub.currentPeriodEnd) : null;
  const now = new Date();
  const daysLeft = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Subscription Tier */}
      <Card className="shadow-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-medium">
            Subscription Tier
          </CardDescription>
          <CardTitle className="text-xl font-bold capitalize flex items-center justify-between">
            <span>{sub?.plan || "TRIAL"}</span>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 2. Days Left */}
      <Card className="shadow-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-medium">
            Days Left
          </CardDescription>
          <CardTitle className="text-xl font-bold font-mono text-emerald-600 flex items-center justify-between">
            <span>{daysLeft !== null ? `${daysLeft} Days` : "N/A"}</span>
            <Clock className="h-4 w-4 text-emerald-600" />
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 3. Staff Limit */}
      <Card className="shadow-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-medium">
            Staff Limit
          </CardDescription>
          <CardTitle className="text-xl font-bold flex items-center justify-between">
            <span>{branch?.maxUsersLimit || 15} Seats</span>
            <Users className="h-4 w-4 text-primary" />
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 4. Current Period Ends */}
      <Card className="shadow-xs">
        <CardHeader className="pb-2">
          <CardDescription className="text-xs font-medium">
            Current Period Ends
          </CardDescription>
          <CardTitle className="font-bold flex items-center justify-between text-base">
            <span>
              {endDate
                ? endDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
            <Calendar className="h-4 w-4 text-primary" />
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}