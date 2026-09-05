import { Check, Ban, ShieldAlert, Clock, Sparkles, Crown, Zap } from "lucide-react";
import { BranchStatus } from "@/types/branch";

export const getStatusBadge = (status: BranchStatus) => {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
          <Check className="h-3 w-3" /> Active
        </span>
      );
    case "PAST_DUE":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
          <ShieldAlert className="h-3 w-3" /> Past Due
        </span>
      );
    case "SUSPENDED":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-600 border">
          <Ban className="h-3 w-3" /> Suspended
        </span>
      );
    default:
      return null;
  }
};

export const getPlanBadge = (tier: string, cycle: string) => {
  // Styled Tier Badge with vibrant styling
  const renderTier = () => {
    switch (tier) {
      case "PLATINUM":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-xs">
            <Crown className="h-3 w-3" /> Platinum
          </span>
        );
      case "GOLD":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-linear-to-r from-amber-500 to-yellow-500 text-white shadow-xs">
            <Sparkles className="h-3 w-3" /> Gold
          </span>
        );
      case "SILVER":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-linear-to-r from-slate-400 to-slate-500 text-white shadow-xs">
            <Zap className="h-3 w-3" /> Silver
          </span>
        );
    }
  };

  // Styled Cycle / Plan Badge
  const renderCycle = () => {
    switch (cycle) {
      case "TRIAL":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
            <Clock className="h-3 w-3" /> Trial
          </span>
        );
      case "YEARLY":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            Yearly
          </span>
        );
      case "MONTHLY":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
            Monthly
          </span>
        );
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {renderTier()}
      {renderCycle()}
    </div>
  );
};