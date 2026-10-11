"use client";

import React, { useState } from "react";
import { 
    CheckCircle2, 
    ArrowRight, 
    QrCode, 
    UploadCloud, 
    Info, 
    AlertTriangle,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 1. THIS REPRESENTS YOUR NEW PRICING DATABASE TABLE
const PRICING_DB = {
    SILVER: { monthly: 5000, yearly: 50000, users: 5 },
    GOLD: { monthly: 10000, yearly: 100000, users: 15 },
    PLATINUM: { monthly: 20000, yearly: 200000, users: "Unlimited" },
};

export default function ChangePlanSimulator() {
    // 2. DUMMY CURRENT USER STATE (Change these to test different flows!)
    const currentTier = "GOLD"; // SILVER, GOLD, or PLATINUM
    const currentCycle = "MONTHLY"; // MONTHLY or YEARLY
    const activeStaffCount = 12; // Test downgrading with too many users

    // 3. PAGE STATE
    const [selectedCycle, setSelectedCycle] = useState<"MONTHLY" | "YEARLY">(currentCycle as any);
    const [selectedTier, setSelectedTier] = useState<string>(currentTier);

    // --- LOGIC CALCULATORS ---

    // A helper to assign a numeric weight to tiers for easy comparison
    const tierWeight = { SILVER: 1, GOLD: 2, PLATINUM: 3 };
    
    // Determine what kind of change the user is trying to make
    const isDowngrade = tierWeight[selectedTier as keyof typeof tierWeight] < tierWeight[currentTier as keyof typeof tierWeight];
    const isSamePlan = selectedTier === currentTier && selectedCycle === currentCycle;
    const isCycleUpgrade = currentCycle === "MONTHLY" && selectedCycle === "YEARLY";
    const isImmediateUpgrade = !isDowngrade && !isSamePlan;

    // The Yearly lock-in rule you mentioned
    const isCycleLocked = currentCycle === "YEARLY" && selectedCycle === "MONTHLY";

    // Staff limit check for downgrades
    const targetLimit = PRICING_DB[selectedTier as keyof typeof PRICING_DB].users;
    const isOverLimitForDowngrade = typeof targetLimit === "number" && activeStaffCount > targetLimit;

    // Calculate Amount Due (For manual payments, we restart the cycle today as discussed)
    const amountDue = PRICING_DB[selectedTier as keyof typeof PRICING_DB][selectedCycle.toLowerCase() as "monthly" | "yearly"];

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6">
            
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Change Subscription Plan</h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                    Your current plan is <strong className="text-indigo-600">{currentTier} ({currentCycle})</strong>.
                </p>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex flex-col items-center justify-center bg-slate-50 p-4 rounded-2xl border border-slate-200 w-fit mx-auto">
                <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                    <button
                        onClick={() => setSelectedCycle("MONTHLY")}
                        disabled={currentCycle === "YEARLY"} // Locks Yearly users out of Monthly
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            selectedCycle === "MONTHLY" 
                                ? "bg-indigo-600 text-white shadow-md" 
                                : currentCycle === "YEARLY"
                                ? "text-slate-300 cursor-not-allowed" // Disabled state styling
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        Monthly Billing
                    </button>
                    <button
                        onClick={() => setSelectedCycle("YEARLY")}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            selectedCycle === "YEARLY" 
                                ? "bg-indigo-600 text-white shadow-md" 
                                : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        Yearly Billing <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Save 16%</span>
                    </button>
                </div>
                {currentCycle === "YEARLY" && (
                    <p className="text-[11px] text-slate-500 font-medium mt-3 flex items-center gap-1.5">
                        <Info className="h-3.5 w-3.5" /> 
                        You are on an active yearly contract. You cannot switch to monthly billing until renewal.
                    </p>
                )}
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(Object.keys(PRICING_DB) as Array<keyof typeof PRICING_DB>).map((tier) => {
                    const price = PRICING_DB[tier][selectedCycle.toLowerCase() as "monthly" | "yearly"];
                    const isSelected = selectedTier === tier;
                    const isCurrent = currentTier === tier;

                    return (
                        <Card 
                            key={tier} 
                            onClick={() => setSelectedTier(tier)}
                            className={`relative cursor-pointer transition-all duration-200 ${
                                isSelected 
                                    ? "ring-2 ring-indigo-600 shadow-lg border-transparent scale-[1.02]" 
                                    : "border-slate-200 hover:border-indigo-300 hover:shadow-md"
                            }`}
                        >
                            {isCurrent && (
                                <Badge className="absolute -top-3 right-4 bg-slate-800 text-white border-none font-bold tracking-widest text-[9px] uppercase px-3 py-1">
                                    Current Tier
                                </Badge>
                            )}
                            
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-xl font-black text-slate-900">{tier}</CardTitle>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-indigo-700">Rs. {price.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-slate-500 uppercase">/{selectedCycle === "MONTHLY" ? "mo" : "yr"}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 pt-0">
                                <ul className="space-y-3 mt-4">
                                    <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <strong>{PRICING_DB[tier].users}</strong> Staff Seats
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Unlimited Customers
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* ACTION / PAYMENT AREA (Conditional Rendering) */}
            <div className="max-w-2xl mx-auto">
                
                {/* CASE 1: Selecting Current Plan */}
                {isSamePlan && (
                    <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900">This is your current plan</h3>
                        <p className="text-sm text-slate-500 font-medium">Your subscription is active and in good standing.</p>
                    </div>
                )}

                {/* CASE 2: Downgrade Logic */}
                {isDowngrade && !isSamePlan && (
                    <Card className="border-amber-200 bg-amber-50 shadow-sm rounded-2xl">
                        <CardContent className="p-6 text-center">
                            <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-slate-900">Downgrade to {selectedTier}</h3>
                            
                            {isOverLimitForDowngrade ? (
                                <div className="mt-3 p-4 bg-white rounded-xl border border-amber-100 text-sm font-medium text-amber-800">
                                    You currently have <strong>{activeStaffCount} active staff</strong>, but the {selectedTier} plan only allows <strong>{targetLimit}</strong>. 
                                    Please suspend {activeStaffCount - (targetLimit as number)} staff members before you can schedule this downgrade.
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-slate-600 font-medium mt-2">
                                        Downgrades do not happen immediately. Your plan will automatically switch to {selectedTier} at the end of your current {currentCycle.toLowerCase()} billing cycle.
                                    </p>
                                    <Button className="mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl px-8">
                                        Schedule Downgrade (No Payment Due)
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* CASE 3: Immediate Upgrade / Checkout Flow */}
                {isImmediateUpgrade && !isCycleLocked && (
                    <Card className="border-indigo-100 shadow-md rounded-2xl overflow-hidden">
                        <div className="bg-indigo-600 p-4 text-white text-center">
                            <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                                <ShieldCheck className="h-5 w-5" /> 
                                Upgrade to {selectedTier} ({selectedCycle})
                            </h3>
                            <p className="text-indigo-100 text-xs font-medium mt-1">
                                Your new limits will be applied immediately upon verification.
                            </p>
                        </div>
                        <CardContent className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                
                                {/* Left: Amount & QR Code */}
                                <div className="text-center space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount Due Today</p>
                                        <p className="text-4xl font-black text-slate-900 mt-1">Rs. {amountDue.toLocaleString()}</p>
                                    </div>
                                    <div className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl mx-auto flex flex-col items-center justify-center text-slate-400">
                                        <QrCode className="h-12 w-12 mb-2" />
                                        <span className="text-[10px] font-bold">SCAN TO PAY</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-500">Easypaisa / JazzCash / Bank Transfer</p>
                                </div>

                                {/* Right: Upload Proof Form */}
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-600 uppercase">Transaction Reference Number</Label>
                                        <Input 
                                            placeholder="e.g. 0123456789" 
                                            className="h-11 bg-slate-50 font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-600 uppercase">Upload Payment Screenshot</Label>
                                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <UploadCloud className="w-6 h-6 mb-2 text-indigo-500" />
                                                <p className="text-xs font-medium text-slate-500">Click to upload image</p>
                                            </div>
                                            <Input type="file" className="hidden" accept="image/*" />
                                        </label>
                                    </div>
                                    <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md">
                                        Submit Payment for Verification
                                    </Button>
                                </div>
                                
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

        </div>
    );
}