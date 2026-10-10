"use client"

import { useAllLeads } from "@/features/leads/api/use-leads";
import Loading from "@/app/loading";
import ErrorBoundary from "@/app/error";
import { LeadStats } from "@/features/leads/components/leads-stats";
import { LeadsList } from "@/features/leads/components/leads-list";
import ActivityLogsCard from "@/lib/utils/components/ActivityLogsMainPage";

const WebsiteLeads = () => {
    const { data, isLoading, isError, error } = useAllLeads();

    if (isLoading) return <Loading text="Loading Stats..." />;
    if (isError) return <ErrorBoundary error={error?.message} />;

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Management</h1>
                <p className="text-sm text-slate-500 mt-1">Track and update the status of your website leads.</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                <div className="xl:col-span-3 h-full">
                    <LeadStats stats={data?.stats} />
                </div>
                <div className="xl:col-span-9">
                    <LeadsList leads={data?.leads || []} />
                </div>

            </div>
            <div>
                <ActivityLogsCard
                    title="Lead Activity"
                    logs={data?.logs || []}
                />
            </div>

        </div>
    );
}

export default WebsiteLeads;