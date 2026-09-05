import * as yup from "yup";

const phoneRegex = /^(\+92|\+91)\d{10}$/;

export const editOwnerSchema = yup.object({
  ownerName: yup.string().required("Owner name is required"),
  ownerEmail: yup.string().email("Must be a valid email").required("Email is required"),
  ownerPhone: yup
    .string()
    .required("Phone is required")
    .matches(phoneRegex, "Must start with +92 or +91 followed by 10 digits"),
  ownerCnic: yup
    .string()
    .required("CNIC is required")
    .min(13, "CNIC must be at least 13 characters")
    .max(15, "CNIC cannot exceed 15 characters"),
}).required();

export type EditOwnerFormData = yup.InferType<typeof editOwnerSchema>;