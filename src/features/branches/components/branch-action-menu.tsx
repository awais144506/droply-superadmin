"use client";

import {
  MoreHorizontal,
  ExternalLink,
  Edit,
  PowerOff,
  CheckCircle,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BranchDetail } from "../types";

interface BranchActionMenuProps {
  branch: BranchDetail;
}

export function BranchActionMenu({ branch }: BranchActionMenuProps) {
  const copyBranchId = () => {
    navigator.clipboard.writeText(branch.id);
    toast.success("Branch ID copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Actions: {branch.name}
        </DropdownMenuLabel>
        
        <DropdownMenuItem onClick={copyBranchId} className="cursor-pointer text-xs">
          <Copy className="mr-2 h-3.5 w-3.5" />
          Copy Branch ID
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => window.open(`https://${branch.slug}.droplypk.com`, "_blank")}
          className="cursor-pointer text-xs"
        >
          <ExternalLink className="mr-2 h-3.5 w-3.5" />
          Launch Branch Portal
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer text-xs">
          <Edit className="mr-2 h-3.5 w-3.5" />
          Edit Seat Limits
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {branch.status === "SUSPENDED" ? (
          <DropdownMenuItem className="text-emerald-600 focus:text-emerald-600 cursor-pointer text-xs">
            <CheckCircle className="mr-2 h-3.5 w-3.5" />
            Re-activate Branch
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer text-xs">
            <PowerOff className="mr-2 h-3.5 w-3.5" />
            Suspend Branch
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}