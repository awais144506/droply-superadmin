"use client";

import { useState } from "react";
import {
  Activity,
  Check,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  usePlatformLogs,
  useMarkLogAsRead,
  useMarkAllLogsAsRead
} from "../api/use-platform-logs";

export function PlatformLogs() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const skip = (page - 1) * itemsPerPage;

  const { data: logs = [], isLoading } = usePlatformLogs(itemsPerPage, skip);
  const { mutate: markAsRead } = useMarkLogAsRead();
  const { mutate: markAllAsRead, isPending: isMarkingAll } = useMarkAllLogsAsRead();
  const unreadCount = logs.filter(log => log.status === "UNREAD").length;

  return (
    <Card className="w-full max-w-md shadow-sm border-slate-200 flex flex-col h-full">
      <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <Activity className="h-5 w-5 text-sky-600" />
            Platform Logs
          </CardTitle>
          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-sm text-slate-500">System activity stream.</p>
            {unreadCount > 0 && (
              <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none px-2 py-0.5 text-[10px] font-bold">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500 mr-1.5" />
                {unreadCount} Unread
              </Badge>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => markAllAsRead()}
            disabled={isMarkingAll}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 h-8 cursor-pointer"
          >
            {isMarkingAll ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Check className="h-3.5 w-3.5 mr-1" />}
            Mark All
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-10 text-sm text-slate-500">
              No recent activity logs.
            </div>
          ) : (
            logs.map((log) => {
              const isUnread = log.status === "UNREAD";

              return (
                <div
                  key={log.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${isUnread ? "bg-white border-slate-200 shadow-sm" : "bg-slate-50/50 border-slate-100 opacity-75"
                    }`}
                >

                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className={`text-xs ${isUnread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                      {log.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[11px] font-medium text-slate-400">
                        {new Date(log.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>

                  {isUnread && (
                    <button
                      onClick={() => markAsRead(log.id)}
                      className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer ml-2 mt-1"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Page {page}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs text-slate-500 cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs font-bold text-slate-900 cursor-pointer"
              disabled={logs.length < itemsPerPage}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}