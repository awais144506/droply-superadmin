"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { BrandHeader } from "./brand-header";
import { NavMain } from "./nav-main";
import SideFooter from "./side-footer";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <BrandHeader />
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarFooter>
                <SideFooter />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}