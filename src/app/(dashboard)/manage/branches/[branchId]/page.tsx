"use client"
import { useParams } from "next/navigation";
import { useBranchById } from "@/features/branches/api/use-branch";
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
    const { data, isLoading, isError, error } = useBranchById(branchId);
    const { branch, owner, subscription, staff, customers } = data || {};

    if (isLoading) return <Loading text="Loading Branch..." />
    if (isError || !branch) return <Error error={error?.message} />

    const lat = Number(branch.latitude) || 33.6844;
    const lng = Number(branch.longitude) || 73.0479;


    return (
        <div className="space-y-6 p-6">
            <TopNavigationBrach branch={branch} />
            <BranchOverViewCard
                subscription={subscription}
                staffCount={staff?.length}
                customersCount={customers}
                userLimit={branch.userLimit}
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-5">
                    <BranchOwnerDetails
                        branch={branch}
                        owner={owner!}
                    />
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
                staff={staff || []}
            />

        </div>
    );
}