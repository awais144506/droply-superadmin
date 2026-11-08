"use client";
import BranchForm from "@/features/branches/components/create/BranchForm";
import CreateFormHeader from "@/lib/utils/components/FormHeaderNavigation";

export default function CreateBranchPage() {

    return (
        <div className="space-y-6 p-6">
            <CreateFormHeader
                title="Create New Branch"
                href={`/manage/branches`}
                breadcrumbs={[
                    { label: "Branches", href: "/manage/branches" },
                    { label: "Create Branch" }
                ]}
            />

            <BranchForm />
        </div>
    );
}