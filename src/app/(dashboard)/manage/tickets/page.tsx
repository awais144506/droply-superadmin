"use client";

import { Loader2 } from "lucide-react";
import { useTickets } from "@/features/tickets/api/use-tickets";
import { TicketStats } from "@/features/tickets/components/ticket-stats";
import { TicketTable } from "@/features/tickets/components/ticket-table";

export default function SupportTicketsPage() {
  const { data: tickets = [], isLoading, isError } = useTickets();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Loading support queue...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-400">
        <p className="text-sm font-bold">Failed to load support tickets.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-350 mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Support Desk</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage tenant inquiries, resolve operational issues, and track support SLA metrics.
        </p>
      </div>

      <TicketStats tickets={tickets} />
      <TicketTable tickets={tickets} />
    </div>
  );
}