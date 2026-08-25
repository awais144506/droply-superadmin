import { cn } from "@/lib/utils";

interface BranchQuotaProgressProps {
  activeUsers: number;
  maxUsers: number;
}

export function BranchQuotaProgress({ activeUsers, maxUsers }: BranchQuotaProgressProps) {
  const percentage = Math.min(Math.round((activeUsers / maxUsers) * 100), 100);
  const isNearLimit = percentage >= 85;

  return (
    <div className="flex flex-col gap-1 w-28">
      <div className="flex justify-between text-xs font-mono">
        <span className={cn("font-semibold", isNearLimit ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>
          {activeUsers}
        </span>
        <span className="text-muted-foreground">/ {maxUsers} Seats</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isNearLimit ? "bg-amber-500" : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}