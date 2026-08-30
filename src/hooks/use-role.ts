"use client";

import { useUser } from "@clerk/nextjs";

export function useRole() {
  const { user, isLoaded, isSignedIn } = useUser();
  const role = (user?.publicMetadata?.platformRole as "SUPER_ADMIN" | "SUPPORT_ADMIN") || "SUPPORT_ADMIN";
  const userName = user?.fullName || "";
  const userProfilePicture = user?.imageUrl;
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  return {
    role,
    userName,
    userEmail,
    userProfilePicture,
    isSuperAdmin: role === "SUPER_ADMIN",
    isSupportAdmin: role === "SUPPORT_ADMIN",
    isLoading: !isLoaded,
    isAuthenticated: Boolean(isSignedIn),
  };
}