"use client";

import Image from "next/image";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function BrandHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="w-full flex items-center gap-3 hover:bg-transparent cursor-default px-2"
        >
          {/* Logo Image */}
          <div className="relative flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden ">
            <Image
              src="/logo.png"
              alt="Droply Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Brand Name */}
          <div className="flex flex-col justify-center leading-none text-left overflow-hidden">
            <span className="text-lg font-bold tracking-tight text-sky-600 font-sans">
              Droply
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wider mt-0.5">
              Plant Management
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}