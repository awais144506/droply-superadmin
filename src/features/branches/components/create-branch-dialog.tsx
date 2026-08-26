"use client";

import { useState } from "react";
import { Plus, Loader2, MapPin, Building2, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateBranchInput } from "@/types/branch";

interface CreateBranchDialogProps {
  onSuccess?: () => void;
}

const initialForm: CreateBranchInput = {
  name: "",
  industry: "WATER",
  city: "Islamabad",
  address: "",
  latitude: 33.6844,
  longitude: 73.0479,
  phone: "+92",
  email: "",
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "+92",
  subscriptionPlan: "TRIAL",
  monthlyFee: 8000,
  maxUsersLimit: 15,
};

export function CreateBranchDialog({ onSuccess }: CreateBranchDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateBranchInput>(initialForm);

  const handleChange = (field: keyof CreateBranchInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/super-admin/branches`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
            monthlyFee: Number(formData.monthlyFee),
            maxUsersLimit: Number(formData.maxUsersLimit),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message || "Failed to provision branch"
        );
      }

      setFormData(initialForm);
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="create"
          className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          <span>Create New Branch</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Provision New Tenant Plant
          </DialogTitle>
          <DialogDescription>
            Atomically creates the branch, initiates the 7-day trial subscription, and registers GPS dispatch coordinates.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-xs font-medium text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Section 1: Plant Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>Plant & Physical Details</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Plant Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Blue Mist Pure Water"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="industry" className="text-xs">Industry Vertical *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(val: any) => handleChange("industry", val)}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WATER">19L Bottled Water</SelectItem>
                    <SelectItem value="LPG">LPG Gas Cylinders</SelectItem>
                    <SelectItem value="DAIRY">Dairy Distribution</SelectItem>
                    <SelectItem value="COMMERCIAL_DISTRIBUTION">General Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="address" className="text-xs">Street Address *</Label>
                <Input
                  id="address"
                  placeholder="Plot 42, Sector I-9 Industrial Area"
                  required
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs">City *</Label>
                <Input
                  id="city"
                  placeholder="Islamabad"
                  required
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="latitude" className="text-xs flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  Latitude Pin *
                </Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  required
                  value={formData.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="longitude" className="text-xs flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  Longitude Pin *
                </Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  required
                  value={formData.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Owner Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-1">
              <User className="h-3.5 w-3.5" />
              <span>Plant Owner Identity</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ownerName" className="text-xs">Owner Full Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Hamza Tariq"
                  required
                  value={formData.ownerName}
                  onChange={(e) => handleChange("ownerName", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ownerEmail" className="text-xs">Login Email *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  placeholder="owner@plant.com"
                  required
                  value={formData.ownerEmail}
                  onChange={(e) => handleChange("ownerEmail", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="ownerPhone" className="text-xs">WhatsApp / Phone *</Label>
                <Input
                  id="ownerPhone"
                  placeholder="+923001234567"
                  required
                  value={formData.ownerPhone}
                  onChange={(e) => handleChange("ownerPhone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Billing & Limits */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b pb-1">
              <CreditCard className="h-3.5 w-3.5" />
              <span>Subscription & Operational Quota</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="plan" className="text-xs">Onboarding Plan</Label>
                <Select
                  value={formData.subscriptionPlan}
                  onValueChange={(val: any) => handleChange("subscriptionPlan", val)}
                >
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TRIAL">7-Day Free Trial</SelectItem>
                    <SelectItem value="MONTHLY">Standard Monthly</SelectItem>
                    <SelectItem value="YEARLY">Yearly Upfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fee" className="text-xs">Recurring Fee (PKR)</Label>
                <Input
                  id="fee"
                  type="number"
                  value={formData.monthlyFee}
                  onChange={(e) => handleChange("monthlyFee", Number(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quota" className="text-xs">Staff Limit (Seats)</Label>
                <Input
                  id="quota"
                  type="number"
                  min={1}
                  max={25}
                  value={formData.maxUsersLimit}
                  onChange={(e) => handleChange("maxUsersLimit", Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Branch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}