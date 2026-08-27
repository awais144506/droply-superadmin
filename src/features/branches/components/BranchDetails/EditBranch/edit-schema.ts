import * as yup from 'yup';
export const editBranchSchema = yup.object().shape({
    name: yup.string().required("Branch name is required"),
    ownerName: yup.string().required("Owner full name is required"),
    ownerPhone: yup.string().required("Owner phone/WhatsApp is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Physical address is required"),
    phone: yup.string().optional().default(""),
    email: yup
        .string()
        .email("Enter a valid email address")
        .optional()
        .default(""),
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
        .required("Latitude is required"),
    longitude: yup
        .number()
        .typeError("Longitude must be a valid number")
        .min(-180, "Longitude must be >= -180")
        .max(180, "Longitude must be <= 180")
        .required("Longitude is required"),
});
