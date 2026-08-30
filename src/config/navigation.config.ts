import {
  Building2,
  CreditCard,
  MessageSquare,
  FileCheck,
  BarChart3,
  Users,
  Settings,
  Layers,
  Activity,
  LucideIcon,
  FileText,
} from "lucide-react";

export type UserRole = "SUPER_ADMIN" | "SUPPORT_ADMIN";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  allowedRoles: UserRole[];
}

export interface NavGroup {
  label: string;
  headerColor: {
    text: string;
    dot: string;
    border: string;
    bgHover: string;
  };
  items: NavItem[];
}

export const BRANCH_NAV_CONFIG: NavGroup[] = [
  {
    label: "BRANCH MANAGEMENT",
    headerColor: {
      text: "text-sky-600 dark:text-sky-400",
      dot: "bg-sky-500",
      border: "border-sky-500/20",
      bgHover: "hover:bg-sky-500/5",
    },
    items: [
      {
        title: "Branches",
        url: "/manage/branches",
        icon: Building2,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
      {
        title: "Subscriptions",
        url: "/manage/subscriptions",
        icon: CreditCard,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
      {
        title: "Payment Clearance",
        url: "/manage/clearances",
        icon: FileCheck,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
      {
        title: "Invoices & Receipts",
        url: "/manage/invoices",
        icon: FileText,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
      {
        title: "Revenue Reports",
        url: "/manage/reports",
        icon: BarChart3,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
      {
        title: "Support Tickets",
        url: "/manage/tickets",
        icon: MessageSquare,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
    ],
  },
  {
    label: "PLATFORM SETTINGS",
    headerColor: {
      text: "text-rose-600 dark:text-rose-400",
      dot: "bg-rose-500",
      border: "border-rose-500/20",
      bgHover: "hover:bg-rose-500/5",
    },
    items: [
      {
        title: "Platform Users",
        url: "/platform/users",
        icon: Users,
        badge: "Admin",
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        title: "Manage Subscriptions",
        url: "/platform/plans",
        icon: Layers,
        badge: "Admin",
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        title: "Global Settings",
        url: "/platform/settings",
        icon: Settings,
        badge: "Admin",
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        title: "Activity Logs & Audit",
        url: "/platform/logs",
        icon: Activity,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
    ],
  },
];