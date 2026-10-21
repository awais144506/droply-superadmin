import { Branch } from "@/features/branches/types/branch";

export function getBranchWhatsAppUrl(branch: Branch): string {
    const phone = branch.owner?.phone || branch.phone || "";

    // Format creation date nicely
    const formattedDate = branch.createdAt 
        ? new Date(branch.createdAt).toLocaleDateString("en-US", { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }) 
        : "N/A";

    // Subscription & renewal date info
    const sub = branch.subscription;
    const tier = sub?.tier || "TRIAL";
    
    let renewDateStr = "N/A";
    if (sub?.renewDate) {
        renewDateStr = new Date(sub.renewDate).toLocaleDateString("en-US", { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    } else if (branch.createdAt) {
        // Fallback: 7 days from branch creation
        const trialDate = new Date(branch.createdAt);
        trialDate.setDate(trialDate.getDate() + 7);
        renewDateStr = trialDate.toLocaleDateString("en-US", { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    const messageBody = [
        `*Login ID : ${branch.owner?.email || "N/A"}*`,
        ``,
        `Hi ${branch.owner?.name || "Manager"}. Your branch is successfully created!`,
        ``,
        `*Subscription Details:*`,
        `• Plan Tier: *${tier}*`,
        `• Trial Period: 7 Days (Renews/Expires on *${renewDateStr}*)`,
        ``,
        `*Branch Details:*`,
        `• Name: ${branch.name}`,
        `• Code: ${branch.branchCode}`,
        `• Phone: ${branch.phone || "N/A"}`,
        `• Address: ${branch.address}`,
        `• Created At: ${formattedDate}`,
        ``,
        `*Owner Details:*`,
        `• Name: ${branch.owner?.name || "N/A"}`,
        `• Phone: ${branch.owner?.phone || "N/A"}`,
        `• CNIC: ${branch.owner?.cnic || "N/A"}`,
        ``,
        `Please let us know if you need any assistance with your account or daily operations.`
    ].join("\n");

    const encodedMessage = encodeURIComponent(messageBody);

    return phone 
        ? `https://wa.me/${phone}?text=${encodedMessage}` 
        : `https://wa.me/?text=${encodedMessage}`;
}