"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  Users, 
  Crown, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  History,
  Download,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- DUMMY DATA ---
const DUMMY_BRANCH = {
  id: "br_987654321",
  name: "Downtown Central Hub",
  status: "ACTIVE",
  subscription: {
    tier: "SILVER",
    cycle: "MONTHLY",
    renewDate: "2026-10-05T00:00:00.000Z",
    price: 49.99,
  },
  seatsUsed: 12,
  maxSeats: 15,
};

const DUMMY_INVOICES = [
  { id: "INV-2026-09", date: "Sep 05, 2026", amount: 49.99, status: "Paid" },
  { id: "INV-2026-08", date: "Aug 05, 2026", amount: 49.99, status: "Paid" },
  { id: "INV-2026-07", date: "Jul 05, 2026", amount: 49.99, status: "Paid" },
];
// ------------------

export default function SubscriptionDetailsPage() {
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto p-6">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/app/subscriptions"
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {DUMMY_BRANCH.name}
              </h1>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 pointer-events-none">
                {DUMMY_BRANCH.status}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">Manage subscription, billing cycle, and limits.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">
            <AlertTriangle className="h-4 w-4 mr-2 text-rose-500" /> Cancel Subscription
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Current Subscription Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-24 h-24 text-amber-500" />
            </div>
            <CardHeader className="pb-4 relative">
              <CardDescription className="text-amber-700 font-bold uppercase tracking-wider text-xs">
                Current Plan
              </CardDescription>
              <CardTitle className="text-3xl font-black text-slate-900 mt-1">
                Gold
                <span className="text-sm font-medium text-slate-500 ml-2 uppercase bg-white/60 px-2 py-1 rounded-md border border-amber-100">
                  {DUMMY_BRANCH.subscription.cycle}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <CreditCard className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Pricing</span>
                </div>
                <span className="font-bold text-slate-900">${DUMMY_BRANCH.subscription.price}<span className="text-xs text-slate-500 font-normal">/mo</span></span>
              </div>
              
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Next Billing</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">
                    {new Date(DUMMY_BRANCH.subscription.renewDate).toLocaleDateString()}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">30 Days Left</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Staff Seats</span>
                </div>
                <span className="font-bold text-slate-900">{DUMMY_BRANCH.seatsUsed} <span className="text-slate-400 font-normal">/ {DUMMY_BRANCH.maxSeats}</span></span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Invoice History */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DUMMY_INVOICES.map((inv) => (
                  <div key={inv.id} className="flex justify-between items-center text-sm border-b border-dashed border-slate-100 last:border-0 pb-3 last:pb-0">
                    <div>
                      <p className="font-medium text-slate-900">{inv.date}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{inv.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">${inv.amount}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-2 text-xs text-primary h-auto p-0">View all invoices &rarr;</Button>
            </CardContent>
          </Card>
        </div>

        {/* 3. Change Plan Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Change Subscription Plan</CardTitle>
                  <CardDescription>Upgrade or downgrade the current tier for this branch.</CardDescription>
                </div>
                
                {/* Billing Cycle Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-lg w-max">
                  <button
                    onClick={() => setBillingCycle("MONTHLY")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${billingCycle === "MONTHLY" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("YEARLY")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${billingCycle === "YEARLY" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Yearly <span className="text-[9px] text-emerald-600 bg-emerald-100 px-1 rounded ml-1">-20%</span>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* SILVER PLAN */}
                <div className="border border-slate-200 rounded-xl p-5 flex flex-col relative transition-all hover:border-slate-300">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-slate-100 text-slate-600 uppercase tracking-wider mb-2">
                      <Zap className="h-3 w-3" /> Silver
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{billingCycle === "MONTHLY" ? "$29" : "$279"}</span>
                      <span className="text-xs text-slate-500 font-medium">/{billingCycle === "MONTHLY" ? "mo" : "yr"}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="text-xs text-slate-600 flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Up to 5 Staff Seats</li>
                    <li className="text-xs text-slate-600 flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Basic Reporting</li>
                  </ul>
                  <Button variant="outline" className="w-full text-xs cursor-pointer">
                    Downgrade to Silver
                  </Button>
                </div>

                {/* GOLD PLAN (Active) */}
                <div className="border-2 border-amber-400 bg-amber-50/30 rounded-xl p-5 flex flex-col relative shadow-sm">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Current Plan
                  </div>
                  <div className="mb-4 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-700 uppercase tracking-wider mb-2">
                      <Sparkles className="h-3 w-3" /> Gold
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{billingCycle === "MONTHLY" ? "$49" : "$470"}</span>
                      <span className="text-xs text-slate-500 font-medium">/{billingCycle === "MONTHLY" ? "mo" : "yr"}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="text-xs text-slate-600 flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Up to 15 Staff Seats</li>
                    <li className="text-xs text-slate-600 flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Advanced Analytics</li>
                  </ul>
                  <Button disabled className="w-full text-xs bg-slate-900 text-white opacity-50 cursor-not-allowed">
                    Currently Active
                  </Button>
                </div>

                {/* PLATINUM PLAN */}
                <div className="border border-slate-200 rounded-xl p-5 flex flex-col relative transition-all hover:border-indigo-200 hover:shadow-md">
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 uppercase tracking-wider mb-2">
                      <Crown className="h-3 w-3" /> Platinum
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">{billingCycle === "MONTHLY" ? "$99" : "$950"}</span>
                      <span className="text-xs text-slate-500 font-medium">/{billingCycle === "MONTHLY" ? "mo" : "yr"}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    <li className="text-xs text-slate-600 flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Unlimited Staff Seats</li>
                    <li className="text-xs text-slate-600 flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Custom Integrations</li>
                  </ul>
                  <Button className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm">
                    Upgrade to Platinum
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Seat Management / Overages (Optional but good for SaaS) */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base">Seat Utilization</CardTitle>
              <CardDescription className="text-xs">Monitor user limits and purchase extra seats.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">12 of 15 seats used</span>
                <span className="text-sm font-bold text-amber-600">80%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500 max-w-md">Need more users but don&apos;t want to upgrade to Platinum? You can purchase add-on seat packs.</p>
                <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                  Buy Extra Seats
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}