import { Badge } from "@/components/ui/badge";
import { BranchStatus } from "../types";
import { cn } from "@/lib/utils";

interface BranchStatusBadgeProps {
  status: BranchStatus;
}

export function BranchStatusBadge({ status }: BranchStatusBadgeProps) {
  const configs: Record<BranchStatus, { label: string; className: string }> = {
    ACTIVE: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200/50",
    },
    PAST_DUE: {
      label: "Past Due",
      className: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200/50",
    },
    SUSPENDED: {
      label: "Suspended",
      className: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200/50",
    },
  };

  const config = configs[status];

  return (
    <Badge
      variant="outline"
      className={cn("text-[11px] font-medium px-2 py-0.5 shadow-none", config.className)}
    >
      {config.label}
    </Badge>
  );
}