"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { superAdminNavigation } from "@/config/navigation.config";

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      {superAdminNavigation.map((group) => (
        <SidebarGroup key={group.label} className="py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2">
            {group.label}
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1 mt-1">
            {group.items.map((item) => {
              const isActive =
                item.url === "/app"
                  ? pathname === "/app"
                  : pathname.startsWith(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    className="w-full"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 w-full px-2.5 py-2 text-sm font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}