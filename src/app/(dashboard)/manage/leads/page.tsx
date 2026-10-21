"use client"

import { useAllLeads } from "@/features/leads/api/use-leads";
import Loading from "@/app/loading";
import ErrorBoundary from "@/app/error";
import { LeadStats } from "@/features/leads/components/leads-stats";
import { LeadsList } from "@/features/leads/components/leads-list";
import ActivityLogsCard from "@/lib/utils/components/ActivityLogsMainPage";
import MainPageHeader from "@/lib/utils/components/MainPageHeader";

const WebsiteLeads = () => {
    const { data, isLoading, isError, error, refetch, isRefetching } = useAllLeads();

    if (isLoading) return <Loading text="Loading Stats..." />;
    if (isError) return <ErrorBoundary error={error?.message} />;

    return (
        <div className="space-y-6 p-6">
            <div>
                <MainPageHeader
                    heading="Lead Management"
                    description="Track and update the status of your website leads."
                    onRefresh={refetch}
                    isRefreshing={isRefetching}
                />
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