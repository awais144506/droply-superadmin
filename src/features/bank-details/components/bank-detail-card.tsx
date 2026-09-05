"use client";

import { MoreVertical, Pencil, Trash2, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BankDetailEntity } from "../api/use-bank-details";

interface BankDetailCardProps {
  account: BankDetailEntity;
  onEdit: (account: BankDetailEntity) => void;
  onDelete: (id: string) => void;
}

export function BankDetailCard({ account, onEdit, onDelete }: BankDetailCardProps) {
  return (
    <Card className={`shadow-sm border-slate-200 overflow-hidden transition-all ${!account.isActive && "opacity-60 grayscale"}`}>
      <CardHeader className="p-4 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          {account.isActive ? (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 pointer-events-none text-[10px]">ACTIVE</Badge>
          ) : (
            <Badge variant="secondary" className="pointer-events-none text-[10px]">HIDDEN</Badge>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-900 -mr-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit(account)} className="cursor-pointer text-xs">
              <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(account.id)} 
              className="cursor-pointer text-xs text-rose-600 focus:text-rose-600"
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-0">
        {/* BIG QR CODE SECTION */}
        <div className="w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6 min-h-[250px]">
          {account.qrCodeUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={account.qrCodeUrl} 
              alt="QR Code" 
              className="w-48 h-48 object-contain bg-white p-2 rounded-xl border border-slate-200 shadow-sm" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <QrCode className="h-12 w-12 opacity-20" />
              <span className="text-xs font-medium uppercase tracking-wider">No QR Code</span>
            </div>
          )}
        </div>

        {/* STRAIGHTFORWARD BANK DETAILS */}
        <div className="p-5 space-y-2.5">
          <p className="text-sm text-slate-900">
            <span className="font-semibold text-slate-500 w-24 inline-block">Bank Name:</span> 
            {account.bankName}
          </p>
          <p className="text-sm text-slate-900">
            <span className="font-semibold text-slate-500 w-24 inline-block">A/C Title:</span> 
            {account.accountTitle}
          </p>
          <p className="text-sm text-slate-900">
            <span className="font-semibold text-slate-500 w-24 inline-block">A/C Number:</span> 
            <span className="font-mono font-medium">{account.accountNumber}</span>
          </p>
          {account.iban && (
            <p className="text-sm text-slate-900">
              <span className="font-semibold text-slate-500 w-24 inline-block">IBAN:</span> 
              <span className="font-mono font-medium text-xs">{account.iban}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}