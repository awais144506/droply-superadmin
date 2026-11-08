export type SubscriptionLogType =
  | "UPGRADE_REQUEST"
  | "DOWNGRADE_SCHEDULED"
  | "PAYMENT_SUBMITTED"
  | "CANCELLATION_REQUEST"
  | "RENEWAL_REMINDER";

export interface SubscriptionLog {
  id: string;
  branchId: string;
  type: SubscriptionLogType;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminLogsResponse {
    unreadCount: number;
    unreadLogs: SubscriptionLog[];
    readLogs: SubscriptionLog[];
    allLogs: SubscriptionLog[];
}