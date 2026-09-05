import * as yup from "yup";
import { IndustryVertical } from "@/types/branch"; // adjust import path if needed

export const createBranchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  industry: yup
    .mixed<IndustryVertical>()
    .oneOf(["WATER", "LPG", "DAIRY", "COMMERCIAL_DISTRIBUTION"])
    .required("Industry is required"),
  city: yup.string().required("City is required"),
  address: yup.string().required("Address is required"),
  latitude: yup.number().required("Latitude is required"),
  longitude: yup.number().required("Longitude is required"),
  phone: yup.string().default(""),
  email: yup.string().email("Invalid email format").default(""),
  ownerName: yup.string().required("Owner name is required"),
  ownerEmail: yup.string().email("Invalid email").required("Owner email is required"),
  ownerPhone: yup.string().required("Owner phone is required"),
  maxUsersLimit: yup.number().min(1).max(20).default(15),
});

export type CreateBranchFormData = yup.InferType<typeof createBranchSchema>;