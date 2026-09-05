"use client"

import { ShieldAlert } from "lucide-react";

const Error = ({ error }: { error: string | undefined }) => {
    return (
        <div className="p-8">
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
                <ShieldAlert className="mx-auto h-8 w-8 text-destructive mb-2" />
                <h2 className="text-base font-semibold text-destructive">
                    Error Occured
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                    {error || "The request can not be resolved."}
                </p>
            </div>
        </div>
    );
}

export default Error