import * as yup from "yup";

export const createBranchSchema = yup.object({
  name: yup.string().required("Branch name is required"),
  address: yup.string().required("Address is required"),
  latitude: yup.number().typeError("Latitude must be a number").required("Latitude is required"),
  longitude: yup.number().typeError("Longitude must be a number").required("Longitude is required"),
  phone: yup.string().required("Branch phone is required"), // <-- Fixed this
  ownerName: yup.string().required("Owner name is required"),
  ownerEmail: yup.string().email("Invalid email format").required("Owner email is required"),
  ownerPhone: yup.string().required("Owner phone is required"),
  ownerCnic: yup.string().required("Owner CNIC is required"),
});

export type CreateBranchFormData = yup.InferType<typeof createBranchSchema>;