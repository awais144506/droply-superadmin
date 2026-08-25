import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

apiClient.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<{ message: string }>) => {
        const customMessage = error.response?.data.message || "An unexpected error occured";
        return Promise.reject(new Error(customMessage));
    }
)