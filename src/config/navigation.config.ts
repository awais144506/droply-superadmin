import {
  Building2,
  CreditCard,
  MessageSquare,
  FileCheck,
  BarChart3,
  Users,
  Settings,
  Layers,
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
    label: "TENANTS & SALES",
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
        title: "Active Subscriptions",
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
        title: "Billing & Invoices",
        url: "/manage/invoices",
        icon: FileText,
        allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      },
      // {
      //   title: "Revenue Reports",
      //   url: "/manage/reports",
      //   icon: BarChart3,
      //   allowedRoles: ["SUPER_ADMIN", "SUPPORT_ADMIN"],
      // },
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
        title: "Team & Admins", // Renamed for clarity
        url: "/platform/team",
        icon: Users,
        badge: "Admin",
        allowedRoles: ["SUPER_ADMIN"],
      },
      // {
      //   title: "Pricing Plans", // Renamed to avoid confusion with active tenant subscriptions
      //   url: "/platform/plans",
      //   icon: Layers,
      //   badge: "Admin",
      //   allowedRoles: ["SUPER_ADMIN"],
      // },
      // {
      //   title: "Global Settings",
      //   url: "/platform/settings",
      //   icon: Settings,
      //   badge: "Admin",
      //   allowedRoles: ["SUPER_ADMIN"],
      // },
      // Activity Logs & Audit removed - will be handled via dashboard widgets
    ],
  },
];