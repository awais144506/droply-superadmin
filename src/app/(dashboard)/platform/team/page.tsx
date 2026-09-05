"use client";

import { Loader2 } from "lucide-react";
import { useTeam } from "@/features/team/api/use-team";
import { TeamStats } from "@/features/team/components/team-stats";
import { TeamTable } from "@/features/team/components/team-table";

export default function PlatformTeamPage() {
  const { data: team = [], isLoading, isError } = useTeam();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Loading platform administrators...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-400">
        <p className="text-sm font-bold">Failed to load team data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Users & Team</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage Super Admins, Support Agents, and their respective system access levels.
        </p>
      </div>

      <TeamStats team={team} />
      <TeamTable team={team} />
    </div>
  );
}