"use client";

import { Building2, CheckCircle2, ShieldAlert, Ban } from "lucide-react";
import PageStatsCard from "@/lib/utils/components/StatsMainPageCards";

type BranchStatsProps = {
  total: number;
  active: number;
  pastDue: number;
  suspended: number;
  isLoading?: boolean;
};

export function BranchStats({
  total,
  active,
  pastDue,
  suspended,
  isLoading = false,
}: BranchStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Branches - Blue */}
      <PageStatsCard
        title="Total Branches"
        value={total}
        icon={Building2}
        iconContainerClass="bg-blue-50 text-blue-600"
        isLoading={isLoading}
      />
      
      {/* Active Branches - Green */}
      <PageStatsCard
        title="Active Branches"
        value={active}
        icon={CheckCircle2}
        iconContainerClass="bg-emerald-50 text-emerald-600"
        isLoading={isLoading}
      />
      
      {/* Past Due Branches - Yellow/Orange */}
      <PageStatsCard
        title="Past Due"
        value={pastDue}
        icon={ShieldAlert}
        iconContainerClass="bg-amber-50 text-amber-600"
        isLoading={isLoading}
      />
      
      {/* Suspended Branches - Red */}
      <PageStatsCard
        title="Suspended"
        value={suspended}
        icon={Ban}
        iconContainerClass="bg-rose-50 text-rose-600"
        isLoading={isLoading}
      />
    </div>
  );
}