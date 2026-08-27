import {
    Building2,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BranchEntity } from "@/types/branch";

interface BranchDetailsProps {
    branch: BranchEntity;
}

const BranchDetails = ({branch}: BranchDetailsProps) => {
    return (
        <div>    <Card>
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Branch Details
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> Address
                    </span>
                    <span className="font-mono text-foreground">{branch.address}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> City
                    </span>
                    <span className="font-mono text-foreground">{branch.city}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> Phone
                    </span>
                    <span className="font-mono text-foreground">{branch.phone}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> Email
                    </span>
                    <span className="font-mono text-foreground">{branch.email}</span>
                </div>
            </CardContent>
        </Card></div>
    )
}

export default BranchDetails