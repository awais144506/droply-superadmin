"use client";
import BranchForm from "@/features/branches/components/create/BranchForm";
import CreateFormHeader from "@/lib/utils/components/FormHeaderNavigation";

export default function CreateBranchPage() {

    return (
        <div className="max-w-5xl mx-auto space-y-6 p-6">
            <CreateFormHeader
                title="Create New Branch"
                description="Create an isolated tenant instance with automated Clerk credentials."
                href="/manage/branches"
            />

            <BranchForm />
        </div>
    );
}