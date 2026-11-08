"use client";

import CreateFormHeader from "@/lib/utils/components/FormHeaderNavigation";
import { useParams } from "next/navigation";
import BranchForm from "@/features/branches/components/create/BranchForm";
import { useBranchById } from "@/features/branches/api/use-branch";
import Loading from "@/app/loading";
import ErrorBoundary from "@/app/error";

const EditBranch = () => {
  const params = useParams();
  const branchId = params.branchId as string;

  // Fetch the existing branch data
  const { data, isLoading, isError, error } = useBranchById(branchId);

  if (isLoading) return <Loading text="Loading branch details..." />;
  if (isError || !data) return <ErrorBoundary error={error?.message} />;

  // Map the backend payload (flattened branch + owner) to your form schema
  const initialData = {
    id: data.branch.id || "",
    name: data.branch.name || "",
    phone: data.branch.phone || "",
    address: data.branch.address || "",
    latitude: Number(data.branch.latitude) || 30.6744,
    longitude: Number(data.branch.longitude) || 73.1216,
    ownerName: data.owner?.name || "",
    ownerEmail: data.owner?.email || "",
    ownerPhone: data.owner?.phone || "",
    ownerCnic: data.owner?.cnic || "",
  };

  return (
    <div className="space-y-6 p-6">
      <CreateFormHeader
        title="Edit Branch"
        href={`/manage/branches/${branchId}`}
        breadcrumbs={[
          { label: "Branches", href: "/manage/branches" },
          { label: initialData.name, href: `/manage/branches/${initialData.id}` },
          { label: "Edit Branch" }
        ]}
      />
      <BranchForm
        branchId={branchId}
        initialData={initialData}
      />
    </div>
  );
};

export default EditBranch;