import { Building2 } from "lucide-react";
import { FormInput } from "@/components/ui/form-input";
import { FormPhoneInput } from "@/components/ui/form-phone-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BranchDetails({ isEditing }: { isEditing: boolean }) {
    return (
        <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-900">
                    <Building2 className="h-4 w-4 text-sky-600" />
                    Branch General Information
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <div className="space-y-1.5">
                    <FormInput
                        label="Branch Name"
                        required
                        placeholder="e.g. Droply Main Hub - Lahore"
                        name="name"
                    />
                </div>

                <div className="space-y-1.5">
                    <FormPhoneInput
                        label="Branch Phone Number"
                        required
                        name="phone"
                    />
                </div>

                <div className="space-y-1.5">
                    <FormInput
                        label="Complete Address"
                        required
                        placeholder="e.g. Office #12, Main Boulevard, Gulberg"
                        name="address"
                    />
                </div>

                {/* Coordinates Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <FormInput
                            label="Latitude"
                            required
                            type="number"
                            placeholder="31.5204"
                            name="latitude"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <FormInput
                            label="Longitude"
                            required
                            type="number"
                            placeholder="74.3587"
                            name="longitude"
                        />
                    </div>
                </div>
                {!isEditing && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <FormInput
                                label="NTN (Optional)"
                                placeholder="e.g. 1234567-8"
                                name="ntn"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <FormInput
                                label="STRN (Optional)"
                                placeholder="e.g. 12-34-5678-901-23"
                                name="strn"
                            />
                        </div>
                    </div>
                )}
            </CardContent>
        </Card >
    );
}