"use client";

import { Loader2 } from "lucide-react";
import { useSubscriptions } from "@/features/subscriptions/api/use-subscriptions";
import { SubscriptionStats } from "@/features/subscriptions/components/subscription-stats";
import { SubscriptionTable } from "@/features/subscriptions/components/subscription-table";

export default function SubscriptionsPage() {
  const { data: subscriptions = [], isLoading, isError } = useSubscriptions();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-sky-600" />
        <p className="text-sm font-medium">Loading subscription data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-400">
        <p className="text-sm font-bold">Failed to load subscriptions. Please check API connection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Active Subscriptions</h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor recurring billing cycles, plan tiers, and tenant renewal statuses.
        </p>
      </div>

      <SubscriptionStats subscriptions={subscriptions} />
      <SubscriptionTable subscriptions={subscriptions} />
    </div>
  );
}