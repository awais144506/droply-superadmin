import * as yup from "yup";

export const createBranchSchema = yup.object({
  // Branch Basic Info
  name: yup.string().required("Branch name is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Branch phone is required"),
  latitude: yup
    .number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
  longitude: yup
    .number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),
  ownerName: yup.string().required("Owner name is required"),
  ownerEmail: yup
    .string()
    .email("Invalid email format")
    .required("Owner email is required"),
  ownerPhone: yup.string().required("Owner phone is required"),
  ownerCnic: yup.string().required("Owner CNIC is required"),
  ntn: yup.string().optional(),
  strn: yup.string().optional(),
});

export type CreateBranchFormData = yup.InferType<typeof createBranchSchema>;