import { User } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormPhoneInput } from "@/components/ui/form-phone-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BranchOwnerDetails() {
    return (
        <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900">
                    <User className="h-4 w-4 text-sky-600" />
                    Branch Owner Details
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <div className="space-y-1.5">
                    <FormInput
                        label="Owner Full Name"
                        required
                        placeholder="e.g. Muhammad Awais"
                        name="ownerName"
                    />
                </div>

                <div className="space-y-1.5">
                    <FormPhoneInput
                        label="Owner Phone Number"
                        required
                        name="ownerPhone"
                    />
                </div>

                <div className="space-y-1.5">
                    <FormInput
                        label="Owner Email"
                        required
                        placeholder="e.g. owner@droply.com"
                        name="ownerEmail"
                    />
                </div>

                <div className="space-y-1.5">
                    <FormInput
                        label="Owner CNIC"
                        required
                        placeholder="e.g. 35202-1234567-1"
                        name="ownerCnic"
                    />
                </div>
            </CardContent>
        </Card>
    );
}