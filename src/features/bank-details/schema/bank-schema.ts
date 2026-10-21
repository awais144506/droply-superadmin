import * as yup from "yup"
export const bankSchema = yup.object({
    bankName: yup.string().required("Bank name is required"),
    accountTitle: yup.string().required("Account title is required"),
    accountNumber: yup.string().required("Account number is required"),
    iban: yup.string().optional(),
}).required();

export type BankFormData = yup.InferType<typeof bankSchema>;