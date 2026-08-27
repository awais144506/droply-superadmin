"use client"
import { useParams } from "next/navigation";
import { useBranch } from "@/features/branches/api/use-branches";
import Loading from "@/app/loading";
import Error from "@/app/error";
import TopNavigationBrach from "@/features/branches/components/BranchDetails/navigation";
import BranchOverViewCard from "@/features/branches/components/BranchDetails/overview-cards";
import BranchOwnerDetails from "@/features/branches/components/BranchDetails/branch-owner-details";
import BranchDetails from "@/features/branches/components/BranchDetails/branch-details";
import BranchMapDetails from "@/features/branches/components/BranchDetails/branch-map";
import BranchStaffDetails from "@/features/branches/components/BranchDetails/branch-staff";



export default function BranchDetailPage() {

  const params = useParams();
  const branchId = params.branchId as string;
  const { data: branch, isLoading, isError, error } = useBranch(branchId);
  if (isLoading) return <Loading />
  if (isError || !branch) return <Error error={error?.message} />
  const lat = Number(branch.latitude) || 33.6844;
  const lng = Number(branch.longitude) || 73.0479;


  return (
    <div className="space-y-6 p-6">
      {/* Top Breadcrumb & Status Navigation */}
      <TopNavigationBrach branch={branch} />
      {/*Stat Overview Cards */}
      <BranchOverViewCard branch={branch} />

      {/* Main Grid: Info + Map */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          {/* Owner Details Card */}
          <BranchOwnerDetails
            branch={branch}
          />
          {/* Branch Details Card */}
          <BranchDetails
            branch={branch}
          />
        </div>

        {/* MAP */}
        <div className="lg:col-span-7 flex flex-col">
          <BranchMapDetails
            latitude={lat}
            longitude={lng}
            branchName={branch.name}
            address={branch.address}
          />
        </div>
      </div>
      <BranchStaffDetails
        branch={branch}
      />

    </div>
  );
}