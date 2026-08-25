import {
  LayoutDashboard,
  Building2,
  Receipt,
  Users,
  ShieldCheck,
  Settings,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const superAdminNavigation: NavGroup[] = [
  {
    label: "Core Management",
    items: [
      {
        title: "Overview",
        url: "/app",
        icon: LayoutDashboard,
      },
      {
        title: "Branches",
        url: "/branches",
        icon: Building2,
      },
      {
        title: "Subscriptions & Invoices",
        url: "#",
        icon: Receipt,
      },
    ],
  },
  {
    label: "System & Governance",
    items: [
      {
        title: "Platform Users",
        url: "#",
        icon: Users,
      },
      {
        title: "Security",
        url: "#",
        icon: ShieldCheck,
      },
      {
        title: "Global Settings",
        url: "#",
        icon: Settings,
      },
    ],
  },
];