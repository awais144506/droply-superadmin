"use client";
import { NavUser } from "./nav-user";

export function SiteHeader() {
  const envMode = process.env.NEXT_PUBLIC_NODE_ENV;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 z-20 sticky top-0">
      {/* Left: Navigation Trigger */}
      <div className="flex items-center gap-3">

        {/* Environment Indicator Badge */}
        {envMode === "development" && (
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-lg font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
            Development Mode
          </span>
        )}
        {envMode === "staging" && (
          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-lg font-bold bg-sky-50 text-sky-700 border border-sky-200 uppercase tracking-wide">
            Staging : Testing Mode
          </span>
        )}
      </div>

      {/* Right: User Profile Indicator & Dropdown */}
      <div className="flex items-center">
        <NavUser />
      </div>
    </header>
  );
}