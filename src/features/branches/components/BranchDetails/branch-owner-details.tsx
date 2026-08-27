import {
    Building2,
    Calendar,
    Mail,
    Phone,
    User,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BranchEntity } from "@/types/branch";

interface BranchOwnerDetailsProps {
    branch: BranchEntity;
}

const BranchOwnerDetails = ({ branch }: BranchOwnerDetailsProps) => {
    return (
        <div><Card>
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Branch Owner Details
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> Owner Name
                    </span>
                    <span className="font-mono text-foreground">{branch.ownerName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> Email
                    </span>
                    <span className="font-mono text-foreground">{branch.ownerEmail}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-dashed">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> WhatsApp/Phone
                    </span>
                    <span className="font-mono text-foreground">{branch.ownerPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> Registered Date
                    </span>
                    <span className="text-foreground">
                        {new Date(branch.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
        </Card>
        </div>
    )
}

export default BranchOwnerDetails