import { User } from "@/types/user";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error?.message || error?.response?.data.error || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getDashboard = async () => {
  try {
    const { data } = await axiosClient.get(`/management/data-staff-dashboard`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};