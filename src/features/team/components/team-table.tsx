"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Shield, UserCog, Ban, Activity } from "lucide-react";
import { TeamMember, AdminRole } from "@/types/team";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function TeamTable({ team }: { team: TeamMember[] }) {
  const [localTeam, setLocalTeam] = useState<TeamMember[]>([]);
  useEffect(() => { setLocalTeam(team); }, [team]);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | AdminRole>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { setCurrentPage(1); }, [searchQuery, roleFilter]);

  const filtered = localTeam.filter((member) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower);
      
    if (roleFilter !== "ALL") return matchesSearch && member.role === roleFilter;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getRoleBadge = (role: AdminRole) => {
    switch(role) {
      case "SUPER_ADMIN": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100"><Shield className="h-3 w-3" /> Super Admin</span>;
      case "SUPPORT_ADMIN": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">Support Admin</span>;
      case "BILLING_ADMIN": return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">Billing Admin</span>;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text" placeholder="Search team member..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-max shrink-0">
            {(["ALL", "SUPER_ADMIN", "SUPPORT_ADMIN"] as const).map(role => (
              <button 
                key={role} onClick={() => setRoleFilter(role as any)} 
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${roleFilter === role ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {role.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={() => toast.info("Invite modal opening...")} className="bg-sky-600 hover:bg-sky-700 text-white h-10 px-4 rounded-xl text-xs font-bold cursor-pointer shrink-0">
          <Plus className="h-4 w-4 mr-1.5" /> Invite Member
        </Button>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap">User Info</th>
              <th className="px-6 py-4 whitespace-nowrap">Role & Dept</th>
              <th className="px-6 py-4 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Last Active</th>
              <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((member) => (
              <tr key={member.id} className={`transition-colors ${member.status === "INACTIVE" ? "bg-slate-50/50 opacity-75" : "hover:bg-slate-50/50"}`}>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{member.name}</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">{member.email}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-start gap-1">
                    {getRoleBadge(member.role)}
                    <span className="text-[10px] text-slate-400 mt-0.5">{member.department}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {member.status === "ACTIVE" 
                    ? <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600"><Activity className="h-3 w-3" /> Active</span>
                    : <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400"><Ban className="h-3 w-3" /> Inactive</span>
                  }
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-700 text-[11px]">{new Date(member.lastActive).toLocaleDateString()}</p>
                  <p className="text-[10px] text-slate-400">{new Date(member.lastActive).toLocaleTimeString()}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    onClick={() => toast.info(`Managing access for ${member.name}`)}
                    className="bg-slate-900 hover:bg-slate-800 text-white h-8 px-3 rounded-lg text-[10px] font-bold shadow-sm cursor-pointer"
                  >
                    Manage <UserCog className="h-3 w-3 ml-1" />
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">No team members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[11px] font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, filtered.length)}</span> of {filtered.length}
          </p>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 text-xs bg-white cursor-pointer">Prev</Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 text-xs bg-white cursor-pointer">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}