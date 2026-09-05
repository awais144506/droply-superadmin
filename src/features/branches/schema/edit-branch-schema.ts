import * as yup from "yup";

const phoneRegex = /^(\+92|\+91)\d{10}$/;

export const editBranchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(phoneRegex, "Must start with +92 or +91 followed by 10 digits"),
  address: yup.string().required("Address is required"),
  latitude: yup
    .number()
    .transform((val, orig) => (orig === "" || Number.isNaN(val) ? undefined : val))
    .required("Latitude is required"),
  longitude: yup
    .number()
    .transform((val, orig) => (orig === "" || Number.isNaN(val) ? undefined : val))
    .required("Longitude is required"),
}).required();

export type EditBranchFormData = yup.InferType<typeof editBranchSchema>;