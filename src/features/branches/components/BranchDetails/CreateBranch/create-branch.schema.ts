import * as yup from "yup";

export const createBranchSchema = yup.object().shape({
  name: yup.string().trim().required("Branch name is required"),
  industry: yup.string().required("Industry classification is required"),
  city: yup.string().trim().required("City is required"),
  address: yup.string().trim().required("Physical facility address is required"),
  phone: yup.string().optional().default(""),
  email: yup
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .email("Enter a valid office email")
    .optional(),
  ownerName: yup.string().trim().required("Owner full name is required"),
  ownerEmail: yup
    .string()
    .trim()
    .email("Enter a valid owner email address")
    .required("Owner email is required as the permanent account identity"),
  ownerPhone: yup.string().trim().required("Owner phone / WhatsApp is required"),
  maxUsersLimit: yup
    .number()
    .typeError("Seat limit must be a number")
    .min(1, "Minimum 1 seat required")
    .max(20, "Maximum 20 seats allowed")
    .required("Staff seat limit is required"),
  latitude: yup
    .number()
    .typeError("Latitude must be a valid number")
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90")
    .required("Latitude coordinate is required"),
  longitude: yup
    .number()
    .typeError("Longitude must be a valid number")
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180")
    .required("Longitude coordinate is required"),
});

export type CreateBranchFormData = yup.InferType<typeof createBranchSchema>;