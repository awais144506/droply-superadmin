"use client";

import AdminLogsFeed from "@/features/dashboard/components/admin-logs-feed";

export default function SuperAdminDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Super Admin Dashboard</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Monitor branch subscriptions, payments, and system health.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Main Content Area (Spans 2-3 columns depending on screen size) */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
            {/* You will put your Pending Payments Verification Table here next! */}
            <div className="bg-white border border-slate-200 rounded-2xl h-96 flex flex-col items-center justify-center text-slate-400 border-dashed">
                [ Pending Payments Verification Table Will Go Here ]
            </div>
        </div>

        {/* Sidebar / Logs Area (Spans 1 column) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            <AdminLogsFeed />
        </div>

      </div>
    </div>
  );
}