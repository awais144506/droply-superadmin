"use client";

import { Droplets } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function BrandHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full flex items-center gap-3 hover:bg-transparent">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black shadow-sm">
            <Droplets className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none text-left">
            <span className="font-bold text-sm tracking-tight">DroplyPK</span>
            <span className="text-[10px] text-muted-foreground tracking-wider font-mono font-medium">
              SUPERADMIN V1.0
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}