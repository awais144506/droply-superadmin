"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building2, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BranchDetail, BranchStatus, IndustryType, SubscriptionPlan } from "../types";
import { BranchStatusBadge } from "./branch-status-badge";

interface BranchesDataTableProps {
  initialData: BranchDetail[];
}

export function BranchesDataTable({ initialData }: BranchesDataTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredBranches = initialData.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.ownerPhone.includes(searchTerm);

    const matchesStatus = statusFilter === "ALL" || branch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getIndustryBadge = (industry: IndustryType) => {
    const variants: Record<IndustryType, string> = {
      WATER: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200/50",
      GAS: "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 border-orange-200/50",
      OTHER: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200",
    };
    return (
      <Badge variant="outline" className={`text-[11px] font-mono ${variants[industry]}`}>
        {industry}
      </Badge>
    );
  };

  const getSubscriptionBadge = (plan: SubscriptionPlan) => {
    const variants: Record<SubscriptionPlan, string> = {
      TRIAL: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400",
      MONTHLY: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
      YEARLY: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold",
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${variants[plan]}`}>
        {plan}
      </span>
    );
  };

  return (
    <Card className="border shadow-none bg-card">
      {/* Search & Filter Bar */}
      <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by branch, owner, city, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-xs h-9"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["ALL", "ACTIVE", "PAST_DUE", "SUSPENDED"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="text-xs h-8 capitalize font-medium"
            >
              {status.toLowerCase().replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* 5-Column Table */}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs">1. Branch Info</TableHead>
              <TableHead className="text-xs">2. Owner Details</TableHead>
              <TableHead className="text-xs">3. Industry</TableHead>
              <TableHead className="text-xs">4. Subscription</TableHead>
              <TableHead className="text-xs">5. Status</TableHead>
              <TableHead className="text-xs w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBranches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-xs text-muted-foreground">
                  No branches found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredBranches.map((branch) => (
                <TableRow
                  key={branch.id}
                  onClick={() => router.push(`/branches/${branch.id}`)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors group"
                >
                  {/* Col 1: Branch Info */}
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/10 transition-colors">
                        <Building2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm leading-tight text-foreground group-hover:underline">
                          {branch.name}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                          <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                          <span>{branch.address}, {branch.city}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Col 2: Owner Details */}
                  <TableCell>
                    <div className="flex flex-col text-xs leading-tight">
                      <span className="font-medium text-foreground">{branch.ownerName}</span>
                      <span className="text-muted-foreground text-[11px] mt-0.5">{branch.ownerPhone}</span>
                      <span className="text-muted-foreground text-[10px]">{branch.ownerEmail}</span>
                    </div>
                  </TableCell>

                  {/* Col 3: Industry */}
                  <TableCell>
                    {getIndustryBadge(branch.industry)}
                  </TableCell>

                  {/* Col 4: Subscription */}
                  <TableCell>
                    <div className="flex flex-col items-start gap-1">
                      {getSubscriptionBadge(branch.subscriptionPlan)}
                      <span className="text-[11px] font-mono text-muted-foreground">
                        PKR {branch.monthlyFee.toLocaleString()}/mo
                      </span>
                    </div>
                  </TableCell>

                  {/* Col 5: Status */}
                  <TableCell>
                    <BranchStatusBadge status={branch.status} />
                  </TableCell>

                  {/* Navigate Arrow */}
                  <TableCell className="text-right pr-4">
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}