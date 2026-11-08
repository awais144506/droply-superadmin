import { FormProvider } from "react-hook-form";
import { useAppForm } from "@/hooks/use-app-form";
import { createBranchSchema, CreateBranchFormData } from "../../schema/create-branch.schema";
import FormCTAFooter from "@/lib/utils/components/FormCTAFooter";
import { Building2 } from "lucide-react";
import BranchOwnerDetails from "./owner-details";
import BranchDetails from "./branch-details";
import { useCreateBranch, useUpdateBranch } from "../../api/use-mutate-branch";

const BranchForm = ({
    branchId,
    initialData,
}: {
    branchId?: string;
    initialData?: Partial<CreateBranchFormData>;
}) => {
    const isEditMode = !!branchId;

    const { mutate: createBranch, isPending: isCreating } = useCreateBranch();
    const { mutate: updateBranch, isPending: isEditing } = useUpdateBranch();

    const isPending = isCreating || isEditing;

    const methods = useAppForm(createBranchSchema, {
        name: "",
        phone: "",
        address: "",
        latitude: 30.6744,
        longitude: 73.1216,
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
        ownerCnic: "",
        ntn: "",
        strn: "",
        ...initialData,
    });

    const onSubmit = (data: CreateBranchFormData) => {
        if (isEditMode) {
            updateBranch({ id: branchId, data: data })
        }
        else {
            createBranch(data);
        }
    };

    const { formState, handleSubmit } = methods;
    const { isDirty, isValid } = formState;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <BranchDetails
                        isEditing={isEditMode}
                    />
                    <BranchOwnerDetails />
                </div>
                <FormCTAFooter
                    ctaText={isEditMode ? "Update Branch" : "Create Branch"}
                    isPending={isPending}
                    isDirty={isDirty}
                    isValid={isValid}
                    isEditMode={isEditMode}
                    icon={Building2}
                />
            </form>
        </FormProvider>
    );
};

export default BranchForm;