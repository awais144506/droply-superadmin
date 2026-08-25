"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, ArrowRight, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/app");
    }, 400);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-zinc-50/60 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Droplets className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              DroplyPK
            </h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mt-0.5">
              SuperAdmin Command Center
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border shadow-sm bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Master Sign In</CardTitle>
            <CardDescription className="text-xs">
              Whiz Cove central authority portal for tenant branch management.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@droplypk.com"
                  placeholder="admin@droplypk.com"
                  className="h-9 text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-medium">
                    Password
                  </Label>
                  <span className="text-[11px] text-muted-foreground cursor-pointer hover:underline">
                    2FA Enabled
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  defaultValue="••••••••••••"
                  className="h-9 text-xs font-mono"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-9 text-xs font-medium gap-2" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    Access SuperAdmin
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Footer Notice */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Restricted session • 2FA TOTP hardware guarded</span>
        </div>
      </div>
    </div>
  );
}